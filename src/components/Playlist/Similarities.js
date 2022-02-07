import React from 'react';
import { recommQuery, getRecommVariables, addQuery, getAddVariables } from '../../lib/gqlqueries';
import { useMutation, useQuery } from 'graphql-hooks'
import Icon from '../Base/Icon';
import Box from '../Base/Box';


export default function Similarities(props) {
  let { recommData, playlistName, focusPosition, setFocusPosition } = props
  if (recommData !== undefined) {
   let contents = recommData.contents;
  let listItems;
  let algorithm= {};

    listItems = contents.map((item, index) => {
      let labels = item.labels;
      algorithm.id = "Normal"
      return (
        <>
          <tr key={algorithm.id}>
            <th>{item.label.name}</th>
            <td>{item.label.matches}</td>
          </tr>
        </>)
    });

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
}
