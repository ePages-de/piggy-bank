import Vue from 'vue'
import VueRouter from 'vue-router'
import Credentials from '@/components/Credentials'
import ProductList from '@/components/ProductList'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Credentials',
      component: Credentials
    }, {
      path: '/products',
      name: 'ProductList',
      props: true,
      component: ProductList
    }
  ]
})
