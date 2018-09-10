/* eslint-disable */
import EventBus from '@/event-bus';

export default {
  data: function () {
    return {
      api_url: null,
      access_token: null
    };
  },

  created: function () {
    console.info(`==== created AccessTokenMixin @ ${this.$options.name}`);
    this.api_url = this.$storage.get("api_url", null);
    this.access_token = this.$storage.get("access_token", null);
  },

  methods: {
    clearApiUrl: function () {
      this.api_url = null;
      console.log("Clearing API URL from LocalStorage");
      this.$storage.remove("api_url");
      EventBus.$emit("API_URL_CHANGED", this.api_url);
    },

    clearAccessToken: function () {
      this.access_token = null;
      console.log("Clearing access token from LocalStorage");
      this.$storage.remove("access_token");
      EventBus.$emit("ACCESS_TOKEN_CHANGED", this.access_token);
    },

    persistApiUrl: function () {
      this.$storage.set("api_url", this.api_url);
      EventBus.$emit("API_URL_CHANGED", this.api_url);
    },

    persistAccessToken: function () {
      this.$storage.set("access_token", this.access_token);
      EventBus.$emit("ACCESS_TOKEN_CHANGED", this.access_token);
    },

    isAccessTokenExpired: function () {
      var expiry = (this.access_token && this.access_token.bearer && this.access_token.expiry) || 0;
      return new Date().getTime() > expiry;
    }
  }
};
