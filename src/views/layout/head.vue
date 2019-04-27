<template>
  <v-toolbar dark fixed color="primary">
    <v-btn icon style="margin-right:18px;">
      <v-icon>apps</v-icon>
    </v-btn>

    <router-link
      :to="item.path"
      v-ripple
      class="nav-link"
      v-for="(item,index) in menus"
      :key="index"
    >{{item.title}}</router-link>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>github-circle</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  created() {
    const { options } = this.$router;
    this.menus = options.routes[0].children.map(item => {
      item["active"] = false;
      return item;
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.nav-link {
  font-size: 16px;
  font-weight: 700;
  display: block;
  color: #ffffff;
  line-height: 64px;
  padding: 0 15px;
  text-decoration: none;
}
.nav-link.router-link-active {
  background: rgba($color: #ffffff, $alpha: 0.2);
}
</style>
