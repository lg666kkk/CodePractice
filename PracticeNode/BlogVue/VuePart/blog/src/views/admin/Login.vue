<template>
  <div class="login">
    <section class="form_container">
      <div class="manger_tip">
        <span class="title">博客管理登录页面</span>
        <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <div class="btn_div">
            <el-form-item>
              <el-button type="primary" class="submit_btn" @click="submitFrom('loginForm')">登录</el-button>
            </el-form-item>
          </div>
          <div class="tiparea">
            <p>还没有账号?现在<router-link class="tiparea_text" to="/admin/register">注册</router-link></p>
          </div>
      </el-form>
      </div>
    </section>
  </div>
</template>

<script>
  import {request} from 'network/request';
  import qs from 'qs'
  import jwt_decode from 'jwt-decode'
  export default {
      name:'Login',
      data() {
        return {
          loginUser: {
            email: "",
            password: ""
          },
          rules: {
            email: [
              {
                type: "email",
                required: true,
                message: "邮箱格式不正确",
                trigger: "blur"
              }
            ],
            password: [
              {
                required: true,
                message: "密码不能为空",
                trigger: "blur"
              },
              {
                min: 6,
                max: 30,
                message: "长度在6-30之间",
                trigger: "blur"
              }
            ]
          }
        }
      },
      methods: {
        submitFrom(formName) {
          let self = this
          let data = qs.stringify(this.loginUser)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              request({
                method: 'post',
                url: '/api/admin/signin',
                data,
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
              })
              .then(user => {
                //console.log(user);
                //登录成功，拿到token
                const { token } = user.data
                // 将token存储到localStorage中
                localStorage.setItem('Token', token)
                // 解析token
                const decoded = jwt_decode(token)
                //console.log(decoded);
                // 将token存储到vuex中
                this.$store.dispatch('setAuthencated', !this.isEmpty(decoded))
                this.$store.dispatch('setUser', decoded)

                // 路由跳转
                this.$router.push('/')
              })
            }
          });
        },
        isEmpty(value) {
          return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) || 
            (typeof value === "string" && value.trim().length === 0) 
          );
        }
      }
  }
</script>

<style scoped>
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;;
}
.form_container .manger_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
}
.loginForm {
  margin-top: 20px;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #ccc;
}
.btn_div{
  display: block;
}
.submit_btn{
  width: 173px;
}
.tiparea {
  text-align: right;
}
.tiparea .tiparea_text {
  display: inline;
  color: blue;
}
</style>
