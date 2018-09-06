<template>
  <div class="hello">
    <button v-on:click="fetchProducts">Fetch products</button>

    <div>
      <ol>
        <li v-for="product in products" v-bind:key="product.id">
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
      this.products = [];
      this.products.push({ id: "1", name: "shoe" });
      this.products.push({ id: "2", name: "shirt" });
      this.products.push({ id: "3", name: "hat" });

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
          if (response.status === 200) {
            console.info(response);
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
