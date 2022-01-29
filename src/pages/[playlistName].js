import { React, useState } from 'react';
import PlayerWithPlaylist from '../components/Video/PlayerWithPlaylist';
import { useQuery, useManualQuery, useMutation } from 'graphql-hooks'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { createPlaylist } from "../components/Video/Playlist";
import ListContents from '../components/ListContents/ListContents';
import checkViewmode from '../components/Session/Rights/viewRights';
import checkEditmode from '../components/Session/Rights/editRights';
import { recommQuery, getRecommVariables, listQuery, getListVariables, addQuery, deleteQuery, getDeleteVariables } from '../lib/gqlqueries';

export default function Walk(props) {
  // use Session if it exists
  const { data: session, status } = useSession();

  // get dynamic URL parameters to initialize View and Edit Mode -> Recheck after Playlistdata is loaded, position is not rechecked
  const router = useRouter();
  let { playlistName, pos, view, edit } = router.query;
  const [viewMode, setViewMode] = useState(view || "view");
  const [editMode, setEditMode] = useState(edit || "true");
  const [position, setPosition] = useState(pos || 1);

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

  if (viewMode == "view") {
    return (
      <>
        <PlayerWithPlaylist playlistData={playlistData} playlistName={playlistName} changeToRecommMode={changeToRecommMode} />
      </>
    )
  } else if (viewMode == "recomm") {
    return (
      <>
        <ListContents listcontentsdata={recommData} playlistName={playlistName} position={position} />
        <PlayerWithPlaylist playlistData={playlistData} playlistName={playlistName} changeToRecommMode={changeToRecommMode} />
      </>)
  } else {
    return (
      "Wrong Viewmode '" + viewMode + "'"
    )
  };

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
  debugger;
  return {
    paths: [
      { params: { playlistName: 'aseftalangi@gmail.com' } }
    ],
    fallback: false // false or 'blocking'
  };
}
