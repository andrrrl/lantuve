<template>
  <div id="app">
    <!-- <h5 v-text="msg"></h5> -->
    <index></index>
  </div>
</template>

<script>
import IndexVue from "./components/Index.vue";

export default {
  name: "app",
  data() {
    return {
      msg: "App.vue"
    };
  },
  components: {
    index: IndexVue
  }
};
</script>
