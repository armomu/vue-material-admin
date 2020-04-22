<template>
	<div class="page_layout">
		<v-navigation-drawer
			v-model="drawer"
			:expand-on-hover="expandOnHover"
			:mini-variant="miniVariant"
			absolute
			dark
		>
			<v-img
				v-slot:img
				src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg"
				gradient="rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)"
			/>
			<v-list nav class="py-0">
				<v-list-item two-line @click="onAxios">
					<v-list-item-avatar>
						<img
							src="https://randomuser.me/api/portraits/men/81.jpg"
						/>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>Groundhog</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>
			</v-list>
			<v-list nav class="py-0">
                <template
                    v-for="(item, index) in menus"
                >
                    <template v-if="item.children">
                        <v-list-group :key="item.path" :prepend-icon="item.meta.icon" :group="item.name" :value="loadPaths.includes(item.name)">
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>{{$t("header." + item.name)}}</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="(child, key) in item.children" :key="key"  :to="{ name: child.name }">
                                <v-list-item-title>{{child.title}}</v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                    </template>
                    <v-list-item v-else :key="index" :to="{ name: item.name }">
                        <v-list-item-icon>
                            <v-icon>{{item.meta.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{$t("header." + item.name)}}</v-list-item-title>
                    </v-list-item>
                </template>
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
			<v-toolbar dark color="primary">
				<v-toolbar-title class="white--text">Settings</v-toolbar-title>

				<v-spacer></v-spacer>
			</v-toolbar>
			<v-subheader>Color Option</v-subheader>
			<v-list subheader style="margin: 0 20px;">
				<template v-for="(item, key) in colors">
					<v-list-item
						:key="key + 2"
						dark
						:style="{ background: item.color }"
						@click="handleChangeColor(item.color, key)"
					>
						<v-list-item-action>
							<v-checkbox v-model="item.active"></v-checkbox>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{
								item.name
							}}</v-list-item-title>
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
				<v-radio label="中文" value="zh_CN" color="primary"></v-radio>
				<v-radio
					label="English"
					value="en_US"
					color="primary"
				></v-radio>
			</v-radio-group>
			<v-subheader>Sign out</v-subheader>
			<div style="margin: 0 20px;">
				<v-btn color="error" block @click="handleSignOut"
					>Sign out</v-btn
				>
			</div>
		</v-navigation-drawer>
		<div class="page_right_content">
			<v-toolbar dark absolute color="primary" class="header">
				<v-btn
					icon
					style="margin-right:18px;"
					@click="handleChangeMenuVisible(true)"
				>
					<v-icon>mdi-apps</v-icon>
				</v-btn>
				<v-toolbar-items>
					<v-btn
						text
						v-for="(item, index) in menus"
						:key="index"
						class="nav-link-btn"
						:to="'/' + item.path"
						dark
					>
						{{ $t("header." + item.name) }}
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
				<v-btn icon @click="fullScreen">
					<v-icon>mdi-arrow-expand-all</v-icon>
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
				<v-btn
					icon
					target="_blank"
					href="https://github.com/Groundhog-Chen/vue-material-admin"
				>
					<v-icon
						title="https://github.com/Groundhog-Chen/vue-material-admin"
						>mdi-github-circle</v-icon
					>
				</v-btn>
				<v-btn icon @click="settingsVisible = true">
					<v-icon>mdi-settings</v-icon>
				</v-btn>
			</v-toolbar>
			<div class="zwf"></div>
			<transition name="fade-transform" mode="out-in">
				<router-view />
			</transition>
		</div>
	</div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            drawer: true,
            expandOnHover: false,
            bg: {
                'src':
					'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
                'linear-gradient':
					'to top right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)'
            },
            miniVariant: false,
            Language: 'en_US',
            muneVisible: false,
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
    created() {
        console.log(this.menus, this.$route);
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
