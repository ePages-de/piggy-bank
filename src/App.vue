<template>
  <div id="app" class="container">
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  color: #2c3e50;
}

.piggy-bank {
  color: lightpink !important;
}
</style>
