import { React, useCallback, useEffect, useState } from 'react';
import VideoArea from '../components/Video/VideoArea';
import { useQuery, useLazyQuery, useMutation, gql } from "@apollo/client";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Playlist, { findPlaylistName, createPlaylist } from "../components/Video/Playlist";
import ListContents from '../components/ListContents/ListContents';
import checkViewmode from '../components/Session/Rights/viewRights';
import checkEditmode from '../components/Session/Rights/editRights';
import { getRecommendationQuery, getListQuery, getAddQuery} from '../lib/gqlqueries';

export default function Walk() {
  // use Session if it exists
  const { data: session, status } = useSession();

  // get dynamic URL parameters to initialize View and Edit Mode -> Recheck after Playlistdata is loaded, position is not rechecked
  const router = useRouter();

  let { playlistName, pos, view, edit } = router.query;
  const [viewMode, setViewMode] = useState(view || "add");
  const [editMode, setEditMode] = useState(edit || "true");
  const [position, setPosition] = useState(pos || 1);

  // find initial playlistNode
  if (typeof window !== 'undefined' && (playlistName !== undefined && playlistName !== null)) {
    playlistName = findPlaylistName(session);
  }

  // prepare initial playlist load, skip if for example the code is run serverside. 
  // TODO: Check whether skip is necessary, since the Node is a required URL parameter 
  const {listLoading, listError, listData} = useQuery(getListQuery(),{skip: playlistName == null, variables: { "where": { "name": playlistName }, "sort": [{ "edge": { "position": "ASC" } }] }, });

  // prepare function to load recommendations
  const [getRecommendationData, { reloading, data: recommData }] = useLazyQuery(getRecommendationQuery());
  const [sendAdd, { data: addData, addReloading, addError }] = useMutation(getAddQuery());

  // give UI functions to buttons, contains Hooks
  useHooksToAddButtonUIfunctions(getRecommendationData, setPosition);

  /* reload Playlist after add
  useEffect(() => {
    refetch();
  },
    [addData, refetch]);
    */


  if (listLoading || listData?.loading || reloading || addReloading) return 'Loading...';
  if (listError || addError) return `Error! ${error.message}`;


  // find whether editing/viewing is allowed only for UI, re-check for editing upon call of graphql API
  // TODO: This should only run serverside, rightsmanagement not secure clientside? maybe serverside props, can query there?
  if (editMode !== checkEditmode(session, listData, editMode)) {
    setEditMode(checkEditmode(session, listData, editMode));
  }
  if (viewMode !== checkEditmode(session, listData, viewMode)) {
    setViewMode(checkViewmode(session, listData, viewMode));
  }

  let playlist = [];
  if (playlistName !== null && playlistName !== undefined) {
    playlist = createPlaylist(listData);
  }

  return (
    <>
      <ListContents listcontentsdata={recommData} addFunction={sendAdd} playlistName={playlistName} position={position} />
      <Playlist />
      <VideoArea playlist={playlist} />
    </>
  )
};

function useHooksToAddButtonUIfunctions(getRecommendationData, setPosition) {
  const handleAddButtonClick = useCallback(event => {
    if (event.target && (event.target.className === 'vjs-playlist-item-buttons-add-icon-upper' || event.target.className === 'vjs-playlist-item-buttons-add-icon-lower')) {
      setPosition(event.target.value);
      getRecommendationData();
    }
  }, [getRecommendationData, setPosition]);
  useEffect(() => {
    document.addEventListener('click', handleAddButtonClick);
    return () => {
      document.removeEventListener('click', handleAddButtonClick);
    };
  }, [handleAddButtonClick, getRecommendationData]);
}



export async function getStaticProps({ params }) {
 

  return { props: { params, fallback: false} }
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
