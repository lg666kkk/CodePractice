<template>
  <div class="Register">
    <section class="form_container">
      <div class="manager_tip">
        <span class="title">博客管理注册页面</span>
        <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerUser.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="registerUser.checkPassword" placeholder="请确认密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="座右铭" prop="introduce">
            <el-input type="textarea" v-model="registerUser.introduce" placeholder="请输入你的座右铭"></el-input>
          </el-form-item>
          <el-form-item label="选择身份" prop="identity">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="普通用户" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitFrom('registerForm')">注册</el-button>
          </el-form-item>
      </el-form>
      </div>
    </section>
  </div>
</template>

<script>
  import { request } from 'network/request';
  import qs from 'qs'
  export default {
      name:'Register',
      data(){
        var validateCheckPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.registerUser.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          registerUser: {
            username: "",
            email: "",
            password:"",
            checkPassword: "",
            identity: "",
            introduce: ""
          },
          rules: {
            username: [
              {
                required: true,
                message: "用户名不能为空",
                trigger: "blur" // 失去焦点时触发 
              },
              {
                min: 2,
                max: 30,
                message: "长度在2-30个字符之间",
                trigger: "blur"
              }
            ],
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
            ],
            checkPassword: [
              {
                required: true
              },
              {
                min: 6,
                max: 30,
                message: "长度在6-30之间",
                trigger: "blur"
              },
              {
                validator: validateCheckPass,
                trigger: "blur"
              }
            ],
            introduce: [
              {
                required: true,
                message: "座右铭不能为空",
                trigger: "blur" // 失去焦点时触发 
              },
              {
                min: 2,
                max: 30,
                message: "长度在2-30个字符之间",
                trigger: "blur"
              }
            ],
          }
        }
      },
      methods: {
        submitFrom(formName) {
          let self = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let data = qs.stringify(this.registerUser)
              request({
                method: 'get',
                url: `/api/admin/getUser/${this.registerUser.email}`
              }).then(user => {
                //console.log(user.data);
                if (user.data) {
                  self.$message.error('邮箱已经注册')
                  self.$refs[formName].resetFields();
                } else {
                  request({
                    method: 'post',
                    url:'/api/admin/signup',
                    data,
                    headers:{'Content-Type':'application/x-www-form-urlencoded'}
                  })
                  .then(res => {
                    // 注册成功
                    self.$message({
                      type: 'success',
                      message:'注册成功'
                    })
                  })
                  // 跳转路由
                  this.$router.push('/admin/signin')
                }
              })
            }
          });
        }
      },
  }
</script>

<style scoped>
  @import '../../assets/css/register.css';
</style>
