<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in title" 
          class="title-item"
          :class="{active: index === currentIndex}"
          @click="tabClick(index)"
        > 
          {{item}} 
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  export default {
      name:'DetailNavBar',
      data(){
        return {
          title:['商品', '参数', '评论', '推荐'],
          currentIndex: 0
        }
      },
      components: {
        NavBar
      },
      methods: {
        tabClick(index) {
          this.currentIndex = index
        },
        backClick() {
          this.$router.go(-1)
        }
      }
  }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .left img {
    vertical-align: middle;
  }
</style>
