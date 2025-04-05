import axios from 'axios'

const baseURL = import.meta.env.PROD ? 'http://localhost:3000/api' : 'http://localhost:3000/api'

export const httpClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
