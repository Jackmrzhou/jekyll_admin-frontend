// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(VueCookies)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

axios.interceptors.response.use(
  response => {
    if (response.data.code === 4001) {
      // catch unauthorized situation
      router.push({
        path: '/admin/auth',
        query: {redirect: router.history.current.fullPath}
      })
      return Promise.reject(response)
    }
    return response
  }, error => {
    return Promise.reject(error)
  }
)

router.beforeEach((to, from, next) => {
  if (to.meta.login) {
    if (!this.$cookies.isKey("token")) {
      this.$router.push('/admin/login')
    }else {
      next()
    }
  }else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
