import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

// import axios from 'axios'

import Note from './components/Note'

import noteServers from './services/notes'

/* const promise2 = axios.get("http://localhost:3001/foorbar")
console.log(promise2) */

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteServers
      .getAll()
      .then(initialNote => {
        console.log(initialNote)
        setNotes(initialNote)
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = () => {
    const noteObject = {
      data: new Date().toISOString(),
      content: newNote,
      important: false
    }

    noteServers
      .create(noteObject)
      .then((res) => {
        console.log(res)
      })
    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  const newNoteContent = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportance = (id) => {
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServers
      .update(id, changedNote)
      .then(initialNote => { setNotes(notes.map(note => note.id !== id ? note : initialNote)) })
      .catch(error => {
        console.log(`the note ${note.content} was already deleted `)
        notes.filter(note=> note.id !== id)
      })

    console.log(`importance of ${id} needs to be toggled`)
  }

  const titleStyle = {
    color: "red",
    fontFamily: "Arial"
  }

  return (
    <div>
      <ul>
        {
          notesToShow.map((note)=> {
            return (
              <Note
                note={note}
                key={note.id}
                toggleImportance={() => toggleImportance(note.id)} />
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
      <p>Hello World</p>
      <h1 style={titleStyle}>Hello React</h1>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))