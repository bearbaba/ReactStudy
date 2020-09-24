import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

import Note from './components/Note'

/* const promise2 = axios.get("http://localhost:3001/foorbar")
console.log(promise2) */

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then(res => {
        console.log(res.data)
        setNotes(res.data)
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = () => {
    const noteObject = {
      id: notes.length + 1,
      data: new Date().toISOString(),
      content: newNote,
      important: false
    }

    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  const newNoteContent = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }



  return (
    <div>
      <ul>
        {
          notesToShow.map(note => {
            return (
              <Note note={note} key={note.id} />
            )
          })
        }
      </ul>

      <button onClick={() => setShowAll(!showAll)}>show {!showAll ? "all" : "important"}</button>
      <form onSubmit={addNote}>
        <input
          onChange={newNoteContent}
          value={newNote}
        />

        <button type="submit">addNote</button>
      </form>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))