<template>
  <div v-loading="loading">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <transition name="el-zoom-in-top">
      <div class="content-wrapper">
        <section class="content-header">
          <h1>Tinymce Editor<small><i class="ti-heart"></i><i class="ti-export"></i><i class="ti-printer"></i></small></h1>
          <ol class="breadcrumb">
            <li><router-link to="/"> <i class="ti-home"></i></router-link></li>
            <li><a href="#">UI Element</a></li>
            <li class="active">Tinymce Editor</li>
          </ol>
        </section>
        <router-view :key="$route.path"></router-view>
      </div>
    </transition>
    <app-footer></app-footer>
    <control-sidebar></control-sidebar>
  </div>
</template>

<script>
  import Sidebar from './partials/Sidebar.vue'
  import Header from './partials/Header.vue'
  import Footer from './partials/Footer.vue'
  import ControlSidebar from './partials/ControlSidebar.vue'

  export default {
    name: 'Dashboard',
    components: {
      'app-sidebar': Sidebar,
      'app-header': Header,
      'app-footer': Footer,
      'control-sidebar': ControlSidebar
    }
  }
</script>
