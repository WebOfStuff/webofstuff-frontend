
import React, { useState } from "react";

const PlaylistValueContext = React.createContext()
const PlaylistSetterContext = React.createContext()


export function PlaylistProvider(props) {
  let { pos, view, edit } = props.query;
  const [viewMode, setViewMode] = useState("initial");
  const [editMode, setEditMode] = useState(edit || "true");
  const [focusPosition, setFocusPosition] = useState(pos || 0);
  const [playlistName, setPlaylistName] = useState(props.initialPlaylistName);
  const [playlistData, setPlaylistData] = useState([]);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context

  let values = {
    viewMode: viewMode,
    editMode: editMode,
    focusPosition: focusPosition,
    playlistName: playlistName,
    playlistData: playlistData ,
  }

  let setters = {
    setViewMode: setViewMode ,
    setEditMode: setEditMode ,
    setFocusPosition: setFocusPosition,
    setPlaylistName: setPlaylistName,
    setPlaylistData: setPlaylistData,
  }
  return (
    <>
      <PlaylistValueContext.Provider value={values}>
        <PlaylistSetterContext.Provider value={setters}>
          {props.children}
        </PlaylistSetterContext.Provider>
      </PlaylistValueContext.Provider>
    </>
  )
}

export function usePlaylistValues() {
  const context = React.useContext(PlaylistValueContext)
  if (context === undefined) {
    throw new Error('usePlaylistValues must be used within a PlaylistValueProvider')
  }
  return context
}
export function usePlaylistSetters() {
  const context = React.useContext(PlaylistSetterContext)
  if (context === undefined) {
    throw new Error('usePlaylistSetter must be used within a PlaylistSetterProvider')
  }
  return context
}