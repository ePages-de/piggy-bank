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

    putOnSale: function() {
      var reduced = this.product.salesPrice;
      reduced.amount -=
        _.get(this.product, "listPrice.amount", reduced.amount) *
        this.reduction;

      // {"op": "remove", "path": "/tags/1"}
      var patch = [
        { op: "add", path: "/tags/-", value: "sale" },
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
          url: `/products/${this.product._id}`,
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${this.access_token.bearer}`
          },
          data: patch
        })
        .then(response => {
          if (response.status === 200) {
            // FIXME [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
            // Instead, use a data or computed property based on the prop's value. Prop being mutated: "product"
            this.product = response.data;
          } else {
            this.errors.push({ message: request.statusText });
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push({ message: "error processing request" });
        });
    },

    removeFromSale: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
