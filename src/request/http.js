import axios from 'axios'

const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 400:
      console.log('错误请求')
      break
    case 401:
      console.log('未授权，请重新登陆')
      break
    case 403:
      console.log('拒绝访问')
      break
    case 404:
      console.log('请求资源不存在')
      break
    case 500:
      console.log('服务器端错误')
      break
    default:
      console.log(other)
  }
}

var instance = axios.create({ timeout: 1000 * 30 })
instance.interceptors.response.use(
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  error => {
    const { response } = error
    if (response) {
      // 已发出请求，状态不在2xx范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    }
  }
)

export default instance
