<template>
  <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-brand>
      <router-link to="/" target="_self">
        <fa icon="piggy-bank" class="piggy-bank" size="2x" spin />
      </router-link>
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item to="/authorize">Authorize</b-nav-item>
      <b-nav-item to="/products">Products</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Links" right>
        <b-dropdown-item :href="storefrontLink" :disabled="storefrontLink === '#'" target="storefront">Storefront</b-dropdown-item>
        <b-dropdown-item :href="cockpitLink" :disabled="cockpitLink === '#'" target="cockpit">Cockpit</b-dropdown-item>
        <div class="dropdown-divider"></div>
        <b-dropdown-item href="https://docs.beyondshop.cloud" target="beyond-api">BEYOND REST API</b-dropdown-item>
        <b-dropdown-item href="https://vuejs.org/v2/api/" target="vuejs-api">vue.js API</b-dropdown-item>
        <b-dropdown-item href="https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index" target="axios-api">axios API</b-dropdown-item>
        <b-dropdown-item href="https://bootstrap-vue.js.org/docs/" target="bootstrap-vue">bootstrap-vue</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-navbar-item>
        <span v-if="showDebug">
          <a :href="access_token.debug_url" target="jwt_debug">
            <img src="../assets/jwt.svg" alt="JWT" height="50"/>
          </a>
        </span>
        <span v-else>
          <img class="grayed-out" src="../assets/jwt.svg" alt="JWT" height="50"/>
        </span>
      </b-navbar-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
/* eslint-disable */
import StorageMixin from "@/mixins/StorageMixin";

export default {
  mixins: [StorageMixin],

  computed: {
    showDebug: function() {
      return this.access_token && this.access_token.debug_url;
    },

    storefrontLink: function() {
      return this.api_url
        ? this.api_url.substring(0, this.api_url.lastIndexOf("/"))
        : "#";
    },

    cockpitLink: function() {
      return this.api_url
        ? `${this.api_url.substring(0, this.api_url.lastIndexOf("/"))}/cockpit/`
        : "#";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img.grayed-out {
  opacity: 0.2;
}
</style>
