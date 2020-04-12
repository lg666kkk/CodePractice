import Vue from 'vue'
import router from './router'
import App from './App.vue'
// 导入ui样式
import 'element-ui/lib/theme-chalk/index.css';

import {
  Button,
  Input,
  Message,
  Tag,
  Tooltip,
  Notification
} from 'element-ui';
// 导入vue-resource,与后端进行数据交互
//import VueResource from 'vue-resource'
const components = [Button, Input, Message, Tag, Tooltip, Notification]
// 全局注册了所有组件
components.forEach((item) => {
  Vue.component(item.name, item)
})

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
