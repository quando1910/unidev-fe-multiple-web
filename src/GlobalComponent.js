import BreadCrumb from './components/partials/breadcrumb.vue'
import Tab from './components/partials/Tab.vue'
import List from './components/partials/List.vue'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('bread-crumb', BreadCrumb)
    Vue.component('custom-tab', Tab)
    Vue.component('custom-list', List)
  }
}

export default GlobalComponents
