import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import post from '@/view/post'
import auth from '@/view/auth'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: home, 
      meta: {
        login: true
      }
    }, {
      path: '/admin/post',
      name: 'post',
      component: post, 
      meta: {
        login: true
      }
    }, {
      path: '/admin/auth',
      name: 'auth',
      component: auth
    }
  ]
})
