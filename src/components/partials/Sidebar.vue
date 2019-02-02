<template>
  <aside class="main-sidebar">
    <div>
      <section class="sidebar">
        <div class="user-panel" v-if="me">
          <div class="image"> <img :src="me.avatar | takeImage" class="img-circle" alt="User Image"> </div>
          <div class="info">
            <p>Good Job,<br> {{me.name}}</p>
            <p><small>You haven,t miss any task this week!</small></p>
            <div>
              <a href="#"><i class="ti-panel"></i><small>Settings</small></a> 
              <router-link :to="{path: '/profile'}"><i class="ti-user"></i><small>Profile</small></router-link> 
              <a href="#"><i class="ti-power-off"></i><small>Logout</small></a> 
            </div>
          </div> 
          <img class="bg-user" src="" alt="User Image"> 
        </div>
        <ul class="sidebar-menu">
          <li class="header">Công cụ website</li>
          <li class="treeview">
            <a href="#"> <i class="ti-desktop"></i> 
              <span>Trang chủ</span> 
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span> 
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/dashboard">Dashboard 1</router-link>
              </li>
              <li>
                <router-link to="/dashboard-second">Dashboard 2</router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/pictures"> <i class="ti-image"></i> <span class="capitalize-text">{{$t('lang.picManager')}}</span> </router-link>
          </li>
          <li>
            <router-link to="/albums"> <i class="ti-image"></i> <span class="capitalize-text">{{$t('lang.albumManager')}}</span> </router-link>
          </li>
          <li>
            <router-link to="/articles"> <i class="ti-image"></i> <span class="capitalize-text">{{$t('lang.articleManager')}}</span> </router-link>
          </li>
          <li>
            <router-link to="/videos"> <i class="ti-video-camera"></i> <span class="capitalize-text">{{$t('lang.videoManager')}}</span> </router-link>
          </li>
          <li>
            <router-link to="/categories"> <i class="ti-video-camera"></i> <span class="capitalize-text">{{$t('lang.catManager')}}</span> </router-link>
          </li>
          <li class="header">Quản lý bán hàng</li>
            <li>
              <router-link to="/categories/products"> <i class="ti-video-camera"></i> <span class="capitalize-text">Danh mục hàng hóa</span> </router-link>
            </li>
            <li class="treeview">
              <a>
                <i class="ti-bar-chart"></i> 
                <span>Danh sách mặt hàng</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span> 
              </a>
              <ul class="treeview-menu">
                <li v-for="(item, index) of typesProduct" :key="index">
                  <router-link :to="{name: 'categoriesList', params:{name: 'products', key: item.id}}">{{item.key}}</router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="/categories"> <i class="ti-video-camera"></i> <span class="capitalize-text">Thống kê bán hàng</span> </router-link>
            </li>
            <li class="header palette-Cyan-400 bg">DEVIN VUE 1.2</li>
            <li> 
              <a href="http://ndesaintheme.com/devin/doc"><span>Documentation</span>
                <span class="pull-right-container">
                  <i class="fa ti-agenda pull-right version"></i>
                </span>
              </a>
            </li>
            <li> 
              <a href="#"><span>About</span>
                <span class="pull-right-container">
                  <i class="fa ti-info-alt pull-right version"></i>
                </span>
              </a>
            </li>
            <li> 
              <a href="#"><span>Feedback</span>
                <span class="pull-right-container">
                  <i class="version fa ti-package pull-right"></i>
                </span>
              </a>
            </li>
            <li>
              <br>
              <br>
              <br>
            </li>
          </ul>
      </section>
    </div>
  </aside>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardSidebar',
  data () {
    return {
      types: [],
      me: null,
      typesProduct: []
    }
  },
  created () {
    this.$http.get('api/categories', { params: {type: 'products'} })
      .then(response => {
        if (response.status === 200) {
          this.typesProduct = response.body
        }
      })
  },
  mounted () {
    $(document).ready(function ($) {
      $('.main-sidebar > div').slimScroll({
        width: '230px',
        position: 'left',
        size: '5px',
        height: '95vh'
      })
    })
  },
  computed: {
    ...mapGetters({
      role: 'role'
    })
  }
}
</script>
<style>
.img-circle {
  height: 100px !important;
  width: 100px !important;
  object-fit: cover;
}
</style>