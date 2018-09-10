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
      this.totalPages = 1;
      this.products = [
        {
          _id: "1",
          name: "AC/DC",
          sku: "rock-001",
          salesPrice: { amount: 19.99, currency: "EUR", taxModel: "GROSS" },
          tags: [],
          _links: {
            "default-image-data": {
              href:
                "https://www.emp.de/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw93cc73cf/images/3/4/1/0/341037a-emp.jpg?sw=350&sh=400&sm=fit&sfrm=png"
            }
          }
        },
        {
          _id: "2",
          name: "Metallica",
          sku: "metal-002",
          salesPrice: { amount: 19.99, currency: "EUR", taxModel: "GROSS" },
          tags: [],
          _links: {
            "default-image-data": {
              href:
                "https://www.emp.de/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw38dc7962/images/3/6/4/9/364978a-emp.jpg?sw=350&sh=400&sm=fit&sfrm=png"
            }
          }
        },
        {
          _id: "3",
          name: "Slayer",
          sku: "metal-003",
          salesPrice: { amount: 19.99, currency: "EUR", taxModel: "GROSS" },
          tags: [],
          _links: {
            "default-image-data": {
              href:
                "https://www.emp.de/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw57e1ba87/images/3/2/2/5/322520a-emp.jpg?sw=350&sh=400&sm=fit&sfrm=png"
            }
          }
        },
        {
          _id: "4",
          name: "Motörhead",
          sku: "rock-004",
          salesPrice: { amount: 19.99, currency: "EUR", taxModel: "GROSS" },
          tags: [],
          _links: {
            "default-image-data": {
              href:
                "https://www.emp.de/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw3ef14a19/images/3/4/5/9/345954a.jpg?sw=350&sh=400&sm=fit&sfrm=png"
            }
          }
        },
        {
          _id: "5",
          name: "Guns N'Roses",
          sku: "glam-005",
          salesPrice: { amount: 16.99, currency: "EUR", taxModel: "GROSS" },
          listPrice: { amount: 19.99, currency: "EUR", taxModel: "GROSS" },
          tags: ["sale"],
          _links: {
            "default-image-data": {
              href:
                "https://www.emp.de/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwf0f5b385/images/2/7/0/0/270080a-emp.jpg?sw=350&sh=400&sm=fit&sfrm=png"
            }
          }
        },
        {
          _id: "6",
          name: "Iron Maiden",
          sku: "metal-006",
          salesPrice: { amount: 24.99, currency: "EUR", taxModel: "GROSS" },
          tags: [],
          _links: {
            "default-image-data": {
              href:
                "https://www.emp.de/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw06c22ba2/images/3/2/5/0/325014a-emp.jpg?sw=350&sh=400&sm=fit&sfrm=png"
            }
          }
        }
      ];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
