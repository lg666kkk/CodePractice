import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
// 导入ui样式
import 'element-ui/lib/theme-chalk/index.css';
import hight from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import {
  Button,
  Input,
  Message,
  Tag,
  Tooltip,
  Notification,
  MessageBox,
  Form,
  FormItem,
  Option,
  Select
} from 'element-ui';
// 导入vue-resource,与后端进行数据交互
//import VueResource from 'vue-resource'
const components = [Button, Input, Message, Select,Tag, Tooltip, Notification, MessageBox,Form, FormItem,Option]
// 全局注册了所有组件
components.forEach((item) => {
  Vue.component(item.name, item)
})

//在main.js定义自定义指令 
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hight.highlightBlock(block)
  })
})

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
