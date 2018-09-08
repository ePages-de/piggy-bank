<template>
  <div v-on:click="toggleSale" :class="{ sale: onSale }">
    <div class="row">
      <div class="col-12 text-center product-name">
        {{ product.name }}
      </div>
    </div>
    <div class="col-12 text-center product-sku">
      ({{ product.sku }})
    </div>
    <div class="row">
      <div class="col-12 text-center product-image">
        <img :src="imageLink" :alt="product.name"/>
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-right product-sales-price">
        {{ product.salesPrice.amount | amount }}
        <span v-html="currencySymbol"></span>
      </div>
      <div class="col-6 text-left product-list-price" v-if="product.listPrice">
        {{ product.listPrice.amount | amount }}
        <span v-html="currencySymbol"></span>
      </div>
      <div class="col-6" v-else>
        &nbsp;
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import StorageMixin from "../mixins/StorageMixin";
import axios from "axios";
import numeral from "numeral";
import uriTemplates from "uri-templates";
import _ from "lodash";

export default {
  mixins: [StorageMixin],

  props: ["product", "reduction", "errors"],

  computed: {
    onSale: function() {
      return this.product.tags && this.product.tags.includes("sale");
    },

    imageLink: function() {
      var link = _.get(this.product, "_links[default-image-data]", null);
      return link
        ? uriTemplates(link.href).fill({ width: 200, height: 100 })
        : "https://dummyimage.com/200x100/dedede/000000.png&text=no+image";
    },

    // can't use a filter here, because of HTML escaping!
    currencySymbol: function() {
      switch (this.product.salesPrice.currency) {
        case "GBP":
          return "&pound";
        case "EUR":
          return "&euro;";
        default:
          return "???";
      }
    }
  },

  filters: {
    amount: function(value) {
      return numeral(value).format("0,0.00");
    }
  },

  methods: {
    toggleSale: function() {
      if (this.onSale) {
        this.removeFromSale();
      } else {
        this.putOnSale();
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
            this.errors.push({
              message: `error patching product ${this.product.sku}: ${
                request.statusText
              }`
            });
          }
        })
        .catch(e => {
          console.error(e);
          this.errors.push({
            message: `error patching product ${this.product.sku}`
          });
        });
    },

    /*
      1.) store current salesPrice as new listPrice
      2.) reduce salesPrice by x%
      3.) add sale tag
    */
    putOnSale: function() {
      if (this.onSale) {
        this.errors.push({
          message: `product ${this.product.sku} is already on sale`
        });
        return;
      }

      var listPrice = {
        amount: this.product.salesPrice.amount,
        currency: this.product.salesPrice.currency,
        taxModel: this.product.salesPrice.taxModel
      };

      var salesPrice = {
        amount: listPrice.amount * (100 - this.reduction) / 100,
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
      if (!this.onSale) {
        this.errors.push({
          message: `product ${this.product.sku} is not on sale`
        });
        return;
      }

      var salesPrice = {
        amount: this.product.listPrice.amount,
        currency: this.product.listPrice.currency,
        taxModel: this.product.listPrice.taxModel
      };

      var saleTagIndex = this.product.tags.findIndex(tag => tag === "sale");

      var patch = [
        {
          op: "test",
          path: `/tags/${saleTagIndex}`,
          value: "sale"
        },
        {
          op: "replace",
          path: "/salesPrice",
          value: salesPrice
        },
        {
          op: "remove",
          path: "/listPrice"
        },
        {
          op: "remove",
          path: `/tags/${saleTagIndex}`
        }
      ];

      this.patchProduct(patch);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sale {
  background-color: rgba(220, 20, 60, 0.15);
}

.product-name {
  font-weight: bold;
}

.sale .product-sales-price {
  color: crimson;
}

.product-list-price {
  text-decoration: line-through;
}
</style>
