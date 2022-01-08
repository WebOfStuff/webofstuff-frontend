import React from 'react';
import videojs from 'video.js';
import PlayerPlaylist from './PlayerPlaylist';
import 'videojs-youtube';
import 'videojs-playlist';
import 'videojs-playlist-ui';
import { useEffect } from 'react';

export default function VideoArea2(props) {
  const [videoEl, setVideoEl] = useState(null)
  const onVideo = useCallback((el) => {
    setVideoEl(el)
  }, [])

  useEffect(() => {
    const playlist = props.playlist;
    const player = videojs(videoEl, props)
    player.on('loadstart', () => {
      player.playlist(playlist, currentVideo);
      player.playlistUi();
    });

    return () => {
      if (this.player) {
        this.player.dispose();
      }
    }
  }, [props, videoEl]);

  return (
    <div id="PlayerContainer" className="flex">
      <div id="VideoWrapper" className="flex-1 w-5/6" >
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
