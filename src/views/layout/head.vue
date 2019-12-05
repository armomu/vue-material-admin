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
            <v-icon>mdi-apps</v-icon>
        </v-btn>
        <!-- <router-link
            :to=" '/' + item.path"
            class="nav-link"
            v-for="(item,index) in menus"
            :key="index"
            v-ripple
        >
            <span>·</span>
            {{$t("header."+item.name)}}
        </router-link> -->
        <v-toolbar-items>
            <v-btn
                text
                v-for="(item,index) in menus"
                :key="index"
                class="nav-link-btn"
                :to="'/' + item.path"
                dark
            >
                {{$t("header."+item.name)}}
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn
                    text
                    v-on="on"
                    href="mailto:contact@akveo.com"
                    class="icon_mine_email"
                >
                    <v-icon left>mdi-email</v-icon>894620576@qq.com
                </v-btn>
            </template>
            <span>Contact email</span>
        </v-tooltip>
        <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn> -->
        <v-btn
            icon
            target="_blank"
            href="https://github.com/Groundhog-Chen/vue-material-admin"
        >
            <v-icon title="https://github.com/Groundhog-Chen/vue-material-admin">mdi-github-circle</v-icon>
        </v-btn>
        <v-btn
            icon
            @click="settingsVisible = true"
        >
            <v-icon>mdi-settings</v-icon>
        </v-btn>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    v-on="on"
                    href="https://vuetifyjs.com"
                    target="_blank"
                >
                    <v-icon>mdi-vuetify</v-icon>
                </v-btn>
            </template>
            <span>Vuetifyjs UI Components</span>
        </v-tooltip>
        <v-navigation-drawer
            v-model="muneVisible"
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
            <v-list rounded>
                <v-list-item-group color="primary">
                    <v-list-item
                        v-ripple
                        v-for="(item,index) in menus"
                        :key="index"
                        :to="'/' + item.path"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{$t("header."+item.name)}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
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
                    <v-list-item
                        :key="key + 2"
                        dark
                        :style="{background: item.color}"
                        @click="handleChangeColor(item.color, key)"
                    >
                        <v-list-item-action>
                            <v-checkbox v-model="item.active"></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
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
            <v-subheader>Sign out</v-subheader>
            <div style="margin: 0 20px;">
                <v-btn color="error" block @click="handleSignOut">Sign out</v-btn>
            </div>
        </v-navigation-drawer>
    </v-toolbar>
</template>
<script>
export default {
    data() {
        return {
            Language: 'en_US',
            muneVisible: false,
            settingsVisible: false
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
        },
        colors() {
            return this.$store.state.colors;
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
        handleChangeColor(color, key) {
            this.$vuetify.theme.themes.light.primary = color;
            // this.colors = this.colors.map((item, index) => {
            //     item.active = index === key;
            //     return item;
            // });
            this.$store.commit('handleSetColor', key);
        },
        handleCutover(val) {
            this.$i18n.locale = val;
        },
        handleSignOut() {
            try {
                this.$store.commit('handleSignOut');
                setTimeout(() => {
                    this.$router.push('/login');
                }, 300);
            } catch {}

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
        line-height: 60px;
        padding: 0 12px;
        opacity: 0.8;
        &:first-child {
            margin-left: 0;
        }
        &:hover {
            background: rgba($color: #fff, $alpha: 0.1);
            // border-radius: 6px;
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
        .nav-link-btn {
            display: none;
        }
        .icon_mine_email {
            display: none !important;
        }
    }
}
</style>
