import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
const Register = () => import('../views/Register.vue')
const NotFound = () => import('../views/NotFound.vue')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
