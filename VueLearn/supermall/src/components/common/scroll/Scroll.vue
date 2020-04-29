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
      props: {
        probeType: {
          type: Number,
          default:0
        },
        pullUpLoad: {
          type: Boolean,
          default: false
        }
      },
      mounted () {
        // 创建better-scroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType, // 有这个属性才会实时监听滚动
          pullUpLoad: this.pullUpLoad // 上拉加载更多
        })
        // 监听滚动位置
        if (this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', position => {
            this.$emit('scroll', position) // 子组件向父组件传递一个scroll事件
          })
        }
        // 监听上拉事件
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      },
      data () {
        return {
          scroll: null
        }
      },
      methods: {
        scrollTo (x, y, time) {
          this.scroll && this.scroll.scrollTo(x, y, time)
        },
        // 解决只能加载一次的问题
        finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
          //console.log('----------');
          this.scroll &&  this.scroll.refresh()
        }
      }
  }
</script>

<style scoped>

</style>
