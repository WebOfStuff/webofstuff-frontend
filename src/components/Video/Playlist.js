import { PlaylistItem } from "./PlaylistItem";
import videojs from "video.js";
import { getPlaylistCookie, createPlaylistCookie } from '../Session/PlaylistCookies';
import startNewPlaylist from '../../pages/[playlistName]';
import { PlaylistItemBuffer } from "./PlaylistItemBuffer";

export function Playlist(props) {

  let { playlistName, playlistData, changeToRecommMode, focusPosition } = props;
  // Komisch, darf nicht in Zeile oben entpackt werden: WeakMap key must be an object, got elem. Vllt muss es Const sein. TODO: Erforschen.
  const playerModule = videojs.getPlayer("player");
  let options = { horizontal: false, supportsCssPointerEvents: true };

  let listItems;
  if (playlistData !== undefined) {
    listItems = playlistData.map((item, index) => {
      let itemKey = item.id+index.toString();
      return (
        <PlaylistItem key={itemKey} playlistName={playlistName} playlistData={playlistData} position={index+1} changeToRecommMode={changeToRecommMode} focusPosition={focusPosition} playOnSelect></PlaylistItem>
      )
    });
  } else {
    listItems = "No Items";
  }

  return (
    <>
      <ol id="Playlist" className="relative p-0">
        <PlaylistItemBuffer key="first" specialLocation="first" position="1" playlistData={playlistData} changeToRecommMode={changeToRecommMode} focusPosition={focusPosition}></PlaylistItemBuffer>
        {listItems}
        <PlaylistItemBuffer key="last" specialLocation="last" position={playlistData.length + 1} playlistData={playlistData} changeToRecommMode={changeToRecommMode} focusPosition={focusPosition}></PlaylistItemBuffer>
      </ol>
    </>
  );
}

export function findPlaylistName(session) {
  let playlistNode;
  let playlistCookie = getPlaylistCookie();
  let cookied = (playlistCookie == null) ? false : true;
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
