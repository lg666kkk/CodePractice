<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
      name:'Scroll',
      mounted () {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      },
      data () {
        return {
          scroll: null
        }
      },
      methods: {
        scrollTo (x, y, time) {
          this.scroll.scrollTo(x, y, time)
        }
      }
  }
</script>

<style scoped>

</style>
