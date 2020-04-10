import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Signup = () => import('views/admin/SignUp.vue')
const SideBar = () => import('views/SideBar.vue')
const Article = () => import('views/article/Article.vue')

const routers = [
  {
    path:'/',
    redirect: SideBar
  },
  {
    path:"/admin/signin",
    component: Signup
  },
  {
    path: '/article',
    component: SideBar
  }
] 
export default new Router({
  routes: routers,
  mode: 'history'
})
