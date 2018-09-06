<template>
  <div id="app">
    <img alt="ePages logo" src="./assets/epages.png">
    <h2>Welcome to the BEYOND vue.js Starter!</h2>
    <Credentials/>
    <ProductList/>
  </div>
</template>

<script>
import Credentials from "./components/Credentials.vue";
import ProductList from "./components/ProductList.vue";

export default {
  name: "app",
  components: {
    Credentials,
    ProductList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
