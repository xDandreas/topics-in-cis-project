import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./../views/Products')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('./../views/addProduct')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('./../views/Orders')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
