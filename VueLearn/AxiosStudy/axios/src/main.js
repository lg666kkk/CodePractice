import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
Vue.config.productionTip = false
import {request} from './network/request.js'
new Vue({
  render: h => h(App),
}).$mount('#app')

// axios({
//   url:'http://123.207.32.32:8000/home/multidata'
// }).then(data => {
//   console.log(data);
// })
// const instance1 = axios.create({
//   baseURL:'http://123.207.32.32:8000',
//   timeout:5000
// })
// instance1({
//   URL:'/home/multidata'
// }).then(data => {
//   console.log(data);
// })
// instance1({
//   url:'/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res);
// })
request({
  url:'/home/multidata'
}).then(data => {
  console.log(data);
})
