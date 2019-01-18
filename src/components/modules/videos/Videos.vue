<template>
  <div>
    <custom-tab>
      <h3>{{$t('lang.videoUpload')}}</h3>
      <p>{{$t('lang.videoUploadDesc')}}</p>
      <el-row>
        <el-col :span="5">
          <el-select v-model="linkType" :change="verifyLink(inputLink)" placeholder="Select">
            <el-option label="FACEBOOK" value="1"></el-option>
            <el-option label="YOUTUBE" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="15">
          <el-input :placeholder="$t('lang.videoUploadPlaceHodler')" v-model="inputLink" @blur="verifyLink(inputLink)" >
            <template slot="prepend">Https://</template>
          </el-input>
        </el-col>
      </el-row>
      <el-alert
        v-if="ruleForm.link"
        title="Đã get video thành công!"
        type="success"
        show-icon>
      </el-alert>
      <el-alert
        v-if="!ruleForm.link"
        title="Có lỗi về loại video hoặc link video"
        type="warning"
        show-icon>
      </el-alert>
      <h5>{{$t('lang.videoUpload')}}</h5>
      <el-col :span="15">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item :label="$t('lang.video.type')" prop="type">
          <el-select v-if="options" v-model="ruleForm.type" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.key"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'ID video'" required>
          <el-input v-model="ruleForm.link" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.video.title')" required>
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.video.desc')" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('lang.button.create')}}</el-button>
          <el-button @click="resetForm('ruleForm')">{{$t('lang.button.reset')}}</el-button>
        </el-form-item>
      </el-form>
      </el-col>
    </custom-tab>
    <custom-tab>
      <h5>{{$t('lang.picList')}}</h5>
      <hr>
      <custom-list :attrTable="['name','type','link']" :tableData="videos"></custom-list>
    </custom-tab>
  </div>
</template>

<script>
  export default {
    name: 'Videos',
    data () {
      return {
        linkType: null,
        ruleForm: {
          name: '',
          link: '',
          type: null,
          desc: ''
        },
        options: [],
        videos: [],
        inputLink: null,
        outputLink: null,
        rules: {
          name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
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
      this.$http.get('api/categories', { params: {type: 'videos'} })
        .then(response => {
          if (response.status === 200) {
            this.options = response.body
          }
        })
      this.$http.get('api/videos')
        .then(response => {
          if (response.status === 200) {
            this.videos = response.body
          }
        })
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/videos', this.ruleForm)
              .then(response => {
                this.ruleForm = response.body
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      verifyLink (url) {
        /* eslint-disable */
        if (+this.linkType === 2) {
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
          var match = url.match(regExp)
          this.ruleForm.link = (match && match[7].length === 11) ? match[7] : false
        } else if (+this.linkType === 1) {
          var regExp = new RegExp(/^(https?:\/\/){0,1}(www\.){0,1}facebook\.com/)
          this.ruleForm.link = regExp.test(url) ? encodeURIComponent(url) : false
        }
        /* eslint-enable */
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style scoped>
.el-alert {
  margin: 10px 0; 
}
</style>
