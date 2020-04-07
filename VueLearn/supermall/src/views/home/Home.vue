<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommond-view :recommond="recommond"></recommond-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childComponent/homeSwiper';
  import RecommondView from './childComponent/RecommondView'

  import {getDataMultidata} from 'network/home';
  export default {
      name:'Home',
      components: {
        NavBar,
        HomeSwiper,
        RecommondView
      },
      data() {
        return {
          banners: [],
          recommond: []
        }
      },
      // 组件创建完后马上发送网络请求
      created() {
        // 请求多个数据
        getDataMultidata().then(res => {
          //console.log('res' ,res);
          this.banners = res.data.banner.list
          this.recommond = res.data.recommend.list
          //console.log('banners--',this.banners);
        })
      },
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
