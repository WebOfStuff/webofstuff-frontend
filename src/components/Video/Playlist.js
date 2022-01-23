import { getPlaylistCookie, createPlaylistCookie } from '../Session/PlaylistCookies';
import startNewPlaylist from '../../pages/[playlistName]';

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
      })
    }
  }
  return playlist
}

function Playlist(props) {
  let playlist=props.playlist;
  return (
    <>
      <div className="formdiv w-1/6">
        <div className="form-control">
          <div className="flex space-x-2">
            <input type="text" placeholder="Title" className="w-full input input-primary input-bordered" 
            onClick={startNewPlaylist(playlist, props.setPlaylistName, props.session)}/>
            <button className="btn btn-primary ">x</button>
            <button className="btn btn-tertiary">SAVE</button>
          </div>
          <div className="divider">

          </div>
        </div>
        <div id="PlaylistWrapper" className="vjs-playlist" />
      </div>
    </>
  );
};

export default Playlist;


