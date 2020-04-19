<template>
  <div class="register">
    <section class="form_contaoner">
      <div class="manger_tip">
        <span class="title">后台管理系统</span>
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
          <el-form-item label="选择身份" prop="identity">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
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
  import qs from 'qs';
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
            identity: ""
          },
          rules: {
            name: [
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
            ]
          }
        }
      },
      methods: {
        submitFrom(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //this.registerUser = qs.stringify(this.registerUser)
              // console.log(this.registerUser);
              this.$axios.post('/api/user/register', qs.stringify(this.registerUser),
                {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
              )
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "注册成功"
                  })
                })
                this.$router.push('/login')
            }
          });
        }
      },
  }
</script>

<style scoped>
.register {
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
.registerForm {
  margin-top: 20px;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #ccc;
}
.submit_btn{
  width: 100px;
}
</style>
