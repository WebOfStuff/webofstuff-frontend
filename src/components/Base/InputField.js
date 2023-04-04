

export function InputField(props) {
  let { id, type, label, value, className, focusFunction, focusParameterSet, styleValue,readOnly } = props

  function handleFocus(e) {
    e.preventDefault();
    if (typeof focusFunction === 'function') {
      focusFunction(e, focusParameterSet)
    }
  }

  return (

    <div className="form-control h-full w-full">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} className={className} defaultValue={value} onFocus={handleFocus} style={styleValue} readOnly={readOnly}/>
    </div>
  )
}