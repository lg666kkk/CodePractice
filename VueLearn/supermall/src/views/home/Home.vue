<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommond-view :recommond="recommond"></recommond-view>
    <feature></feature>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>
    <good-list :goods="goods['pop'].list"></good-list>
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
  import GoodList from 'components/content/goods/GoodList'
  import {getDataMultidata, getHomeGoods} from 'network/home';
  export default {
      name:'Home',
      components: {
        HomeSwiper,
        RecommondView,
        Feature,

        NavBar,
        TabControl,
        GoodList
      },
      data() {
        return {
          banners: [],
          recommond: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []}
          }
        }
      },
      // 组件创建完后马上发送网络请求
      created() {
        // 请求多个数据
        this.getDataMultidata()
        // 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },   
      methods: {
        getDataMultidata(){
          // 请求多个数据
          getDataMultidata().then(res => {
            //console.log('res' ,res);
            this.banners = res.data.banner.list
            this.recommond = res.data.recommend.list
            //console.log('banners--',this.banners);
          })
        },
        getHomeGoods (type) {
          const page = this.goods[type].page + 1
          getHomeGoods (type, page).then(res => {
            this.goods[type].list.push(...res.data.list) 
            this.goods[type].page += 1
          })
        }
      }   
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
    z-index: 8;
  }
</style>
