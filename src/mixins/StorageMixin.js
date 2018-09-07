/* eslint-disable */
export default {
  methods: {
    retrieve: function(name) {
      const stored = localStorage.getItem(name);
      const parsed = stored && JSON.parse(stored);
      return parsed || null;
    },

    store: function(name, value) {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },

  computed: {
    api_url: {
      get: function () {
        return this.retrieve("api_url");
      },
      set: function (value) {
        this.store("api_url", value);
      }
    },

    client_id: {
      get: function () {
        return this.retrieve("client_id");
      },
      set: function (value) {
        this.store("client_id", value);
      }
    },

    client_secret: {
      get: function () {
        return this.retrieve("client_secret");
      },
      set: function (value) {
        this.store("client_secret", value);
      }
    },

    access_token: {
      get: function () {
        return this.retrieve("access_token");
      },
      set: function (value) {
        this.store("access_token", value);
      }
    },

    tokenExpired: function() {
      var expiry = (this.access_token && this.access_token.expiry) || 0;
      return new Date().getTime() > expiry;
    }
  }
};
