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
            <span>首页</span>
          </li>
        </router-link>
        <router-link to="/about">
          <li class="nav">
            <span>关于</span>
          </li>
        </router-link>
        <router-link to="/tag">
          <li class="nav">
            <span>标签</span>
          </li>
        </router-link>
        <router-link to="/admin/signin">
          <li class="nav">
            <span>登录</span>
          </li>
        </router-link>
        <router-link to="/admin/articleList">
          <li class="nav">
            <span>管理</span>
          </li>
        </router-link>
        <router-link to="/admin/articleEdit">
          <li class="nav">
            <span>写文章</span>
          </li>
        </router-link>
      </ul>
    </nav>
    <div class="info">
      <img src="~assets/img/head.jpg" alt="head">
      <div class="info_name">LiGuang</div>
      <div class="archive">
        <ul>
          <router-link to="/article">
            <li>
              <span class="archive_count">{{ articleNumber }}</span>
              <span class="archive_name">日志</span>
            </li>
          </router-link>
        </ul>
      </div>
      <ul class="communication">
        <li class="communication_item">
          <a href="#">
            <span>GitHub</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <span>GitHub</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <span>GitHub</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <span>GitHub</span>
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
  @import '../../assets/css/sidebar.css'
</style>
