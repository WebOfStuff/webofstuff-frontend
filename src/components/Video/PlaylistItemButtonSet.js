export default function PlaylistItemButtonSet(props) {
  let position = props.position;
  let specialLocation = props.specialLocation;
  let previousOrCurrent = props.previousOrCurrent
  let itemButtonsClassname = "vjs-playlist-item-buttons-div-" + previousOrCurrent
  let addButtonClassname = "vjs-playlist-item-buttons-add-icon-" + previousOrCurrent

  let handleMouseOver, handleMouseOut, createDeleteButton, deletePosition, deleteButtonClassname, handleOnClick;
  if (specialLocation !== 'first' && specialLocation !== 'last') {
    createDeleteButton = true
    handleMouseOver = "this.childNodes[0].style.display = 'inline';"
    handleMouseOut = "this.childNodes[0].style.display = 'none';"
    if (previousOrCurrent === 'previous') { 
      deletePosition = position-1;
      handleOnClick = 'if (event.target !== this) return; this.parentNode.previousSibling.click();';
    } else {
      deletePosition = position;
      handleOnClick = 'if (event.target !== this) return; this.parentNode.nextSibling.click();';
    }
    deleteButtonClassname = 'vjs-playlist-item-buttons-delete-icon-' + previousOrCurrent + ' '+ deletePosition;
  }
  else {
    handleMouseOver = "this.childNodes[0].style.display = 'inline'; this.childNodes[1].style.display = 'inline';"
    handleMouseOut = "this.childNodes[0].style.display = 'none'; this.childNodes[1].style.display = 'none';"
  }

  return (
    <div className={itemButtonsClassname} onMouseOver={handleMouseOver} onClick={handleOnClick}>
      <img className={addButtonClassname} src="/assets/add.svg" position={position}></img>
      {createDeleteButton && <img className={deleteButtonClassname} position={deletePosition}src="/assets/delete.svg" ></img>}
    </div>
  )
} 
