/**
 * Created by chenlei on 2019/05/25.
 */
import axios from 'axios'
import serverCode from '../config/serverCode'

axios.defaults.baseURL = 'https://itunes.apple.com/search?media=music&term=stone'

// 发送请求前处理request的数据
axios.defaults.transformRequest = [
  function (data) {
    let newData = ''
    for (let k in data) {
      newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
  }
]

// 带cookie请求
axios.defaults.withCredentials = true

// request拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// response拦截
axios.interceptors.response.use(function (response) {
  // 返回响应时做一些处理
  const { data } = response
  if (response.success !== undefined) { // 防止服务端渲染调用接口时的重复链式调用
    return response
  }
  if (!data) {
    return {
      success: false,
      msg: '网络连接失败',
      data: null,
      code: serverCode.NOT_FOUND_ERR,
      origin: 'http'
    }
  } else if (data.code === serverCode.SUCCESS_CODE) {
    return {
      success: true,
      ...data
    }
  } else {
    // server error
    return {
      success: false,
      ...data,
      origin: 'server'
    }
  }
}, function (error) {
  console.log(error)
  // 当响应异常时做一些处理 http error
  if (!error || !error.response || !error.response.status) {
    return {
      success: false,
      msg: '网络连接失败',
      data: null,
      code: serverCode.NOT_FOUND_ERR,
      origin: 'http'
    }
  } else if (error.response.status === serverCode.NOT_FOUND_ERR || error.response.status === serverCode.NORMAL_ERR) {
    return {
      success: false,
      msg: error.response.statusText,
      data: null,
      code: error.response.status,
      origin: 'http'
    }
  } else if (error.response.status === serverCode.TIMEOUT_ERR) {
    return {
      success: false,
      msg: '请求超时',
      data: null,
      code: error.response.status,
      origin: 'http'
    }
  } else {
    return {
      success: false,
      msg: error.response.statusText,
      data: null,
      code: error.response.status,
      origin: 'http'
    }
  }
})

// get请求
function get (url, data, options) {
  return axios.get(url, data)
}
// post请求
function post (url, data) {
  return axios.post(url, data)
}

// 导出使用
export { get, post }
