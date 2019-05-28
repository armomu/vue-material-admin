<template>
  <div>
    <Head/>
    <div class="zwf"></div>
    <router-view/>
  </div>
</template>
<script>
import Head from "./head.vue";
export default {
  components: {
    Head
  },
  data() {
    return {

    };
  }
};
</script>
<style>
.zwf {
  height: 64px;
}
</style>
