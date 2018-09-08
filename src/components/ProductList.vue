<template>
  <div class="jumbotron">
    <!-- TODO style errors -->
    <ul v-if="errors && errors.length">
      <li v-for="(error, i) of errors" :key="i">
        {{ error.message }}
      </li>
    </ul>

    <div class="products">
      <h5 class="text-center">Sale reduction: {{ reductionPercentage }}</h5>
      <ul>
        <li class="product" v-for="product in products" :key="product._id">
          <ProductDetails :product="product" :reduction="reduction" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";
import ProductDetails from "./ProductDetails";
import axios from "axios";
import _ from "lodash";

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
      if (this.tokenExpired()) {
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
            sort: "sku,ASC",
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

ul {
  list-style-type: none;
  padding: 0;
}

li.product {
  display: inline-block;
  margin: 10px;
  list-style-position: inside;
  background-color: #fff;
  box-shadow: 2px 0px 10px #ccc;
  padding: 5px;
  width: 300px;
}
</style>
