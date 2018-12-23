import BreadCrumb from './components/partials/breadcrumb.vue'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('bread-crumb', BreadCrumb)
  }
}

export default GlobalComponents
