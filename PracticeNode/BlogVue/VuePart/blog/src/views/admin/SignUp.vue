<template>
  <div id="sign-part">
      <h1>后台管理页面</h1>
      <el-input v-model="username" placeholder="请输入用户名" class="username"></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password class="password"></el-input>
      <el-button class="register" @click="signup">注册</el-button>
      <el-button class="login" type="primary" @click="signin">登录</el-button>
  </div>
</template>

<script>
  import {request} from 'network/request';
  import qs from 'qs';

  export default {
      name:'SignUp',
      data() {
        return {
          username: '',
          password: '',
          hasName: ''
        }
      },
      methods: {
        signup(){
          let self = this
          if (this.username.length < 3 || this.password.length < 6) {
            this.$message.error("用户名小于3个字符或密码小于6个字符");
          } else {
            request({
            method: 'get',
            url : `/api/admin/getUser/${this.username}`
          }).then(res => {
              // 用户名存在
              //console.log("res", res.data.username);
              //console.log("username",_this.username);
              if (res.data.username === self.username) {
                self.$message.error('该用户已存在')
              } else {
                let data = {
                  username : self.username,
                  password : self.password
                }
                //let data = qs.stringify(params)
                // var params = new URLSearchParams();
                //console.log(data);
                // params.append('username', _this.username)
                // params.append('password', _this.password)
                /*
                * axios发送post请求要使用qs模块进行序列化才能在后端请求成功
                *   否则后端会报错
                *或者使用URLSearchParams使其类似于get方法将参数拼接到url后面，用res.query获取
                */
                request({
                  method: 'post',
                  url: '/api/admin/signup',
                  data,
                  //headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }).then(
                  response => {
                    //console.log(response);
                    self.$message({
                      message: '注册成功',
                      type: 'success'
                    })
                  }
                )
              }
            })
            .catch(err => {
              self.$message.error('注册失败')
            })
          }
        },
        signin(){
          let self = this
          let data = {
            username : this.username,
            password : this.password
          }
          // 前端验证用户名和密码是否合法
          if (this.username.length < 3 || this.password.length < 6) {
            this.$message.error("用户名小于3个字符或密码小于6个字符");
          } else {
            request({
              method : "post",
              url : '/api/admin/signin',
              data,
            }).then(res => {
              // 后端会返回一个stateCode给前端
              if (res.data.stateCode === 2) {
                self.$message({
                  message : "登陆成功",
                  type : "success"
                })
                // 登录成功后删除前端页面密码
                delete self.password;
                self.$router.go(-1)
              } else {
                self.$message.error("用户名或密码错误")
              }
            }).catch(err => {
              self.$message.error("登录失败")
            })
          }
        }
      }
  }
</script>

<style lang='less' scoped>
  #sign-part{
    width: 400px;
    height: 400px;
    margin: 100px auto;
    > h1 {
      text-align: center;
      margin-bottom: 10px;
    }
    > .password, .username {
      margin-bottom: 20px;
    }
    > .register {
      margin: 0 auto;
    }
  }
</style>
