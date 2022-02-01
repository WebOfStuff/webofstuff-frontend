import videojs from "video.js";
import 'videojs-playlist';
import Button from "../Base/Button";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useMutation } from 'graphql-hooks'
import { addQuery, deleteQuery, getDeleteVariables } from "../../lib/gqlqueries"


export function PlaylistItem(props) {
  const [sendDelete, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(deleteQuery);
  let { playlistData, playlistName, showDescription, playOnSelect, changeToRecommMode, focusPosition } = props;
  let playlistPosition = props.position;
  let index = playlistPosition - 1 
  let nextposition = playlistPosition + 1;

  // Handle the text to be written
  //TODO: Lokalisierung
  let playlistItemData = playlistData[index];
  const [playlistItemState, setPlaylistItemState] = useState(playlistItemData);
  let time, duration;
  if (playlistItemData.duration) {
    time = videojs.formatTime(playlistItemData.duration);
    duration = 'PT0H0M' + playlistItemData.duration + 'S'
  }
  let nowPlayingText = '';
  let titleText = playlistItemData.name || 'Untitled Video';
  let descriptionText = playlistItemData.description || '';
  let upNext = "Up Next"
  useLayoutEffect(() => {
    setPlaylistItemState(playlistItemData)
  }, [playlistItemData]
  )

// Make focused position Add-Button visible
  let addButtonClassnameTop = ((focusPosition == playlistPosition) ? "visible ":"invisible ") + " group-hover:visible left-1/2 -translate-x-1/2 -translate-y-1/2";
  let itemButtonsClassname = "group h-[5vh] w-full z-10 block"

  return (
    <>
      <li id="PlaylistItem" className={buildItemclassname(playlistItemData, playlistPosition)} position={playlistPosition} onTouchStart={(playerModule) => switchPlaylistItem_()} onClick={(playerModule) => switchPlaylistItem_()} onKeyDown={() => handleKeyDown_()}>
        <div id="FirstHalf" className="group h-[5vh] w-full z-10 block">
          <Button className={addButtonClassnameTop} src="/assets/add.svg" position={playlistPosition} onClick={() => changeToRecommMode(playlistPosition, playlistData)} />
          <Button className="invisible group-hover:visible relative left-3/4  -translate-y-[50%]" position={playlistPosition} src="/assets/delete.svg" onClick={() => deleteItem()} />
          <div id="titleContainer" className="absolute bottom-1/2 w-full translate-x-[5%] translate-y-[50%]">
            <span className="textClassname" title={nowPlayingText}>{nowPlayingText}</span>
            <cite className="textClassname" title={titleText}>{titleText}</cite>
          </div>
          {playlistItemData.duration && <time className='vjs-playlist-duration' datetime={duration}>{time}</time>}
          {showDescription && <div className='vjs-playlist-description' title={descriptionText}>{descriptionText}</div>}
        </div>
        <div id="SecondHalf" className="group h-[5vh] w-full z-10 block">
          <Button className="invisible group-hover:visible left-1/2 top-full -translate-x-1/2 -translate-y-1/2" src="/assets/add.svg" position={nextposition} onClick={() => changeToRecommMode(nextposition, playlistData)} />
          <Button className="invisible group-hover:visible left-3/4  -translate-y-[150%]" position={playlistPosition} src="/assets/delete.svg" onClick={() => deleteItem()} />
        </div>
      </li>
    </>
  )


  function deleteItem() {
    sendDelete({ variables: getDeleteVariables(playlistName, playlistPosition) });
    //listRefetch();
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

  function switchPlaylistItem_(playerModule) {
    videojs.getPlayer("playerName").playlist.currentItem(playlistPosition - 1);
  }
}
