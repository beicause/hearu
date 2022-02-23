import { authorization, axios, PromiseResponse } from "./api_login"

export async function publish(title: string, content: string, token = localStorage.getItem('token')): PromiseResponse {
  return await axios.post('/topic/publish', { title, content }, authorization(token))
}

export async function like(id: number, type: 'topic' | 'comment' = 'topic', token = localStorage.getItem('token')): PromiseResponse {
  return await axios.get(`/topic/${type==='comment'?'comment/':''}like/${id}`, authorization(token))
}

export async function unlike(id: number, type: 'topic' | 'comment' = 'topic', token = localStorage.getItem('token')): PromiseResponse {
  return await axios.get(`/topic/${type==='comment'?'comment/':''}unlike/${id}`, authorization(token))
}
export async function comment(id: number, content: string, type: 'topic' | 'comment' = 'topic', token = localStorage.getItem('token')): PromiseResponse {
  return await axios.post('/topic/comment/' + (type === 'topic' ? '' : 'comment/') + id, {}, {
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
    like: boolean,
    mine: boolean,
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
