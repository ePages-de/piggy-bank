<template>
  <div class="jumbotron">
    <p class="lead">Please enter your shop's API credentials:</p>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.message">
        {{ error.message }}
      </li>
    </ul>

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
      <li class="credentials left"><button class="btn btn-primary btn-lg" v-on:click="fetchToken">Fetch token</button></li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";
import axios from "axios";

export default {
  mixins: [StorageMixin],

  data: function() {
    return {
      errors: []
    };
  },

  computed: {
    tokenExpired: function() {
      var expiry = (this.access_token && this.access_token.expiry) || 0;
      return new Date().getTime() > expiry;
    }
  },

  methods: {
    tokenNotExpired: function(token) {
      return token && token.expiry < new Date().getTime();
    },

    fetchToken: async function() {
      axios
        .request({
          baseURL: this.api_url,
          timeout: 5000,
          method: "POST",
          url: "/oauth/token",
          params: {
            grant_type: "client_credentials"
          },
          auth: {
            username: this.client_id,
            password: this.client_secret
          }
        })
        .then(response => {
          if (
            response.status === 200 &&
            response.data.token_type === "bearer"
          ) {
            this.access_token = {
              bearer: response.data.access_token,
              // (issued at + expires in) converted to milliseconds, see https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields
              expiry: (response.data.iat + response.data.expires_in) * 1000,
              debug_url: `https://jwt.io/#debugger-io?token=${
                response.data.access_token
              }`
            };
          } else {
            this.errors.push({ message: request.statusText });
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push({ message: "error processing request" });
        });
    }
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
