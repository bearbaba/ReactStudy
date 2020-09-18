import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.fun}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const App = ()　=> {
  const [counter, setCounter] = useState(0)
  const addButton = () => {
    return setCounter(counter + 1)
  }

  const subButton = () => {
    return setCounter(counter - 1)
  }

  const setZero = () => {
    return setCounter(0)
  }
  return (
    <div>
      <Display text={counter}/>

      <Button text="plus" fun={addButton}/ >
      <Button text="minus" fun={subButton}/>
      <Button text="set zero" fun={setZero}/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"))