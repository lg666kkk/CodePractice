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
      <div class="info_name">CHAOHANG</div>
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
  #Menu_Left {
      float: left;
      width: 240px;
      margin-right: 20px;
  }
  /**若屏幕宽度小于767px，则不显示左侧菜单 */
  @media (max-width: 767px) {
    #Menu_Left {
      display: none;
    }
  }
  #Menu_Left a:hover {
    color: #222;
    background: #f5f7f9;
  }

  .Menu_name {
    background: rgb(38, 42, 48);
    color: white;
    padding: 10px 0;
  }
  nav {
    background: white;
    padding: 20px 0;
  }

  .nav {
    padding: 8px 30px;
    text-align: left;
  }

  .info {
    margin-top: 10px;
    padding: 20px;
    background: white;
  }

  .info_name {
    font-weight: 600;
    padding: 5px;
  }

  .info img {
    width: 120px;
    height: 120px;
  }

  .archive {
    padding-top: 20px;
  }

  .archive .archive_count {
    display: block;
    color: #222;
    font-weight: 600;
    font-size: 16px;
  }

  .archive .archive_name {
    display: block;
    color: #999;
    font-size: 14px;
  }

  .communication {
    padding-top: 20px;
  }

  .communication_item {
    display: inline-block;
    width: 40%;
    font-size: 14px;
    font-weight: 600;
    padding: 5px;
  }
</style>
