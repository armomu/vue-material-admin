<template>
    <v-tabs v-model="curTab" @change="change">
        <v-tab v-for="(item, i) in tabs" :key="i" show-arrows>
            {{ item.meta.title }}            
            <v-btn
                v-if="curTab === i"
                small
                icon
                class="ml-1"
            >
                <v-icon small>mdi-cached</v-icon>
            </v-btn>
            <v-btn
                v-if="tabs.length > 1"
                small
                icon
                @click.stop="onClose(i)"
            >
                <v-icon small>mdi-close</v-icon>
            </v-btn>
        </v-tab>
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
            // console.log(val);
            let has = false;
            this.tabs.forEach((item, index) => {
                if (item.name === val.name) {
                    has = true;
                    this.curTab = index;
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
            const { fullPath, path, name } = this.tabs[val];
            this.$router.replace({ fullPath, path, name });
        },
        onClose(i) {
            if(this.curTab.length === 1) return;
            this.tabs.splice(i, 1);
            const item = this.tabs[i] || this.tabs[i - 1];
            if (this.curTab !== i) return; 
            const { fullPath, path, name } = item;
            this.$router.replace({ fullPath, path, name });
        }
    }
};
</script>