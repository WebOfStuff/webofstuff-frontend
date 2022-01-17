import { React, useCallback, useEffect } from 'react';
import VideoArea from '../components/Video/VideoArea';
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react"
import Playlist, { findPlaylistNode, createPlaylist } from "../components/Video/Playlist";
import ListContents from '../components/ListContents/ListContents';

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

  // use Session if it exists
  const { data: session, status } = useSession();
  // find initial playlist
  let playlist = [];
  let playlistNode;
  if (typeof window !== 'undefined') {
    playlistNode = findPlaylistNode(session);
  }

  // load initial Playlist
  let listLoading, listError, listData;
  listLoading, listError, listData = useQuery(LISTQUERY, { skip: playlistNode == null, variables: { "where": { "name": playlistNode }, "sort": [{ "edge": { "position": "ASC" } }] }, });

  // prepare function to load recommendations
  const [getRecommendationData, { reloading, data: recommData }] = useLazyQuery(RECOMMENDATIONQUERY);
  const handleAddButtonClick = useCallback(event => {
    if (event.target && (event.target.className === 'vjs-playlist-item-buttons-add-icon-upper' || event.target.className === 'vjs-playlist-item-buttons-add-icon-lower')) {
      getRecommendationData();
    }
  }, [getRecommendationData]);
  useEffect(() => {
    document.addEventListener('click', handleAddButtonClick)
    return () => {
      document.removeEventListener('click', handleAddButtonClick);
    };
  }, [handleAddButtonClick, getRecommendationData]);

  if (listLoading || listData.loading|| reloading) return 'Loading...';
  if (listError) return `Error! ${error.message}`;
  if (playlistNode !== null) {
    playlist = createPlaylist(listData)
  }

  return (
    <>
      <ListContents listcontentsdata={recommData} />
      <Playlist />
      <VideoArea playlist={playlist} />
    </>
  )
};





