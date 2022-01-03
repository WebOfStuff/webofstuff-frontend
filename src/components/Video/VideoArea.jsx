import React from 'react';
import videojs from 'video.js';
import queryString from 'query-string';
import PlayerPlaylist from './PlayerPlaylist';
import playlistexample from './playlist';
import 'videojs-youtube';
import 'videojs-playlist';
import 'videojs-playlist-ui';


function getPlaylistCookie(){
  var jsId = document.cookie.match(/Playlist=[^;]+/);
  if(jsId != null) {
      if (jsId instanceof Array)
          jsId = jsId[0].substring(9);
      else
          jsId = jsId.substring(9);
  }
  return jsId;
}

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

  findCurrentPlaylist() {
    let sessionStatus = this.props.status;
    let cookied;
    let playlist;
    let playlistCookie = getPlaylistCookie()
    if (playlistCookie ==null){
      cookied = false; 
    } else {
      cookied = true;
    }
    if (sessionStatus === "authenticated") {
      playlist = this.loadPlaylist(this.props.session.userName)
    } else if (cookied){
     // playlist = this.loadPlaylist(playlistCookie)
      playlist = playlistexample;
    } else {
      //playlist = [];
      this.createPlaylistCookie();
      playlist = playlistexample;
    }
    return playlist;
  }

  loadPlaylist(playlistName) {
    return [];
  }

  createPlaylistCookie() {
      const sessionid = self.crypto.randomUUID();
      document.cookie = "Playlist=" + sessionid+";path=/";
  };

  componentDidMount() {
    
    let playlist = this.findCurrentPlaylist();
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