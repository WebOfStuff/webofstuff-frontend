import { useEffect, useRef, useState } from 'react';
import ColorPicker from '../components/Base/ColorPicker';
import ntc from 'ntcjs'

export default function ThemeBuilder() {
  let n_match = ntc.name("#aabbcc")
  const [colorName, setColorName] = useState(n_match[1]);
  const [colorHex, setColorHex] = useState(n_match[0]);
  function onColorChange(color) {
    let n_match = ntc.name(color.hexString)
    setColorHex(n_match[0])
    setColorName(n_match[1])
    document.documentElement.style.setProperty('--primary', n_match[0]);
  };


  return (
    <>
      <form onSubmit={(e) => { setThemeValues(e) }}>
        <div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Primary</span>
            </label>
            <ColorPicker color={colorHex}
              onColorChange={onColorChange}></ColorPicker>
          </div>

          <input type="text" value={colorName} onChange={onColorChange} className="input input-primary bg-primary" style={{ color: 'var(--primary)' }} ></input>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Secondary</span>
            </label>
            <input type="text" placeholder="#111111" className="input input-secondary" style={{ color: 'var(--secondary)' }} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Accent</span>
            </label>
            <input id="accent" type="text" placeholder="#111111" className="input input-accent " style={{ color: 'var(--accent)' }} />
          </div>
        </div>
        <input type="submit"></input>
      </form>
    </>


  )
  // Create a function for setting a variable value
  function setThemeValues(e) {
    e.preventDefault()
    // Set the value of variable --blue to another value (in this case "lightblue")
    console.log("done")
    var r = document.querySelector(':root');
    r.style.setProperty('--primary', 'red');
    r.style.setProperty('--primary', 'red');
    r.style.setProperty('--primary', 'red');
  }
}