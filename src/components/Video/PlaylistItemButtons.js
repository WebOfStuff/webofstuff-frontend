import PlaylistItemButtonSet from "./PlaylistItemButtonSet";

export default function PlaylistItemButtons(props) {
  const index = props.index;
  const position = index+1;
  const playlistlength = props.length;

  let listClassname ="vjs-playlist-item-buttons"
  let specialLocation  = new Array(2);

  if (playlistlength === 0) {
    specialLocation = ['first','first'];
  } else if (index === 0) {
    specialLocation = ['first',''];
  } else if (index < playlistlength) {
    specialLocation = ['',''];
  } else {
    specialLocation = ['','last'];
  }

  return (
    <>
      <li className={listClassname} tabIndex="-2">
        <PlaylistItemButtonSet previousOrCurrent = 'previous' specialLocation = {specialLocation[0]} position = {position}></PlaylistItemButtonSet>
        <PlaylistItemButtonSet previousOrCurrent = 'current' specialLocation = {specialLocation[1]} position = {position}></PlaylistItemButtonSet>
      </li>
    </>
  )
}