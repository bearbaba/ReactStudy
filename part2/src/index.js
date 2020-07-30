import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* useEffect(() => {
  axios
    .get("http://localhost:3001/notes")
    .then((response) => {
      console.log('promise fulfilled');
      const props = response.data;
      ReactDOM.render(<App props={props}/>, document.getElementById('root'))
    })
}, []) */
/* axios
  .get("http://localhost:3001/notes")
  .then((response)=>{
    // console.log(response.data);
    const props =  response.data;
    console.log(props);
    ReactDOM.render( < App />, document.getElementById('root'));
    //这是个异步方法，会首先执行同步再执行异步，渲染组件的方法是同步的，所以写进了这里
  })
 */

ReactDOM.render(<App/>, document.getElementById('root'));