import React from 'react';
import { addQuery, getAddVariables } from '../../lib/gqlqueries';
import { useMutation } from 'graphql-hooks'

export default function ListContents(props) {
  const [sendAdd, { data: addData, loading: addLoading, error: addError }] = useMutation(addQuery);
  let { playlistName, position, listcontentsdata } = props
  let contents = listcontentsdata.contents;

  let listItems;
  if (contents !== undefined) {
    listItems = contents.map((item, index) =>
      <tr key={item.id}>
        <th>
          <button className="btn btn-circle" value={item.id} onClick={() => addItem(item.id)}>
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

  function addItem(id) {
    let addVariables = getAddVariables(playlistName, position, id);
    sendAdd({ variables: addVariables })
  }

}