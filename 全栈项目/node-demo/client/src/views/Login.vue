<template>
  <div class="login">
    <section class="form_contaoner">
      <div class="manger_tip">
        <span class="title">后台管理系统</span>
        <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitFrom('loginForm')">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号?现在<router-link to="/register">注册</router-link></p>
          </div>
      </el-form>
      </div>
    </section>
  </div>
</template>

<script>
  import qs from 'qs';
  import jwt_decode from 'jwt-decode'
  export default {
      name:'Login',
      data(){
        return {
          loginUser: {
            email: "",
            password:"",
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
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //this.loginUser = qs.stringify(this.loginUser)
              // console.log(this.registerUser);
              this.$axios.post('/api/user/login', qs.stringify(this.loginUser),
                {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
              )
                .then((res) => {
                  //console.log(res);
                  // 拿到token
                  const { token } = res.data
                  // 将token存储到localStore中
                  localStorage.setItem("eleToken", token)
                  // 解析token
                  const decode = jwt_decode(token)
                  //console.log(decode);
                  // 将token存储到vuex中
                  this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
                  this.$store.dispatch('setUser', decode)

                  this.$router.push('/index')
                })
            }
          });
        },
        // 判断是否为空，为空返回一个true
        isEmpty(value) {
          return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) || 
            (typeof value === "string" && value.trim().length === 0) 
          );
        }
      },
  }
</script>

<style scoped>
.login{
    position: relative;
    width: 100%;
    height: 100%;
}
.form_contaoner {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;;
}
.form_contaoner .manger_tip .title {
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
.submit_btn{
  width: 100px;
}
.tiparea {
  text-align: right;
}
</style>
