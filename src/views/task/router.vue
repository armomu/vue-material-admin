<template>
    <div class="task_router">
        <v-card class="left_nav">
            <v-text-field label="Search" prepend-inner-icon="search"></v-text-field>
            <v-list>
                <v-list-tile @click="()=>{}" exact to="/task/mine">
                    <v-list-tile-action>
                        <v-icon color="primary">bookmark</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Mine</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="()=>{}" exact to="/task/star">
                    <v-list-tile-action>
                        <v-icon color="amber lighten-1">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Star</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-layout align-end justify-center>
                <v-btn round color="primary" outline>create menu</v-btn>
            </v-layout>
        </v-card>

        <transition name="fade-transform" mode="out-in">
            <router-view />
        </transition>
        <v-bottom-nav color="primary" :value="true" absolute dark shift>
            <v-btn dark exact to="/task/mine">
                <span>Mine</span>
                <v-icon>bookmark</v-icon>
            </v-btn>

            <v-btn dark exact to="/task/star">
                <span>Star</span>
                <v-icon>star</v-icon>
            </v-btn>

            <v-btn dark>
                <span>Book</span>
                <v-icon>book</v-icon>
            </v-btn>

            <v-btn dark>
                <span>Image</span>
                <v-icon>image</v-icon>
            </v-btn>
        </v-bottom-nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            muneVisible: false
        };
    }
    // created() {
    //     // console.log(this.$router)
    // },
    // computed: {
    //     menus() {
    //         return this.$route;
    //     }
    // }
};
</script>

<style lang="scss" soped>
.task_router {
    display: flex;
    height: calc(100vh - 64px);
    overflow: hidden;
    .left_nav {
        flex: 0 0 220px;
        height: calc(100vh - 57px);
        position: relative;
        transition: all 0.5s;
        .menu_btn {
            position: absolute;
            right: -60px;
            top: 120px;
            display: none;
        }
        .v-input {
            margin: 20px 16px 0 16px;
        }
        .layout {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 20px;
            .v-input {
                margin: 20px 16px;
            }
        }
    }
    .v-bottom-nav {
        display: none;
        z-index: 2;
    }
}
</style>