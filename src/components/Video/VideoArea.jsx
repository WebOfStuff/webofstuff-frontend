import React from 'react';
import videojs from 'video.js';
import PlayerPlaylist from './PlayerPlaylist';
import 'videojs-youtube';
import 'videojs-playlist';
import 'videojs-playlist-ui';
import { useEffect,useState, useCallback } from 'react';

export default function VideoArea(props) {
  const [videoEl, setVideoEl] = useState(null)
  const onVideo = useCallback((el) => {
    setVideoEl(el)
  }, [])

  useEffect(() => {
    if (videoEl == null) return
    const playlist = props.playlist;
    const player = videojs(videoEl, props)
    player.playlist(playlist);
    player.playlistUi();


    return () => {
      if (player) {
        player.dispose();
      }
    }
  }, [props, videoEl]);

  return (
    <div id="PlayerContainer" className="flex">
      <div id="VideoWrapper" className="flex-1 w-5/6 data-vjs-player" >
        <video
          ref={onVideo}
          controls
          id="preview-player"
          preload="auto"
          crossOrigin="anonymous"
          className="video-js vjs-fluid vjs-big-play-centered"
          playsInline
        />
      </div>
      <PlayerPlaylist />
    </div>
  );
}
