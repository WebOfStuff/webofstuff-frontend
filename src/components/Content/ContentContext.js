
import React, { useState } from "react";

const ContentValueContext = React.createContext()
const ContentSetterContext = React.createContext()


export function ContentProvider(props) {
  let { playlist, view, edit } = props.query;
  const [viewMode, setViewMode] = useState("initial");
  const [editMode, setEditMode] = useState(edit || "true");
  const [contentName, setContentName] = useState(props.initialContentName);
  const [contentData, setContentData] = useState([]);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context

  let values = {
    viewMode: viewMode,
    editMode: editMode,
    contentName: contentName,
    contentData: contentData ,
  }

  let setters = {
    setViewMode: setViewMode ,
    setEditMode: setEditMode ,
    setContentName: setContentName,
    setContentData: setContentData,
  }
  return (
    <>
      <ContentValueContext.Provider value={values}>
        <ContentSetterContext.Provider value={setters}>
          {props.children}
        </ContentSetterContext.Provider>
      </ContentValueContext.Provider>
    </>
  )
}

export function useContentValues() {
  const context = React.useContext(ContentValueContext)
  if (context === undefined) {
    throw new Error('useContentValues must be used within a ContentValueProvider')
  }
  return context
}
export function useContentSetters() {
  const context = React.useContext(ContentSetterContext)
  if (context === undefined) {
    throw new Error('useContentSetter must be used within a ContentSetterProvider')
  }
  return context
}