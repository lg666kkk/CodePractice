<template>
  <div class="detail-swiper">
    <swiper class="swipers">
      <swiper-item  v-for="(item, index) in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper'
  export default {
      name:'DetailSwiper',
      props:{
        topImages: {
          type: Array,
          default() {
            return []
          }
        } 
      },
      components: {
        Swiper,
        SwiperItem
      }
  }
</script>

<style scoped>
.swipers {
  height:300px;
  overflow: hidden;
}
</style>
