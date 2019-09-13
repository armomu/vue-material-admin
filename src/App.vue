<template>
    <v-app id="app" :class="{malimalih: mlmlh,ymalimalih: ymlmlh}">
        <router-view  :class="{ymalimalih: ymlmlh}"/>        
    </v-app>
</template>
<script>
export default {
    computed: {
        mlmlh() {
            return this.$store.state.mlmlh;
        },
        ymlmlh() {
            return this.$store.state.ymlmlh;
        },
    },
    mounted() {
        setTimeout(() => {
            document.getElementById("loading").remove();
        }, 500);
    }
};
</script>
<style lang="scss" scoped>
#app {
    transition: all 0.5s;
    perspective:150;
    > div{
        transition: all .5s;
    }
}
.malimalih {
    transform: rotate(180deg);
}
.ymalimalih {
    transform: rotateX(20deg);
}
</style>
