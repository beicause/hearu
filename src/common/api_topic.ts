import { authorization, axios, PromiseResponse } from "./api_login"

export async function publish(title: string, content: string, token = localStorage.getItem('token')): PromiseResponse {
  return await axios.post('/topic/publish', { title, content }, authorization(token))
}

export async function like(topicId: number, token = localStorage.getItem('token')): PromiseResponse {
  return await axios.get('/topic/like/' + topicId, authorization(token))
}

export async function unlike(topicId: number, token = localStorage.getItem('token')): PromiseResponse {
  return await axios.get('/topic/unlike' + topicId, authorization(token))
}
export async function comment(topicId: number, content: string, token = localStorage.getItem('token')): PromiseResponse {
  return await axios.post('/topic/comment/' + topicId, {}, {
    ...authorization(token), params: { content }
  })
}

export async function getTopic(page: number, limit: number, token = localStorage.getItem('token')): PromiseResponse<TopicData> {
  return await axios.get('/topic/page', { params: { page, limit }, ...authorization(token) })
}

export async function getComment(topicId: number, page: number, limit: number, token = localStorage.getItem('token')): PromiseResponse<CommentData> {
  return await axios.get('/topic/comment/page/' + topicId, { params: { page, limit }, ...authorization(token) })
}

export interface TopicData {
  n: number,
  data: {
    topicId: number
    title: string
    content: string
    createTime: string
    updateTime: string
    likeCount: number
    like: boolean
    author: {
      userId: number
      name: string
      telephone: string
      sex: string
      avatar: string
      signature: string
    }
    commentCount: number
    mine: boolean
  }[]
}

export interface CommentData {
  n: number,
  data: {
    commentId: number,
    content: string,
    topicId: number,
    createTime: string,
    updateTime: string,
    author: {
      userId: number,
      name: string
    },
    likeCount: number,
    commentCount: number,
    like: true,
    mine: true,
    comments:
    {
      commentId: number,
      content: string,
      createTime: string,
      updateTime: string,
      author: {
        userId: number,
        name: string
      },
      likeCount: number,
      like: boolean,
      mine: boolean,
      response: {
        userId: number,
        name: string
      }
    }[]
  }[]
}
