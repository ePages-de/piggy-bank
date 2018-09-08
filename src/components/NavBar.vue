<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <span class="navbar-brand">
      <img src="../assets/on-sale.jpg" height="50" alt="On Sale">
    </span>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/authorize">Authorize</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
      </ul>
      <span class="nav-item" v-if="showDebug">
        <a :href="access_token.debug_url" target="jwt_debug">
          <img src="../assets/jwt.svg" alt="JWT" height="50"/>
        </a>
      </span>
      <span class="nav-item" v-else>
        <img class="grayed-out" src="../assets/jwt.svg" alt="JWT" height="50"/>
      </span>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";

export default {
  mixins: [StorageMixin],

  computed: {
    showDebug: function() {
      return this.access_token && this.access_token.debug_url;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-link-exact-active {
  font-weight: bold;
  color: black;
}

img.grayed-out {
  opacity: 0.2;
}
</style>
