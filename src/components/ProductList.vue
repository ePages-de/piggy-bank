<template>
<div class="jumbotron">

    <h5 class="text-center">Sale reduction: {{ reductionPercentage }}</h5>

    <!-- TODO style errors -->
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.message">
        {{ error.message }}
      </li>
    </ul>

    <div class="row font-weight-bold">
      <div class="col-1">
      </div>
      <div class="col-6">
        Name
      </div>
      <div class="col text-right">
        Sales Price
      </div>
      <div class="col text-right">
        List Price
      </div>
    </div>
    <div v-for="product in products" v-bind:key="product._id">
      <ProductDetails v-bind:product="product" v-bind:reduction="reduction" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";
import ProductDetails from "./ProductDetails";
import axios from "axios";
import _ from "lodash";
import numeral from "numeral";

export default {
  mixins: [StorageMixin],

  components: {
    ProductDetails
  },

  data: function() {
    return {
      products: [],
      reduction: 0.15, // TODO make dynamic
      errors: []
    };
  },

  mounted: function() {
    this.fetchProducts();
  },

  computed: {
    reductionPercentage: function() {
      return `${this.reduction * 100}%`;
    }
  },

  methods: {
    fetchProducts: function() {
      if (this.tokenExpired) {
        this.$router.push("/authorize");
      }

      axios
        .request({
          baseURL: this.api_url,
          timeout: 5000,
          method: "GET",
          url: "/products",
          headers: {
            Authorization: `Bearer ${this.access_token.bearer}`
          },
          params: {
            sort: "name",
            page: 0,
            size: 100
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
