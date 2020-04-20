<template>
  <div class="notfound">
    <img src="~assets/img/404.gif" alt="">
  </div>
</template>

<script>
  export default {
      name:'NotFound',
  }
</script>

<style scoped>
.black_line {
  display: none;
}
.notfound {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-right: 50px;
}
.notfound img {
  width: 100%;
  height: auto;
}
</style>
