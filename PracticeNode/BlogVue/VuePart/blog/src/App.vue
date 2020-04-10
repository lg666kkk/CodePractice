<template>
  <div id="app">
      <div class="black_line"></div>
      <div id="main">
        <router-view name="SideBar"></router-view>
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  a {
    color: #545455;
    cursor: pointer;
    display: block;
  }

  .clear {
    clear: both;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: bold;
    line-height: 1.5;
  }

  h2, h3, h4, h5, h6 {
    margin: 20px 0 15px;
  }

  h1 {
    font-size: 22px;
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 18px;
    }
  }

  h2 {
    font-size: 20px;
  }
  .black_line {
    width: 100%;
    height: 2px;
    background: #000;
  }
  #main {
    overflow: hidden;
    width: 960px;
    text-align: center;
    margin: auto;
  }
  .black_line {
    width: 100%;
    height: 2px;
    background: #000;
  }
</style>
