<template>
  <div class="tab-control">
    <div v-for="(item, key) in titles" :key="key" class="tab-control-item" :class="{active:key === currentIndex}" @click="tabItemClick(key)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
      name : 'TabControl',
      props : {
        titles : {
          type:Array,
          default() {
            return []
          }
        } 
      },
      data () {
        return {
          currentIndex: 0
        }
      },
      methods : {
        tabItemClick (key) {
          this.currentIndex = key
          this.$emit('tabClick', key)
        }
      }
  }
</script>

<style lang="less" scoped>
  .tab-control {
    display: flex;
    font-size: 16px;
    background-color: #fff;
    > .tab-control-item {
      flex: 1;
      text-align: center;
      height: 40px;
      line-height: 40px;
      span {
        padding: 5px;
      }
    }
  }
  .active {
    color: var(--color-high-text)
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
