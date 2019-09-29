<template>
    <div class="page_layout">

        <Head />
        <div class="zwf"></div>
        <transition
            name="fade-transform"
            mode="out-in"
        >
            <router-view />
        </transition>
    </div>
</template>
<script>
import Head from './head.vue';
export default {
    components: {
        Head
    }
};
</script>
<style lang="scss">
.page_layout {
    animation: page_layout_animate 0.3s;
}
@keyframes page_layout_animate {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.zwf {
    height: 64px;
}
@media screen and (min-width: 860px) and (max-width: 960px) {
    .zwf {
        height: 48px;
    }
}
@media screen and (max-width: 860px) {
    .zwf {
        height: 56px;
    }
}
</style>
