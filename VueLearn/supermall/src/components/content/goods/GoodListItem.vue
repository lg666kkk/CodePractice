<template>
  <div class="goods-item">
    <img :src="goodsitem.show.img" alt="">
    <div class="goods-info">
      <p class="title">{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
      name:'GoodListItem',
      props: {
        goodsitem: {
          type: Object,
          default(){
            return {}
          }
        } 
      }
  }
</script>

<style lang="less" scoped>
  .goods-ietm{
    padding: 40px;
    position: relative;
    > img {
      width: 100%;
      border-radius: 5px;
    }
    .goods-info {
      font-size: 30px;
      position: absolute;
      bottom: 5px;
      left:0;
      right: 0;
      text-align: center;
      > p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
      }
      > span {
        text-align: center;
      }
    }
  }
</style>
