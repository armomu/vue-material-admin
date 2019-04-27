<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script>
export default {};
</script>
<style lang="stylus">
body::-webkit-scrollbar {
        width: 0;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 0;
    }
body::-webkit-scrollbar-thumb {
    }
body::-webkit-scrollbar-track {
    }
</style>
