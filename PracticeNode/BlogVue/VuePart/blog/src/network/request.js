import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:3000",
    timeout: 10000
  })

  instance.interceptors.request.use(config => {
    //console.log(config)
    return config
  }, err => {
    console.log(err)
  });

  instance.interceptors.response.use(res => {
    //console.log(res.data)
    return res
  }, err => {
    console.log(err)
  });

  return instance(config)
}
