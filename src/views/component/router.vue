<template>
    <div class="task_router">
        <v-card class="left_nav">
            <v-text-field
                label="Search"
                prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-list rounded>
                <v-list-item-group color="primary">

                </v-list-item-group>
            </v-list>
        </v-card>

        <transition
            name="fade-transform"
            mode="out-in"
        >
            <router-view />
        </transition>
        <div class="v-bottom-nav">
            <v-bottom-navigation
                class="primary"
                :value="true"
                fixed
                shift
            >
                <v-btn
                    dark
                    exact
                    v-for="(item, i) in menus"
                    :key="i"
                    :to="item.url"
                >
                    <span style="color: #fff">{{item.title}}</span>
                    <v-icon color="white">{{item.icon}}</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            muneVisible: false,
            menus: [
                {
                    icon: 'mdi-account',
                    url: 'mine',
                    title: 'Mine'
                },
                {
                    icon: 'mdi-star',
                    url: 'star',
                    title: 'Star'
                },
                {
                    icon: 'mdi-book',
                    url: 'book',
                    title: 'Book'
                },
                {
                    icon: 'mdi-image',
                    url: 'image',
                    title: 'Image'
                }
            ]
        };
    },
    mounted() {
        // con
        // this.$vuetify.theme.themes.light.primary)
    }
    // computed: {
    //     menus() {
    //         return this.$route;
    //     }
    // }
};
</script>

<style lang="scss">
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
