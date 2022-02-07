
import { useManualQuery, useQuery } from 'graphql-hooks';
import { useSession } from "next-auth/react";
import { React, useEffect } from 'react';
import { createPlaylist, Playlist } from "./Playlist";
import Recommendations from './Recommendations';
import Similarities from './Similarities';
import checkEditmode from './../Session/Rights/editRights';
import Player from './../Video/Player';
import { addQuery, deleteQuery, getListVariables, listQuery, recommQuery } from '../../lib/gqlqueries';
import { usePlaylistSetter, usePlaylistValues } from './PlaylistContext';
import PlayerForPlaylist from './PlayerForPlaylist';


export default function PlaylistEditor(props) {
  let { view } = props.query;
  const { playlistName, playlistData, focusPosition, viewMode, editMode } = usePlaylistValues();
  const { setPlaylistData, setFocusPosition, setViewMode, setEditMode, } = usePlaylistSetter();
  const { theme, setTheme } = props;
  // use Session if it exists
  const { data: session, status } = useSession();
  // get dynamic URL parameters to initialize View and Edit Mode -> Recheck after Playlistdata is loaded, position is not rechecked

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
  useEffect(() => {
    setPlaylistData(createPlaylist(listData))
  }, [listData, setPlaylistData]);

  const [getRecommData, { loading: recommReloading, error: recommError, data: recommData }] = useManualQuery(recommQuery);

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
    setPlaylistData(createPlaylist(listData));
  }
  if (focusPosition == 0) {
    setFocusPosition(playlistData.length + 1)
  }
  

  return (
    <>
      <div id="PlaylistAndFriends" className="flex flex-row">
        <div id="Friends" className="flex flex-col w-full pr-2">
          {viewMode == "recomm" && <Recommendations recommData={recommData} />}
          <div id="PlayerRow" className="flex flex-row">
            {(viewMode == "recomm" && focusPosition !== 1) && 
            <PlayerForPlaylist playerName="previousPlaylistItem" position={focusPosition - 1} className="flex-initial w-full " playlistData={playlistData} />}
           {/*  {viewMode == "recomm" && 
           <Similarities recommData={recommData} className="flex-initial w-full" position={focusPosition} playlistData={playlistData}></Similarities>} */}
            {(viewMode == "view" || (viewMode == "recomm" && focusPosition !== playlistData.length + 1)) && 
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

