<template>
	<div
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
				<v-list-item @click="onAxios" style="margin-top: 8px">
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
		<v-main class="page_right_content" :class="{ darkMode: darkMode }">
			<v-toolbar absolute class="header">
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
				<v-toolbar-title style="text-transform: capitalize">{{
					pageTitle
				}}</v-toolbar-title>
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
                    style="max-width:400px; margin-right:16px"
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
			</v-toolbar>
			<div class="zwf"></div>
			<transition name="fade-transform" mode="out-in">
				<keep-alive :key="curTime">
					<router-view v-if="$route.meta.keepAlive" />
				</keep-alive>
			</transition>
			<transition name="fade-transform" mode="out-in">
				<router-view
					v-if="!$route.meta.keepAlive"
					:key="curTime"
				></router-view>
			</transition>
		</v-main>
		<v-navigation-drawer v-model="settingsVisible" absolute temporary right>
			<v-subheader>Color Option</v-subheader>
			<v-list subheader>
				<template v-for="(item, key) in colors">
					<v-list-item
						:key="key + 2"
						:class="{
							'v-list-item--active': item.active
						}"
						@click="handleChangeColor(item.color, key)"
					>
						<v-list-item-avatar
							:color="item.color"
							:size="25"
						></v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-subtitle>{{
								item.name
							}}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
			<v-subheader>Language</v-subheader>
			<v-radio-group
				v-model="Language"
				@change="handleCutover"
				style="margin: 0 20px"
			>
				<v-radio label="中文" value="zh_CN" color="primary"></v-radio>
				<v-radio
					label="English"
					value="en_US"
					color="primary"
				></v-radio>
			</v-radio-group>
			<v-subheader>Dark Mode</v-subheader>
			<v-switch
				v-model="darkMode"
				@change="onDarkModeChange"
				style="margin-left: 20px"
			></v-switch>
		</v-navigation-drawer>
		<!--主体结束-->
	</div>
</template>
<script>
// import axios from 'axios';

export default {
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
        };
    },
    computed: {
        loadPaths() {
            return this.$route.path.split('/');
        },
        curTime() {
            return this.$store.state.curTime;
        },
        pageTitle() {
            return this.$route.meta.title;
        },
        locale(key) {
            return this.$t('header.' + key);
        },
        darkMode: {
            get: function() {
                return this.$store.state.app.darkMode;
            },
            set: function(newValue) {
                this.$store.state.app.darkMode = newValue;
            }
        },
        menus() {
            const { options } = this.$router;
            return options.routes;
        },
        colors() {
            return this.$store.state.app.colors;
        }
    },
    created() {
        // console.log(this.$store.state);
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
        onResize(e) {
            if(!e) return; 
            const { innerWidth } = e.srcElement;
            if(innerWidth>1250) {
                // console.log('BOOM');
                this.menuDrawer = true;
            }
        },
        onDarkModeChange(val) {
            this.$vuetify.theme.dark = val;
            this.$store.commit('handleDarkMode', val);
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
        onAxios() {
            // const data = {
            //     title: this.name,
            //     desc: this.desc
            // };
            // axios.get(url,AxiosRequestConfig).then((res) => {
            //     console.log(res);
            // });
            // const token = this.token;
            // axios.request({
            //     url: '/news/create',
            //     method: 'post',
            //     baseURL: 'http://127.0.0.1:7001',
            //     data: data,
            //     headers: {
            //         'x-csrf-token': token
            //     }
            // });
            window.open('https://github.com/Groundhog-Chen/vue-material-admin'); 
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
