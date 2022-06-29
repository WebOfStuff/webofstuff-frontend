
import React from 'react'
import ReactDOM from 'react-dom'

class Controller extends React.Component{
  render(){
    const { children } = this.props

    const inputChildren = React.Children.map(children, child => {
      if(child.type.displayName === "Select"){
        return React.cloneElement(child)
      }
      else{
        return ReactDOM.createPortal(React.cloneElement(child), document.body)
      }
    })
    return inputChildren
  }
}

export default Controller