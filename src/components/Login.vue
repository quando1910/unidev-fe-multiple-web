<template>
    <transition name="el-zoom-in-top">
        <div class="content-wrapper">
            <section class="content-header">
                <h1>Blank Page<small>It's all start from here <i class="ti-heart"></i><i class="ti-export"></i><i class="ti-printer"></i></small></h1>
                <ol class="breadcrumb">
                    <li>
                        <router-link to="/"> <i class="ti-home"></i></router-link>
                    </li>
                    <li><a href="#">Common Page</a></li>
                    <li class="active">Login Page</li>
                </ol>
            </section>
            <section class="content">
                <el-dialog title="Login" :visible.sync="dialogVisible" size="tiny" visible="false" :before-close="handleClose">
                    <div class="account-box">
                        <form role="form">
                            <div class="form-group"> <a href="#" class="pull-right label-forgot">Forgot email?</a>
                                <label for="inputUsernameEmail">Username or email</label>
                                <input type="text" id="inputUsernameEmail" v-model="loginInfo.email" class="form-control"> </div>
                            <div class="form-group"> <a href="#" class="pull-right label-forgot">Forgot password?</a>
                                <label for="inputPassword">Password</label>
                                <input type="password" id="inputPassword" v-model="loginInfo.password"  class="form-control"> </div>
                            <div class="checkbox pull-left">
                                <label>
                                    <input type="checkbox">Remember me</label>
                            </div>
                            <button class="btn btn btn-primary pull-right" @click="submitLogin()"><router-link style="color:#fff" to="/"> Log In </router-link></button>
                        </form>
                        <a class="forgotLnk" href="#"></a>
                        <div class="or-box">
                            <center><span class="text-center login-with">Login or <b>Sign Up</b></span></center>
                            <div class="row">
                                <div class="col-md-6 row-block">
                                    <a href="#" class="btn btn-facebook btn-block"> <span class="ti-facebook space-icon"></span>Facebook</a>
                                </div>
                                <div class="col-md-6 row-block">
                                    <a href="#" class="btn btn-twitter btn-block"> <span class="ti-twitter space-icon"></span>Twitter</a>
                                </div>
                            </div>
                            <div style="margin-top:25px" class="row">
                                <div class="col-md-6 row-block"> <a href="#/profile" class="btn btn-google btn-block"><span class="ti-google space-icon"></span>Google +</a> </div>
                                <div class="col-md-6 row-block"> <a href="#" class="btn btn-instagram btn-block"><span class="ti-instagram space-icon"></span>Instagram</a> </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row-block">
                            <div class="row">
                                <div class="col-md-12 row-block"> <a href="#" class="btn btn-primary btn-block">Create New Account</a> </div>
                            </div>
                        </div>
                    </div>
                </el-dialog>
            </section>
        </div>
    </transition>
</template>
<script>
  export default {
    data: function () {
      return {
        dialogVisible: false,
        loginInfo: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      handleClose: function (done) {
        this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
      },
      submitLogin () {
        this.$http.post('api/auth', this.loginInfo)
          .then(response => {
            if (response.status === 200) {
              localStorage.setItem('ACCESS_TOKEN', response.body.access_token)
              localStorage.setItem('TEAM_ID', response.body.team)
              this.$http.headers.common['Authorization'] = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
              window.location.href = '/'
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
