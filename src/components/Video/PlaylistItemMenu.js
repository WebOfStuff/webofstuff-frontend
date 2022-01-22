import PlaylistItemButtons from "./PlaylistItemButtons";
import PlaylistItem from "./PlaylistItem";
import AdOverlay from "./AdOverlay";
import videojs from "video.js";

export function PlaylistItemMenu(props)  {

  constructor(props) {
    super(props);
    
    



  }

  const player = videojs.getPlayer();
  const playlist = player?.playlist() || [];
  let options = props.options;
  options.horizontal = true;
  options.supportsCssPointerEvents = true;
  let list = this.el_.querySelector('.vjs-playlist-item-list');
  let overlay = this.el_.querySelector('.vjs-playlist-ad-overlay');
  let classes = [];

  if (!player.playlist) {
    throw new Error('videojs-playlist is required for the playlist component');
  }

  let orientation
  if (options.horizontal) {
    orientation = 'vjs-playlist-horizontal'
  } else {
    orientation = 'vjs-playlist-vertical'
  }
  classes.push(orientation)


  // If CSS pointer events aren't supported, we have to prevent
  // clicking on playlist items during ads with slightly more
  // invasive techniques. Details in the stylesheet.
  if (options.supportsCssPointerEvents) {
    classes.push('vjs-csspointerevents');
  }

  if (!videojs.browser.TOUCH_ENABLED) {
    classes.push('vjs-mouse');
  }

  //TODO:
  this.on(player, ['loadstart', 'playlistchange', 'playlistsorted'], (event) => {
    this.update();
  });

  // Keep track of whether an ad is playing so that the menu
  // appearance can be adapted appropriately
  this.on(player, 'adstart', () => {
    this.addClass('vjs-ad-playing');
  });

  this.on(player, 'adend', () => {
    this.removeClass('vjs-ad-playing');
  });

  this.on('dispose', () => {
    this.empty_();
    player.playlistMenu = null;
  });

  this.on(player, 'dispose', () => {
    this.dispose();
  });
}








if (playlist !== undefined) {
  listItems = playlist.map((item, index) => {
    let nextIndex = index + 1;

    return (
      <>
        <PlaylistItem player={player} playlistItem={{ item: playlist[i] }} settings={options} playlistIndex={index}></PlaylistItem>
        <PlaylistItemButtons player={player} playlistindex={nextIndex} playlistlength={playlist.length} ></PlaylistItemButtons>






        <tr key={item.title}>
          <th>
            <button className="btn btn-circle" value={item.id} onClick={() => {
              let addVariables = getAddVariables(playlistName, position, item.id);
              sendAdd({ variables: addVariables })
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </th>
          <td>{item.title}</td>
        </tr>
      </>
    );

  })
};

return (
  <ol>
    <PlaylistItemButtons></PlaylistItemButtons>
    {listItems}
    <AdOverlay></AdOverlay>

  </ol>
)
}
function update() {
  // replace the playlist items being displayed, if necessary
  const playlist = this.player_.playlist();

  if (this.items.length !== playlist.length) {
    // if the menu is currently empty or the state is obviously out
    // of date, rebuild everything.
    this.createPlaylist_();
    return;
  }

  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].item !== playlist[i]) {
      // if any of the playlist items have changed, rebuild the
      // entire playlist
      this.createPlaylist_();
      return;
    }
  }

  // the playlist itself is unchanged so just update the selection
  const currentItem = this.player_.playlist.currentItem();

  for (let i = 0; i < this.items.length; i++) {
    const item = this.items[i];

    if (i === currentItem) {
      addSelectedClass(item);
      if (document.activeElement !== item.el()) {
        dom.addClass(item.thumbnail, 'vjs-playlist-now-playing');
      }
      notUpNext(item);
    } else if (i === currentItem + 1) {
      removeSelectedClass(item);
      upNext(item);
    } else {
      removeSelectedClass(item);
      notUpNext(item);
    }
  }
}
}

/**
* Returns a boolean indicating whether an element has child elements.
*
* Note that this is distinct from whether it has child _nodes_.
*
* @param  {HTMLElement} el
*         A DOM element.
*
* @return {boolean}
*         Whether the element has child elements.
*/
const hasChildEls = (el) => {
  for (let i = 0; i < el.childNodes.length; i++) {
    if (dom.isEl(el.childNodes[i])) {
      return true;
    }
  }
  return false;
};