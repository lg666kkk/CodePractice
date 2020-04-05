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
      instance.interceptors.request.use(config => {
        console.log(config);
        /***
         * 为什么要请求拦截？
         *  1. 对config进行修改
         *  2. 显示一些请求动画，请求成功后动画消失
         *  3. 某些网络请求(如登录(token)),必须携带一些特殊信息
         */
        return config // 拦截后要记得最后返回数据
      }, err => {
        console.log(err);
      })
      instance.interceptors.response.use(res => {
        //console.log(res);
        return res.data // 拦截后要记得最后返回数据
      },err => {
        console.log(err);
      })
      return instance(config)
}
