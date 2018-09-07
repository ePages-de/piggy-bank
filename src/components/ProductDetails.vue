<template>
  <div class="product row p-1">
    <div class="col-1">
      <button class="btn btn-danger" v-if="onSale" v-on:click.prevent="removeFromSale">{{ reductionPercentage }}</button> 
      <button class="btn btn-warning" v-else v-on:click.prevent="putOnSale">{{ reductionPercentage }}</button> 
    </div>
    <div class="col-6">
      {{ product.name }}
    </div>
    <div class="col text-right">
      {{ product.salesPrice.amount | amount }} 
      <span v-html="currency(product.salesPrice.currency)"></span>
    </div>
    <div class="col text-right">
      {{ product.listPrice ? product.listPrice.amount : '' | amount }}
      <span v-html="currency(product.salesPrice.currency)"></span>
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

  props: ["product", "reduction"],

  data: function() {
    return {
      errors: []
    };
  },

  computed: {
    onSale: function() {
      return this.product.tags && this.product.tags.includes("sale");
    },

    reductionPercentage: function() {
      return `${this.reduction * 100}%`;
    }
  },

  filters: {
    amount: function(value) {
      return numeral(value).format("0,0.00");
    }
  },

  methods: {
    // can't use a filter here, because of HTML escaping!
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

    patchProduct: function(patch) {
      axios
        .request({
          baseURL: this.api_url,
          timeout: 5000,
          method: "PATCH",
          url: `/products/${this.product._id}`,
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${this.access_token.bearer}`
          },
          data: patch
        })
        .then(response => {
          if (response.status === 200 && response.data) {
            this.product.salesPrice = response.data.salesPrice;
            this.product.listPrice = response.data.listPrice;
            this.product.tags = response.data.tags;
          } else {
            this.errors.push({ message: request.statusText });
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push({ message: "error processing request" });
        });
    },

    /*
      1.) store current salesPrice as new listPrice
      2.) reduce salesPrice by x%
      3.) add sale tag
    */
    putOnSale: function() {
      var listPrice = {
        amount: this.product.salesPrice.amount,
        currency: this.product.salesPrice.currency,
        taxModel: this.product.salesPrice.taxModel
      };

      var salesPrice = {
        amount: listPrice.amount - listPrice.amount * this.reduction,
        currency: listPrice.currency,
        taxModel: listPrice.taxModel
      };

      var patch = [
        {
          op: "replace",
          path: "/listPrice",
          value: listPrice
        },
        {
          op: "replace",
          path: "/salesPrice",
          value: salesPrice
        },
        { op: "add", path: "/tags/-", value: "sale" }
      ];

      this.patchProduct(patch);
    },

    /*
      1.) store current listPrice as new salesPrice
      2.) remove listPrice
      3.) remove sale tag
    */
    removeFromSale: function() {
      var salesPrice = {
        amount: this.product.listPrice.amount,
        currency: this.product.listPrice.currency,
        taxModel: this.product.listPrice.taxModel
      };

      var patch = [
        {
          op: "replace",
          path: "/salesPrice",
          value: salesPrice
        }, {
          op: "remove",
          path: "/listPrice"
        }, {
          op: "remove",
          path: "/tags/-" // "/tags/1"
        }
      ];

      this.patchProduct(patch);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
