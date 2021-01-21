<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Echarts></Echarts>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Echarts from "./components/echartsMap.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Echarts,
  },
};
</script>

<style>
</style>
