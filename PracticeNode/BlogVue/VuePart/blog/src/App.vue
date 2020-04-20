<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'App',
  created() {
    if (localStorage.Token) {
        const decoded = jwt_decode(localStorage.Token)
        this.$store.dispatch('setAuthencated', !this.isEmpty(decoded))
        this.$store.dispatch('setUser', decoded)
    }
  },
  methods: {
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
  @import './assets/css/normalize.css';
  @import './assets/css/base.css';
</style>
