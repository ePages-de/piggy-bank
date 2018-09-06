<template>
  <div id="app">
    <img alt="ePages logo" src="./assets/epages.png">
    <h2>Welcome to the BEYOND vue.js Starter!</h2>
    <ul>
      <li><router-link to="/">login</router-link></li>
      <li><router-link to="/products">products</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
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
