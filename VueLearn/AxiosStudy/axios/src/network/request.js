import axios from 'axios'
// export function request (config) {
//   return new Promise((resolve, reject) => {
//      // 创建axios实例
//       const instance = axios.create({
//         baseURL:'http://123.207.32.32:8000',
//         timeout:5000
//       })
//       instance(config)
//         .then(res => {
//           resolve(res)
//         })
//         .catch(err => {
//           reject(err)
//         })
//   })
// }
export function request (config) {
     // 创建axios实例
      const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
      })
      return instance(config)
}
