<template>
  <div id="app" class="container">
    <NavBar/>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import NavBar from "@/components/NavBar";

export default {
  name: "App",

  components: {
    NavBar
  }
};
</script>

<style>
.piggy-bank {
  color: lightpink !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
