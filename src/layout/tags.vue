<template>
    <v-tabs v-model="curTab" @change="change">
        <v-tab v-for="(item, i) in tabs" :key="i">{{ item.meta.title }}</v-tab>
    </v-tabs>
</template>

<script>
export default {
    data() {
        return {
            tabs: [],
            curTab: 0,
        };
    },
    watch: {
        $route(val) {
            console.log(val);
            let has = false;
            this.tabs.forEach((item, index) => {
                if (item.name === val.name) {
                    has = true;
                    this.curTab = index - 1;
                }
            });
            if (!has) {
                this.tabs.push(val);
                this.curTab = this.tabs.length - 1;
            }         
        }
    },
    created() {
        this.tabs.push(this.$route);
    },
    methods: {
        change(val) {
            const { fullPath } = this.tabs[val];
            this.$router.push({
                path: fullPath
            });
        }
    }
};
</script>