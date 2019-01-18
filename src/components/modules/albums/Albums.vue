<template>
  <div>
    <custom-tab>
      <el-row :gutter="20">
        <el-col :span="6">
          <h5>{{$t('lang.albumList')}}</h5>
        </el-col>
        <el-col :span="4" :offset="14">
          <el-button type="primary" @click="$router.push({path: `${$route.path}/new`})">{{$t('lang.albumCreate')}}</el-button>
        </el-col>
      </el-row>
      <hr>
      <custom-list :attrTable="['name','type','keyword', 'desc', 'num']" :tableData="albums"></custom-list>
    </custom-tab>
  </div>
</template>

<script>
  export default {
    name: 'Videos',
    data () {
      return {
        albums: []
      }
    },
    created () {
      this.$http.get('api/albums')
        .then(res => {
          this.albums = res.body
          console.log(this.albums)
        })
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
