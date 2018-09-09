<template>
  <!-- https://bootstrap-vue.js.org/docs/components/alert/ -->
  <div v-if="alerts && alerts.length">
    <div v-for="(alert, i) of alerts" :key="i">
      <b-alert variant="danger" dismissible :show="true">
        <h5 class="alert-heading">Something bad happened!</h5>
        <p>{{ alert.message }}</p>
      </b-alert>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ["alerts"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
