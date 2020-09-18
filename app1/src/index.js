import React, {useState} from "react"
import ReactDOM from "react-dom"


const Hello = (props) => {
  const { name, color } = props
  return (
    <div>
      <h1>Hello {name}</h1>
      <h2>color: {color}</h2>
    </div>
  )
}

const Clock = () => {
  const [state, setState] = useState(0)

  setTimeout(()=>{
    setState(state+1)
  }, 1000)

  return (
    <div>
      <p>{state}</p>
    </div>
    )
}

const App = () => {
  const num1 = 12
  const num2 = 13
  return (
    <div>
      <p>Hello World</p>
      <Hello name="Gerro" color="red" />
      <p>{num1 + num2}</p>
      <Clock />
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById("root"))
