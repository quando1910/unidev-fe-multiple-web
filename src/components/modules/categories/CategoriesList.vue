<template>
  <div>
    <custom-tab>
      <h3>{{$t(`lang['${$route.params.name}'].category`)}}</h3>
      <el-row :gutter="20">
        <el-col :span="6">
          <h5>Tạo mặt hàng cho danh mục này</h5>
        </el-col>
        <el-col :span="4" :offset="12">
          <router-link :to="{name: 'productNew', query:{ type: this.$route.params.key }}">
            <el-button type="primary">Tạo mặt hàng cho danh mục này</el-button>
          </router-link>
        </el-col>
      </el-row>
      <hr>
      <custom-list :attrTable="['name','type','costHire', 'costBuy' , 'shortDesc']" :tableData="listItem"></custom-list>
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
        categories: ['pictures', 'videos', 'articles', 'albums', 'products'],
        activeName: null,
        catForm: {
          name: '',
          type: ''
        },
        listItem: []
      }
    },
    created () {
      this.$http.get('api/categories/wcode/items', { params: { type: this.$route.params.name, id: this.$route.params.key } })
        .then(response => {
          if (response.status === 200) {
            this.listItem = response.body[0].items
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
