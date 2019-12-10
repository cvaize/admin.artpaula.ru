import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/attrs',
    name: 'attrs.index',
    component: () => import('../views/Attrs.vue')
  },
  {
    path: '/products',
    name: 'products.index',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/products/:productId',
    name: 'products.show',
    component: () => import('../views/Product.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
