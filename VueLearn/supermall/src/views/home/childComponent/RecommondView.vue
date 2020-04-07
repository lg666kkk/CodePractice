<template>
  <div class="recommond">
    <div v-for="(item, key) in recommond" :key="key" class="recommond-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
  export default {
      name:'RecommondView',
      props:{
        recommond: {
          type:Array,
          default() {
            return []
          }
        } 
      }
  }
</script>

<style lang="less" scoped>
  .recommond {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 16px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
    > .recommond-item {
      flex:1;
      > a > img {
        width: 70px;
        height:70px;
        margin-bottom: 10px;
      }
    }
  }
</style>
