import { PlaylistItem } from "./PlaylistItem";
import videojs from "video.js";
import { getPlaylistCookie, createPlaylistCookie } from '../Session/PlaylistCookies';
import startNewPlaylist from '../../pages/[playlistName]';
import { PlaylistItemBuffer } from "./PlaylistItemBuffer";

export function Playlist(props) {
  let {playlistName, playlistData, className, getRecommData, focusPosition, setFocusPosition, setViewMode } = props;

  let listItems;
  if (playlistData !== undefined) {
    listItems = playlistData.map((item, index) => {
      let itemKey = item.id + index.toString();
      return (
        <PlaylistItem
          key={itemKey}
          playlistName={playlistName}
          playlistData={playlistData}
          playlistPosition={index + 1}
          focusPosition={focusPosition}
          setFocusPosition={setFocusPosition}
          setViewMode={setViewMode}
          getRecommData={getRecommData}
        />
      )
    });
  } 

  return (
    <>
      <ol id="Playlist" className={className}>
        <PlaylistItemBuffer
          key="first"
          specialLocation="first"
          playlistName={playlistName}
          playlistData={playlistData}
          playlistPosition="1"
          getRecommData={getRecommData} 
          focusPosition={focusPosition}
          setFocusPosition={setFocusPosition}
          setViewMode={setViewMode}
          />
        {listItems}
        <PlaylistItemBuffer
          key="last"
          specialLocation="last"
          playlistName={playlistName}
          playlistData={playlistData}
          playlistPosition={playlistData.length + 1} 
          getRecommData={getRecommData} 
          focusPosition={focusPosition}
          setFocusPosition={setFocusPosition}
          setViewMode={setViewMode}
          />
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
