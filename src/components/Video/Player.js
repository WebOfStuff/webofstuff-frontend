import React from 'react';
import videojs, { player } from 'video.js';
import 'videojs-youtube';
import 'videojs-playlist';
import { useEffect, useState, useCallback } from 'react';


export default function Player(props) {
  let { playlistData, playerName, className, position } = props;
  let playerContainerId = playerName + "Container"
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el)
  }, [])
  const [gotPlayer, setGotPlayer] = useState(false)
  const [positionPlaying, setPositionPlaying ] = useState(position)

  useEffect(() => {
    if (videoEl == null) return
    let player = videojs(videoEl, props)

    player.autoplay(false);
    setGotPlayer(true);

    return () => {
      if (player && player.isDisposed == false) {
        player.dispose();
        setGotPlayer(false);
      }
    }
  }, [props, videoEl]);


  useEffect(() => {
    if (gotPlayer) {
      let index = positionPlaying - 1
      player = videojs.getPlayer(playerName)
      player.playlist(playlistData, index);
    }
  }, [gotPlayer, playlistData, position, playerName, positionPlaying]);


  return (
    <>
      <div id={playerContainerId} className={className}>
        <video
          ref={onVideo}
          controls
          id={playerName}
          preload="auto"
          crossOrigin="anonymous"
          className="video-js vjs-fluid vjs-big-play-centered"
          playsInline
        />
      </div>
    </>
  )
}
