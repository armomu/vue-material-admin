<template>
    <div class="task_router">
        <v-card class="left_nav">
            <v-text-field
                label="Search"
                prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-list rounded>
                <v-list-item-group
                    color="primary"
                >
                    <v-list-item
                        v-for="(item, i) in menus"
                        :key="i"
                        :to="item.url"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>

        <transition
            name="fade-transform"
            mode="out-in"
        >
            <router-view />
        </transition>

        <!-- <v-bottom-navigation
            class="v-bottom-nav"
            color="primary"
            :value="true"
            light
            fixed
            shift
        >
            <v-btn
                dark
                exact
                to="/task/mine"
            >
                <span>Mine</span>
                <v-icon>bookmark</v-icon>
            </v-btn>

            <v-btn
                dark
                exact
                to="/task/star"
            >
                <span>Star</span>
                <v-icon>star</v-icon>
            </v-btn>

            <v-btn
                dark
                exact
                to="/task/book"
            >
                <span>Book</span>
                <v-icon>book</v-icon>
            </v-btn>

            <v-btn
                dark
                exact
                to="/task/image"
            >
                <span>Image</span>
                <v-icon>image</v-icon>
            </v-btn>
        </v-bottom-navigation> -->
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
    .v-bottom-navigation {
        display: none;
        z-index: 2;
    }
}
</style>
