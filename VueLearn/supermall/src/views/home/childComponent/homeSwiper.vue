<template>
  <div>
    <swiper>
        <swiper-item v-for="(item,key) in banners" :key="key">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imgLoad">
          </a>
        </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
      name:'HomeSwuper',
      data(){
        return {
          isLoad: false
        }
      },
      props:{
        banners: {
          type: Array,
          default(){
            return []
          }
        } 
      },
      components: {
        Swiper,
        SwiperItem
      },
      methods: {
        imgLoad() {
          if (!this.isLoad) {
            // 只发送一次swiperImageLoad事件
            this.$emit('swiperImageLoad')
            this.isLoad = true
          }
        }
      }
  }
</script>

<style scoped>

</style>
