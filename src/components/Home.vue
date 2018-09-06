<template>
  <div class="hello">

    <h2>Welcome to the BEYOND vue.js Starter!</h2>

    <p>
     Please enter your shop's API credentials:
    </p>

    <ul class="credentials container">
      <li class="credentials left">API URL:</li>
      <li class="credentials right">
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="credentials.api_url">
      </li>
    </ul>
    <ul class="credentials container">
      <li class="credentials left">Client ID:</li>
      <li class="credentials right">
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="credentials.client_id">
      </li>
    </ul>
    <ul class="credentials container">
      <li class="credentials left">Client Secret:</li>
      <li class="credentials right">
        <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="credentials.client_secret">
      </li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors"  v-bind:key="error.message">
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
import axios from "axios";

export default {
  name: "HelloWorld",

  data: function() {
    return {
      credentials: {},
      token: {},
      errors: []
    };
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

    tokenNotExpired: function(token) {
      return token && token.valid_until < new Date().getTime();
    },

    restoreToken: function() {
      const stored = localStorage.getItem("token");
      const parsed = stored && JSON.parse(stored);
      if (parsed && this.tokenNotExpired(parsed)) {
        this.token = parsed;
      } else {
        this.fetchToken();
      }
    },

    fetchToken: async function() {
      if (this.credentialsMissing()) {
        const error = { message: "credentials not set" };
        console.error(error);
        this.errors.push(error);
        return;
      }

      // https://stackoverflow.com/a/41719898/1393467
      axios
        .request({
          baseURL: this.credentials.api_url,
          url: "/oauth/token?grant_type=client_credentials",
          method: "POST",
          auth: {
            username: this.credentials.client_id,
            password: this.credentials.client_secret
          }
        })
        .then(response => {
          if (
            response.status === 200 &&
            response.data.token_type === "bearer"
          ) {
            this.token = {
              bearer: response.data.access_token,
              // (issued at + expires in) converted to milliseconds, see https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields
              valid_until: (response.data.iat + response.data.expires_in) * 1000,
              debug_url: "https://jwt.io/#debugger-io?token=" + response.data.access_token
            };
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push(e);
        });
    }
  },

  created: function() {
    console.log("==== created ====");
  },

  mounted: function() {
    console.log("==== mounted ====");
    this.restoreCredentials();
    this.restoreToken();
  },

  watch: {
    token: {
      handler() {
        console.log("==== token changed ====");
        localStorage.setItem("token", JSON.stringify(this.token));
      },
      deep: true
    },

    credentials: {
      handler() {
        console.log("==== credentials changed ====");
        localStorage.setItem("credentials", JSON.stringify(this.credentials));
      },
      deep: true
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
