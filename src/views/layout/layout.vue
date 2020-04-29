<template>
	<div class="page_layout">
    <!--菜单开始-->
		<v-navigation-drawer
			v-model="menuDrawer"
			:mini-variant="miniVariant"
            disable-resize-watcher
            mini-variant-width="74"
			absolute
			dark
            style="z-index: 2;"
		>
			<v-img
				v-slot:img
				src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg"
				gradient="rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)"
			/>

			<v-list nav class="py-0">
                <!-- <v-list-item  @click="a=>a" style="padding-top:8px; margin-bottom: 0" target="_blank" href="https://vuetifyjs.com">
                    <v-list-item-avatar size="30">
                        <img src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline">Material-UI</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>-->
				<v-list-item  @click="onAxios" style="margin-top:8px">
					<v-list-item-avatar>
						<img src="https://randomuser.me/api/portraits/men/81.jpg" />
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>Groundhog</v-list-item-title>
                        <v-list-item-subtitle >Huajie.Chen</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<!-- <v-divider></v-divider> -->
			</v-list>
			<v-list nav class="py-0" style="margin-top: 20px">
                <template
                    v-for="(item, index) in menus"
                >
                    <template v-if="item.children">
                        <v-list-group :key="item.path" :prepend-icon="item.meta.icon" :group="item.name" active-class="v_list_group_active" :value="loadPaths.includes(item.name)">
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>{{$t("header." + item.name)}}</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="(child, key) in item.children" :key="key"  :to="{ name: child.name }" active-class="primary">
								<v-list-item-avatar>
									<v-icon v-text="child.meta.icon"></v-icon>
								</v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{child.meta.title}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </template>
                    <v-list-item v-else :key="index" :to="{ name: item.name }" active-class="primary">
                        <v-list-item-icon>
                            <v-icon>{{item.meta.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{$t("header." + item.name)}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <v-list-item :to="{ name: 'login' }" >
                    <v-list-item-icon>
                        <v-icon>mdi-fingerprint</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Login Page</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
			</v-list>
		</v-navigation-drawer>
    <!--菜单结束-->
    <!--主体开始-->
		<v-content class="page_right_content" :class="{miniVariant: miniVariant, darkMode: darkMode}">
			<v-toolbar absolute class="header" flat>
                <!--处理显示导航菜单-->
				<v-btn
                    fab
                    small
					style="margin-right:18px;"
                    @click="handleMenuDrawer"
                    v-if="!menuDrawer"
				>
                    <v-icon v-if="menuDrawer">mdi-drag</v-icon>
					<v-icon v-else>mdi-drag-horizontal</v-icon>
				</v-btn>
                <!--处理导航菜单mini样式-->
				<v-btn
                    fab
                    small
					style="margin-right:18px;"
                    @click="handleMiniMenu"
                    v-else
				>
                    <v-icon v-if="!miniVariant">mdi-drag</v-icon>
					<v-icon v-else>mdi-drag-horizontal</v-icon>
				</v-btn>
                <!-- <v-btn small text disabled></v-btn> -->
                <v-toolbar-title style="text-transform: capitalize;">{{pageTitle}}</v-toolbar-title>
				<v-spacer></v-spacer>
                <v-badge
                    content="9"
                    value="9"
                    :offset-x="30"
                    :offset-y="20"
                    overlap
                >
                    <v-btn text>
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                </v-badge>
				<v-btn
					text
					target="_blank"
					href="https://github.com/Groundhog-Chen/vue-material-admin"
                    class="min_hide"
				>
					<v-icon
						title="https://github.com/Groundhog-Chen/vue-material-admin"
						>mdi-github-circle</v-icon>
				</v-btn>
                <v-btn text @click="fullScreen" class="min_hide">
					<v-icon>mdi-arrow-expand-all</v-icon>
				</v-btn>
                <v-menu bottom :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            text
                            v-on="on"
                        >
                            <v-icon>mdi-settings</v-icon>
                        </v-btn>
                    </template>
                    <v-card style="min-width:220px; padding-bottom:20px">
                        <v-subheader>Color Option</v-subheader>
                        <v-list subheader>
                            <template v-for="(item, key) in colors">
                                <v-list-item
                                    :key="key + 2"
                                    @click="handleChangeColor(item.color, key)"
                                >
                                    <v-list-item-avatar :color="item.color" :size='25'>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{item.name}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                        <v-subheader>Language Option</v-subheader>
                        <v-radio-group
                            v-model="Language"
                            @change="handleCutover"
                            style="margin: 0 20px;"
                        >
                            <v-radio label="中文" value="zh_CN" color="primary"></v-radio>
                            <v-radio
                                label="English"
                                value="en_US"
                                color="primary"
                            ></v-radio>
                        </v-radio-group>
                        <v-subheader>Dark Mode Option</v-subheader>
                        <v-switch v-model="darkMode" @change="onDarkModeChange" :label="darkMode+''" style="margin-left: 20px" ></v-switch>

                    </v-card>
                </v-menu>
				<!-- <v-btn text @click="settingsVisible = true">
					<v-icon>mdi-settings</v-icon>
				</v-btn> -->
			</v-toolbar>
			<div class="zwf"></div>
			<transition name="fade-transform" mode="out-in">
				<router-view/>
			</transition>
		</v-content>
    <!--主体结束-->
	</div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            menuDrawer: true,
            expandOnHover: false,
            bg: {
                'src':
					'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
                'linear-gradient':
					'to top right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)'
            },
            miniVariant: false,
            Language: 'en_US',
            settingsVisible: false,
            isFullScreen: false,
            name: '',
            desc: '',
            token: '',
            news: [],
            admins: [
                ['Management', 'people_outline'],
                ['Settings', 'settings'],
            ],
            cruds: [
                ['Create', 'add'],
                ['Read', 'insert_drive_file'],
                ['Update', 'update'],
                ['Delete', 'delete'],
            ],
        };
    },
    computed: {
        loadPaths() {
            return this.$route.path.split('/');
        },
        pageTitle() {
            return this.$route.meta.title;
        },
        locale(key) {
            return this.$t('header.' + key);
        },
        darkMode: {
            get: function() {
                return this.$store.state.darkMode;
            },
            set: function(newValue) {
                this.$store.state.darkMode = newValue;
            }
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
    created() {
        // console.log(this.$route);
        // axios.request({
        //     url: '/news',
        //     method: 'get',
        //     baseURL: 'http://127.0.0.1:7001'
        // }).then((res) => {
        //     console.log(res);
        //     this.news = res.data.result;
        // });
    },
    methods: {
        onDarkModeChange(val) {
            this.$vuetify.theme.dark = val;
            this.$store.commit('handleDarkMode', val);
        },
        handleMenuDrawer() {
            this.menuDrawer = !this.menuDrawer;
        },
        handleMiniMenu() {
            this.miniVariant = !this.miniVariant;
        },
        onAxios() {
            const data = {
                title: this.name,
                desc: this.desc
            };
            // axios.get(url,AxiosRequestConfig).then((res) => {
            //     console.log(res);
            // });
            const token = this.token;
            axios.request({
                url: '/news/create',
                method: 'post',
                baseURL: 'http://127.0.0.1:7001',
                data: data,
                headers: {
                    'x-csrf-token': token
                }
            });
        },
        tmyx() {
            this.$store.commit('handleChangeMlmlh');
        },
        tmlx() {
            this.$store.commit('handleChangeYmlmlh');
        },
        handleChangeColor(color, key) {            
            this.$vuetify.theme.themes.light.primary = color;
            this.$store.commit('handleSetColor', key);
            this.$vuetify.theme.dark = false;
            this.$store.commit('handleDarkMode', false);
        },
        handleCutover(val) {
            this.$i18n.locale = val;
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
