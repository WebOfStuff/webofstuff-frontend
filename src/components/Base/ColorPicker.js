import React, { createRef, FunctionComponent, MutableRefObject, RefObject, useEffect, useRef } from 'react';
import iro from '@jaames/iro';
import { useState } from 'react';

export default function ColorPicker(props) {
  let {color, onColorChange} = props;
  let colorPicker = useRef(false)
let loading = true

  useEffect(() => {
    if (loading) {
      colorPicker.current = new iro.ColorPicker('#picker', { color: "#f00" })
      colorPicker.current.on('color:change', function(color) {
        onColorChange(colorPicker.current.color)
      });
    }
    loading = false
  },[colorPicker])

  return (<>
    <div id='picker' ref={colorPicker}> </div>
  </>
  )
}