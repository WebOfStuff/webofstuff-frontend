import React from 'react';
import videojs from 'video.js';
import queryString from 'query-string';
import PlayerPlaylist from './PlayerPlaylist';
import playlist from './playlist';
import 'videojs-youtube';
import 'videojs-playlist';
import 'videojs-playlist-ui';


class VideoArea extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { isPlayerInitialized: false };
  }

  setQueryParam(plItemId) {
    if (!this.props.enableThemeQueryParam) return;
    const params = new URLSearchParams(window.location.search);
    params.set('video', plItemId);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  }

  componentDidMount() {
    
    this.player = videojs(this.videoEl, {}, () => {
        this.player.playlist(playlist, currentVideo);
        this.player.playlistUi();
    });
   
    this.player.on('loadstart', () => {
      const pl = this.player.playlist();
      const plItem = pl[this.player.playlist.currentItem()];
      this.setQueryParam(plItem.id);
    });

    const videoParam = queryString.parse(window.location.search).video;
    let currentVideo;
    if (this.props.enableThemeQueryParam) {
      const index = playlist.findIndex(plItem => plItem.id === videoParam);
      if (index !== -1) currentVideo = index;
    }

    this.setState({ isPlayerInitialized: true });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
          <div id="PlayerContainer" className="flex">
            {/*}  {this.state.isPlayerInitialized && (
                <PlayerControls player={this.player} />
              )}
              */}
              <div id="VideoWrapper" className="flex-1 w-5/6" >
                <video
                  ref={el => {
                    this.videoEl = el;
                  }}
                  controls
                  id="preview-player"
                  preload="auto"
                  crossOrigin="anonymous"
                  className="video-js vjs-fluid vjs-big-play-centered"
                  playsInline
                />
              </div>
              <PlayerPlaylist />
            {/*</div>*/}
          </div>
    );
  }
}

export default VideoArea;