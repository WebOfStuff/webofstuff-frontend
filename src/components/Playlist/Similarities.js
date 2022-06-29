import React from 'react';
import Table from '../Base/Table';

export default function Similarities(props) {

  let { recommData, shownRowLimit } = props
  let simTable;
  let fields = ["criteria", "prevContent", "followingContent"]


  if (recommData !== undefined) {
    simTable = <Table data={recommData} dataType="criteria" fields={fields} tableId="Similarities" />
  } else {
    simTable =
      <tr>
        <th>1</th>
        <td>No results.</td>
      </tr>
  }

  return (
    <>
      {simTable}
    </>
  )

}

