import Dashboard from './components/Dashboard.vue'

import Login from './components/Login.vue'

import Pictures from './components/modules/pictures/Pictures.vue'
import PictureDetail from './components/modules/pictures/PictureDetail.vue'

import Videos from './components/modules/videos/Videos.vue'
import VideoDetail from './components/modules/videos/VideoDetail.vue'

import Articles from './components/modules/articles/Articles.vue'
import ArticleDetial from './components/modules/articles/ArticleDetail.vue'

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
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresAuth: false }
      }, {
        path: '/dashboard',
        name: 'dashboard-first',
        component: Dashboard
      }, {
        // Picture Routes
        path: '/pictures',
        name: 'pictures',
        component: Pictures
      }, {
        path: '/pictures/:id',
        name: 'pictureDetail',
        component: PictureDetail
      }, {
        // Articles Routes
        path: '/articles',
        name: 'articles',
        component: Articles
      }, {
        path: '/articles/:id',
        name: 'articleDetail',
        component: ArticleDetial
      }, {
        // Videos Routes
        path: '/videos',
        name: 'videos',
        component: Videos
      }, {
        path: '/videos/:id',
        name: 'videoDetail',
        component: VideoDetail
      }
    ]
  }
]

export default routes
