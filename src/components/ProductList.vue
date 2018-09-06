<template>
  <div class="hello">
    <button v-on:click="fetchProducts">Fetch products</button>

    <div>
      <ol>
        <li v-for="product in products" v-bind:key="product._id">
          {{ product.name }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { serverBus } from "../main";
import TokenMixin from "../mixins/TokenMixin";
import axios from "axios";

export default {
  name: "ProductList",

  mixins: [TokenMixin],

  data: function() {
    return {
      credentials: {},
      token: {},
      products: [],
      errors: []
    };
  },

  created: function() {
    console.log("==== created : ProductList");
    serverBus.$on("credentialsChanged", credentials => {
      console.log("~~~~ serverBus: credentials");
      this.credentials = credentials;
    });
    serverBus.$on("tokenChanged", token => {
      console.log("~~~~ serverBus: token");
      this.token = token;
    });
  },

  mounted: function() {
    console.log("==== mounted : ProductList");
  },

  methods: {
    fetchProducts: function() {
      axios
        .request({
          baseURL: this.credentials.api_url,
          url: "/products",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token.bearer
          }
        })
        .then(response => {
          if (
            response.status === 200 &&
            response.data &&
            response.data._embedded &&
            response.data._embedded.products
          ) {
            this.products = response.data._embedded.products;
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push(e);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
