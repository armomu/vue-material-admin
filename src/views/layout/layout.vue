<template>
    <div>
        <Head />
        <div class="zwf"></div>
        <transition name="fade-transform" mode="out-in">
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
<style>
.zwf {
    height: 64px;
}
@media screen and (min-width: 860px) and (max-width: 960px)  {
    .zwf{
        height: 48px;
    }
}
@media screen and (max-width: 860px)  {
    .zwf{
        height: 56px;
    }
}

</style>
