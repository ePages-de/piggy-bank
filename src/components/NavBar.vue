<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <span class="navbar-brand">
      <img src="../assets/on-sale.jpg" height="50" alt="On Sale">
    </span>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/authorize">Authorize</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
        <li class="nav-item" v-if="access_token && access_token.debug_url">
          <a :href="access_token.debug_url" target="jwt_debug"><img src="../assets/jwt.svg" alt="JWT" height="50"/></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";
export default {
  mixins: [StorageMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
