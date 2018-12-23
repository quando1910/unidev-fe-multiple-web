<template>
  <div>
    <section class="content-header">
      <router-link :to="{name: `${componentName}List`, params: {product: $route.params.product}}"><button type="button" style="float: right" class="el-button el-button--primary"><span>Back to List</span></button></router-link>
      <ol class="breadcrumb">
        <li><router-link to="/"> <i class="ti-home"></i></router-link></li>
        <li><a href="#">Table</a></li>
        <li class="active">Simple Table</li>
      </ol>
    </section>
    <section class="content">
      <div class="box">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'New',
  props: ['titleList', 'urlList', 'componentName'],
  data: function () {
    return {
      tableData: [{
        id: 1,
        a: '2016-05-03',
        b: 'Tom',
        c: 'No. 189, Grove St, Los Angeles'
      }, {
        id: 2,
        a: '2016-05-02',
        b: 'Tom',
        c: 'No. 189, Grove St, Los Angeles'
      }, {
        id: 3,
        a: '2016-05-04',
        b: 'Tom',
        c: 'No. 189, Grove St, Los Angeles'
      }, {
        id: 4,
        a: '2016-05-04',
        b: 'Tom',
        c: 'No. 189, Grove St, Los Angeles'
      }, {
        id: 5,
        a: '2016-05-04',
        b: 'Tom',
        c: 'No. 189, Grove St, Los Angeles'
      }, {
        id: 6,
        a: '2016-05-01',
        b: 'Tom',
        c: 'No. 189, Grove St, Los Angeles'
      }]
    }
  },
  mounted: function () {
  },
  methods: {
    handleEdit (row) {
      this.$router.push({name: this.urlList, params: { id: row.id }})
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss">
</style>
