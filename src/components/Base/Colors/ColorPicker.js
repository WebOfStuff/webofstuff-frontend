import React, { createRef, FunctionComponent, MutableRefObject, RefObject, useEffect, useRef } from 'react';
import iro from '@jaames/iro';
import { useState } from 'react';

export default function ColorPicker(props) {
  const  {color, onColorChange, aspect, position, themeName} = props;
  let colorPicker = useRef(false)
let loading = useRef(true)
const [colorPickerStyle, setColorPickerStyle] = useState({});


useEffect(() => {
  if (loading.current) {
    colorPicker.current = new iro.ColorPicker('#picker', { color: "#f00" })
    colorPicker.current.on('color:change', function change(color) {
      onColorChange(color,aspect,themeName)
    });
  }
  loading.current = false
},[colorPicker, onColorChange, aspect])

useEffect(() => {
  if (!loading.current) {
    colorPicker.current.off('color:change')
    colorPicker.current.on('color:change', function change(color) {
      onColorChange(color,aspect,themeName)
    });
  }
},[colorPicker, onColorChange, aspect])

useEffect(() => {
  setColorPickerStyle({
    "left":""+position[0]+"px",
    "top": ""+position[1]+"px"
})
},[position[0],position[1], setColorPickerStyle])

useEffect(() => { 
  if (!loading.current) {
  colorPicker.current.color.hexString = color
  }  
},[color])

  return (
    <div id='picker' className="card card-bordered bg-primary shadow-xl fixed" style={colorPickerStyle} ref={colorPicker} />
  )
}