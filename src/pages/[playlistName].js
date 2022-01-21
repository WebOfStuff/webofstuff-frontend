import { React, useCallback, useEffect, useState } from 'react';
import VideoArea from '../components/Video/VideoArea';
import { useQuery, useManualQuery, useMutation } from 'graphql-hooks'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Playlist, { findPlaylistName, createPlaylist } from "../components/Video/Playlist";
import ListContents from '../components/ListContents/ListContents';
import checkViewmode from '../components/Session/Rights/viewRights';
import checkEditmode from '../components/Session/Rights/editRights';
import { getRecommQuery, getRecommVariables, getListQuery, getListVariables, getAddQuery, getDeleteQuery, getDeleteVariables } from '../lib/gqlqueries';

export default function Walk() {
  // use Session if it exists
  const { data: session, status } = useSession();

  // get dynamic URL parameters to initialize View and Edit Mode -> Recheck after Playlistdata is loaded, position is not rechecked
  const router = useRouter();

  let { playlistName, pos, view, edit } = router.query;
  const [viewMode, setViewMode] = useState(view || "view");
  const [editMode, setEditMode] = useState(edit || "true");
  const [position, setPosition] = useState(pos || 1);

  // find initial playlistNode
  if (typeof window !== 'undefined' && (playlistName !== undefined && playlistName !== null)) {
    playlistName = findPlaylistName(session);
  }

  // prepare function to load recommendations
  let [getRecommData, { loading: recommReloading, error: recommError, data: recommData }] = useManualQuery(getRecommQuery());
  const [sendAdd, { data: addData, loading: addLoading, error: addError }] = useMutation(getAddQuery());
  const [sendDelete, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(getDeleteQuery());
  // prepare initial playlist load, skip if for example the code is run serverside. 
  // TODO: Check whether skip is necessary, since the Node is a required URL parameter 
  const { loading: listLoading, error: listError, data: listData, refetch: listRefetch } = useQuery(getListQuery(), {
    skip: playlistName == null,
    variables: getListVariables(playlistName),
    refetchAfterMutations: [
      {
        mutation: getAddQuery
      },{
        mutation: getDeleteQuery
      }
    ]
  });


  // give UI functions to buttons
  const handleButtonClick = event => {
    if (event.target && (event.target.className === 'vjs-playlist-item-buttons-add-icon-upper' || event.target.className === 'vjs-playlist-item-buttons-add-icon-lower')) {
      setViewMode("recomm");
      setPosition(parseInt(event.target.getAttribute("position")));
      getRecommData({ variables: getRecommVariables(listData) });
    }
    if (event.target && (event.target.className === 'vjs-playlist-item-buttons-delete-icon-upper' || event.target.className === 'vjs-playlist-item-buttons-delete-icon-lower')) {
      //TODO: make int in UI plugin
      sendDelete({ variables: getDeleteVariables(playlistName, parseInt(event.target.getAttribute("position")))});
      listRefetch();
    };
  }
  useEffect(() => {
    document.addEventListener('click', handleButtonClick);
    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
  }, [handleButtonClick]);
  

  if (listLoading || listData?.loading || recommReloading || addLoading || deleteLoading) return 'Loading...';
  if (listError || recommError || addError || deleteError || listLoading == undefined) return `Error! `;

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

  let playlist = [];
  if (playlistName !== null && playlistName !== undefined) {
    playlist = createPlaylist(listData);
  }

  if (viewMode == "view") {
        return (
      <>
        <Playlist />
        <VideoArea playlist={playlist} />
      </>
    )
  } else if (viewMode == "recomm") {
    return (
      <>
        <ListContents listcontentsdata={recommData} addFunction={sendAdd} playlistName={playlistName} position={position} refetchFunction={listRefetch} />
        <Playlist />
        <VideoArea playlist={playlist} />
      </>)
  } else {
    return (
    "Wrong Viewmode '"+viewMode+"'"
    )
  };
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
