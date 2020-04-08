<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommond-view :recommond="recommond"></recommond-view>
    <feature></feature>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>
    <ul>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComponent/homeSwiper';
  import RecommondView from './childComponent/RecommondView';
  import Feature from '../home/childComponent/Feature';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';

  import {getDataMultidata} from 'network/home';
  export default {
      name:'Home',
      components: {
        HomeSwiper,
        RecommondView,
        Feature,

        NavBar,
        TabControl
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
  #home {
    padding-top: 44px;
    padding-bottom: 400px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 8;
  }
  .tab-control {
    /**粘性粘贴 */
    position: sticky;
    top: 44px;
  }
</style>
