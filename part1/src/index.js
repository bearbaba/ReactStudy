import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Hello = ({name, age}) =>(
  <p>Hello World {name} {age}</p>
)

const GetAge = (props) => {

  const bornYear = () => {
    const thisYear = new Date().getFullYear();
    const age = thisYear - props.age;
    return age;
  }
  return (
    <p>您的出身年份是{bornYear()}</p>
  )
}

const ChangeState = ({increase, zero}) => {
  return (
    <>
      <button onClick={increase}>increase</button>
      <button onClick={zero}>zero</button>
    </>
  )
}

const App = () =>{
  const [counter, setCounter]=useState(0);
/*   setTimeout(
    () => setCounter(counter+1),
    1000
  ) */

  const [left,setLeft]=useState(1);
  const [right, setRight]=useState(0);
  const [boolTrue, setBool]=useState(true);
  const [str, setAll]=useState([]);

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth()+1;
  const today = now.getDay();
  const time = now.getHours().toString() + ":" + now.getMinutes().toString() + ":" + now.getSeconds().toString();
  const a="hello";
  const b="world";
  const age="12";
  const [clicks, setClick]=useState({
    left: 0,
    right: 0
  });

  const handleRightClick = () =>{
    const newClicks = {
      right: clicks.right + 1,
      left: clicks.left
    };
    setClick(newClicks);
  }

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left+1
    }
    setClick(newClicks);
  }


/*   var counter1=0;
  const getCounter1=(counter)=>{
    counter++;
    return counter;
  } */
  
/* 
  const clickMe = function (){
    console.log("click");
  }
 */

  const increaseCounter = ()=>{
    setCounter(counter+1);
  }

  const zeroCounter = () => {
    setCounter(0);
  }
  return (
    <div>
      <p>{a} {b}</p>
      <p>today is {'今年是'+thisYear+'，这个月是'+thisMonth+'，今天是星期'+today+'，现在是：'+time} </p>
      <Hello name={"你好"} age="123"/>
      <Hello name={12+13} age={age}/>
      <GetAge age={parseInt(age)}/>
      <p>{counter}</p>
      <ChangeState increase={increaseCounter} zero={zeroCounter}></ChangeState>
      <p>left: {left}</p>
      <p>right: {right}</p>
      <button onClick={() => {setRight(right+1)}}>Right</button>
      <button onClick={() => {setLeft(left+1)}}>Left</button>
      <p>bool: {boolTrue.toString()}</p>
      <button onClick={()=>{setBool(false)}}>false</button>
      <button onClick={()=>{setBool(true)}}>true</button>
      <p>right: {clicks.right} left: {clicks.left}</p>
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button>
      <p>{str.join(" ")}</p>
      <button onClick={() => {setAll(str.concat("R"))}}>R</button>
      <button onClick={() => {setAll(str.concat("L"))}}>L</button>
    </div>
)}

ReactDOM.render( < App / > , document.getElementById('root'));

/* var counter = 0;
const refresh = () => {
  ReactDOM.render( < App / > , document.getElementById('root'));
}

refresh();
counter++;
refresh();
counter++;
console.log(counter); */