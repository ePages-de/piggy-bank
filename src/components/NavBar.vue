<template>
  <b-navbar toggleable="lg" :sticky="true" type="dark" variant="secondary">
    <b-navbar-brand to="/">
      <fa icon="piggy-bank" class="piggy-bank" size="2x" spin />
    </b-navbar-brand>

    <b-navbar-nav class="font-weight-bold">
      <b-nav-item to="/authorize">Authorize</b-nav-item>
      <b-nav-item to="/products?page=0&size=20">Products</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto font-weight-bold">
      <b-nav-item>
        <a :href="jwtLink" :class="{ disabled: disableJwtLink }" :disabled="disableJwtLink" target="jwt-debug">
          <img src="../assets/jwt.svg" alt="JWT" height="50" :class="{ 'grayed-out': disableJwtLink }"/>
        </a>
      </b-nav-item>
      <b-nav-item-dropdown right>
        <template slot="button-content">
          <em>Links</em>
        </template>
        <b-dropdown-item :href="storefrontLink" :disabled="disableStorefrontLink" target="storefront">
          Storefront
        </b-dropdown-item>
        <b-dropdown-item :href="cockpitLink" :disabled="disableCockpitLink" target="cockpit">
          Cockpit
        </b-dropdown-item>
        <div class="dropdown-divider"></div>
        <b-dropdown-item href="https://docs.beyondshop.cloud" target="beyond-api">
          BEYOND REST API
        </b-dropdown-item>
        <b-dropdown-item href="https://vuejs.org/v2/api/" target="vuejs-api">
          vue.js API
        </b-dropdown-item>
        <b-dropdown-item href="https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index" target="axios-api">
          axios API
        </b-dropdown-item>
        <b-dropdown-item href="https://bootstrap-vue.js.org/docs/" target="bootstrap-vue">
          bootstrap-vue
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
/* eslint-disable */
import EventBus from "@/event-bus";
import AccessTokenMixin from "@/mixins/AccessTokenMixin";

export default {
  name: "NavBar",

  mixins: [AccessTokenMixin],

  created: function() {
    EventBus.$on("ACCESS_TOKEN_CHANGED", access_token => {
      console.log(`---- on ACCESS_TOKEN_CHANGED @ ${this.$options.name}`);
      this.access_token = access_token;
    });
    EventBus.$on("API_URL_CHANGED", api_url => {
      console.log(`---- on API_URL_CHANGED @ ${this.$options.name}`);
      this.api_url = api_url;
    });
  },

  computed: {
    storefrontLink: function() {
      return this.api_url
        ? this.api_url.substring(0, this.api_url.lastIndexOf("/"))
        : "#";
    },

    disableStorefrontLink: function() {
      return this.api_url === null;
    },

    cockpitLink: function() {
      return this.api_url
        ? `${this.api_url.substring(0, this.api_url.lastIndexOf("/"))}/cockpit/`
        : "#";
    },

    disableCockpitLink: function() {
      return this.api_url === null;
    },

    jwtLink: function() {
      return this.access_token
        ? `https://jwt.io/#debugger-io?token=${this.access_token.bearer}`
        : "#";
    },

    disableJwtLink: function() {
      return this.access_token === null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grayed-out {
  opacity: 0.2;
}
</style>
