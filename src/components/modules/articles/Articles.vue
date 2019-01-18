<template>
  <div>
    <custom-tab>
      <el-row :gutter="20">
        <el-col :span="6">
          <h5>{{$t('lang.articleList')}}</h5>
        </el-col>
        <el-col :span="4" :offset="14">
          <el-button type="primary" @click="$router.push({path: `${$route.path}/new`})">{{$t('lang.articleCreate')}}</el-button>
        </el-col>
      </el-row>
      <hr>
      <custom-list :attrTable="['title','type','desc', 'created_at']" :tableData="articles"></custom-list>
    </custom-tab>
  </div>
</template>

<script>
  export default {
    name: 'Videos',
    data () {
      return {
        articles: []
      }
    },
    created () {
      this.$http.get('api/articles')
        .then(response => {
          this.articles = response.body
        })
    }
  }
</script>
