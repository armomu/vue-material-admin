<template>
    <v-toolbar
        dark
        absolute
        color="primary"
        style="z-index:10; width: 100%"
        class="header"
    >
        <v-btn
            icon
            style="margin-right:18px;"
            @click="handleChangeMenuVisible(true)"
        >
            <v-icon>apps</v-icon>
        </v-btn>
        <router-link
            :to=" '/' + item.path"
            class="nav-link"
            v-for="(item,index) in menus"
            :key="index"
        >
            <span>·</span>
            {{$t("header."+item.name)}}
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-text-field
                class="mx-3"
                flat
                label="Search"
                prepend-inner-icon="search"
                solo-inverted
            ></v-text-field>
        </v-toolbar-items>
        <v-btn
            icon
            target="_blank"
            href="https://github.com/Groundhog-Chen/Vuetify-todo"
        >
            <v-icon title="894620576@qq.com">email</v-icon>
        </v-btn>
        <v-btn
            icon
            @click="settingsVisible = true"
        >
            <v-icon>settings</v-icon>
        </v-btn>
        <v-btn
            icon
            href="https://v15.vuetifyjs.com/zh-Hans/"
            target="_blank"
            title="Vuetifyjs components-ui"
            style="background-image: url(&quot;https://cdn.vuetifyjs.com/images/logos/v-alt.svg&quot;); background-position: center center;"
        ></v-btn>
        <v-navigation-drawer
            v-model="muneVisible"
            color="primary"
            fixed
            temporary
            hide-overlay
            light
            style="height: 100vh;"
        >
            <v-toolbar
                dark
                color="primary"
            >
                <v-toolbar-title class="white--text">Vue Material</v-toolbar-title>

                <v-spacer></v-spacer>
            </v-toolbar>
            <v-list>
                <v-list-tile
                    exact
                    to="/dashboard"
                    v-ripple
                >
                    <v-list-tile-action>
                        <v-icon color="primary">dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Dashboard</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                    exact
                    to="/task"
                    v-ripple
                >
                    <v-list-tile-action>
                        <v-icon color="amber lighten-1">build</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Task</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                    exact
                    to="/flies"
                    v-ripple
                >
                    <v-list-tile-action>
                        <v-icon color="teal darken-2">backup</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Flies</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                    exact
                    to="/map"
                    v-ripple
                >
                    <v-list-tile-action>
                        <v-icon color="orange darken-2">map</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Map</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer
            v-model="settingsVisible"
            fixed
            temporary
            hide-overlay
            right
            light
            style="height: 100vh"
        >
            <v-toolbar
                dark
                color="primary"
            >
                <v-toolbar-title class="white--text">Settings</v-toolbar-title>

                <v-spacer></v-spacer>
            </v-toolbar>
            <v-subheader>Color Option</v-subheader>
            <v-list
                subheader
                style="margin: 0 20px;"
            >
                <template v-for="(item,key) in colors">
                    <v-list-tile
                        :key="key + 2"
                        dark
                        :style="{background: item.color}"
                        @click="handleChangeColor(item.color, key)"
                    >
                        <v-list-tile-action>
                            <v-checkbox v-model="item.active"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider
                        v-if="key + 1 < colors.length"
                        :key="`divider-${key}`"
                    ></v-divider>
                </template>
            </v-list>
            <v-subheader>Language Option</v-subheader>
            <v-radio-group
                v-model="Language"
                @change="handleCutover"
                style="margin: 0 20px;"
            >
                <v-radio
                    label="中文"
                    value="zh_CN"
                    color="primary"
                ></v-radio>
                <v-radio
                    label="English"
                    value="en_US"
                    color="primary"
                ></v-radio>
            </v-radio-group>
        </v-navigation-drawer>
    </v-toolbar>
</template>
<script>
export default {
    data() {
        return {
            Language: 'en_US',
            muneVisible: false,
            settingsVisible: false,
            colors: [
                {
                    name: 'default',
                    color: '#1890ff',
                    active: true
                },
                {
                    name: 'deep-purple',
                    color: '#673AB7',
                    active: false
                },
                {
                    name: 'pink',
                    color: '#E91E63',
                    active: false
                },
                {
                    name: 'teal',
                    color: '#009688',
                    active: false
                }
            ]
        };
    },
    created() {},
    computed: {
        locale(key) {
            return this.$t('header.' + key);
        },
        menus() {
            const { options } = this.$router;
            return options.routes[0].children.map((item) => {
                item['active'] = false;
                return item;
            });
        }
    },
    mounted() {
        // console.log(this.$t("header.moving"))
    },
    methods: {
        handleChangeMenuVisible(status) {
            this.muneVisible = status;
        },
        tmyx() {
            this.$store.commit('handleChangeMlmlh');
        },
        tmlx() {
            this.$store.commit('handleChangeYmlmlh');
        },
        handleChangeColor(calor, key) {
            this.$vuetify.theme.themes.light.primary = calor;
            this.colors = this.colors.map((item, index) => {
                item.active = index === key;
                return item;
            });
        },
        handleCutover(val) {
            this.$i18n.locale = val;
        }
    }
};
</script>
<style lang="scss">
.header {
    .v-input__control {
        min-height: 40px !important;
    }
    .v-input__slot {
        margin-bottom: 0;
    }
    .nav-link {
        font-size: 16px;
        color: #ffffff;
        margin: 0 12px;
        text-decoration: none;
        transition: all 0.3s;
        line-height: 30px;
        padding: 0 12px;
        opacity: 0.8;
        &:hover {
            background: rgba($color: #fff, $alpha: 0.1);
            border-radius: 6px;
            opacity: 1;
        }
        span {
            display: none;
            font-weight: 900;
        }
    }
    .left_menu {
        display: block;
        position: fixed;
        width: 65%;
        height: 100vh;
        z-index: 901;
        left: -65%;
        top: 0;
        background: #ffffff;
        .menu_btn {
            position: absolute;
            right: -42px;
            top: 60px;
        }
        .menu_list {
            .nav-link {
                line-height: 45px;
                color: #fff;
                padding-left: 20px;
                margin: 0;
                display: block;
            }
            .nav-link.router-link-active {
                color: #a16eff;
            }
        }
    }
    .left_menu.show_menu {
        left: 0;
    }
    .nav-link.router-link-active {
        opacity: 1;
        span {
            display: inline-block;
        }
    }
}

@media screen and (max-width: 930px) {
    .header {
        .v-input__control {
            min-height: 30px !important;
        }
        .nav-link {
            display: none;
        }
    }
}
</style>
