<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" class="tabControl" 
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="istabFixed"
      ></tab-control>
    <scroll 
        class="content" 
        ref="scroll" 
        :probe-type="3" 
        :pull-up-load='true'
        @pullingUp="loadMore"
        @scroll="contentScroll">
      <home-swiper 
        :banners="banners" 
        @swiperImageLoad='swiperImageLoad'
      ></home-swiper>
      <recommond-view :recommond="recommond"></recommond-view>
      <feature></feature>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" 
      @tabClick="tabClick"
      ref="tabControl"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
  import Scroll from 'components/common/scroll/Scroll';
  import BackTop from 'components/content/backtop/BackTop';
  import { debounce } from 'common/utils'
  export default {
      name:'Home',
      components: {
        HomeSwiper,
        RecommondView,
        Feature,

        NavBar,
        TabControl,
        GoodList,
        Scroll,
        BackTop
      },
      data() {
        return {
          banners: [],
          recommond: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []}
          },
          currentType: 'pop',
          isShowBackTop: false,
          tabOffsetTop: 0,
          istabFixed: false,
          saveY: 0
        }
      },
      computed: {
        showGoods() {
          return this.goods[this.currentType].list
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
      mounted(){
        const refresh = debounce(this.$refs.scroll.refresh, 500)
        // 监听图片是否加载完成
        this.$bus.$on('itemImageLoad', () => {
          //this.$refs.scroll.refresh()
          refresh()
          //this.$refs.scroll.refresh()
        })
        //this.tabOffsetTop = this.$refs.tab-content
        
      },
      activated() {
        // 最好在滑动之前刷新一下，不然多次频繁切换会有问题
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.saveY)
      },
      deactivated() {
        this.saveY = this.$refs.scroll.scroll.y
      },
      methods: {
        /**
        * 事件监听相关的方法
        */
        tabClick(index) {
          switch (index) {
            case 0: {
              this.currentType = 'pop'
              break
            }
            case 1: {
              this.currentType = 'new'
              break
            }
            case 2: {
              this.currentType = 'sell'
              break
            }
          }
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl.currentIndex = index
        },
        /**
        * 网络请求相关的方法 
        */
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
            //console.log("wwww",res);
            this.goods[type].list.push(...res.data.list) 
            this.goods[type].page += 1
            this.$refs.scroll.finishPullUp()
          })
          
        },
        backClick () {
          //console.log('ddd');
          this.$refs.scroll.scrollTo(0, 0, 500)
        },
        contentScroll(position){
          // 判断BackTop是否显示
          this.isShowBackTop = -position.y > 1000 ? true : false
          // 决定tabControl是否吸顶
          this.istabFixed = (-position.y) >= this.tabOffsetTop ? true : false
        },
        loadMore() {
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad() {
          // 获取ttab-control的offsetTop
          //console.log(this.$refs.tabControl.$el.offsetTop);
          this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        }
      }   
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
  .content {
    /*height: calc(100% - 93px);
    margin-top: 44px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tabControl {
    position: relative;
    z-index: 9;
  }
</style>
