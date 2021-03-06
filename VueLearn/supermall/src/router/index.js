import Vue from 'vue'
import Router from 'vue-router'
//处理点击两次路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Category = () => import('views/category/Category.vue')
const Detail = () => import('views/detail/Detail')
Vue.use(Router)

const routers = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/category',
    component: Category
  },
  {
    path:'/profile',
    component: Profile
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
export default new Router({
  routes: routers,
  mode: 'history'
})
