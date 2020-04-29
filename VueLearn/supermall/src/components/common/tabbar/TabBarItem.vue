<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link:{
      type:String,
    },
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      //isActive: true
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle () {
      return this.isActive ? { color : this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.link)
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /**tab-bar的高度一般为49px */
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /**默认图片多三个像素 */
  vertical-align: middle;
}

</style>
