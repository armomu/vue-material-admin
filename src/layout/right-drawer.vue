<template>
    <div>
        <v-btn text @click="settingsVisible = true">
            <v-icon>mdi-settings</v-icon>            
        </v-btn>        
		<v-navigation-drawer v-model="settingsVisible" fixed temporary right class="setting_drawer">
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
				<v-radio label="中文" value="zh_CN" color="primary" />
				<v-radio abel="English" value="en_US" color="primary" />
			</v-radio-group>
			<v-subheader>Dark Mode</v-subheader>
			<v-switch v-model="darkMode" style="margin-left: 20px"></v-switch>
		</v-navigation-drawer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            Language: 'en_US',
            settingsVisible: false
        };
    },
    computed: {
        loadPaths() {
            return this.$route.path.split('/');
        },
        curTime() {
            return this.$store.state.curTime;
        },        
        locale(key) {
            return this.$t('header.' + key);
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
        colors() {
            return this.$store.state.app.colors;
        }
    },
    methods: {
        handleChangeColor(color, key) {
            this.$vuetify.theme.themes.light.primary = color;
            this.$store.commit('handleSetColor', key);
            this.$vuetify.theme.dark = false;
            this.$store.commit('handleDarkMode', false);
        },
        handleCutover(val) {
            this.$i18n.locale = val;
        },
    }
};
</script>