import { authorization, axios } from "./api_login"

export async function publish(title: string, content: string, token = localStorage.getItem('token')) {
  return await axios.post('/topic/publish', { title, content }, authorization(token))
}

export async function like(topicId: number, token = localStorage.getItem('token')) {
  axios.get('/topic/like/' + topicId, authorization(token))
}

export function unlike(topicId: number, token = localStorage.getItem('token')) {
  axios.get('/topic/unlike' + topicId, authorization(token))
}
export function comment(topicId: number, content: string, token = localStorage.getItem('token')) {
  axios.post('/topic/comment/' + topicId, {}, {
    ...authorization(token), params: { content }
  })
}

export function getTopic(page: number, limit: number, token = localStorage.getItem('token')) {
  axios.get('/topic/page', { params: { page, limit }, ...authorization(token) })
}

export function getComment(topicId: number, page: number, limit: number, token = localStorage.getItem('token')) {
  axios.get('/topic/comment/page/' + topicId, { params: { page, limit }, ...authorization(token) })
}
