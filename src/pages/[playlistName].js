import { React, useCallback, useEffect, useState } from 'react';
import VideoArea from '../components/Video/VideoArea';
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Playlist, { findPlaylistName, createPlaylist } from "../components/Video/Playlist";
import ListContents from '../components/ListContents/ListContents';
import checkViewmode from '../components/Session/Rights/viewRights';
import checkEditmode from '../components/Session/Rights/editRights';
import gqlqueries from '../lib/gqlqueries';


export default function Walk() {

  // get dynamic URL parameters
  const router = useRouter();
  let { playlistName, pos, view, edit } = router.query;
  // use Session if it exists
  const { data: session, status } = useSession();
  // initialize View and Edit Mode -> Recheck after Playlistdata is loaded
  const [viewMode, setViewMode] = useState(view);
  const [editMode, setEditMode] = useState(edit);

  // find initial playlistNode
  if (typeof window !== 'undefined' && (playlistName == undefined || playlistName == null)) {
    playlistName = findPlaylistName(session);
  }

  // prepare initial playlist load, skip if for example the code is run serverside. 
  // TODO: Check whether skip is necessary, since the Node is a required URL parameter 
  let listLoading, listError, listData;
  listLoading, listError, listData = useQuery(gqlqueries.listQuery, { skip: playlistName == null, variables: { "where": { "name": playlistName }, "sort": [{ "edge": { "position": "ASC" } }] }, });

  // prepare function to load recommendations
  const [getRecommendationData, { reloading, data: recommData }] = useLazyQuery(gqlqueries.recommendationQuery);

  // give UI functions to buttons, contains Hooks
  addButtonUIfunctions(getRecommendationData);

  if (listLoading || listData.loading || reloading) return 'Loading...';
  if (listError) return `Error! ${error.message}`;


  // find whether editing/viewing is allowed 
  if (editMode !== checkEditmode(session, listData, editMode)) {
    setEditMode(checkEditmode(session, listData, editMode));
  }
  if (viewMode !== checkEditmode(session, listData, viewMode)) {
    setViewMode(checkViewmode(session, listData, viewMode));
  }


  
  let playlist = [];
  if (playlistName !== null) {
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

function addButtonUIfunctions(getRecommendationData) {
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
}
