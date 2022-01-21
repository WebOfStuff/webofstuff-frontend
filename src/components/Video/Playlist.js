import { getPlaylistCookie, createPlaylistCookie } from '../Session/PlaylistCookies';

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
      })
    }
  }
  return playlist
}

const Playlist = () => {
  return (
    <>
      <div id="PlaylistWrapper" className="vjs-playlist w-1/6" />
    </>
  );
};

export default Playlist;

