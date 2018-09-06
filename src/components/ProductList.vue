<template>
  <div>
    <button v-on:click="fetchProducts">Fetch products</button>

    <div>
      <ol class="products">
        <li v-for="product in products" v-bind:key="product._id">
          <span>{{ product.name }} </span>
          <span>{{product.salesPrice.amount}}{{product.salesPrice.currency}} </span>
          <span>{{ product.listPrice ? '(' + product.listPrice.amount + product.listPrice.currency + ')' : '' }} </span>
          <button v-on:click="reduceSalesPrice(product, 0.15)">On Sale</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";
import TokenMixin from "../mixins/TokenMixin";
import axios from "axios";
import _ from "lodash";

export default {
  mixins: [StorageMixin, TokenMixin],

  data: function() {
    return {
      products: [],
      errors: []
    };
  },

  methods: {
    fetchProducts: function() {
      axios
        .request({
          baseURL: this.api_url,
          url: "/products",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.access_token.bearer
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.products = _.get(response, "data._embedded.products", []);
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push(e);
        });
    },

    reduceSalesPrice: function(product, reduction) {
      var reducedPrice = product.salesPrice;
      reducedPrice.amount -=
        _.get(product, "listPrice.amount", reducedPrice.amount) * reduction;

      var patch = [
        { op: "add", path: "/tags/-", value: "sale" },
        {
          op: "replace",
          path: "/salesPrice",
          value: reducedPrice
        }
      ];
      /*
$ curl 'https://yourshop.api.urn/products/f925d108-379c-4923-90ab-b67563f6ba38?locale=en-GB' -i -X PATCH -H 'Content-Type: application/json-patch+json' -H 'Accept: application/hal+json' -H 'Authorization: Bearer <Access token>' 
-d '[{"op":"add","path":"/tags/-","value":"sale"},{"op":"replace","path":"/salesPrice","value":{"taxModel":"NET","amount":9.0,"currency":"EUR"}}]'
*/

      return reducedPrice;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
