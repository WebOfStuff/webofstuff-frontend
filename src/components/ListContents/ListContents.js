import React from 'react';
import {getAddVariables}  from '../../lib/gqlqueries';

export default function ListContents(props) {
  let listcontentsdata = props?.listcontentsdata?.contents;
  let listItems;
  let playlistName = props?.playlistName;
  let position = props?.position;
  let sendAdd = props?.addFunction;
  let listRefetch = props?.refetchFunction;
  if (listcontentsdata !== undefined) {
    listItems = listcontentsdata.map((item) =>
      <tr key={item.title}>
        <th>
          <button className="btn btn-circle" value={item.id} onClick={() => {
            let addVariables = getAddVariables(playlistName, position, item.id);
            sendAdd({variables: addVariables})
            listRefetch();
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </th>
        <td>{item.title}</td>
      </tr>
    );

  } else {
    listItems =
      <tr>
        <th>1</th>
        <td>No results.</td>
      </tr>
  }


  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Titel</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </div>
    </>
  )
}