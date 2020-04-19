<template>
  <div class="index">
    <head-view></head-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import HeadView from '../components/HeadView'
  export default {
      name:'Index',
      components: {
        HeadView
      }
  }
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
