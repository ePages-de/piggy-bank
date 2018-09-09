<template>
  <div class="jumbotron">
    <Alerts :alerts="alerts" />

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
        <li class="product p-1 m-2" v-for="product in products" :key="product._id">
          <ProductDetails :product="product" :reduction="reduction" :alerts="alerts" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "@/mixins/StorageMixin";
import Alerts from "@/components/Alerts";
import ProductDetails from "@/components/ProductDetails";
import axios from "axios";
import _ from "lodash";

export default {
  mixins: [StorageMixin],

  components: {
    Alerts,
    ProductDetails
  },

  data: function() {
    return {
      reduction: 15,
      products: [],
      alerts: []
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
            this.errors.push({
              message: `error fetching products: ${request.statusText}`
            });
          }
        })
        .catch(e => {
          console.error(e);
          this.alerts.push({ message: "error fetching products" });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li.product {
  display: inline-block;
}
</style>
