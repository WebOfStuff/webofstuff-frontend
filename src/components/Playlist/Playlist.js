import { createPlaylistCookie, getPlaylistCookie } from './PlaylistCookies';
import { PlaylistItem } from "./PlaylistItem";
import { usePlaylistValues, usePlaylistSetters } from './PlaylistContext';
import createPhrase from '../Base/WordGen/phrasegen';
import Icon from "../Base/Icon";
import { getRecommVariables } from "../../lib/gqlqueries"
import { usePersonas } from '../Personas/PersonaContext';
import { useUser } from '../User/UserContext';
import { useEffect } from 'react';

export function Playlist(props) {
  const { playlistName, playlistData, playlistPosition } = usePlaylistValues();
  const { setPlaylistName } = usePlaylistSetters();
  const { setFocusPosition, setViewMode } = usePlaylistSetters();
  const { user, setUser }= useUser()
  const { personas, setPersonas }= usePersonas()

  let { className, getRecommData } = props
  let itemButtonsClassname = "group h-[5vh] w-full z-10 block";

  let listItems;
  if (playlistData.length > 0) {
    listItems = playlistData.map((item, index) => {
      let itemKey = item.id + index.toString();
      return (
        <PlaylistItem key={itemKey} playlistPosition={index + 1} changeToRecommMode={changeToRecommMode} />
      )
    });
  } else {
    listItems = (
      <li className='buffer' >
        <div className={itemButtonsClassname}
          onClick={(event) => changeToRecommMode(event, 1, user, personas)}>
          <Icon {...props} id = "vjs-playlist-item-buttons" className="-translate-x-1/2 translate-y-1/2  left-1/2" shape="add" circle={true} circleFillClass="successColor" shapeFillClass="successContent" shapeStrokeClass="neutralColor"/>
        </div>
      </li>
      )
  }

  return (
    <>
      <div id="playlistWrapper" className={className}>
        <form onSubmit={(event) => moveToDifferentPlaylist(event, setPlaylistName)} className="form-control">
          <div className="flex space-x-2">
            <input type="text" placeholder={playlistName} className="w-full input placeholder-primary-content" />
            <button className="btn btn-secondary">Reload</button>
          </div>
        </form>
        <ol id="Playlist">
          {listItems}
        </ol>
      </div>
    </>
  );

  function changeToRecommMode(event, position, user, personas) {
    if (event.target && (event.target.ownerSVGElement?.id.startsWith('vjs-playlist-item-buttons'))) {
      event.preventDefault();
      let index = position - 1

      let previousContentId =  playlistData.length > 0?playlistData[index - 1].id:null
      let followingContentId = playlistData.length > 0?playlistData[index].id:null
      let personaId = null;
      if (personas != null) { 
         let personaId =personas[user.currentPersona].id
      }
      let recomm = getRecommData({ variables: getRecommVariables(personaId,playlistName, playlistData, position, previousContentId, followingContentId) })
      setFocusPosition(position);
      setViewMode("recomm");
    }
  }







}

export function findPlaylistName(user, personas) {
  let playlistNode;
  let playlistCookie = getPlaylistCookie();
  let cookied = (playlistCookie == null) ? false : true;
  if (user) {
    playlistNode = personas[user.currentPersona]?.persona.currentPlaylist
  } else if (cookied) {
    playlistNode = playlistCookie;
  } else {
    playlistNode = createPhrase("playlist");
    createPlaylistCookie(playlistNode)
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



const moveToDifferentPlaylist = async (event, setPlaylistName) => {
  event.preventDefault();
  let newPlaylistName = createPhrase("Playlist")
  setPlaylistName(newPlaylistName)
  location.href = "/" + newPlaylistName
}
