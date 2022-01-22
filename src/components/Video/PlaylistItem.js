//https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance


import { videojs, Component as videojsComponent } from "video.js";
import { Component as reactComponent } from "react";

class PlaylistItemVidjs extends videojsComponent {
  constructor(player, playlistindex, playlistlength) {
    const options = { index: playlistindex, length: playlistlength };
    (!props.item) {
      throw new Error('Cannot construct a PlaylistMenuItem without an item option');
    }
    let playlistItem = props.playlistItem;
    let player = props.player;
    let settings = props.settings;
    let playlistIndex = props.playlistIndex;
    super(player, options);
  }


  playlistItem.index = props.playlistIndex;
  playlistItem.showDescription = props.settings.showDescription;


  let item = playlistItem.item;
  let playOnSelect = settings.playOnSelect;

  videojs.emitTapEvents();

  //TODO:
  this.on(['click', 'tap'], this.switchPlaylistItem_);
  this.on('keydown', this.handleKeyDown_);
  return (
    <>
      <li classname='vjs-playlist-item' tabIndex="0">

      </li>

    </>


  );

}


const reactComponent = (reactComponent) => class extends reactComponent {
  constructor(player, playlistindex, playlistlength) {
    const options = { index: playlistindex, length: playlistlength };
    (!props.item) {
      throw new Error('Cannot construct a PlaylistMenuItem without an item option');
    }
    let playlistItem = props.playlistItem;
    let player = props.player;
    let settings = props.settings;
    let playlistIndex = props.playlistIndex;
    super(player, options);
  }






function handleKeyDown_(event) {
  // keycode 13 is <Enter>
  // keycode 32 is <Space>
  if (event.which === 13 || event.which === 32) {
    switchPlaylistItem_();
  }
}

function switchPlaylistItem_(event) {
  this.player_.playlist.currentItem(indexOf(this.player_.playlist(), this.item));
  if (playOnSelect) {
    this.player_.play();
  }
}

function createThumbnail(thumbnail) {



  if (!thumbnail) {
    return (
      <>
        <div className='vjs-playlist-thumbnail vjs-playlist-thumbnail-placeholder'>

        </div>
      </>
    )
  } else {
    return (
      <div>

      </div>
    )
  }


  if (!thumbnail) {
    const placeholder = document.createElement('div');

    placeholder.className = 'vjs-playlist-thumbnail vjs-playlist-thumbnail-placeholder';
    return placeholder;
  }

  const picture = document.createElement('picture');

  picture.className = 'vjs-playlist-thumbnail';

  if (typeof thumbnail === 'string') {
    // simple thumbnails
    const img = document.createElement('img');

    img.src = thumbnail;
    img.alt = '';
    picture.className = 'vjs-playlist-thumbnail-img';
    picture.appendChild(img);
  } else {
    // responsive thumbnails

    // additional variations of a <picture> are specified as
    // <source> elements
    for (let i = 0; i < thumbnail.length - 1; i++) {
      const variant = thumbnail[i];
      const source = document.createElement('source');

      // transfer the properties of each variant onto a <source>
      for (const prop in variant) {
        source[prop] = variant[prop];
      }
      picture.appendChild(source);
    }

    // the default version of a <picture> is specified by an <img>
    const variant = thumbnail[thumbnail.length - 1];
    const img = document.createElement('img');

    img.alt = '';
    for (const prop in variant) {
      img[prop] = variant[prop];
    }
    picture.appendChild(img);
  }
  return picture;
};




createEl() {
  const li = document.createElement('li');
  const item = this.options_.item;
  const showDescription = this.options_.showDescription;

  if (typeof item.data === 'object') {
    const dataKeys = Object.keys(item.data);

    dataKeys.forEach(key => {
      const value = item.data[key];

      li.dataset[key] = value;
    });
  }

  li.className = 'vjs-playlist-item';
  li.setAttribute('tabIndex', 0);

  // Thumbnail image
  this.thumbnail = createThumbnail(item.thumbnail);
  li.appendChild(this.thumbnail);

  // Duration
  if (item.duration) {
    const duration = document.createElement('time');
    const time = videojs.formatTime(item.duration);

    duration.className = 'vjs-playlist-duration';
    duration.setAttribute('datetime', 'PT0H0M' + item.duration + 'S');
    duration.appendChild(document.createTextNode(time));
    li.appendChild(duration);
  }

  // Now playing
  const nowPlayingEl = document.createElement('span');
  // const nowPlayingText = this.localize('Now Playing');
  const nowPlayingText = '';

  nowPlayingEl.className = 'vjs-playlist-now-playing-text';
  nowPlayingEl.appendChild(document.createTextNode(nowPlayingText));
  nowPlayingEl.setAttribute('title', nowPlayingText);
  this.thumbnail.appendChild(nowPlayingEl);

  // Title container contains title and "up next"
  const titleContainerEl = document.createElement('div');

  titleContainerEl.className = 'vjs-playlist-title-container';
  this.thumbnail.appendChild(titleContainerEl);

  // Up next
  const upNextEl = document.createElement('span');
  const upNextText = this.localize('Up Next');

  upNextEl.className = 'vjs-up-next-text';
  upNextEl.appendChild(document.createTextNode(upNextText));
  upNextEl.setAttribute('title', upNextText);
  titleContainerEl.appendChild(upNextEl);

  // Video title
  const titleEl = document.createElement('cite');
  const titleText = item.name || this.localize('Untitled Video');

  titleEl.className = 'vjs-playlist-name';
  titleEl.appendChild(document.createTextNode(titleText));
  titleEl.setAttribute('title', titleText);
  titleContainerEl.appendChild(titleEl);

  // We add thumbnail video description only if specified in playlist options
  if (showDescription) {
    const descriptionEl = document.createElement('div');
    const descriptionText = item.description || '';

    descriptionEl.className = 'vjs-playlist-description';
    descriptionEl.appendChild(document.createTextNode(descriptionText));
    descriptionEl.setAttribute('title', descriptionText);
    titleContainerEl.appendChild(descriptionEl);
  }
  return li;
}
}
