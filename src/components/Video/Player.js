import React from 'react';
import videojs, { player }  from 'video.js';
import 'videojs-youtube';
import 'videojs-playlist';
import { useEffect, useState, useCallback } from 'react';


export default function Player(props) {
  let {playlistData} = props;
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el)
  }, [])
  const [gotPlayer, setGotPlayer] = useState(false)

  useEffect(() => {
    if (videoEl == null) return
    
    let player = videojs(videoEl, props)
    player.playlist(playlistData);
    player.autoplay(true);
    setGotPlayer(true);

    return () => {
      if (player && player.isDisposed == false) {
        player.dispose();
        setGotPlayer(false);
      }
    }
  }, [props, videoEl]);

  return (
    <>
      <div id="PlayerContainer" className="flex-auto">
          <video
            ref={onVideo}
            controls
            id="playerName"
            preload="auto"
            crossOrigin="anonymous"
            className="video-js vjs-fluid vjs-big-play-centered"
            playsInline
          />
      </div>
    </>
  )
}
