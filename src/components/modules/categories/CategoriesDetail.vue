<template>
  <div>
    <custom-tab>
      <h3>{{$t(`lang['${$route.params.name}'].category`)}}</h3>
      <el-row :gutter="20">
        <el-col :span="6">
          <h5>{{$t(`lang['${$route.params.name}'].list`)}}</h5>
        </el-col>
        <el-col :span="4" :offset="12">
          <el-button type="primary" @click="dialogFormVisible = true">{{$t(`lang['${$route.params.name}'].create`)}}</el-button>
        </el-col>
      </el-row>
      <hr>
      <el-dialog title="Trình tạo danh mục" :visible.sync="dialogFormVisible">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane v-for="(item, index) of categories" :key="index" :name="item" :label="$t(`lang['${item}'].default`)">
            <el-form :model="catForm">
              <el-form-item label="Lĩnh vực" :label-width="formLabelWidth">
                {{$t(`lang['${item}'].default`)}}
              </el-form-item>
              <el-form-item label="Tên danh mục" :label-width="formLabelWidth">
                <el-input v-model="catForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogFormVisible = false; createCategory(item)">Xác nhận</el-button>
            </span>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
      <custom-list :attrTable="['id','key']" :tableData="listItem"></custom-list>
    </custom-tab>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'Videos',
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        categories: ['pictures', 'videos', 'articles', 'albums'],
        activeName: null,
        catForm: {
          name: '',
          type: ''
        },
        listItem: []
      }
    },
    created () {
      this.$http.get('api/categories', { params: {type: this.$route.params.name} })
        .then(response => {
          if (response.status === 200) {
            this.listItem = response.body
          }
        })
    },
    mounted () {
      this.activeName = this.$route.params.name
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
      createCategory (item) {
        this.catForm.type = item
        this.$http.post('api/categories', this.catForm)
          .then(response => {
            if (response.status === 200) {
              console.log(1)
            }
          })
          .catch(function (e) {
            if (e.status === 401) {
              console.log(33342)
            }
          })
      }
    }
  }
</script>
