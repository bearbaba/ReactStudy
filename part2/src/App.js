import React from 'react';
import Note from './components/Note';
import axios from 'axios';
import {useState, useEffect} from 'react';
const App = () => {
  
  
  const [state, setState] = useState([]);



  useEffect(()=>{
    axios
      .get("http://localhost:3001/notes")
      .then((response)=>{
        console.log('promise fulfilled');
        setState(response.data);
      })
  }, [])
  
  console.log('render', state.length, 'notes');

  return (
    <div>
      <ul>
        {
          state.map((note)=> {return (<Note key={note.id} note={note}/>)})
        }
      </ul>
    </div>
  )
}

export default App;