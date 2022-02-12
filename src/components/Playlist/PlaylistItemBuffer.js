import videojs from "video.js";
import 'videojs-playlist';
import Icon from "../Base/Icon";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getRecommVariables } from "../../lib/gqlqueries"
import { usePlaylistSetters, usePlaylistValues } from "./PlaylistContext";


export function PlaylistItemBuffer(props) {
  const { playlistName, playlistData, focusPosition, viewMode, editMode } = usePlaylistValues();
  const { setPlaylistData, setFocusPosition, setViewMode, setEditMode, } = usePlaylistSetters();
  const {specialLocation, getRecommData, playlistPosition} = props;
  let itemButtonsClassname = "group h-[5vh] w-full z-10 block";
  let addButtonVisible = "invisible ";
  if (focusPosition == playlistPosition) {
    addButtonVisible = "visible "
  }

  let addButtonClassnameBottom = "invisible group-hover:visible h-[5vh] w-[5vh] z-20 relative left-1/2 top-full -translate-x-1/2 -translate-y-1/2";
  let addButtonClassnameTop = addButtonVisible + " group-hover:visible left-1/2 bottom-1/2 -translate-x-1/2 h-[5vh] w-[5vh] z-20 relative inline-block";

  return (
    <>
      <li className='buffer' >
        <div className={itemButtonsClassname} 
        onClick={(event) => changeToRecommMode(event, getRecommData, playlistPosition, playlistData, playlistName,focusPosition, setFocusPosition, setViewMode)}>
          <Icon {...props} id="vjs-playlist-item-buttons-add-icon-bottom" shape="add" circle={true} circleClass="success" strokeClass="neutral" className={specialLocation == "last" ? addButtonClassnameTop : addButtonClassnameBottom}/>
        </div>
      </li>
    </>
  )

  function changeToRecommMode(event, getRecommData, playlistPosition, playlistData, playlistName, focusPosition, setFocusPosition, setViewMode) {
    if (event.target && (event.target.ownerSVGElement?.id.startsWith('vjs-playlist-item-buttons'))) {
      event.preventDefault();
      let recomm = getRecommData({ variables: getRecommVariables(playlistName, playlistData, playlistPosition) })
      setFocusPosition(playlistPosition);
      setViewMode("recomm");
    }
  }

}
