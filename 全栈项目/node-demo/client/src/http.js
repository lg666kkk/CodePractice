import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0,0,0,0.7)"
  });
}
// 结束加载动画
function endLoading() {
  loading.close()
}
// 请求拦截
axios.interceptors .request.use(config => {
  // 加载动画
  console.log(config);
  startLoading()
  if (localStorage.eleToken) {
    // 设置统一请求头
    config.headers.Authorization = localStorage.eleToken
  }
  //console.log(config);
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use(response => {
  // 结束加载动画
  endLoading()
  return response
}, error => {
  endLoading()
  console.log(error);
  Message.error(error.response)
  // 获取错误状态码，若为401，则说明token过期了
  const { status } = error.response
  if (status == 401) {
    Message.error("登录过期,请重新登录")
    // 清除token
    localStorage.removeItem('eleToken')
    // 跳转到登录页面
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
