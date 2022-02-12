

export default function ThemeBuilder() {
  
  return (
    <>
      <form onSubmit={(e) => {set(e)}}>
        <div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Primary</span>
            </label>
            <input type="text" placeholder="#111111" className="input input-primary" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Secondary</span>
            </label>
            <input type="text" placeholder="#111111" className="input input-secondary" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Accent</span>
            </label>
            <input type="text" placeholder="#111111" className="input input-accent " style={{color: 'var(--primary)'}} />
          </div>
        </div>
        <input type="submit"></input>
      </form>
    </>


  )

  // Create a function for setting a variable value
  function set(e) {
    e.preventDefault()
    // Set the value of variable --blue to another value (in this case "lightblue")
    console.log("done")
  var r = document.querySelector(':root');
    r.style.setProperty('--primary', 'red');
  }
}