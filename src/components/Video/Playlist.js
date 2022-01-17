import { getPlaylistCookie, createPlaylistCookie } from '../Cookies/PlaylistCookies';

export function findPlaylistNode(session) {
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
  let elements = listData.data?.playlists[0]?.elements;
  let playlist = []
  if (elements !== undefined) {
    for (const element of elements) {
      playlist.push({
        name: element.title,
        sources: [
          { src: 'https://www.youtube.com/watch?v=' + element.youtubeid, type: 'video/youtube' },
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

