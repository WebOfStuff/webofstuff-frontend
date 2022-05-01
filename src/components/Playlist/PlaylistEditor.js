
import { useManualQuery, useQuery } from 'graphql-hooks';
import { useSession } from "next-auth/react";
import { React, useEffect, useState } from 'react';
import { createPlaylist, Playlist } from "./Playlist";
import Recommendations from './Recommendations';
import Similarities from './Similarities';
import checkEditmode from './../Session/Rights/editRights';
import Player from './../Video/Player';
import { addQuery, deleteQuery, getListVariables, getPlaylist, recommQuery } from '../../lib/gqlqueries';
import { usePlaylistSetters, usePlaylistValues } from './PlaylistContext';
import PlayerForPlaylist from './PlayerForPlaylist';
import { useTheme } from '../Themes/ThemeContext';


export default function PlaylistEditor(props) {
  const { playlistName, playlistData, focusPosition, viewMode, editMode } = usePlaylistValues();
  const { setPlaylistData, setFocusPosition, setViewMode, setEditMode, } = usePlaylistSetters();
  const { theme, setTheme } = useTheme();
  // use Session if it exists
  const { data: session, status } = useSession();
  // get dynamic URL parameters to initialize View and Edit Mode -> Recheck after Playlistdata is loaded, position is not rechecked




  // TODO: Check whether skip is necessary, since the Node is a required URL parameter 
  const { loading: listLoading, error: listError, data: listData, refetch: listRefetch } = useQuery(getPlaylist, {
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

  //-------------------------------------------------Queries after dataLoad------------------------------------------------------------------------//

  const [blocked, setBlocked] = useState(listLoading || listData?.loading || recommReloading || listError || listLoading == undefined || recommError)

  useEffect(() => {
    setBlocked(listLoading || listData?.loading || recommReloading || listError || listLoading == undefined || recommError)
  }, [listLoading, listData?.loading , recommReloading ,listError , recommError]);

  useEffect(() => {
    if (!blocked) {
      if (viewMode == "initial") {
        setViewMode(props.view || "view")
      }
    }
  }, [viewMode, setViewMode, blocked, props.view ]);

  useEffect(() => {
    if (!blocked) {
      setPlaylistData(createPlaylist(listData))
    }
  }, [listData, setPlaylistData, blocked]);


  // find whether editing/viewing is allowed only for UI, re-check for editing upon call of graphql API
  // TODO: This should only run serverside, rightsmanagement not secure clientside? maybe serverside props, can query there?

  useEffect(() => {
    if (!blocked) {
      if (editMode !== checkEditmode(session, listData, editMode)) {
        setEditMode(checkEditmode(session, listData, editMode));
      }
    }
  }, [editMode, session, listData, blocked, setEditMode]);

  /*
  if (viewMode !== checkViewmode(session, listData, viewMode)) {
    setViewMode(checkViewmode(session, listData, viewMode));
  }
  */
  
  useEffect(() => {
    if (!blocked) {
      if (focusPosition == 0) {
        setFocusPosition(playlistData.length + 1)
      }
    }
  }, [focusPosition, playlistData, setFocusPosition, blocked]);


  
  const [showPlayer, setShowPlayer] = useState(viewMode == "view" || (viewMode == "recomm" && focusPosition !== playlistData.length + 1));
  useEffect(() => {if (!blocked) { setShowPlayer(viewMode == "view" || (viewMode == "recomm" && focusPosition !== playlistData.length + 1))}}, [blocked, viewMode, focusPosition, playlistData]);

  const [showRecommendation, setShowRecommendation] = useState(viewMode == "recomm");
  useEffect(() => {if (!blocked) {  setShowRecommendation(viewMode == "recomm") }}, [blocked,viewMode]);

  const [showPreviousPlayer, setShowPreviousPlayer] = useState(viewMode == "recomm" && focusPosition !== 1);
  useEffect(() => {if (!blocked) {  setShowPreviousPlayer(viewMode == "recomm" && focusPosition !== 1) }}, [blocked,viewMode, focusPosition]);

  if (listLoading || listData?.loading || recommReloading) return 'Loading...';
  if (listError || listLoading == undefined || recommError) return `Error! `;

  return (
    <>
      <div id="PlaylistAndFriends" className="flex flex-row">
        <div id="Friends" className="flex flex-col w-full pr-2">
          {showRecommendation &&
            <Recommendations recommData={recommData} />}
          {/*showRecommendation && 
           <Similarities recommData={recommData} className="flex-initial w-full" position={focusPosition} playlistData={playlistData}></Similarities>*/} 
          <div id="PlayerRow" className="flex flex-row">
            {showPreviousPlayer &&
              <PlayerForPlaylist playerName="previousPlaylistItem" position={focusPosition - 1} className="flex-initial w-full " playlistData={playlistData} />}
            {showPlayer &&
              <PlayerForPlaylist playerName="nextPlaylistItem" position={focusPosition} className="flex-initial w-full" playlistData={playlistData} />}
          </div>
        </div>
        <Playlist className="flex-initial w-1/6 overflow-visible relative p-0" getRecommData={getRecommData} />
      </div>
    </>
  )
}


export function startNewPlaylist(playlist, setPlaylistName, session) {
  let newPlaylistname = generatePlaylistName();
  setUrl(newPlaylistname)
  setPlaylistName(newPlaylistname)
  session.setPlaylistName(newPlaylistname);
  playlist = []
}

/*   useEffect(() => {
    let { focusPosition, viewMode, playlistData } = usePlaylistValues();
    if (viewMode == "view") {
      showSecondPlayer == false
    } else if (viewMode == "recomm") {
      let first = (focusPosition == 1)
      let last = (focusPosition == playlistData.length + 1)

    }
  }, [viewMode, focusPosition, playlistData, playlistName, setPanels, recommData]) */

