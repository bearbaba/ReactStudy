import React,{useEffect, useState} from 'react';
// import ReactDOM from 'react-dom';
import netFun from './services/netWork';
import Note from './components/Note';

const App = () =>{
  const [notes,setNotes] = useState([]);
  
  useEffect(()=>{
    netFun
      .getUrl()
      .then(data=>setNotes(data))
  },[])

  return (
    <div>
      <ul>
        {
          () =>notes.map(note => <Note key={note.id} value={note.content}/>)
        }
      </ul>
    </div>
  )
}

export default App;