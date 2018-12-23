<template>
  <div>
    <bread-crumb>
      <template slot="button">
        <router-link :to="{ path: 'new'}" append><button type="button" style="float: right" class="el-button el-button--primary"><span>New {{titleList}}</span></button></router-link>
      </template>
    </bread-crumb>
    <section class="content">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Name List</h3>
          <div class="box-tools pull-right">
            <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" class="btn btn-box-tool"><i class="ti-minus"></i></button>
            <button type="button" data-widget="remove" data-toggle="tooltip" title="Remove" class="btn btn-box-tool"><i class="ti-close"></i></button>
          </div>
        </div>
        <div class="box-body">
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['attrTable', 'titleList', 'urlList', 'tableData'],
  data: function () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
    handleEdit (row) {
      this.$router.push({path: `${this.$route.path}/${row._id}`})
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss">
</style>
