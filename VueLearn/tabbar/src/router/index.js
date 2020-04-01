import Vue from 'vue'
import Router from 'vue-router'
//懒加载
const Home = () => import('../views/home/Home.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
//处理点击两次路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const routers = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path:'/profile',
    component: Profile
  },
  {
    path:'/category',
    component: Category
  }
]
export default new Router({
  routes: routers,
  mode: 'history'
})
