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
      collapsed: false,
      admins: [["Management", "people_outline"], ["Settings", "settings"]],
      cruds: [
        ["Create", "add"],
        ["Read", "insert_drive_file"],
        ["Update", "update"],
        ["Delete", "delete"]
      ]
    };
  }
};
</script>
<style>
.zwf {
  height: 64px;
}
</style>
