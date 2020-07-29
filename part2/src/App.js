import React from 'react';
import Note from './components/Note';
import axios from 'axios';
import {useState, useEffect} from 'react';
const App = (props) => {
  
  
  const [notes, setNotes] = useState([]);

  setNotes(props);

  const [newNote, setNewNote] = useState("Hello");

  const [showAll, setShowAll] = useState(true);

  const addNote = (event) =>{
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    }

    axios
      .post("http://localhost:3001/notes", noteObject)
      .then(response=>{
        setNotes(notes.concat(response.data));
        setNewNote('');
      })
  }

  const handleInputChange = (event)=>{
    return (
      setNewNote(event.target.value)
    )
  }

  const notesToShow = notes.filter(note => note.important);

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    axios.put(url, changedNote).then(response=>{
      setNotes(notes.map(note=>note.id !== id ? note : response.data))
    })
  }


  console.log(notesToShow);
  // console.log('render',notes.length, 'notes');

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={setShowAll(!showAll)}>
        show {showAll ? "all" : "important"}
      </button>
      <ul>
        {
          notesToShow.map(note => <Note key={note.id} note={note} />)
        }
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange}/>
        <button type="submit" >submit</button>
      </form>
    </div>
  )
}

export default App;