<template>
  <div>

    <p>
     Please enter your shop's API credentials:
    </p>

    <ul class="credentials container">
      <li class="credentials left">API URL:</li>
      <li class="credentials right">
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="api_url" placeholder="e.g. https://myshop.beyondshop.cloud/api">
      </li>
    </ul>
    <ul class="credentials container">
      <li class="credentials left">Client ID:</li>
      <li class="credentials right">
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="client_id" placeholder="enter the client_id of your custom app">
      </li>
    </ul>
    <ul class="credentials container">
      <li class="credentials left">Client Secret:</li>
      <li class="credentials right">
        <input type="password" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="client_secret" placeholder="enter the client_secret of your custom app">
      </li>
    </ul>
    <ul class="credentials container">
      <li class="credentials left"><button v-on:click="fetchToken">Fetch token</button></li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.message">
        {{error.message}}
      </li>
    </ul>

    <div v-if="access_token && access_token.debug_url">
      <a :href="access_token.debug_url" target="jwt_debug">JWT Debug</a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";
import TokenMixin from "../mixins/TokenMixin";

export default {
  mixins: [TokenMixin, StorageMixin],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.credentials input {
  width: 100%;
}

.credentials .container {
  list-style: none;
  display: flex;
}

.credentials .left {
  width: 200px;
  text-align: right;
  font-weight: bold;
}

.credentials .right {
  width: 400px;
  text-align: left;
}
</style>
