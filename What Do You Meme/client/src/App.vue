<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <MyNav></MyNav>
    <router-view/>
  </div>
</template>

<script>
  import MyNav from "@/components/Nav.vue";

  export default {
    components: {
      MyNav
    }
  }
</script>

<style lang="scss">

</style>
