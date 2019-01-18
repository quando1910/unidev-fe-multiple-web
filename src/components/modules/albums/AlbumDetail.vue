<template>
  <div>
    <custom-tab>
      <h3>Thêm Album Ảnh</h3>
      <h5>Mục thông tin</h5>
      <hr>
      <el-form v-if="ruleForm" :model="ruleForm" :rules="name" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item :label="$t('lang.album.name')" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.album.type')" prop="name">
            <el-select v-if="options" v-model="ruleForm.type" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.key"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('lang.album.desc')" required>
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
         <el-form-item :label="$t('lang.album.checkin')" required>
          <el-input v-model="ruleForm.checkin"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.album.keyword')" prop="desc">
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
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
      </el-form>
      <h5>Mục thêm ảnh</h5>
      <hr>
      <el-upload
        class="edit-upload"
        multiple
        action=""
        :http-request="postImage"
        list-type="picture-card"
        :file-list="this.ruleForm.pictures"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <div style="float: right">
        <el-button type="default" @click="backtoAlbums">Quay lại</el-button>
        <el-button type="danger" v-show="$route.params.id" @click="removeAlbum">Xóa Album này</el-button>
        <el-button type="primary" @click="updateAlbum">{{$route.params.id ? 'Tạo Album': 'Cập Nhật Album'}}</el-button>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImage.url" alt="">
      </el-dialog>
    </custom-tab>
  </div>
</template>

<script>
  export default {
    name: 'Pictures',
    data: function () {
      return {
        dialogImage: {},
        dialogVisible: false,
        ruleForm: {},
        options: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.ruleForm.pictures.length === 0) {
        this.removeAlbum()
      }
      next()
    },
    created () {
      if (this.$route.params.id) {
        this.$http.get(`api/albums/${this.$route.params.id}`, this.ruleForm)
          .then(response => {
            this.ruleForm = response.body
          })
      } else {
        this.$http.post('api/albums', this.ruleForm)
          .then(response => {
            this.ruleForm = response.body
          })
      }
      this.$http.get('api/categories', { params: {type: 'albums'} })
        .then(response => {
          if (response.status === 200) {
            this.options = response.body
          }
        })
    },
    methods: {
      handleRemove: function (file, fileList) {
        this.ruleForm.pictures = this.ruleForm.pictures.filter(x => x._id !== file._id)
        this.$http.delete(`api/pictures/${file._id}`)
          .then(response => {
            this.$http.put(`api/albums/${this.ruleForm._id}`, this.ruleForm)
              .then(response => {
              })
          })
      },
      handlePictureCardPreview: function (file) {
        this.dialogImage = file
        this.ruleForm = {
          name: file.name,
          desc: file.desc,
          type: file.type
        }
        this.dialogVisible = true
      },
      updateAlbum () {
        this.$http.put(`api/albums/${this.ruleForm._id}`, this.ruleForm)
          .then(response => {
            this.$router.push({name: 'albums'})
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
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      postImage (req) {
        const formData = new FormData()
        formData.append(`albums/${this.ruleForm._id}`, req.file)
        formData.append('albumId', this.ruleForm._id)
        this.$http.post('api/pictures/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            var image = response.body[0]
            image.url = this.$options.filters.takeImage(image.path)
            this.ruleForm.pictures.push(image)
            this.$http.put(`api/albums/${this.ruleForm._id}`, this.ruleForm)
              .then(res => {
                console.log(1)
              })
          })
      },
      backtoAlbums () {
        this.$router.push({name: 'albums'})
      },
      removeAlbum () {
        this.$http.delete(`api/albums/${this.ruleForm._id}`)
          .then(response => {
            this.$router.push({name: 'albums'})
          })
      }
    }
  }
</script>
<style lang="scss">
  .el-upload__input{
    display: none !important;
  }
  .el-upload--picture-card {
    margin-bottom: 20px; 
  }
  .edit-upload {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
