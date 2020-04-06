<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import {getDataMultidata} from 'network/home'
  export default {
      name:'Home',
      components: {
        NavBar
      },
      data() {
        return {
          result: null
        }
      },
      // 组件创建完后马上发送网络请求
      created() {
        // 请求多个数据
        getDataMultidata().then(data => {
          //console.log(data);
          this.result = data
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
