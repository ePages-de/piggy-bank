<template>
  <div id="app" class="container">
    <NavBar/>
    <h3>Welcome to ePages BEYOND On Sale!</h3>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "./mixins/StorageMixin";
import NavBar from '@/components/NavBar'

export default {
  name: "app",

  components: {
    NavBar
  },

  computed: {
    tokenExpired: function() {
      var expiry = (this.access_token && this.access_token.expiry) || 0;
      return new Date().getTime() > expiry;
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
