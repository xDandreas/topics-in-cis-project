import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/shop',
    name: 'Shop',

    component: () => import('../views/Shop.vue')
  },
  {
    path: '/product',
    name: 'Product',

    component: () => import('../views/Product.vue')
  },
  {
    path: '/cart',
    name: 'Cart',

    component: () => import('../views/Cart.vue')
  }

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
