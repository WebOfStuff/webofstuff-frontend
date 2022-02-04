import { React, useEffect, useLayoutEffect, useState } from 'react';
import Player from '../components/Video/Player';
import { useQuery, useManualQuery } from 'graphql-hooks'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { Playlist, createPlaylist } from "../components/[playlist]/Playlist";
import Recommendations from '../components/[playlist]/Recommendations';
import Similarities from '../components/[playlist]/Similarities';
import checkViewmode from '../components/Session/Rights/viewRights';
import checkEditmode from '../components/Session/Rights/editRights';
import { recommQuery, listQuery, getListVariables, addQuery, deleteQuery, saveQuery, saveVariables } from '../lib/gqlqueries';


export default function Walk(props) {
  // use Session if it exists
  const { data: session, status } = useSession();

  // get dynamic URL parameters to initialize View and Edit Mode -> Recheck after Playlistdata is loaded, position is not rechecked
  const router = useRouter();
  let { playlistName: initialPlaylistName, pos, view, edit } = router.query;
  const [viewMode, setViewMode] = useState("initial");
  const [editMode, setEditMode] = useState(edit || "true");
  const [focusPosition, setFocusPosition] = useState(pos || 0);
  const [playlistName, setPlaylistName] = useState(initialPlaylistName);
  const [panels, setPanels] = useState(<></>);
  const [playlistData, setPlaylistData] = useState([]);

  // prepare initial playlist load, skip if for example the code is run serverside. 
  // TODO: Check whether skip is necessary, since the Node is a required URL parameter 
  const { loading: listLoading, error: listError, data: listData, refetch: listRefetch } = useQuery(listQuery, {
    skip: playlistName == null,
    variables: getListVariables(playlistName),
    refetchAfterMutations: [
      {
        mutation: addQuery
      }, {
        mutation: deleteQuery
      }
    ]
  });

  const [getRecommData, { loading: recommReloading, error: recommError, data: recommData }] = useManualQuery(recommQuery);


  useEffect(() => {
    if (viewMode == "view") {
      setPanels(
        <>
          <Player className="flex-initial w-full" position={focusPosition} playerName="currentPlaylistItem" playlistData={playlistData} />
        </>
      )
    } else if (viewMode == "recomm") {
      let first = (focusPosition == 1)
      let last = (focusPosition == playlistData.length + 1)
      setPanels(
        <>
          <Recommendations recommData={recommData} playlistData={playlistData} playlistName={playlistName} focusPosition={focusPosition} setFocusPosition={setFocusPosition} />
          <div id="PlayerRow" className="flex flex-row">
            {!first && <Player playerName="previousPlaylistItem" position={focusPosition - 1} className="flex-initial w-1/2" playlistData={playlistData} />}
            {/* <Similarities recommData={recommData} className="flex-initial w-1/2" position={focusPosition} playlistData={playlistData}></Similarities> */}
            {!last && <Player playerName="nextPlaylistItem" position={focusPosition} className="flex-initial w-1/2" playlistData={playlistData} />}
          </div>
        </>
      )
    }
  }, [viewMode, focusPosition, playlistData, playlistName, setPanels, recommData])

  useEffect(() => {
    setPlaylistData(createPlaylist(listData))
  }, [listData]);



  if (listLoading || listData?.loading || recommReloading) return 'Loading...';
  if (listError || listLoading == undefined || recommError) return `Error! `;

  if (viewMode == "initial") {
    setViewMode(view || "view")
  }

  // find whether editing/viewing is allowed only for UI, re-check for editing upon call of graphql API
  // TODO: This should only run serverside, rightsmanagement not secure clientside? maybe serverside props, can query there?
  if (editMode !== checkEditmode(session, listData, editMode)) {
    setEditMode(checkEditmode(session, listData, editMode));
  }
  /*
 if (viewMode !== checkViewmode(session, listData, viewMode)) {
    setViewMode(checkViewmode(session, listData, viewMode));
  }
  */

  if (playlistData == []) {
    setPlaylistData();
  }
  if (focusPosition == 0) {
    setFocusPosition(playlistData.length + 1)
  }

  return (
    <>
      <div id="PlaylistAndFriends" className="flex flex-row">
        <div id="Friends" className="flex flex-col w-full pr-2">
          {panels}
        </div>
        <Playlist
          className="flex-initial w-1/6 overflow-visible relative p-0"
          playlistName={playlistName}
          playlistData={playlistData}
          getRecommData={getRecommData}
          focusPosition={focusPosition}
          setFocusPosition={setFocusPosition}
          setViewMode={setViewMode} />
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  return { props: { params, fallback: false } }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { playlistName: 'aseftalangi@gmail.com' } }
    ],
    fallback: false // false or 'blocking'
  };
}

export function startNewPlaylist(playlist, setPlaylistName, session) {
  let newPlaylistname = generatePlaylistName();
  setUrl(newPlaylistname)
  setPlaylistName(newPlaylistname)
  session.setPlaylistName(newPlaylistname);
  playlist = []
}
