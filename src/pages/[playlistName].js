import { React, useCallback, useEffect, useState } from 'react';
import VideoArea from '../components/Video/VideoArea';
import { useQuery, useManualQuery, useMutation } from 'graphql-hooks'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Playlist, { generatePlaylistName, findPlaylistName, createPlaylist } from "../components/Video/Playlist";
import ListContents from '../components/ListContents/ListContents';
import checkViewmode from '../components/Session/Rights/viewRights';
import checkEditmode from '../components/Session/Rights/editRights';
import { recommQuery, getRecommVariables, listQuery, getListVariables, addQuery, deleteQuery, getDeleteVariables, saveQuery, saveVariables } from '../lib/gqlqueries';


export default function Walk() {
  // use Session if it exists
  const { data: session, status } = useSession();

  // get dynamic URL parameters to initialize View and Edit Mode -> Recheck after Playlistdata is loaded, position is not rechecked
  const router = useRouter();

  let { playlistName: initialPlaylistName, pos, view, edit } = router.query;
  const [viewMode, setViewMode] = useState(view || "view");
  const [editMode, setEditMode] = useState(edit || "true");
  const [position, setPosition] = useState(pos || 1);
  const [playlistName, setPlaylistName] = useState(initialPlaylistName || generatePlaylistName);


  // prepare function to load recommendations
  let [getRecommData, { loading: recommReloading, error: recommError, data: recommData }] = useManualQuery(recommQuery);
  const [sendAdd, { data: addData, loading: addLoading, error: addError }] = useMutation(addQuery);
  const [sendDelete, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(deleteQuery);
  const [save, { data: saveData, loading: saveLoading, error: saveError }] = useMutation(saveQuery);
  // prepare initial playlist load, skip if for example the code is run serverside. 
  // TODO: Check whether skip is necessary, since the Node is a required URL parameter 
  const { loading: listLoading, error: listError, data: listData, refetch: listRefetch } = useQuery(listQuery, {
    skip: playlistName == null,
    variables: getListVariables(playlistName),
    refetchAfterMutations: [
      {
        mutation: addQuery
      }, {
        mutation: deleteQuery
      }
    ]
  });


  // give UI functions to buttons
  const handleButtonClick = event => {
    if (event.target && (event.target.classList.contains('vjs-playlist-item-buttons-add-icon-previous') || event.target.classList.contains('vjs-playlist-item-buttons-add-icon-current'))) {
      setViewMode("recomm");
      setPosition(parseInt(event.target.getAttribute("position")));
      getRecommData({ variables: getRecommVariables(listData) });
    }
    if (event.target && (event.target.classList.contains('vjs-playlist-item-buttons-delete-icon-previous') || event.target.classList.contains('vjs-playlist-item-buttons-delete-icon-current'))) {
      //TODO: make int in UI plugin
      sendDelete({ variables: getDeleteVariables(playlistName, parseInt(event.target.getAttribute("position"))) });
      listRefetch();
    };
  }
  useEffect(() => {
    let elements = document.getElementsByClassName("vjs-playlist-item-buttons-add-icon-current "+position);
    if (elements.length!==0){
      elements[0].style.display = "block"
    }
    document.addEventListener('click', handleButtonClick);
    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
  }, [handleButtonClick,position]);


  if (listLoading || listData?.loading || recommReloading || addLoading || deleteLoading) return 'Loading...';
  if (listError || recommError || addError || deleteError || listLoading == undefined) return `Error! `;

  // find whether editing/viewing is allowed only for UI, re-check for editing upon call of graphql API
  // TODO: This should only run serverside, rightsmanagement not secure clientside? maybe serverside props, can query there?
  if (editMode !== checkEditmode(session, listData, editMode)) {
    setEditMode(checkEditmode(session, listData, editMode));
  }
  /*
  if (viewMode !== checkViewmode(session, listData, viewMode)) {
    setViewMode(checkViewmode(session, listData, viewMode));
  }
  */

  let playlist = [];
  if (playlistName !== null && playlistName !== undefined) {
    playlist = createPlaylist(listData);
  }

  return (
    <>
      {(viewMode == "recomm") && <ListContents listcontentsdata={recommData} addFunction={sendAdd} playlistName={playlistName} position={position} refetchFunction={listRefetch} />}
      <Playlist playlist={playlist} setPlaylistName={setPlaylistName} session={session} />
      <VideoArea playlist={playlist} />
    </>)
}

export async function getStaticProps({ params }) {
  return { props: { params, fallback: false } }
}



export async function getStaticPaths() {
  return {
    paths: [
      { params: { playlistName: 'aseftalangi@gmail.com' } }
    ],
    fallback: false // false or 'blocking'
  };
}

export function startNewPlaylist(playlist, setPlaylistName, session) {
  let newPlaylistname = generatePlaylistName();
  setUrl(newPlaylistname)
  setPlaylistName(newPlaylistname)
  session.setPlaylistName(newPlaylistname);
  playlist = []
}
