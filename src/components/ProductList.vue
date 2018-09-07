<template>
  <div>
    <button v-on:click="fetchProducts">Fetch products</button>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.message">
        {{ error.message }}
      </li>
    </ul>

    <div>
      <ol class="products">
        <li v-for="product in products" v-bind:key="product._id">
          <span class="product name">{{ product.name }} </span>&nbsp;
          <span class="product amount">{{ product.salesPrice.amount | amount }}</span><span class="product currency" v-html="currency(product.salesPrice.currency)"></span>&nbsp;
          <span class="product amount">{{ product.listPrice ? product.listPrice.amount : '' | amount }}</span><span class="product currency" v-html="currency(product.salesPrice.currency)"></span>&nbsp;
          <button v-on:click="reduceSalesPrice(product, 0.15)">On Sale</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";
import axios from "axios";
import _ from "lodash";
import numeral from "numeral";

export default {
  mixins: [StorageMixin],

  data: function() {
    return {
      products: [],
      errors: []
    };
  },

  mounted: function() {
    this.fetchProducts();
  },

  filters: {
    amount: function(value) {
      return numeral(value).format("0,0.00");
    }
  },

  methods: {
    currency: function(value) {
      switch (value) {
        case "GBP":
          return "&pound";
        case "EUR":
          return "&euro;";
        default:
          return "???";
      }
    },

    fetchProducts: function() {
      if (this.tokenExpired) {
        this.$router.push("/");
      }

      axios
        .request({
          baseURL: this.api_url,
          timeout: 5000,
          method: "GET",
          url: "/products",
          headers: {
            Authorization: `Bearer ${this.access_token.bearer}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.products = _.get(response, "data._embedded.products", []);
          } else {
            this.errors.push({ message: request.statusText });
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push({ message: "error processing request" });
        });
    },

    reduceSalesPrice: function(product, reduction) {
      var reduced = product.salesPrice;
      reduced.amount -=
        _.get(product, "listPrice.amount", reduced.amount) * reduction;

      var patch = [
        { op: "add", path: "/tags/-", value: "Sale" },
        {
          op: "replace",
          path: "/salesPrice",
          value: reduced
        }
      ];

      axios
        .request({
          baseURL: this.api_url,
          timeout: 5000,
          method: "PATCH",
          url: `/products/${product._id}`,
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${this.access_token.bearer}`
          },
          data: patch
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
          } else {
            this.errors.push({ message: request.statusText });
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push({ message: "error processing request" });
        });
      /*
$ curl 'https://yourshop.api.urn/products/f925d108-379c-4923-90ab-b67563f6ba38?locale=en-GB' -i -X PATCH -H 'Content-Type: application/json-patch+json' -H 'Accept: application/hal+json' -H 'Authorization: Bearer <Access token>' 
-d '[{"op":"add","path":"/tags/-","value":"sale"},{"op":"replace","path":"/salesPrice","value":{"taxModel":"NET","amount":9.0,"currency":"EUR"}}]'
*/

      //return reduced;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
