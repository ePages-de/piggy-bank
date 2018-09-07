<template>
  <div id="app" class="container">
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "./mixins/StorageMixin";
import NavBar from "@/components/NavBar";

export default {
  name: "app",

  components: {
    NavBar
  }
};
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
