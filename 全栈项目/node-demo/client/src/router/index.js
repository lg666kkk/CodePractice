import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
const Register = () => import('../views/Register.vue')
const NotFound = () => import('../views/NotFound.vue')
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path:'',
        component:Home
      },
      {
        path:'/home',
        name: 'home',
        component:Home
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == '/register' || to.path == '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
export default router
