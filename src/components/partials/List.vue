<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column v-for="(item,index) of attrTable" 
      :key="index"
      :prop="item"
      :label="item">
      <template  slot-scope="props">
        <div v-if="Array.isArray(props.row[`${item}`])"> 
          <p v-for="(item, index) of props.row[`${item}`]" :key="index">{{item}}</p>
        </div>
        <div v-else>
          <p>{{props.row[`${item}`]}}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="Operations">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.row)">Update</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'List',
  props: ['attrTable', 'tableData'],
  data: function () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
    handleEdit (row) {
      let id = row._id ? row._id : row.id
      this.$router.push({path: `${this.$route.path}/${id}/update`})
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss">
</style>
