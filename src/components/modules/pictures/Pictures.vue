<template>
  <div>
    <custom-tab>
      <h5>{{$t('lang.picUpload')}}</h5>
      <hr>
      <el-upload
        class="edit-upload"
        action=""
        :http-request="postImage"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImage.url" alt="">
        <h5>Sửa thông tin ảnh</h5>
        <el-form :model="ruleForm" :rules="name" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item :label="$t('lang.picture.name')" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.picture.type')" prop="name">
             <el-select v-if="options" v-model="ruleForm.type" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.key"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'Chọn ảnh vào'">
            <div>
              <el-checkbox v-model="ruleForm.slider" label="Slider" border></el-checkbox>
              <el-checkbox v-model="ruleForm.favorite" label="Trang chủ" border></el-checkbox>
            </div>
          </el-form-item>
          <el-form-item :label="'Đại diện Album'">
            <div>
              <el-select v-if="options" v-model="ruleForm.album_id" placeholder="Select">
                <el-option
                  v-for="item in albums"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item :label="$t('lang.picture.desc')" required>
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-button type="default" @click="dialogVisible = false">Quay lại</el-button>
          <el-button type="danger" @click="deletePicture(dialogImage)">Xóa</el-button>
          <el-button type="primary" @click="updatePicture(dialogImage)">Chỉnh sửa</el-button>
        </el-form>
      </el-dialog>
    </custom-tab>
    <custom-tab>
      <h5>{{$t('lang.picList')}}</h5>
      <hr>
      <custom-list :attrTable="['a','b','c']" :tableData="[{'a':1, 'b':2, 'c':3},{ 'a':1, 'b':2, 'c':3}]"></custom-list>
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
        fileList: [],
        ruleForm: {},
        options: [],
        albums: []
      }
    },
    created () {
      this.$http.get('api/pictures')
        .then(response => {
          this.fileList = response.body.map(x => { x.url = this.$options.filters.takeImage(x.path); return x })
          console.log(this.fileList)
        })
      this.$http.get('api/categories', { params: {type: 'pictures'} })
        .then(response => {
          if (response.status === 200) {
            this.options = response.body
          }
        })
      this.$http.get('api/albums')
        .then(response => {
          if (response.status === 200) {
            this.albums = response.body
          }
        })
    },
    methods: {
      handleRemove: function (file, fileList) {
        this.$http.delete(`api/pictures/${file._id}`)
          .then(response => {
            console.log(1)
          })
      },
      handlePictureCardPreview: function (file) {
        this.dialogImage = file
        this.ruleForm = {
          name: file.name,
          desc: file.desc,
          type: file.type,
          slider: file.slider,
          album_id: file.album_id,
          favorite: file.favorite
        }
        this.dialogVisible = true
      },
      deletePicture (image) {
        this.$http.delete(`api/pictures/${image._id}`)
          .then(response => {
            this.dialogVisible = false
          })
      },
      updatePicture (image) {
        this.$http.put(`api/pictures/${image._id}`, this.ruleForm)
          .then(response => {
            this.dialogVisible = false
          })
      },
      postImage (req) {
        const formData = new FormData()
        formData.append('pictures', req.file)
        this.$http.post('api/pictures', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            let image = response.body[0]
            image.url = this.$options.filters.takeImage(image.path)
            this.fileList.push(image)
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
