import { PlaylistItem } from "./PlaylistItem";
import videojs from "video.js";
import { getPlaylistCookie, createPlaylistCookie } from '../Session/PlaylistCookies';
import startNewPlaylist from '../../pages/[playlistName]';
import { PlaylistItemBuffer } from "./PlaylistItemBuffer";

export function Playlist(props) {
  let { theme, setTheme, playlistName, playlistData, className, getRecommData, focusPosition, setFocusPosition, setViewMode } = props;

  let listItems;
  if (playlistData !== undefined) {
    listItems = playlistData.map((item, index) => {
      let itemKey = item.id + index.toString();
      return (
        <PlaylistItem {...props} key={itemKey} playlistPosition={index + 1} />
      )
    });
  }

  return (
    <>
      <div id="playlistWrapper" className={className}>
        <div className="form-control">
          <div className="flex space-x-2">
            <input type="text" placeholder={playlistName} className="w-full input input-primary" />
            <button className="btn btn-tertiary">Reload</button>
          </div>
        </div>
        <ol id="Playlist">
          <PlaylistItemBuffer {...props} key="first" specialLocation="first" playlistPosition="1" />
          {listItems}
          <PlaylistItemBuffer {...props} key="last" specialLocation="last" playlistPosition={playlistData.length + 1} />
        </ol>
      </div>
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
        name: content.node.name,
        sources: [
          { src: 'https://www.youtube.com/watch?v=' + content.node.youtubeid, type: 'video/youtube' },
        ],
        id: content.node.id,
      })
    }
  }
  return playlist
}
