import {getPlaylistCookie, createPlaylistCookie} from '../Cookies/PlaylistCookies';

export function findListNodeBySession(session) {
  let playlistNode;
   if (session !== undefined) {
    playlistNode = session.user.email;
  } else {
    playlistNode = null;
  }
  return playlistNode;
}

export function createPlaylist(listData){
  let elements = listData.data?.playlists[0]?.elements;
  let playlist= []
  for (const element of elements) {
     playlist.push({
      name: element.title,
      sources: [
        { src: 'https://www.youtube.com/watch?v='+element.youtubeid, type: 'video/youtube' },
      ],
    })
  }
  return playlist
}

export function findListNode2(cookie) {
  let cookied;
  let playlistNode;
  let playlistCookie = getPlaylistCookie();
  if (playlistCookie ==null){
    cookied = false; 
  } else {
    cookied = true;
  }
  if (status === "authenticated") {
    playlistNode = session.userName;
  } else if (cookied){
     playlistNode = playlistCookie;
  } else {
    createPlaylistCookie();
    playlistNode = playlistCookie;
  }
  return playlistNode;
}