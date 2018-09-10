<template>
  <div class="jumbotron">
    <Alerts :alerts="alerts" />

    <b-pagination-nav
      :useRouter="false"
      :link-gen="linkGen"
      :hide-goto-end-buttons="true"
      :number-of-pages="totalPages"
      v-model="currentPage"
      size="md"
      align="center"
    />

    <div>
      <div class="row">
        <div class="col text-right">
          <a href="#" v-on:click.prevent="reduction--" class="piggy-bank">
            <fa icon="chevron-circle-down" size="2x" />
          </a>
        </div>
        <div class="col-3 font-weight-bold text-center align-middle">
          Sale reduction: {{ reduction }}%
        </div>
        <div class="col h-50 text-left">
          <a href="#" v-on:click.prevent="reduction++" class="piggy-bank">
            <fa icon="chevron-circle-up" size="2x" />
          </a>
        </div>
      </div>

      <ul class="list-inline text-center">
        <li class="p-0 m-1 list-inline-item" v-for="product in products" :key="product._id">
          <ProductDetails :product="product" :reduction="reduction" :alerts="alerts" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import AccessTokenMixin from "@/mixins/AccessTokenMixin";
import Alerts from "@/components/Alerts";
import ProductDetails from "@/components/ProductDetails";
import axios from "axios";
import _ from "lodash";

export default {
  name: "ProductList",

  mixins: [AccessTokenMixin],

  components: {
    Alerts,
    ProductDetails
  },

  props: ["page", "size"],

  data: function() {
    return {
      alerts: [],
      reduction: 15,
      products: [],
      currentPage: 1,
      totalPages: 10
    };
  },

  mounted: function() {
    console.info("==== mounted ProductList");
    this.currentPage = Number(this.page) + 1; // TODO use type-safe props
    this.fetchProducts();
  },

  methods: {
    linkGen: function(currentPage) {
      return `/products?page=${currentPage - 1}&size=${this.size}`;
    },

    fetchProducts: async function() {
      if (this.isAccessTokenExpired()) {
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
          page: this.page || 0,
          size: this.size || 20
        }
      };

      axios
        .request(getProducts)
        .then(response => {
          this.totalPages = _.get(response, "data.page.totalPages", 5);
          this.products = _.get(response, "data._embedded.products", []);
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
</style>
