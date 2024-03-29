import videojs from "video.js";
import 'videojs-playlist';
import Icon from "../Base/Icon";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useMutation } from 'graphql-hooks'
import { deleteQuery, getDeleteVariables } from "../../lib/gqlqueries"
import { usePlaylistValues, usePlaylistSetters } from './PlaylistContext';
import { usePersonas } from '../Personas/PersonaContext';
import { useUser } from '../User/UserContext';


export function PlaylistItem(props) {
  const [sendDelete, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(deleteQuery);
  const { playlistName, playlistData, focusPosition } = usePlaylistValues();
  const { setFocusPosition, setViewMode } = usePlaylistSetters();
  const {playlistPosition, getRecommData, changeToRecommMode}= props 
  const { user, setUser }= useUser()
  const { personas, setPersonas }= usePersonas()
  let index = playlistPosition - 1
  let nextPlaylistPosition = playlistPosition + 1;

  // Handle the text to be written
  //TODO: Lokalisierung
  const [playlistItemData, setPlaylistItemData] = useState(playlistData[index]);
  const [titleText, setTitleText] = useState(playlistItemData?.name || 'Untitled Video');

  useLayoutEffect(() => {
    setPlaylistItemData(playlistData[index]) 
  }, [playlistData, index]
  )

  useLayoutEffect(() => {
    setTitleText(playlistItemData?.name || 'Untitled Video')
  }, [playlistItemData]
  )

  // Make focused position Add-Button visible
  let addButtonClassnameBottom = (focusPosition == playlistPosition ? "visible " : "invisible ") + " group-hover:visible left-1/2 top-full -translate-x-1/2 -translate-y-1/2"

  return (
    <>
      <li id="PlaylistItem" className={buildItemclassname(playlistItemData, playlistPosition)} value={playlistPosition}
        onTouchStart={(event) => switchPlaylistItem_(event)}
        onClick={(event) => switchPlaylistItem_(event)}
        onKeyDown={() => handleKeyDown_()}>
        <div id="TopHalf" className="group h-[5vh] w-full z-10 block">
          <a onClick={(event) => { changeToRecommMode(event, playlistPosition, user, personas) }} >
            <Icon {...props}  id='vjs-playlist-item-buttons-add-icon-top' shape="add" circle={true} circleFillClass="successColor" shapeFillClass="successContent" shapeStrokeClass="neutralColor"
              className="invisible group-hover:visible -translate-x-1/2 -translate-y-1/2  left-1/2" ></Icon>
          </a>
          <a onClick={(event) => deleteItem(event, props)}>
            <Icon {...props}  id='vjs-playlist-item-buttons-add-icon-delete' shape="delete" circle={true} circleFillClass="errorColor" shapeFillClass="errorContent" shapeStrokeClass="neutralColor"
              className="invisible group-hover:visible left-1/2 translate-y-[50%]" ></Icon>
          </a>
          <div id="titleContainer" className="absolute bottom-1/2 w-full translate-x-[5%] translate-y-[50%]">
            <cite className="textClassname" title={titleText}>{titleText}</cite>
          </div>
        </div>
        <div id="BottomHalf" className="group h-[5vh] w-full z-10 block">
          <a onClick={(event) => { changeToRecommMode(event, nextPlaylistPosition, user, personas) }}  >
            <Icon {...props} id="vjs-playlist-item-buttons-add-icon-bottom" shape="add" circle={true} circleFillClass="successColor" shapeFillClass="successContent" shapeStrokeClass="neutralColor"
              className={addButtonClassnameBottom}></Icon>
          </a>
          <a onClick={(event) => deleteItem(event)} >
            <Icon {...props}  id="vjs-playlist-item-buttons-delete-icon-bottom" shape="delete" circle={true} circleFillClass="errorColor" shapeFillClass="errorContent" shapeStrokeClass="neutralColor"
              className="invisible group-hover:visible left-1/2 bottom-1/2"></Icon>
          </a>
        </div>
      </li>
    </>
  )

  
  function deleteItem(event) {
    if (event.target && (event.target.ownerSVGElement?.id.startsWith('vjs-playlist-item-buttons'))) {
      event.preventDefault();
      sendDelete({ variables: getDeleteVariables(playlistName, playlistPosition) });
      switchPlaylistItem_(event, "next")
      setFocusPosition(playlistPosition-1)
    }
  }

  function buildItemclassname(playlistItem, position) {
    let bgClassname = (playlistItem && position % 2 == 0) ? "bg-primary " : "bg-secondary "
    let textClassname = (playlistItem && position % 2 == 0) ? "text-primary-content " : "text-secondary-content "
    return (bgClassname + textClassname + ' rounded w-full block relative cursor-pointer overflow-visible')
  }


  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function handleKeyDown_(event) {
    // keycode 13 is <Enter>
    // keycode 32 is <Space>
    if (event.which === 13 || event.which === 32) {
      switchPlaylistItem_();
    }
  }

  function switchPlaylistItem_(event, next) {
    if (event.target && !event.target.ownerSVGElement?.id.startsWith('vjs-playlist-item-buttons')) {
      setViewMode("view");
      setFocusPosition(index+1)
      videojs.getPlayer("nextPlaylistItem").playlist.currentItem(index)
    }
  }
}

