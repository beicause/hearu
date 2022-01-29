import _axios, { AxiosResponse } from 'axios'
import md5 from 'crypto-js/md5'

export const baseURL = 'http://110.40.157.12:8002'
const axios = _axios.create({ baseURL })

export function hash(s: string) {
  return md5(s).toString()
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data { }
export interface Response<T extends Data = Data> {
  data: T,
  msg: string,
  code: number
}
export interface LoginData extends Data {
  telephone: string, password: string
}

export interface RegisterData extends LoginData {
  name: string,
  sex: string,
  avatar: string,
  signature: string,
  birth: string
}
type PromiseResponse<T = Data> = Promise<AxiosResponse<Response<T>>>

export async function register(data: Partial<RegisterData>): PromiseResponse {
  return await axios.post('/user/register', data)
}

export async function login(data: Partial<LoginData>): PromiseResponse {
  return await axios.post('/user/login', {}, { params: data })
}

export async function getInfo(token: string): PromiseResponse<RegisterData> {
  return await axios.get('/user/info', { headers: { Authorization: 'Bearer ' + token } })
}
