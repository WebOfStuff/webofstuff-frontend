import React from 'react';
import videojs from 'video.js';
import 'videojs-youtube';
import 'videojs-playlist';
import { useEffect, useState, useCallback } from 'react';
import {Playlist as PlaylistFunction} from './Playlist';

export default function PlayerWithPlaylist(props) {
  let {playlistData, playlistName, changeToRecommMode} = props;
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
    //player.playlistUi();
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
      <div id="PlayerContainer" className="flex">
        <div id="VideoWrapper" className="flex-1 w-5/6 data-vjs-player" >
          <video
            ref={onVideo}
            controls
            id="player"
            preload="auto"
            crossOrigin="anonymous"
            className="video-js vjs-fluid vjs-big-play-centered"
            playsInline
          />
        </div>
      </div>
      {gotPlayer &&<PlaylistFunction player = {player} playlistData={playlistData} playlistName={playlistName} changeToRecommMode= {changeToRecommMode}/>}
    </>
  );

}
