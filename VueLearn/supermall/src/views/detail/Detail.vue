<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <datil-base-info :goods="goods"></datil-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-params-info :param-info="paramInfo"></detail-params-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './ChildComponents/DetailNavBar';
  import DetailSwiper from './ChildComponents/DetailSwiper';
  import DatilBaseInfo from './ChildComponents/DateBaseInfo';
  import DetailShopInfo from './ChildComponents/DetailShopInfo';
  import DetailGoodsInfo from './ChildComponents/DetailGoodsInfo';
  import DetailParamsInfo from './ChildComponents/DetailParamsInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import { getDetail, Goods, Shop, GoodsParam} from 'network/detail'
  export default {
      name:'Detail',
      data(){
        return {
          iid: null,
          topImages: [],
          goods: {},
          shop:{},
          detailInfo:{},
          paramInfo: {}
        }
      },
      created() {
        //console.log(this.$route);
        this.iid = this.$route.params.iid
        // 根据iid获取数据
        getDetail(this.iid)
          .then((res) => {
            console.log(res);
            const data = res.result
            // 获取顶部的图片轮播数据
            this.topImages = data.itemInfo.topImages
            //console.log(this.topImages);
            // 获取商品链接
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 获取店铺信息
            this.shop = new Shop(data.shopInfo)
            // 保存商品详情数据
            this.detailInfo = data.detailInfo
            // 获取参数数据
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          })
      },
      components: {
        DetailNavBar,
        DetailSwiper,
        DatilBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamsInfo
      },
      methods: {
        imgLoad() {
          this.$refs.scroll.refresh()
        }
      },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
