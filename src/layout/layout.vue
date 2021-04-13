<template>
    <v-main
        class="page_root"
        v-resize="onResize"
        :class="{ miniVariant: miniVariant }"
    >
        <!--菜单开始-->
        <v-navigation-drawer
            v-model="menuDrawer"
            disable-resize-watcher
            mini-variant-width="74"
            class="page_drawer"
            absolute
            dark
            style="z-index: 4"
        >
            <template v-slot:img>
                <v-img
                    src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg"
                    gradient="rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)"
                />
            </template>

            <v-list nav class="py-0">
                <v-list-item
                    @click="
                        window.open(
                            'https://github.com/Groundhog-Chen/vue-material-admin'
                        )
                    "
                    style="margin-top: 8px"
                >
                    <v-list-item-avatar size="40">
                        <img
                            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png"
                        />
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title"
                            >MATERIAL-UI</v-list-item-title
                        >
                        <v-list-item-subtitle
                            >vue-material-admin</v-list-item-subtitle
                        >
                    </v-list-item-content>
                </v-list-item>
                <!-- <v-divider></v-divider> -->
            </v-list>
            <v-list nav class="py-0" style="margin-top: 20px">
                <template v-for="(item, index) in menus">
                    <template
                        v-if="
                            item.visible &&
                            item.children &&
                            item.children.length > 1
                        "
                    >
                        <v-list-group
                            :key="item.path"
                            :prepend-icon="item.meta.icon"
                            :group="item.name"
                            active-class="v_list_group_active"
                            :value="checkMenuGroupValue(item.path)"
                        >
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        $t('header.' + item.meta.title)
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item
                                v-for="(child, key) in item.children"
                                :key="key"
                                :to="{ name: child.name }"
                                active-class="primary"
                            >
                                <v-list-item-avatar>
                                    <v-icon v-text="child.meta.icon"></v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        child.meta.title
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </template>
                    <template v-else>
                        <v-list-item
                            v-if="item.visible"
                            :key="index"
                            :to="{ path: item.path }"
                            active-class="primary"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.meta.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    $t('header.' + item.meta.title)
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </template>
            </v-list>
        </v-navigation-drawer>
        <!--菜单结束-->
        <!--主体开始-->
        <div class="page_right_content" :class="{ darkMode: darkMode }">
            <v-toolbar class="header" >
                <!--处理显示导航菜单-->
                <v-btn
                    fab
                    style="margin-right: 16px"
                    text
                    @click="handleMenuDrawer"
                    v-if="!menuDrawer"
                >
                    <v-icon v-if="menuDrawer">mdi-drag</v-icon>
                    <v-icon v-else>mdi-drag-horizontal</v-icon>
                </v-btn>
                <!--处理导航菜单mini样式-->
                <v-btn
                    fab
                    style="margin-right: 16px"
                    text
                    @click="handleMiniMenu"
                    v-else
                >
                    <v-icon v-if="!miniVariant">mdi-view-headline</v-icon>
                    <v-icon v-else>mdi-view-headline</v-icon>
                </v-btn>
                <!-- <v-btn small text disabled></v-btn> -->

                <v-spacer></v-spacer>
                <v-text-field
                    label="Search"
                    placeholder="search keyword"
                    filled
                    rounded
                    flat
                    hide-details
                    dense
                    solo
                    prepend-inner-icon="mdi-magnify"
                    style="max-width: 400px; margin-right: 16px"
                ></v-text-field>
                <v-menu
                    v-model="noticeVisible"
                    :close-on-content-click="false"
                    max-width="280px"
                    offset-y
                    open-on-hover
                >
                    <template v-slot:activator="{ on }">
                        <v-badge
                            content="9"
                            value="9"
                            :offset-x="30"
                            :offset-y="20"
                            overlap
                            bordered
                        >
                            <v-btn text v-on="on">
                                <v-icon>mdi-bell</v-icon>
                            </v-btn>
                        </v-badge>
                    </template>

                    <v-card>
                        <v-list three-line>
                            <template v-for="(item, index) in items">
                                <v-subheader
                                    v-if="item.header"
                                    :key="item.header"
                                    v-text="item.header"
                                ></v-subheader>
                                <v-divider
                                    v-else-if="item.divider"
                                    :key="index"
                                    :inset="item.inset"
                                ></v-divider>
                                <v-list-item
                                    v-else
                                    :key="item.title"
                                    @click="() => {}"
                                >
                                    <v-list-item-avatar>
                                        <v-img :src="item.avatar"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            v-html="item.title"
                                        ></v-list-item-title>
                                        <v-list-item-subtitle
                                            v-html="item.subtitle"
                                        ></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="noticeVisible = false"
                                >Clear</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-menu>
                <v-btn
                    text
                    target="_blank"
                    href="https://github.com/Groundhog-Chen/vue-material-admin"
                    class="min_hide"
                >
                    <v-icon
                        title="https://github.com/Groundhog-Chen/vue-material-admin"
                        >mdi-github-circle</v-icon
                    >
                </v-btn>
                <v-btn text @click="fullScreen" class="min_hide">
                    <v-icon>mdi-arrow-expand-all</v-icon>
                </v-btn>
                <v-btn text @click="settingsVisible = true">
                    <v-icon>mdi-settings</v-icon>
                </v-btn>
                <template v-slot:extension>
                    <Tags />
                </template>
            </v-toolbar>
            <Breadcrumbs />
            <transition name="fade-transform" mode="out-in">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive" />
                </keep-alive>
            </transition>
            <transition name="fade-transform" mode="out-in">
                <router-view v-if="!$route.meta.keepAlive" />
            </transition>
        </div>
        <v-navigation-drawer v-model="settingsVisible" fixed temporary right>
            <div class="d-flex align-center">
                <v-card-title>Settings</v-card-title>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    class="mr-2"
                    @click="settingsVisible = !settingsVisible"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            <v-subheader>Language</v-subheader>
            <v-btn-toggle v-model="language" borderless class="mx-4">
                <v-btn value="zh_CN"> 中文 </v-btn>
                <v-btn value="en_US"> English </v-btn>
            </v-btn-toggle>
            <v-subheader>Dark Mode</v-subheader>
            <v-btn-toggle v-model="darkMode" borderless class="mx-4">
                <v-btn :value="false"> light </v-btn>
                <v-btn :value="true"> dark </v-btn>
            </v-btn-toggle>
            <v-subheader>Header Tags</v-subheader>
            <v-btn-toggle v-model="darkMode" borderless class="mx-4">
                <v-btn :value="false"> Show </v-btn>
                <v-btn :value="true"> hide </v-btn>
            </v-btn-toggle>
            <v-subheader>Color Option</v-subheader>
            <div class="px-4">
                <v-color-picker
                    v-model="primary"
                    :swatches="swatches"
                    mode="hexa"
                    show-swatches
                />
            </div>
        </v-navigation-drawer>
        <!--主体结束-->
    </v-main>
</template>
<script>
import Breadcrumbs from '../components/breadcrumbs';
import Tags from './tags';
export default {
    components: {Breadcrumbs, Tags},
    data() {
        return {
            tx: require('../assets/wx.png'),
            menuDrawer: true,
            expandOnHover: false,
            noticeVisible: false,
            bg: {
                'src':
					'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
                'linear-gradient':
					'to top right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)'
            },
            miniVariant: false,            
            settingsVisible: false,
            isFullScreen: false,
            name: '',
            desc: '',
            token: '',
            cruds: [
                ['Create', 'add'],
                ['Read', 'insert_drive_file'],
                ['Update', 'update'],
                ['Delete', 'delete'],
            ],
            items: [
                { header: 'Today' },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: '<span class=\'text--primary\'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: '<span class=\'text--primary\'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                },
            ],
            swatches: [
                ['#1890ff', '#4CAF50', '#E91E63', '#323259'],
                ['#0096C7', '#EE4F12', '#EE44AA', '#46BBB1'],
                ['#55BB46', '#AAAA00', '#555500', '#005500']
            ],
        };
    },
    computed: {
        loadPaths() {
            return this.$route.path.split('/');
        },
        primary: {
            get: function() {
                return this.$vuetify.theme.themes.light.primary;
            },
            set: function(val) {
                this.$vuetify.theme.themes.light.primary = val;            
                if (this.darkMode) {
                    this.$vuetify.theme.dark = false;
                }
            }            
        },
        darkMode: {
            get: function() {
                return this.$vuetify.theme.dark;
            },
            set: function(val) {
                this.$vuetify.theme.dark = val;
            }
        },
        menus() {
            const { options } = this.$router;
            return options.routes;
        },
        language: {
            get: function() {
                return 'en_US';
            },
            set: function(val) {
                this.$i18n.locale = val;
            }

        } 
    },
    created() {
        // console.log(this.$i18n.locale);
    },
    methods: {        
        onResize(e) {
            if(!e) return; 
            const { innerWidth } = e.srcElement;
            if(innerWidth>1250) {
                // console.log('BOOM');
                this.menuDrawer = true;
            }
        },
        checkMenuGroupValue(path) {
            const arr = path.split('/');
            if(!arr[1]) {
                return false;
            }
            return this.loadPaths.includes(arr[1]);
        },
        handleMenuDrawer() {
            this.menuDrawer = !this.menuDrawer;
        },
        handleMiniMenu() {
            this.miniVariant = !this.miniVariant;
        },
        tmyx() {
            this.$store.commit('handleChangeMlmlh');
        },
        tmlx() {
            this.$store.commit('handleChangeYmlmlh');
        },
        handleChangeColor(color) {
            this.$vuetify.theme.themes.light.primary = color;            
            if (this.darkMode) {
                this.$vuetify.theme.dark = false;
            }
        },
        handleSignOut() {
            this.$store.commit('handleSignOut');
            setTimeout(() => {
                this.$router.push('/login');
            }, 300);
        },
        fullScreen() {
            const el = document.documentElement;
            const rfs =
				el.requestFullScreen ||
				el.webkitRequestFullScreen ||
				el.mozRequestFullScreen ||
				el.msRequestFullscreen;
            if (typeof rfs != 'undefined' && rfs) {
                rfs.call(el);
            }
            this.isFullScreen = true;
            return;
        }
    }
};
</script>
