import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  const {name, color} = props
  return (
    <div>
      <h1>Hello {name}</h1>
      <h2>color: {color}</h2>
    </div>
  )
}

const App = () => {
  return(
    <div>
      <p>Hello World</p>
      <Hello name="Gerro" color="red"/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
