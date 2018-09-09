<template>
  <div class="jumbotron">
    <!-- TODO style errors -->
    <ul v-if="errors && errors.length">
      <li v-for="(error, i) of errors" :key="i">
        {{ error.message }}
      </li>
    </ul>

    <div class="products">
      <div class="row reduction">
        <div class="col text-right">
          <a href="#" v-on:click.prevent="decreaseReduction">
            <fa icon="chevron-circle-down" size="2x" />
          </a>
        </div>
        <div class="col-3 font-weight-bold text-center align-middle">
          Sale reduction: {{ reduction }}%
        </div>
        <div class="col h-50 text-left">
          <a href="#" v-on:click.prevent="increaseReduction">
            <fa icon="chevron-circle-up" size="2x" />
          </a>
        </div>
      </div>

      <ul>
        <li class="product" v-for="product in products" :key="product._id">
          <ProductDetails :product="product" :reduction="reduction" :errors="errors" />
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
      reduction: 15,
      products: [],
      errors: []
    };
  },

  mounted: function() {
    this.fetchProducts();
  },

  methods: {
    increaseReduction: function() {
      if (this.reduction < 99) {
        this.reduction += 1;
      }
    },

    decreaseReduction: function() {
      if (this.reduction > 1) {
        this.reduction -= 1;
      }
    },

    fetchProducts: async function() {
      if (this.tokenExpired()) {
        this.$router.push("/authorize");
      }

      const getProducts = {
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
        };

      axios
        .request(getProducts)
        .then(response => {
          if (response.status === 200) {
            this.products = _.get(response, "data._embedded.products", []);
          } else {
            this.errors.push({ message: `error fetching products: ${request.statusText}` });
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push({ message: "error fetching products" });
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
