<template>
  <div id="app">
      <div class="black_line"></div>
      <div id="main">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  @import './assets/css/normalize.css';
  @import './assets/css/base.css';
</style>
