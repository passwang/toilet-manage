
import axios from 'axios'
import qs from 'qs'

var service = axios.create({
  baseURL: process.env.BASE_URL
  // withCredentials: true
  // timeout: 5000
})

service.interceptors.request.use(
  config => {
    // do something before request is sent
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// get请求
const get = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url,
      params: param || {}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
// post请求
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: qs.stringify(params),
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
// 上传文件 不能用qs将表单序列化
const upload = (url, params) => {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
      headers: {
        'content-Type': 'multipart/form-data;charset=UTF-8'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
export default {
  get,
  post,
  upload
}
