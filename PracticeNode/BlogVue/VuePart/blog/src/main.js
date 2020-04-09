import Vue from 'vue'
import router from './router'
// 导入ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 独立导入ui组件
import App from './App.vue'
import {
  Button,
  Input,
  Message
} from 'element-ui';
// 导入vue-resource,与后端进行数据交互
//import VueResource from 'vue-resource'

Vue.config.productionTip = false
// 初始化引入的vue-resource
//Vue.use(VueResource)

// 初始化引入的ui组件
Vue.use(Button)
Vue.use(Input)
Vue.prototype.$message = Message;


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
