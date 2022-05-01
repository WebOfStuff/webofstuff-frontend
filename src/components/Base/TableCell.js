import Icon from '../Base/Icon';
import React from 'react';
import FunctionCall from './FunctionCall';


export default function TableCell(props) {
  let { row, fieldname, icon, clickFunction, clickParameterSet } = props;
  let isFunction = (clickFunction != null)
  let content = icon ?
    <Icon shape={fieldname} circle={true} circleClass="success" strokeClass="neutral" className="h-[5vh] w-[5vh] z-20 relative left-1/4 stroke-current inline-block"></Icon> 
    :row[fieldname]

  if (isFunction) {
    return (
      <td key={row + "_" + fieldname}>
        <FunctionCall row = {row} clickFunction={clickFunction} clickParameterSet={clickParameterSet}>
          {content}
        </FunctionCall>
      </td>
    )}
    else return (
      <td key={row + "_" + fieldname}>
          {content}
      </td>
    )
  }