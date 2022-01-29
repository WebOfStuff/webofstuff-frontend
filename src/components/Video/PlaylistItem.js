import videojs from "video.js";
import 'videojs-playlist';
import Button from "../Base/Button";
import React from 'react';
import { useMutation } from 'graphql-hooks'
import { addQuery, deleteQuery, getDeleteVariables } from "../../lib/gqlqueries"


export function PlaylistItem(props) {
  const [sendDelete, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(deleteQuery);
  let player = videojs.getPlayer("player")
  let { specialLocation, playlistItem, playlistName, position, showDescription, playOnSelect, changeToRecommMode, playlistData } = props;
  let itemButtonsClassname = "vjs-playlist-item-button";
  let addButtonClassnameBottom = "vjs-playlist-item-buttons-add-icon-bottom";
  let addButtonClassnameTop = "vjs-playlist-item-buttons-add-icon-top";
  let deleteButtonClassnameTop = "vjs-playlist-item-buttons-delete-icon-top";
  let deleteButtonClassnameBottom = "vjs-playlist-item-buttons-delete-icon-bottom";
  let time, duration, titleText, descriptionText, nowPlayingText, upNext;
  let bgColor = getRandomColor();
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
  } else {
    //TODO: Use backgroundcolor
    bgColor = "#ffffff"
  }

  if (specialLocation == undefined) {
    return (
      <>
        <li className='vjs-playlist-item' position={position} style={{ backgroundColor: bgColor }} onTouchStart={(event) => switchPlaylistItem_(position)} onClick={(event) => switchPlaylistItem_(position)} onKeyDown={() => handleKeyDown_()}>
          <div className={itemButtonsClassname}>
            <Button className={addButtonClassnameTop} src="/assets/add.svg" position={position} onClick={() => changeToRecommMode(position, playlistData)} />
            <Button className={deleteButtonClassnameBottom} position={position} src="/assets/delete.svg" onClick={() => deleteItem()} />
            <div className="vjs-playlist-title-container">
              <span className="vjs-playlist-now-playing-text" title={nowPlayingText}>{nowPlayingText}</span>
              <span className="vjs-up-next-text" title={upNext}>{upNext}</span>
              <cite className="vjs-playlist-name" title={titleText}>{titleText}</cite>
            </div>
            {playlistItem.duration && <time className='vjs-playlist-duration' datetime={duration}>{time}</time>}
            {showDescription && <div className='vjs-playlist-description' title={descriptionText}>{descriptionText}</div>}
          </div>
          <div className={itemButtonsClassname}>
            <Button className={addButtonClassnameBottom}  src="/assets/add.svg" position={nextposition} onClick={() => changeToRecommMode(nextposition, playlistData)} />
            <Button className={deleteButtonClassnameTop} position={position} src="/assets/delete.svg" onClick={() => deleteItem()} />
          </div>
        </li>
      </>
    )
  } else {
    return (
      <>
        <li className='buffer' style={{ backgroundColor: bgColor }} onClick={() => changeToRecommMode(position, playlistData)} >
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

  function switchPlaylistItem_(event) {
    //  setViewMode("add");
    player.playlist.currentItem(position - 1);
    if (playOnSelect) {
      player.play();
    }
  }
}
