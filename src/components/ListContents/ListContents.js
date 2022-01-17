import React from 'react';
export default function ListContents(data) {
  let listcontentsdata = data?.listcontentsdata?.contents;
  let listItems;
  if (listcontentsdata !== undefined) {
    listItems = listcontentsdata.map((item) =>
      <tr key={item.title}>
        <th>1</th>
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