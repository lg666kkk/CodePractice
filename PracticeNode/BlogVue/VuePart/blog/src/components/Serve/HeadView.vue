<template>
  <header class="header">
    <el-row class="container">
      <el-col :span="12" class="header-icon">
        <p class="header-img">
          <img src="~assets/img/blog1.svg" alt="">
          <span class="hidden-xs-only">博客后台管理页面</span>
        </p>
      </el-col>
      <el-col :span="6" class="user">
          <div class="header-userinfo">
            <img :src="user.avatar" alt="">
            <div class="welcome">
              <p class="name comename">欢迎</p>
              <p class="name avatarname">{{ user.username }}</p>
            </div>
            <span class="username">
                <!--下拉菜单-->
                <el-dropdown trigger="click" @command="setDialogInfo">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
          </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
  export default {
      name:'HeadView',
      computed: {
        user() {
          return this.$store.getters.user
        }
      },
      methods: {
        setDialogInfo(command) {
          switch (command) {
            case 'info': {
              this.showInfo()
              break
            }
            case 'logout': {
              this.logout()
              break
            }
          }
        },
        showInfo() {
          this.$router.push('/infoshow')
        },
        logout() {
          // 清除token
          localStorage.removeItem('Token');
          // 设置vuex store
          this.$store.dispatch("clearCurrentState")
          // 跳转页面
          this.$router.push('/articles')
        }
      }
  }
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  border-bottom: 1px solid #1f2d3d;
  background-color: #324057;
  opacity: 0.9;
}
.container {
  line-height: 60px;
  min-width: 400px;
}
.container .header-icon .header-img {
  text-align: left;
  margin-left: 20px;
}
.container .header-icon img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  border-radius: 50%;
  margin-right: 10px;
}

.user {
  line-height: 60px;
  text-align: right;
  text-align: center;
  float: right;
}
.header-userinfo {
  text-align: right;
  padding-right: 30px;
}
.header-userinfo img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
  margin-right: 5px;
}
.name {
  line-height: 15px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bold;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>
