<template>
  <div id="sign-part">
      <h1>用户登录页面</h1>
      <el-input v-model="username" placeholder="请输入用户名" class="username"></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password class="password"></el-input>
        <el-button class="register" type="primary">注册</el-button>
        <el-button class="login" type="primary" @click="signup">登录</el-button>
  </div>
</template>

<script>
  export default {
      name:'SignUp',
      data() {
        return {
          username: '',
          password: ''
        }
      },
      methods: {
        signup(){
          let partten = /^[a-zA-Z]\w{5,17}$/
          if (this.username.length < 6) {
            this.$message.error("用户名不能小于6个字符")
            return 
          }
          if (!partten.exec(this.password)) {
            this.$message.error('密码请以字母开头,长度在6~18之间,只能包含字母、数字和下划线')
            return 
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
    }
    > .password, .username {
      margin-bottom: 20px;
    }
    > .register {
      margin-left: 130px;
    }
  }
</style>
