/* eslint-disable */
import { serverBus } from '../main';
import axios from 'axios'

export default {
  data: function () {
    return {
      token: {},
      errors: []
    };
  },

  watch: {
    token: {
      handler() {
        console.log("---- watch : token");
        localStorage.setItem("token", JSON.stringify(this.token));
        serverBus.$emit('tokenChanged', this.token);
      },
      deep: true
    }
  },

  created: function () {
    console.log("==== created : TokenMixin");
  },

  mounted: function () {
    console.log("==== mounted : TokenMixin");
    this.restoreToken();
  },

  methods: {
    tokenNotExpired: function (token) {
      return token && token.valid_until < new Date().getTime();
    },

    restoreToken: function () {
      const stored = localStorage.getItem("token");
      const parsed = stored && JSON.parse(stored);
      if (parsed && this.tokenNotExpired(parsed)) {
        this.token = parsed;
      }
    },

    fetchToken: async function (api_url, client_id, client_secret) {

      // https://stackoverflow.com/a/41719898/1393467
      axios
        .request({
          baseURL: api_url,
          url: "/oauth/token?grant_type=client_credentials",
          method: "POST",
          auth: {
            username: client_id,
            password: client_secret
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
  }
};
