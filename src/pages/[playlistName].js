import { React, useState } from 'react';
import Player from '../components/Video/Player';
import { useQuery, useManualQuery, useMutation } from 'graphql-hooks'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { Playlist, createPlaylist } from "../components/Video/Playlist";
import ListContents from '../components/ListContents/ListContents';
import checkViewmode from '../components/Session/Rights/viewRights';
import checkEditmode from '../components/Session/Rights/editRights';
import { recommQuery, getRecommVariables, listQuery, getListVariables, addQuery, deleteQuery, getDeleteVariables, saveQuery, saveVariables } from '../lib/gqlqueries';

export default function Walk(props) {
  // use Session if it exists
  const { data: session, status } = useSession();

  // get dynamic URL parameters to initialize View and Edit Mode -> Recheck after Playlistdata is loaded, position is not rechecked
  const router = useRouter();
  let { playlistName: initialPlaylistName, pos, view, edit } = router.query;
  const [viewMode, setViewMode] = useState(view || "view");
  const [editMode, setEditMode] = useState(edit || "true");
  const [focusPosition, setPosition] = useState(pos || 1);
  const [playlistName, setPlaylistName] = useState(initialPlaylistName || generatePlaylistName);

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

  let [getRecommData, { loading: recommReloading, error: recommError, data: recommData }] = useManualQuery(recommQuery);

  if (listLoading || listData?.loading || recommReloading) return 'Loading...';
  if (listError || recommError || listLoading == undefined) return `Error! `;

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

  let playlistData = [];
  if (playlistName !== null && playlistName !== undefined) {
    playlistData = createPlaylist(listData);
  }
 let friends;
  if (viewMode == "view") {
    friends =
      <>
        <Player playlistData={playlistData} playlistName={playlistName} changeToRecommMode={changeToRecommMode} focusPosition={focusPosition} />
      </>
  } else if (viewMode == "recomm") {
    friends =
      <>
        <ListContents listcontentsdata={recommData} playlistName={playlistName} focusPosition={focusPosition} />
        <Player playlistData={playlistData} playlistName={playlistName} changeToRecommMode={changeToRecommMode} focusPosition={focusPosition} />
      </>
  }

  return (
    <>
      <div id="PlaylistAndFriends" className="w-full flex flex-1 overflow-none">
        <div id="Friends" className="flex-auto items-stretch">
          {friends}
        </div>
        <Playlist playlistData={playlistData} playlistName={playlistName} changeToRecommMode={changeToRecommMode} focusPosition={focusPosition} />
      </div>
    </>
  )

  function changeToRecommMode(position, listData) {
    setViewMode("recomm");
    setPosition(position);
    getRecommData({ variables: getRecommVariables(listData) });
  }
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
