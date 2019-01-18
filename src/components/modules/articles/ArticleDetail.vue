
<template>
  <div>
    <custom-tab>
      <h3>{{$t('lang.articleCreate')}}</h3>
      <p>{{$t('lang.articleCreateDesc')}}</p>
      <el-col :span="15">
      <h5>{{$t('lang.articleCreateBasic')}}</h5>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item :label="$t('lang.article.name')" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.article.desc')" required>
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.article.cover')" prop="desc">
          <img :src="ruleForm.thumbnail" class="article-preview">
          <el-upload
            action=""
            :http-request="postImage"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            list-type="picture">
            <el-button size="small" type="primary" >Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">should be jpg/png files</div>
          </el-upload>
        </el-form-item>
        <h5>{{$t('lang.articleCreateAdv')}}</h5>
        <el-form-item :label="$t('lang.article.type')" prop="desc">
          <el-select v-if="options" v-model="ruleForm.type" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.key"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('lang.article.keyword')" prop="desc">
          <el-tag
            :key="tag"
            v-for="tag in ruleForm.keyword"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item :label="$t('lang.article.content')" prop="desc">
          <div class="editor">
            <quill-editor v-model="ruleForm.content"
              ref="myQuillEditor"
              :options="editorOption">
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('lang.button.create')}}</el-button>
          <el-button @click="resetForm('ruleForm')">{{$t('lang.button.cancel')}}</el-button>
        </el-form-item>
      </el-form>
      </el-col>
    </custom-tab>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'
export default {
  name: 'ArticleAdd',
  components: {
    quillEditor
  },
  data () {
    return {
      inputVisible: false,
      inputValue: '',
      options: null,
      value: '',
      title: '',
      content: '',
      imageList: [],
      editContent: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
      },
      ruleForm: {
        title: '',
        desc: '',
        type: null,
        thumbnail: null,
        keyword: [],
        content: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, message: 'Length should be min from 3 ', trigger: 'blur' }
        ],
        region: [
          { required: true, message: 'Please select Activity zone', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please input activity form', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$http.get(`api/categories`, { params: {type: 'articles'} })
      .then(response => {
        if (response.status === 200) {
          this.options = response.body
        }
      })
    if (this.$route.params.id) {
      this.$http.get(`api/articles/${this.$route.params.id}`, { params: {type: 'articles'} })
        .then(response => {
          if (response.status === 200) {
            this.ruleForm = response.body
          }
        })
    }
  },
  mounted () {
    document.getElementsByClassName('ql-image')[0].onclick = () => {
      this.editContent = this.content
      document.getElementsByClassName('ql-image')[1].onchange = () => {
        this.getLinkImg(event.target.files[0])
      }
    }
  },
  watch: {
    linkImg: function (value) {
      this.onEditorChange(value)
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (this.$route.params.id) {
          this.$http.put(`api/articles/${this.$route.params.id}`, this.ruleForm)
            .then(response => {
              this.$router.push({name: 'articles'})
            })
        } else {
          this.$http.post('api/articles', this.ruleForm)
            .then(response => {
              this.$router.push({name: 'articles'})
            })
        }
      })
    },
    postImage (req) {
      const formData = new FormData()
      formData.append('post-thumb', req.file)
      this.$http.post('api/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.ruleForm.thumbnail = this.$options.filters.takeImage(response.body[0].path)
        })
    },
    getLinkImg (payload) {
      const formData = new FormData()
      formData.append('post-images', payload)
      this.$http.post('api/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          let file = response.body[0]
          let img = document.createElement('img')
          this.imageList.push(file)
          img.src = this.$options.filters.takeImage(file.path)
          this.editContent += img.outerHTML
          this.content = this.editContent
        }, function (error) {
          console.log(error)
        })
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.thumbnail = URL.createObjectURL(file.raw)
    },
    handleClose (tag) {
      this.ruleForm.keyword.splice(this.ruleForm.keyword.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.ruleForm.keyword.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onEditorChange (value) {
      var img = document.createElement('img')
      this.imageList.push(value)
      img.src = this.$options.filters.takeImage(value)
      this.editContent += img.outerHTML
      this.content = this.editContent
    },
    resizeImg () {
    }
  }
}
</script>
<style lang="scss">
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.snow.css';
@import '~quill/dist/quill.bubble.css';

.quill-code {
  border: none;
  height: auto;
  > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0;
    height: 10rem;
    overflow-y: auto;
    resize: vertical;
  }
}
.ql-editor {
  height: 30rem;
}
.editor {
  min-width: 900px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 100px !important;
  margin-left: 10px;
  vertical-align: bottom;
}
.article-preview {
  width: 200px;
}
</style>
