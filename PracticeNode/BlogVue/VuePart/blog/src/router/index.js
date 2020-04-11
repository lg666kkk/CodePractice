import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//懒加载
const Signup = () => import('views/admin/SignUp.vue')
const Article = () => import('views/article/Article.vue')
const About = () => import('../views/profile/About.vue')


const routers = [
  {
    path:'/',
    component: Article
  },
  {
    path:"/admin/signin",
    component: Signup
  },
  {
    path: '/article',
    component: Article
  },
  {
    path: '/about',
    component: About
  }
] 
export default new Router({
  routes: routers,
  mode: 'history'
})
