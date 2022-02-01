import videojs from "video.js";
import 'videojs-playlist';
import Button from "../Base/Button";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useMutation } from 'graphql-hooks'
import { addQuery, deleteQuery, getDeleteVariables } from "../../lib/gqlqueries"


export function PlaylistItemBuffer(props) {
  let { specialLocation, position, changeToRecommMode, focusPosition, playlistData } = props;

  let itemButtonsClassname = "group h-[5vh] w-full z-10 block";
  let addButtonVisible = "invisible ";
  if (focusPosition == position) {
    addButtonVisible = "visible "
  }

  let addButtonClassnameBottom = "invisible group-hover:visible h-[5vh] w-[5vh] z-20 relative left-1/2 top-full -translate-x-1/2 -translate-y-1/2";
  let addButtonClassnameTop = addButtonVisible + "group-hover:visible h-[5vh] w-[5vh] z-20 relative left-1/2 -translate-x-1/2 -translate-y-1/2";

  return (
    <>
      <li className='buffer' >
        <div className={itemButtonsClassname}>
          <Button className={specialLocation == "last" ? addButtonClassnameTop : addButtonClassnameBottom} src="/assets/add.svg" position={position} onClick={() => changeToRecommMode(position, playlistData)} />
        </div>
      </li>
    </>
  )



  function deleteItem() {
    sendDelete({ variables: getDeleteVariables(playlistName, position) });
    //listRefetch();
  }

  function buildItemclassname(playlistItem, position) {
    let bgClassname = (playlistItem && position % 2 == 1) ? "bg-neutral " : "bg-primary "
    let textClassname = (playlistItem && position % 2 == 1) ? "text-neutral-content " : "text-primary-content "
    return (bgClassname + textClassname + ' w-full block relative cursor-pointer overflow-visible')
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
