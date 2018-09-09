import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Authorize from '@/components/Authorize'
import ProductList from '@/components/ProductList'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/authorize',
      name: 'Authorize',
      component: Authorize
    }, {
      path: '/products',
      name: 'ProductList',
      props: (route) => ({ page: route.query.page, size: route.query.size }),
      component: ProductList
    }
  ]
})
