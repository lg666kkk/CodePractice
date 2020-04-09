import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Signup = () => import('views/admin/SignUp.vue')
const routers = [
  {
    path:'',
    redirect: Signup
  },
  {
    path:"/signup",
    component: Signup
  }
] 
export default new Router({
  routes: routers,
  mode: 'history'
})
