import React from 'react';
import TableRow from './TableRow'

import Box from '../Base/Box';

export default function Table(props) {

  let { data, dataType, fields, tableId, clickFunctions, clickParameterSets } = props

  let headerRow = fields.map(function (field) {
  let [type, name] = field.split("_")
  return (
      <td key={field+"header"}>
        {(type == "icon") ? "" : field}
      </td>
  )})

  //data = shuffle(data[dataType])
  

  let listItems = data.filter((row) => row.shownRow = true).slice(0, 5).map((row) =>
      <TableRow fields={fields} row={row} clickFunctions={clickFunctions} clickParameterSets= {clickParameterSets} dataType={dataType} />
  );



  return (
    <>
      <Box>
        <div id={tableId} className="overflow-x-auto">
          <table id={dataType + "_" + tableId} className="table table-zebra w-full">
            <thead>
              <tr>
                {headerRow}
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

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


