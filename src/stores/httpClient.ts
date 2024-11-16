import axios from 'axios'

const baseURL = import.meta.env.PROD ? 'http://admin.devtowns.ru/' : 'http://admin.devtowns.ru/'

export const httpClient = axios.create({
  baseURL
})
