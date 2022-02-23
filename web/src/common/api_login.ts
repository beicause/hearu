import _axios, { AxiosResponse } from 'axios'
import md5 from 'crypto-js/md5'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

export const baseURL = 'http://110.40.157.12:8002'
export const axios = _axios.create({ baseURL })
export const authorization = (token: string | null) => {
  return { headers: { Authorization: 'Bearer ' + token } }
}
export function hash(s: string) {
  return md5(s).toString()
}

interface Data { }
export interface Response<T extends Data = Data> {
  data: T
  msg: string
  code: number
}
export interface LoginData extends Data {
  telephone: string, password: string
}

export interface RegisterData extends LoginData {
  name: string
  sex: string
  avatar: string
  signature: string
  birth: string
  id?: number
}
export interface InfoData extends RegisterData {
  id: number
  age: number
}

export type PromiseResponse<T = Data> = Promise<AxiosResponse<Response<T>>>

export async function register(data: RegisterData): PromiseResponse {
  return await axios.post('/user/register', data)
}

export async function login(data: LoginData): PromiseResponse<{ token: string }> {
  return await axios.post('/user/login', {}, { params: data })
}

export async function getInfo(token = localStorage.getItem('token')): PromiseResponse<InfoData> {
  return await axios.get('/user/info', authorization(token))
}

export async function changePassword(oldPassword: string, newPassword: string, token = localStorage.getItem('token')): PromiseResponse {
  return await axios.post('/user/change/password', {}, {
    ...authorization(token), params: {
      oldPassword, newPassword
    }
  })
}

export function ensureLogin() {
  if (localStorage.getItem('token')) return
  useMessage().info('请先登录')
  useRouter().replace('/login')
}

export async function changeInfo(info: RegisterData & { id: number }, token = localStorage.getItem('token')): PromiseResponse {
  const _info = Object.assign({}, info)
  for (const k of Object.keys(_info)) {
    if (![
      'name',
      'sex',
      'avatar',
      'signature',
      'telephone',
      'birth',
      'id'
    ].includes(k))
      // @ts-ignore
      _info[k] = undefined
  }
  return await axios.post('/user/change/info', _info, authorization(token))
}
