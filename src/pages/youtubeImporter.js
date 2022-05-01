
import { React } from 'react';
import { data } from 'autoprefixer';
import { useMutation } from 'graphql-hooks'
import { importYtPlaylist, getImportVariables } from '../lib/gqlqueries';
import { v4 } from "uuid";

export default function YoutubeImporter () {

  const [sendImport, { data: importData, loading: importLoading, error: importError }] = useMutation(importYtPlaylist);
  const fetchData = async () => {

    const itemsResponse = await fetch("/api/youtube/playlistitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "playlistId": document.getElementById("playlistId").value })
    });

    if (!itemsResponse.ok) {
      throw new Error(`Error: ${itemsResponse.status}`);
    }
    const playlistData = await itemsResponse.json();


    const infoResponse = await fetch("/api/youtube/playlistinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "playlistId": document.getElementById("playlistId").value })
    });

    if (!infoResponse.ok) {
      throw new Error(`Error: ${infoResponse.status}`);
    }
    const playlistinfo = await infoResponse.json();

    const playlistDataString = JSON.stringify(playlistData).replace(/":/g, ':').replace(/{"/g, '{').replace(/,"/g, ',')

    let dataObj = []

    for (let item in playlistData.playlistitems) {
      let itemid = v4()
      dataObj = dataObj.concat({
          "contentId": itemid,
          "videoId": playlistData.playlistitems[item].snippet.resourceId.videoId,
          "title":playlistData.playlistitems[item].snippet.title
        }
      )
    }

    let importVariables = getImportVariables(playlistinfo.playlistinfo.data.items[0].snippet.title, dataObj);
    sendImport({ variables: importVariables })

  };


  return (
    <>
      <div className="form-control">
        <div className="input-group">
          <input id="playlistId" type="text" placeholder="PlaylistId" className="input input-bordered" />
          <button value="Submit" onClick={fetchData} className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
    </>
  )

}



/* 
function importFromYT(playlistId) {

  authenticate();
  loadClient();
  execute(playlistId);
  let x = true;
}
 */


