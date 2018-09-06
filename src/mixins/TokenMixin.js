/* eslint-disable */
import StorageMixin from "./StorageMixin";
import axios from 'axios'

export default {
  data: function () {
    return {
      errors: []
    };
  },

  mixins: [StorageMixin],

  computed: {
    tokenExpired: function () {
      var expiry = this.access_token && this.access_token.expiry || 0;
      return new Date().getTime() > expiry;
    }
  },

  methods: {
    tokenNotExpired: function (token) {
      return token && token.expiry < new Date().getTime();
    },

    fetchToken: async function () {
      // https://stackoverflow.com/a/41719898/1393467
      axios
        .request({
          method: "POST",
          baseURL: this.api_url,
          url: "/oauth/token?grant_type=client_credentials",
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
              debug_url: `https://jwt.io/#debugger-io?token=${response.data.access_token}`
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
