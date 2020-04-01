<template>
  <div class="tab-bar">
    <!-- 构造一个插槽，需要什么就直接加入即可-->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:'TabBar',
  }
</script>

<style scoped>
  @import '../../assets/css/base.css';
  .tab-bar {
    display: flex;
    background-color: #f6f6f6;
    /** 使其位于屏幕最底部*/
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    /**设置阴影 */
    box-shadow: 0 -2px 1px rgba(100, 100, 100, .1);
  }
  
</style>
