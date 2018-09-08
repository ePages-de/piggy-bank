<template>
<div class="jumbotron">
  <h3 class="text-center">Welcome to Piggy Bank!</h3>

  <p class="text-center piggy-bank">
    <fa icon="piggy-bank" size="8x" :transform="{ rotate: -15 }" />
  </p>

  <p class="lead align-middle">
    How to use this app:
  </p>

    <ol>
      <li>
        <a href="https://signup.beyondshop.cloud" target="beyond_signup">Register your own shop</a> and enter your cockpit.
      </li>
      <li>
        Create your <tt>Custom App</tt> with <em>read</em> (<tt>prod:r</tt>) and <em>update</em> (<tt>prod:u</tt>) scopes for products.
      </li>
      <li>
        Note down the <tt>client_id</tt> and <tt>client_secret</tt> of your <tt>Custom App</tt>.
      </li>
      <li>
        Create some products (or <a href="https://cdp.epages.works/job/data-catalog-import/build?delay=0sec" target="data-catalog-import">import</a> a predefined product catalog).
      </li>
      <li>
        Fetch an <tt>oauth token</tt> by <router-link to="/authorize">authorizing</router-link>.
      </li>
      <li>
        Put <router-link to="/products">your products</router-link> on sale.
      </li>
    </ol>
</div>    
</template>

<script>
/* eslint-disable */
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
