import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//懒加载
const Login = () => import('views/admin/Login.vue')
const Article = () => import('views/article/Article.vue')
const About = () => import('views/profile/About.vue')
const ArticleEdit = () => import('views/article/ArticleEdit.vue')
const ArticleList = () => import('views/article/ArticleList.vue')
const ArticleDetail = () => import('views/article/ArticleDetail.vue')
const Index = () => import('views/serve/Index.vue')
const NotFound = () => import('components/NotFound.vue')
const Register = () => import('views/admin/Resgister.vue')
const Tag = () => import('views/profile/Tag.vue')

const routers = [
  {
    path:'/',
    component: Article
  },
  {
    path:"/admin/signin",
    name: 'signin',
    component: Login
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/admin/articleEdit',
    name: 'articleEdit',
    component: ArticleEdit
  },
  {
    path: '/admin/articleList',
    name: 'articleList',
    component: ArticleList
  },
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    component: ArticleDetail
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/admin/register',
    name: 'register',
    component: Register
  },
  {
    path:'/tag',
    component: Tag
  },
  {
    path: '*',
    component: NotFound
  }
] 
const route = new Router({
  routes: routers,
  mode: 'history'
})
// 路由守卫
route.beforeEach((to, from, next) => {
  const isLogin = localStorage.Token ? true : false
  if (to.path== '/' || to.path=='/admin/signin' || to.path=='/article' || to.path=='/about' || to.path=='/admin/register' || to.path=='/tag') {
    next()
  } else if (to.path== `/articleDetail/:id`) {
    next()
  } else {
    isLogin ? next() : next('/admin/signin')
  }
})
export default route
