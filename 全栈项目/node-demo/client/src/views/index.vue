<template>
  <div class="index">
    <head-view></head-view>
    <left-menu></left-menu>
    <div class="right"></div>
      <router-view></router-view>
    </div>
</template>

<script>
  import HeadView from '../components/HeadView';
  import LeftMenu from '../components/LeftMenu'
  export default {
      name:'Index',
      components: {
        HeadView,
        LeftMenu
      }
  }
</script>

<style scoped>
.index {
  width: 100%;
  height:100%;
}

</style>
