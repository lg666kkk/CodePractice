<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import jwt_decode from 'jwt-decode'
  export default {
      name:'App',
      mounted() {
          if (localStorage.eleToken) {
            const decode = jwt_decode(localStorage.eleToken)
            // 将token存储到vuex中
            this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
            this.$store.dispatch('setUser', decode)
          }
      },
      methods: {
        // 判断是否为空，为空返回一个true
        isEmpty(value) {
          return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) || 
            (typeof value === "string" && value.trim().length === 0) 
          );
        }
      },
  }
</script>
<style>

</style>
