import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import post from '@/view/post'
import auth from '@/view/auth'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home, 
      meta: {
        login: true
      }
    }, {
      path: '/post',
      name: 'post',
      component: post, 
      meta: {
        login: true
      }
    }, {
      path: '/auth',
      name: 'auth',
      component: auth
    }
  ]
})
