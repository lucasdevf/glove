import { Clerk } from '@clerk/clerk-expo'
import axios from 'axios'
import { AppError } from '../error/AppError'

export const api = axios.create({
  baseURL: 'http://192.168.12.14:3333', // @Todo: add baseURL on .env
})

api.interceptors.request.use(async (config) => {
  const token = await Clerk.session?.getToken()

  config.headers.authorization = token

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(
        new AppError('Erro inesperado, tente novamente mais tarde.'),
      )
    }
  },
)
