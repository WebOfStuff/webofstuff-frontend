
import React from 'react';
import VideoArea from '../components/Video/VideoArea';
import { useQuery, useLazyQuery, gql, frag } from "@apollo/client";
import { getSession,useSession, onCompleted } from "next-auth/react"
import { findListNodeBySession, createPlaylist } from "../components/Video/Playlist";

const RECOMMENDATIONQUERY = gql`
  query {  
    contents {
      title
    }
  }
`;

const LISTQUERY = gql`
query getPlaylist($where: PlaylistWhere, $sort: [PlaylistElementsConnectionSort!]) {  
  playlists(where: $where) {
    name
    elements {
      title
      youtubeid
    }
    elementsConnection(sort: $sort) {
      edges {
        position
      }
    }
  }
}
`;

export default function Walk() {
  const [getRecommendationData, { reloading, data }] = useLazyQuery(RECOMMENDATIONQUERY);
  const { data:session, status } = useSession();
  let playlist = [];
  let playlistNode = findListNodeBySession(session);
  // Add playlist by cookie
  let listLoading, listError, listData;
  listLoading, listError, listData = useQuery(LISTQUERY, { variables: { "where": { "name": playlistNode }, "sort": [{"edge": {"position": "ASC"}}]},});
  if (listLoading || listData.loading) return 'Loading...';
  if (listError) return `Error! ${error.message}`;
  playlist = createPlaylist(listData)
  

  if (typeof window !== 'undefined') {
 document.addEventListener('click', function (e) {
      if (e.target && e.target.className === 'vjs-playlist-item-add') {
        getRecommendationData();
      }
    }
    )
  }
  return (<VideoArea enableThemeQueryParam hideDescription playlist={playlist} />)
};

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}




