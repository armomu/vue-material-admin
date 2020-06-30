<template>
    <v-row class="pa-5">
        <v-col cols="12" sm="6">缓存页面的详情页</v-col>
        <v-col cols="12" sm="6">
            <v-btn color="primary" exact @click="$router.go(-1)">返回</v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        };
    },
    // beforeRouteLeave(to, from, next) {
    //     to.meta.keepAlive = true;
    //     this.$store.commit('handleSetTIme');
    //     console.log(to)
    //     next();
    // }
};
</script>