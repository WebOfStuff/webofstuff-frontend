import { PlaylistItem } from "./PlaylistItem";
import videojs from "video.js";
import { getPlaylistCookie, createPlaylistCookie } from '../Session/PlaylistCookies';

export function Playlist(player) {
  const playlistName = player.playlistName;
  const playerModule = player.player;
  const playlistData = player.playlistData;
  const changeToRecommMode = player.changeToRecommMode;
  let options = { horizontal: false, supportsCssPointerEvents: true };
  let wrapperClassnames = findWrapperClassnames(["vjs-playlist w-1/6"]);

  let listItems;
  if (playlistData !== undefined) {
    listItems = playlistData.map((playlistItem, index) => {
      let position = index + 1;
      let itemKey = playlistItem.id;
      return (
        <PlaylistItem key={itemKey} playlistName={playlistName} playlistItem={playlistItem} position={position} changeToRecommMode= {changeToRecommMode} playlistData = {playlistData} playOnSelect></PlaylistItem>
      )
    });
  } else {
    listItems = "No Items";
  }

  return (
    <>
      <div id="PlaylistWrapper" className={wrapperClassnames}>
        <ol className="vjs-playlist-item-list">
          <PlaylistItem key="first" specialLocation="first" position="1" playlistData = {playlistData} changeToRecommMode={changeToRecommMode}></PlaylistItem>
          {listItems}
          <PlaylistItem key="last" specialLocation="last" position={playlistData.length + 1} playlistData = {playlistData} changeToRecommMode={changeToRecommMode}></PlaylistItem>
        </ol>
      </div>
    </>
  );


  function findWrapperClassnames(classes) {
    if (options.horizontal) {
      classes.push('vjs-playlist-horizontal');
    } else {
      classes.push('vjs-playlist-vertical');
    }
    if (options.supportsCssPointerEvents) {
      classes.push('vjs-csspointerevents');
    }
    if (!videojs.browser.TOUCH_ENABLED) {
      classes.push('vjs-mouse');
    }

    videojs.on(playerModule, 'adstart', () => {
      classes.addClass('vjs-ad-playing');
    });

    videojs.on(playerModule, 'adend', () => {
      classes.removeClass('vjs-ad-playing');
    });

    let wrapperClassnames;
    classes.forEach(className => wrapperClassnames += " " + className);
    return wrapperClassnames;
  }
}

export function findPlaylistName(session) {
  let cookied, playlistNode;
  let playlistCookie = getPlaylistCookie();
  if (playlistCookie == null) {
    cookied = false;
  } else {
    cookied = true;
  }
  if (session !== undefined && session !== null) {
    playlistNode = session.user.email;
  } else if (cookied) {
    playlistNode = playlistCookie;
  } else {
    playlistNode = null;
  }
  return playlistNode;
}

export function createPlaylist(listData) {
  let contents = listData?.playlists[0]?.contentsConnection?.edges;
  let playlist = [];
  if (contents !== undefined) {
    for (const content of contents) {
      playlist.push({
        name: content.node.title,
        sources: [
          { src: 'https://www.youtube.com/watch?v=' + content.node.youtubeid, type: 'video/youtube' },
        ],
        id: content.node.id,
      })
    }
  }
  return playlist
}