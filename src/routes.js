import Dashboard from './components/Dashboard.vue'

import Login from './components/Login.vue'

import Pictures from './components/modules/pictures/Pictures.vue'
import PictureDetail from './components/modules/pictures/PictureDetail.vue'

import Videos from './components/modules/videos/Videos.vue'
import VideoDetail from './components/modules/videos/VideoDetail.vue'

import Articles from './components/modules/articles/Articles.vue'
import ArticleDetail from './components/modules/articles/ArticleDetail.vue'
import Categories from './components/modules/categories/Categories.vue'
import CategoriesDetail from './components/modules/categories/CategoriesDetail.vue'
import CategoriesUpdate from './components/modules/categories/CategoriesUpdate.vue'
import CategoriesList from './components/modules/categories/CategoriesList.vue'
import Albums from './components/modules/albums/Albums.vue'
import AlbumDetail from './components/modules/albums/AlbumDetail.vue'

import ProductsList from './components/modules/productManagement/products/ProductsList.vue'
import ProductsDetail from './components/modules/productManagement/products/ProductsDetails.vue'

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
        path: '/articles/new',
        name: 'articleAdd',
        component: ArticleDetail
      }, {
        path: '/articles/:id/update',
        name: 'articleDetail',
        component: ArticleDetail
      }, {
        // Videos Routes
        path: '/videos',
        name: 'videos',
        component: Videos
      }, {
        path: '/videos/:id',
        name: 'videoDetail',
        component: VideoDetail
      }, {
        path: '/albums',
        name: 'albums',
        component: Albums
      }, {
        path: '/albums/new',
        name: 'albumAdd',
        component: AlbumDetail
      }, {
        name: 'albumDetail',
        path: '/albums/:id/update',
        component: AlbumDetail
      }, {
        path: '/categories',
        name: 'categories',
        component: Categories
      }, {
        path: '/categories/:name/:key/list-items',
        name: 'categoriesList',
        component: CategoriesList
      }, {
        path: '/categories/:name/:key/list-items/:id/update',
        name: 'categoriesDetail',
        component: CategoriesDetail
      }, {
        path: '/categories/:name',
        name: 'categoriesDetail',
        component: CategoriesDetail,
        children: [
          {
            path: ':id/update',
            name: 'categoriesUpdate',
            component: CategoriesUpdate
          }
        ]
      }, {
        path: '/products/new',
        name: 'productNew',
        component: ProductsDetail
      }, {
        path: '/products/:product',
        name: 'productsList',
        component: ProductsList
      }, {
        path: '/products/:product/:id',
        name: 'products',
        component: ProductsDetail
      }
    ]
  }
]

export default routes
