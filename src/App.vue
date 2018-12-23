<template>
  <div id="app" class="wrapper skin-dark sidebar-mini">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      this.$http.get('api/users/me').then(res => {
        this.$store.commit('SET_USER', res.body)
        this.$store.commit('SET_ROLE', res.body.role)
        this.$store.commit('SET_UID', res.body.email)
      })
    }
  }
}
</script>
<style lang="scss">
  @import "sass/main";
</style>

