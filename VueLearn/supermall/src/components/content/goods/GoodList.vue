<template>
  <div class="goodlist">
    <good-list-item v-for="(item, key) in goods" :key="key" :goodsitem="item"></good-list-item>
  </div>
</template>

<script>
  import GoodListItem from './GoodListItem'
  export default {
      name:'GoodList',
      components: {
        GoodListItem
      },
      props: {
        goods: {
          type: Array,
          default() {
            return []
          }
        } 
      }
  }
</script>

<style lang="less" scoped>
  .goodlist {
    //display: flex;
  }
</style>
