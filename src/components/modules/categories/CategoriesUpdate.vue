<template>
  <div>
    <el-dialog v-if="category" :before-close="backtoList" title="Trình xử lý danh mục" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="Lĩnh vực" :label-width="formLabelWidth">
          {{$t(`lang['${this.$route.params.name}'].default`)}}
        </el-form-item>
        <el-form-item label="Mã số" :label-width="formLabelWidth">
          {{this.$route.params.id}}
        </el-form-item>
        <el-form-item label="Tên danh mục" :label-width="formLabelWidth">
          <el-input v-model="category.key" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="backtoList">Cancel</el-button>
        <el-button type="danger" @click="backtoList(); deleteCategory(item)">Xóa</el-button>
        <el-button type="primary" @click="backtoList(); updateCategory(item)">Chỉnh sửa</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Videos',
    data () {
      return {
        dialogFormVisible: true,
        formLabelWidth: '120px',
        categories: ['pictures', 'videos', 'articles', 'albums'],
        catForm: {
          name: '',
          type: ''
        },
        category: null
      }
    },
    created () {
      this.$http.get(`api/categories/${this.$route.params.id}`, { params: {type: this.$route.params.name} })
        .then(response => {
          this.category = response.body
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
      backtoList () {
        this.$router.push({name: 'categoriesDetail'})
      },
      updateCategory (item) {
        this.$http.put(`api/categories/${this.$route.params.name}`, this.category)
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
      },
      deleteCategory (item) {
        this.$http.delete(`api/categories/${this.$route.params.name}`, { params: {id: this.category.id} })
          .then(response => {
            console.log(response)
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
