
import Icon from '../Base/Icon';
import { useSession } from "next-auth/react";
import { usePersona } from '../Personas/PersonaContext';
import React from 'react';
import TableCell from './TableCell';

export default function TableRow(props) {
  let { row, fields, clickFunctions, clickParameterSets } = props;
  let contentFields = fields.map(function (field, index, array) {
    let [type, name] = field.split("_")
    return (<TableCell row = {row} fieldname={field} icon={(type == "icon")} clickFunction={clickFunctions[index]} clickParameterSet= {clickParameterSets[index]} ></TableCell>)
  })

return (
  <tr key={row.id}>
    {contentFields}
  </tr >
)
}