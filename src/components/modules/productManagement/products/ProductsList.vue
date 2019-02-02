<template>
  <div class="box">
    <list v-if="type && data" :attrTable="attrs"  :tableData="data" :titleList="type.name.toLowerCase().trim()" :componentName="'Products'"  :urlList="`/products/${type._id}/new`"/>
  </div>
</template>
<script>
import List from '../../../partials/List.vue'

export default {
  name: 'ProductsList',
  components: {
    'list': List
  },
  data () {
    return {
      type: null,
      attrs: ['name', 'costBuy', 'costHire', 'shortDesc'],
      data: null
    }
  },
  created () {
    this.$http.get(`api/productTypes/${this.$route.params.product}`).then(res => {
      this.type = res.body
      this.attrs = this.attrs.concat(res.body.attrs)
    })
    this.$http.get(`api/products/${this.$route.params.product}`).then(res => {
      this.data = res.body
      this.data.map((x) => {
        Object.keys(x.attributes)
          .forEach(function eachKey (key) {
            x[key] = x.attributes[key]
          })
      })
    })
  }
}
</script>
<style lang="scss">
</style>