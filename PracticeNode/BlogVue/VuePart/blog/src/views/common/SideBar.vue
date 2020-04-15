<template>
  <div id="Menu_Left">
    <div class="Menu_name">
      <h1>LiGuang's Blog</h1>
      <h5>键盘敲烂，月薪过万</h5>
    </div>
    <nav>
      <ul>
        <router-link to="/article">
          <li class="nav">
            <img src="~assets/img/SiderBar/首页.svg" class="router_picture">
            <span>首页</span>
          </li>
        </router-link>
        <router-link to="/about">
          <li class="nav">
            <img src="~assets/img/SiderBar/关于.svg" class="router_picture">
            <span>关于</span>
          </li>
        </router-link>
        <router-link to="/tag">
          <li class="nav">
            <img src="~assets/img/SiderBar/标签.svg" class="router_picture">
            <span>标签</span>
          </li>
        </router-link>
        <router-link to="/admin/signin">
          <li class="nav">
            <img src="../../assets/img/SiderBar/登录.svg" class="router_picture">
            <span>登录</span>
          </li>
        </router-link>
        <router-link to="/admin/articleList">
          <li class="nav">
            <img src="~assets/img/SiderBar/管理.svg" class="router_picture">
            <span>管理</span>
          </li>
        </router-link>
        <router-link to="/admin/articleEdit">
          <li class="nav" >
            <img src="~assets/img/SiderBar/写文章.svg" class="router_picture">
            <span>写文章</span>
          </li>
        </router-link>
      </ul>
    </nav>
    <div class="info">
      <div class="archive">
        <ul>
          <router-link to="/article">
            <li>
              <span class="archive_name">日志</span>
              <span class="archive_count">{{ articleNumber }}</span> 
            </li>
          </router-link>
        </ul>
      </div>
      <ul class="communication">
        <li class="communication_item">
          <a href="#">
          <img src="../../assets/img/SiderBar/qq.svg" class="picture qq">
            <span class="text">QQ</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <img src="~assets/img/SiderBar/github.svg" class="picture github">
            <span class="text">GitHub</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <img src="~assets/img/SiderBar/twitter.svg" class="picture twitter">
            <span class="text">Twitter</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <img src="~assets/img/SiderBar/facebook.svg" class="picture facebook">
            <span class="text">Facebook</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {request} from 'network/request'
  export default {
      name:'SideBar',
      data(){
        return {
          articleNumber: ''
        }
      },
      mounted() {
        request({
          method: "get",
          url: "/api/articleList",
        })
        .then(res => {
          this.articleNumber = res.data.length
        })
      },
  }
</script>

<style scoped>
  @import '../../assets/css/sidebar.css';
</style>
