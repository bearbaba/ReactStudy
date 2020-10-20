const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const newNotes = notes.find(note => note.id == id)
  if (newNotes) {
    res.json(newNotes)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const deletedNote = notes.filter(note => note.id !== id)
  if (deletedNote){
    res.status(204).end()
  }
})

app.use(express.json())

app.post("/api/notes", (req, res)=>{
  const note = req.body
  console.log(note)
  res.json(note)
})

