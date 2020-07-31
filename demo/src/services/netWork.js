import axios from 'axios';

const getUrl = () =>{ 
  const request = axios.get("http://localhost:3001/notes")
  return request.then(response=> response.data)
}

export default {
  getUrl
}