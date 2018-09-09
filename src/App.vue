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
.piggy-bank {
  color: lightpink !important;
}
</style>
