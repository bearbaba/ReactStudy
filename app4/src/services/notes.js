import axios from 'axios'

const baseUrl = "http://localhost:3001/api/notes"

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(res => res.data)
}

const create = (noteObject) => {
  return axios
    .post(baseUrl, noteObject)
    .then(res => res.data)
}

const update = (id,changedNote) => {
  return axios
    .put(`${baseUrl}/${id}`, changedNote)
    .then(res => res.data)
}

export default {
  getAll,
  update,
  create
}