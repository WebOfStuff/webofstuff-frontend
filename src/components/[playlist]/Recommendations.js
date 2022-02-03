import React from 'react';
import { recommQuery, getRecommVariables, addQuery, getAddVariables } from '../../lib/gqlqueries';
import { useMutation, useQuery } from 'graphql-hooks'
import Icon from '../Base/Icon';
import Box from '../Base/Box';


export default function Recommendations(props) {
  let { recommData, playlistData, playlistName, focusPosition, setFocusPosition } = props
  const [sendAdd, { data: addData, loading: addLoading, error: addError }] = useMutation(addQuery);
  if (recommData !== undefined) {
    let contents = recommData.contents;
    let algorithm = "normal"
    let listItems;

    listItems = contents.map((item, index) =>
      <>
        <tr key={item.id}>
          <th>
            <a onClick={(event) => addItem(playlistName, focusPosition, item.id)} className="">
              <Icon shape="add" circle={true} circleClass="success" strokeClass="neutral" className="h-[5vh] w-[5vh] z-20 relative left-1/4 stroke-current inline-block"></Icon>
            </a>
          </th>
          <td>{item.name}</td>
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
    setFocusPosition(focusPosition)
  }

}

