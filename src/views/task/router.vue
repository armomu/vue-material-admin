<template>
    <div class="task_router">
         <v-card class="left_nav">
            <v-list>
                 <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="primary"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
            </v-list>
            <v-layout
                align-end
                justify-center
            >
                <v-btn
                    round
                    color="primary"
                    outline
                >create menu</v-btn>
            </v-layout>
        </v-card>
        <router-view />
    </div>
</template>

<script>
export default {
    created() {
        // console.log(this.$router)
    },
    computed: {
        menus() {
            return this.$route
        }
    }
}
</script>

<style lang="scss" scoped>

.task_router {
    display: flex;
    .left_nav {
        flex: 0 0 250px;
        height: calc(100vh - 64px);
        position: relative;
        .layout {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 20px;
        }
    }
}
</style>