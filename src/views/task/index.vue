<template>
  <div class="about">
    <h1>任务</h1>
    <h1>{{isLogin}}</h1>
  </div>
</template>
<script>
export default {
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
  },
  computed: {
    // 计算属性的 getter
    isLogin() {
      // `this` 指向 vm 实例
      return this.$store.state.isLogin;
    }
  },
  mounted(){
    // console.log(this.$store)
  }
};
</script>
<style>
.zwf {
  height: 64px;
}
</style>
