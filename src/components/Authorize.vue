<template>
  <div class="jumbotron">
    <Alerts :alerts="alerts" />

    <p class="lead text-center">Please enter your shop's API credentials:</p>

    <form>
      <div class="form-group">
        <label for="api_url">API URL:</label>
        <input id="api_url" class="form-control"
          v-model="api_url"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="e.g. https://myshop.beyondshop.cloud/api"
        >
      </div>

      <div class="form-group">
        <label for="client_id">Client ID:</label>
        <input id="client_id" class="form-control"
          v-model="client_id"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="enter the client_id of your custom app"
        >
      </div>

      <div class="form-group">
        <label for="client_secret">Client Secret:</label>
        <input id="client_secret" class="form-control"
          v-model="client_secret"
          type="password"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="enter the client_secret of your custom app"
        >
      </div>

      <div class="btn-toolbar">
        <button class="btn btn-primary" v-on:click.prevent="fetchToken">Fetch token</button>
        &nbsp;
        <button class="btn btn-outline-dark" v-bind:disabled="!access_token" v-on:click.prevent="dismissToken">Dismiss token</button>
        &nbsp;
        <button class="btn btn-outline-danger" v-on:click.prevent="dismissAll">Dismiss all</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "@/mixins/StorageMixin";
import Alerts from "@/components/Alerts";
import axios from "axios";

export default {
  mixins: [StorageMixin],

  components: {
    Alerts
  },

  data: function() {
    return {
      alerts: []
    };
  },

  methods: {
    fetchToken: async function() {
      const postOauthToken = {
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
      };

      axios
        .request(postOauthToken)
        .then(response => {
          if (
            response.status === 200 &&
            response.data.token_type === "bearer"
          ) {
            this.access_token = {
              bearer: response.data.access_token,
              // (issued at + expires in) converted to milliseconds,
              // see https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields
              expiry: (response.data.iat + response.data.expires_in) * 1000
            };
          } else {
            this.alerts.push({ message: `error fetching token: ${request.statusText}` });
          }
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching token" });
        });
    },

    dismissToken: function() {
      this.remove("access_token");
    },

    dismissAll: function() {
      this.remove("api_url");
      this.remove("client_id");
      this.remove("client_secret");
      this.remove("access_token");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
