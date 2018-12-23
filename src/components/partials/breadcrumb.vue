<template>
  <div>
    <section class="content-header">
      <slot name="button"></slot>
      <ol class="breadcrumb">
        <li><router-link to="/"> <i class="ti-home"></i></router-link></li>
        <li><a href="#">Table</a></li>
        <li class="active">Simple Table</li>
      </ol>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
</style>
