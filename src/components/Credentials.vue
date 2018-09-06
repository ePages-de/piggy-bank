<template>
  <div class="hello">

    <p>
     Please enter your shop's API credentials:
    </p>

    <ul class="credentials container">
      <li class="credentials left">API URL:</li>
      <li class="credentials right">
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="credentials.api_url" placeholder="e.g. https://myshop.beyondshop.cloud/api">
      </li>
    </ul>
    <ul class="credentials container">
      <li class="credentials left">Client ID:</li>
      <li class="credentials right">
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="credentials.client_id" placeholder="enter the client_id of your custom app">
      </li>
    </ul>
    <ul class="credentials container">
      <li class="credentials left">Client Secret:</li>
      <li class="credentials right">
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="credentials.client_secret" placeholder="enter the client_secret of your custom app">
      </li>
    </ul>
    <ul class="credentials container">
      <li class="credentials left"><button v-on:click="submitCredentials">Fetch token</button></li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.message">
        {{error.message}}
      </li>
    </ul>

    <div v-if="token && token.debug_url">
      <a :href="token.debug_url" target="debug_jwt">Debug JWT</a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { serverBus } from '../main';
import TokenMixin from "../mixins/TokenMixin";

export default {
  mixins: [TokenMixin],

  data: function() {
    return {
      credentials: {},
      errors: []
    };
  },

  watch: {
    credentials: {
      handler() {
        console.log("---- watch : credentials");
        localStorage.setItem("credentials", JSON.stringify(this.credentials));
        serverBus.$emit('credentialsChanged', this.credentials);
      },
      deep: true
    }
  },

  methods: {
    credentialsMissing: function() {
      return !(
        this.credentials &&
        this.credentials.api_url &&
        this.credentials.client_id &&
        this.credentials.client_secret
      );
    },

    restoreCredentials: function() {
      const stored = localStorage.getItem("credentials");
      const parsed = stored && JSON.parse(stored);
      if (parsed) {
        this.credentials = parsed;
      }
    },

    submitCredentials: function() {
      if (this.credentialsMissing()) {
        const error = { message: "credentials not set" };
        console.error(error);
        this.errors.push(error);
        return;
      }

      this.fetchToken(
        this.credentials.api_url,
        this.credentials.client_id,
        this.credentials.client_secret
      );
    }
  },

  created: function() {
    console.log("==== created : Credentials");
  },

  mounted: function() {
    console.log("==== mounted : Credentials");
    this.restoreCredentials();
  }
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
