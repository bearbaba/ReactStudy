import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './App';

axios
  .get("http://localhost:3001/notes")
  .then((response)=>{
    // console.log(response.data);
    const props =  response.data;
    console.log(props);
    ReactDOM.render( < App />, document.getElementById('root'));
    //这是个异步方法，会首先执行同步再执行异步，渲染组件的方法是同步的，所以写进了这里
  })
