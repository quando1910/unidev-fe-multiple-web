<template>
  <div id="app" class="wrapper skin-dark sidebar-mini">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './store'

export default {
  name: 'App',
  created () {
    this.$http.get('api/users/me').then(res => {
      store.commit('SET_USER', res.body)
    })
  }
}
</script>
<style lang="scss">
  @import "sass/main";
</style>

