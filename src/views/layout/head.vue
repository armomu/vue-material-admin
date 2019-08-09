<template>
    <v-toolbar
        dark
        fixed
        color="primary"
        style="z-index:900"
    >
        <v-btn
            icon
            style="margin-right:18px;"
        >
            <v-icon>apps</v-icon>
        </v-btn>

        <router-link
            :to="item.path"
            v-ripple
            class="nav-link"
            v-for="(item,index) in menus"
            :key="index"
        >{{$t("header."+item.name)}}</router-link>
        <v-spacer></v-spacer>
        <v-btn
            icon
        >
            <v-icon>search</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>email</v-icon>
        </v-btn>
        <v-btn
            icon
            @click="handleCutover"
        >{{ btntext }}</v-btn>
        <v-btn
            icon
            href="https://vuetifyjs.com/"
            target="_blank"
            title="Vuetifyjs components-ui"
            style="background-image: url(&quot;https://cdn.vuetifyjs.com/images/logos/v-alt.svg&quot;); background-position: center center;"
        ></v-btn>

    </v-toolbar>
</template>
<script>
export default {
    data() {
        return {
            btntext: '中文'
        };
    },
    created(){

    },
    computed: {
        locale(key) {
            return this.$t('header.' + key);
        },
        menus() {
            const { options } = this.$router;
            return (options.routes[0].children.map((item) => {
                item['active'] = false;
                return item;
            }));
        }
    },
    mounted() {
        // console.log(this.$t("header.moving"))
    },
    methods: {
        handleCutover() {
            if (this.$i18n.locale === 'zh_CN') {
                this.$i18n.locale = 'en_US';
                this.btntext = '中文';
            } else {
                this.$i18n.locale = 'zh_CN';
                this.btntext = 'EN';
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.nav-link {
    font-size: 16px;
    display: block;
    color: #ffffff;
    line-height: 64px;
    padding: 0 24px;
    text-decoration: none;
}
.nav-link.router-link-active {
    background: rgba($color: #ffffff, $alpha: 0.2);
}
@media screen and (max-width: 960px) {
    .nav-link{
      line-height: 56px;
    }
}
</style>
