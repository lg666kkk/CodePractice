import axios from 'axios'
import qs from 'qs'

export function request(config) {

  const instance = axios.create({
    baseURL: "http://127.0.0.1:3000",
    timeout: 10000
  })
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
    config.headers = {'Content-Type':'application/x-www-form-urlencoded'}
  }
  instance.interceptors.request.use(config => {
    //console.log("req",config)
    return config
  }, err => {
    console.log(err)
  });

  instance.interceptors.response.use(res => {
    //console.log("res",res.data)
    return res
  }, err => {
    console.log(err)
  });

  return instance(config)
}
