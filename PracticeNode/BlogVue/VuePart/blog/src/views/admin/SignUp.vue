<template>
  <div id="sign-part">
      <h1>用户登录页面</h1>
      <el-input v-model="username" placeholder="请输入用户名" class="username"></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password class="password"></el-input>
        <el-button class="register" type="primary">注册</el-button>
        <el-button class="login" type="primary">登录</el-button>
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
