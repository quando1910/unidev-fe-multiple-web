<template>
  <div class="box"> 
    <custom-tab>
      <div class="box-header with-border">
        <h3 class="box-title">Create a product</h3>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <h3>Basic</h3>
        <el-form-item label="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="costHire">
          <el-input v-model="form.costHire"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.article.cover')" prop="cover">
          <img :src="form.thumbnail" class="article-preview">
          <el-upload
            action=""
            :http-request="postImage"
            :on-success="handleAvatarSuccess"
            list-type="picture">
            <el-button size="small" type="primary" >Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">should be jpg/png files</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="costBuy">
          <el-input v-model="form.costBuy"></el-input>
        </el-form-item>
        <el-form-item label="shortDesc">
          <el-input v-model="form.shortDesc"></el-input>
        </el-form-item>
        <el-form-item label="desc">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="type">
          <span>{{form.type}}</span>
        </el-form-item>
        <h3>Additional Attributes</h3>
        <el-row>
          <el-col :span="12" v-for="(item, index) of type.attrs" :key="index" >
            <el-form-item :label="item">
              <el-input v-model="form.attributes[item]"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="float: right">
        <el-button type="success" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </div>
    </custom-tab>
  </div>
</template>
<script>
import New from '../../../partials/New.vue'

export default {
  name: 'ProductNew',
  components: {
    'new': New
  },
  data () {
    return {
      type: [],
      form: {
        name: null,
        costHire: 0,
        costBuy: 0,
        shortDesc: '',
        desc: '',
        attributes: {},
        type: null,
        thumbnail: null
      },
      options: []
    }
  },
  created () {
    this.form.type = this.$route.query.type ? this.$route.query.type : null
    this.$http.get(`api/products`).then(res => {
      console.log(res.body)
    })
  },
  methods: {
    onSubmit () {
      this.$http.post(`api/products`, this.form).then(res => {
        if (res.status === 201) {
          this.$router.push({path: '/categories/products'})
        }
      })
    },
    onCancel () {
      this.$router.push({path: '/categories/products'})
    },
    postImage (req) {
      const formData = new FormData()
      formData.append('product-thumb', req.file)
      this.$http.post('api/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.form.thumbnail = this.$options.filters.takeImage(response.body[0].path)
        })
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.thumbnail = URL.createObjectURL(file.raw)
    }
  }
}
</script>
<style lang="scss">
</style>