import videojs from "video.js";
import 'videojs-playlist';
import Button from "../Base/Button";
import React, { useLayoutEffect } from 'react';
import { useMutation } from 'graphql-hooks'
import { addQuery, deleteQuery, getDeleteVariables } from "../../lib/gqlqueries"


export function PlaylistItem(props) {
  const [sendDelete, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(deleteQuery);
  let {specialLocation, playlistItem, playlistName, position, showDescription, playOnSelect, changeToRecommMode, playlistData, focusPosition } = props;
  let itemClassname = buildItemclassname(playlistItem, position)
  let itemButtonsClassname = "group h-[5vh] w-full z-10 block";

  let addButtonVisible = "invisible ";
  if (focusPosition == position) {
    addButtonVisible = "visible "
  }

  let addButtonClassnameBottom = "invisible group-hover:visible h-[5vh] w-[5vh] z-20 relative left-1/2 top-full -translate-x-1/2 -translate-y-1/2";
  let addButtonClassnameTop = addButtonVisible+"group-hover:visible h-[5vh] w-[5vh] z-20 relative left-1/2 -translate-x-1/2 -translate-y-1/2";
  let deleteButtonClassnameTop = "invisible group-hover:visible h-[5vh] w-[5vh] z-20 left-3/4 relative -translate-y-[150%]";
  let deleteButtonClassnameBottom = "invisible group-hover:visible  h-[5vh] w-[5vh] z-20 left-3/4 relative -translate-y-[50%]";
  let time, duration, titleText, descriptionText, nowPlayingText, upNext;
  let nextposition = position + 1;

 
  
  if (typeof playlistItem !== 'undefined') {
    if (playlistItem.duration) {
      time = videojs.formatTime(playlistItem.duration);
      duration = 'PT0H0M' + playlistItem.duration + 'S'
    }
    nowPlayingText = '';
    //TODO: Lokalisierung
    titleText = playlistItem.name || 'Untitled Video';
    upNext = "Up Next"
    descriptionText = playlistItem.description || '';
  }

  if (specialLocation == undefined) {
    return (
      <>
        <li id="PlaylistItem" className={itemClassname} position={position} onTouchStart={(playerModule) => switchPlaylistItem_()} onClick={(playerModule) => switchPlaylistItem_()} onKeyDown={() => handleKeyDown_()}>
          <div id="FirstHalf" className={itemButtonsClassname}>
            <Button className={addButtonClassnameTop} src="/assets/add.svg" position={position} onClick={() => changeToRecommMode(position, playlistData)} />
            <Button className={deleteButtonClassnameBottom} position={position} src="/assets/delete.svg" onClick={() => deleteItem()} />
            <div className="absolute bottom-1/2 w-full translate-x-[5%] translate-y-[50%]">
              <span className="textClassname" title={nowPlayingText}>{nowPlayingText}</span>
              <cite className="textClassname" title={titleText}>{titleText}</cite>
            </div>
            {playlistItem.duration && <time className='vjs-playlist-duration' datetime={duration}>{time}</time>}
            {showDescription && <div className='vjs-playlist-description' title={descriptionText}>{descriptionText}</div>}
          </div>
          <div id="SecondHalf" className={itemButtonsClassname}>
            <Button className={addButtonClassnameBottom} src="/assets/add.svg" position={nextposition} onClick={() => changeToRecommMode(nextposition, playlistData)} />
            <Button className={deleteButtonClassnameTop} position={position} src="/assets/delete.svg" onClick={() => deleteItem()} />
          </div>
        </li>
      </>
    )
  } else {
    return (
      <>
        <li className='buffer' onClick={() => changeToRecommMode(position, playlistData)} >
          <div className={itemButtonsClassname}>
            <Button className={specialLocation == "last" ? addButtonClassnameTop : addButtonClassnameBottom} src="/assets/add.svg" position={position} onClick={() => changeToRecommMode(position, playlistData)} />
          </div>
        </li>
      </>
    )
  }


  function deleteItem() {
    sendDelete({ variables: getDeleteVariables(playlistName, position) });
    //listRefetch();
  }

  function buildItemclassname(playlistItem, position) {
    let bgClassname = (playlistItem && position % 2 == 1) ? "bg-primary " : "bg-secondary "
    let textClassname = (playlistItem && position % 2 == 1) ? "text-primary-content " : "text-secondary-content "
    return (bgClassname + textClassname + 'w-full block relative cursor-pointer overflow-visible')
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
    videojs.getPlayer("playerName").playlist.currentItem(position - 1);
  }
}
