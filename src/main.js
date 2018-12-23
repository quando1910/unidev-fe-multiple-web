import Vue from 'vue'
import ElementUI from 'element-ui'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import Bars from 'vuebars'
import vueEventCalendar from 'vue-event-calendar'
import routes from './routes'
import store from './store'
import VueAnimateNumber from 'vue-animate-number'
import VueGmaps from 'vue-gmaps'
import VueLayers from 'vuelayers'
import VCharts from 'v-charts'
import filter from './helper/filter'
import GlobalComponents from './GlobalComponent.js'

var jwtDecode = require('jwt-decode')
// Resource logic
Vue.use(Resource)
Vue.http.options.emulateJSON = true

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Bars)
Vue.use(vueEventCalendar, {locale: 'en'})
Vue.use(VueAnimateNumber)
Vue.use(VueGmaps, {
  key: 'AIzaSyCpr35b_ZSoP8nbz0VnBjVz6ABb7iurRCU',
  libraries: ['places'],
  version: '3'
})
Vue.use(VueLayers)
Vue.use(VCharts)
Vue.use(GlobalComponents)

// Import top level component
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
//  for element 1.9.9 below
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'dripicons/webfont/webfont.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'vuelayers/lib/style.css'

locale.use(lang)

// Routing logic
var router = new VueRouter({
  mode: 'history',
  routes: routes,
  linkActiveClass: 'open active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state.token !== window.localStorage.getItem('ACCESS_TOKEN')) {
    store.commit('SET_TOKEN', window.localStorage.getItem('ACCESS_TOKEN'))
  }
}

Vue.http.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('ACCESS_TOKEN')}`

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === false) {
    if (store.state.token) {
      Vue.http.get('api/checkLogin').then(res => {
        next({path: '/'})
      })
        .catch(function (e) {
          window.localStorage.removeItem('ACCESS_TOKEN')
          next()
        })
    } else {
      window.localStorage.removeItem('ACCESS_TOKEN')
      next()
    }
  } else {
    if (store.state.token) {
      var decoded = jwtDecode(store.state.token)
      store.commit('SET_ROLE', decoded.role)
      store.commit('SET_UID', decoded.id)
      Vue.http.get('api/checkLogin').then(res => {
        next()
      })
        .catch(function (e) {
          window.localStorage.removeItem('ACCESS_TOKEN')
          next({path: '/login'})
        })
    } else {
      window.localStorage.removeItem('ACCESS_TOKEN')
      next({path: '/login'})
    }
  }
})

Vue.http.options.root = process.env.SERVER_IP

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router: router,
  filter,
  store: store,
  render: h => h(App)
})

require('bootstrap')
// require('admin-lte')
require('../node_modules/admin-lte/dist/js/app.min.js')
require('../node_modules/admin-lte/dist/js/demo.js')
require('../node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.js')
