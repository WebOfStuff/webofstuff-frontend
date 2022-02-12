import { createPlaylistCookie, getPlaylistCookie } from './PlaylistCookies';
import { PlaylistItem } from "./PlaylistItem";
import { PlaylistItemBuffer } from "./PlaylistItemBuffer";
import { usePlaylistValues, usePlaylistSetters } from './PlaylistContext';

export function Playlist(props) {
  const { playlistName,  playlistData } = usePlaylistValues();
   const { setPlaylistName } = usePlaylistSetters();
  let { className, getRecommData} = props

  let listItems;
  if (playlistData !== undefined) {
    listItems = playlistData.map((item, index) => {
      let itemKey = item.id + index.toString();
      return (
        <PlaylistItem key={itemKey} playlistPosition={index + 1}  getRecommData={getRecommData}/>
      )
    });
  }

  return (
    <>
      <div id="playlistWrapper" className={className}>
        <form onSubmit={(event) => moveToDifferentPlaylist(event, setPlaylistName)}  className="form-control">
          <div className="flex space-x-2">
            <input type="text" placeholder={playlistName} className="w-full input input-primary" />
            <button className="btn btn-tertiary">Reload</button>
          </div>
        </form>
        <ol id="Playlist">
          <PlaylistItemBuffer key="first" specialLocation="first" playlistPosition="1"  getRecommData={getRecommData} />
          {listItems}
          <PlaylistItemBuffer key="last" specialLocation="last" playlistPosition={playlistData.length + 1}  getRecommData={getRecommData}/>
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
    playlistNode = session?.user?.userPersonas[session?.user?.currentPersona]?.persona.currentPlaylist
  } else if (cookied) {
    playlistNode = playlistCookie;
  } else {
    playlistNode = generatePlaylistName();
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

export function generatePlaylistName() {
  let randomNumForAlg = Math.floor(Math.random() * algorithms.length);
  let algorithm = algorithms[randomNumForAlg]
  let wordTypesInAlg = algorithm.split(" ");
  let playlistName = ""
  let wordcounter = 0
  for (let wordTypeCounter in wordTypesInAlg) {
    let wordTypeForWord = wordTypesInAlg[wordTypeCounter];
    let possibleWords = wordTypes[wordTypeForWord]
    let randomNumForWord = Math.floor(Math.random() * possibleWords.length);
    let word = possibleWords[randomNumForWord]
    if (wordcounter == 0) {
      playlistName += word
    } else {
      playlistName += "" + word.toLowerCase()
    }
    wordcounter++
  }
  return playlistName;
}

const algorithms = [
  "noun connector noun",
  "adjective noun",
  "noun connector adjective",
  "adjective connector adjective"
]

const adjectives = [
  "Rocking",
  "Lovely",
  "Fun",
  "Happy",
  "Sad"
]

const connectors = [
  "and",
  "but not",
]

const nouns = [
  "Rock",
  "R'n'B",
  "Dubstep",
  "Funk"
]

const wordTypes = {
  adjective: adjectives,
  connector: connectors,
  noun: nouns,
}

const moveToDifferentPlaylist = async (event, setPlaylistName) => {
  event.preventDefault();
  let newPlaylistName = generatePlaylistName()
  setPlaylistName(newPlaylistName)
  location.href = "/"+newPlaylistName
}
