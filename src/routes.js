import Dashboard from './components/Dashboard.vue'

import Login from './components/Login.vue'

// Routes
const routes = [
  {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },
    activate: function () {
      this.$nextTick(function () {
        alert('test')
      })
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard
      }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresAuth: false }
      }, {
        path: '/dashboard',
        name: 'dashboard-first',
        component: Dashboard
      }
    ]
  }
]

export default routes
