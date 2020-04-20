import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { Message,Loading } from 'element-ui';

let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中",
    background: 'rgba(0,0,0,0.7)'
  });
}
function endLoading () {
  loading.close()
}
export function request(config) {

  const instance = axios.create({
    baseURL: "http://127.0.0.1:3000",
    timeout: 10000
  })
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  //   config.headers = {'Content-Type':'application/x-www-form-urlencoded'}
  // }
  instance.interceptors.request.use(config => {
    // 加载动画
    startLoading()
    //console.log("req",config)
    if (localStorage.Token) {
      // 配置请求头
      config.headers.Authorization = localStorage.Token
    }
    return config
  }, err => {
    return Promise.reject(err)
  });

  instance.interceptors.response.use(res => {
    // 关闭动画
    endLoading()
    //console.log("res",res.data)
    return res
  }, err => {
    endLoading()
    Message.error(err.response.data)
    // 获取错误状态码
    const { status } = err.response
    if (status == 401) {
      Message.error('登录过期，请重新登录')
      // 清除token
      localStorage.removeItem('Token')
      // 跳转到首页
      router.push('/')
    } 
    return Promise.reject(err)
  });
  
  return instance(config)
}
