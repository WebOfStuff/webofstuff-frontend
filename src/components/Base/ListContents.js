import React from 'react';
import { addQuery, getAddVariables } from '../../lib/gqlqueries';
import { useMutation } from 'graphql-hooks'
import Button from '../Base/Button';
import Box from '../Base/Box';

export default function ListContents(props) {
  const [sendAdd, { data: addData, loading: addLoading, error: addError }] = useMutation(addQuery);
  let { playlistName, focusPosition, listcontentsdata } = props
  let contents = listcontentsdata.contents;
  let algorithm = "normal"
  let listItems;
  if (contents !== undefined) {
    listItems = contents.map((item, index) =>
      <>
        <tr key={item.id}>
          <th>
            <Button className="h-[5vh] w-[5vh] z-20 relative left-1/6" src="/assets/add.svg" value={item.id} onClick={() => addItem(playlistName, focusPosition, item.id)}></Button>
          </th>
          <td>{item.title}</td>
        </tr>
      </>
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
      <Box>
        <div id="recomm" className="overflow-x-auto">
          <table id="recomm-item" algorithm={algorithm} className="table table-zebra w-full">
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
      </Box>
    </>

  )

  function addItem(playlistName, position, id) {
    let addVariables = getAddVariables(playlistName, position, id);
    sendAdd({ variables: addVariables })
  }

}