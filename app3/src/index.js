import React, {useState} from "react";
import ReactDOM from "react-dom";
import Note from './components/Note'

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const App = (props) => {
  
  const [notes, setNotes] = useState(props.notes)

  const [newNote, setNewNote] = useState("a new note.....")

  const [showAll, setShowAll] = useState(true)

  const notestoshow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      import: false,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNewNote("")

    console.log(notes)
  }

  const handleNewNote = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  return (
    <div>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>show {showAll ? "all" : "important"}</button>
      </div>
      <ul>
        {notestoshow.map((note) => {
          return (
            <Note note={note} key={note.id} />
          )
        })}
      </ul>


      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNewNote}
        />
        <button type="submit">save</button>
      </form>

    </div>
  );
};

ReactDOM.render(<App notes={notes}/>, document.getElementById("root"))
