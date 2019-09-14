<template>
    <v-toolbar dark fixed color="primary" style="z-index:900" class="header">
        <v-btn icon style="margin-right:18px;" @click="handleChangeMenuVisible(true)">
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
        <v-text-field class="mx-3" flat label="Search" prepend-inner-icon="search" solo-inverted></v-text-field>
        <v-btn icon href="mailto:894620576@qq.com">
            <v-icon title="894620576@qq.com">email</v-icon>
        </v-btn>
        <v-btn icon @click="tmyx">
            <v-icon>settings</v-icon>
        </v-btn>
        <v-btn icon @click="handleCutover">{{ btntext }}</v-btn>
        <v-btn
            icon
            href="https://v15.vuetifyjs.com/zh-Hans/"
            target="_blank"
            title="Vuetifyjs components-ui"
            style="background-image: url(&quot;https://cdn.vuetifyjs.com/images/logos/v-alt.svg&quot;); background-position: center center;"
        ></v-btn>
        <v-card dark color="primary" class="left_menu" :class="{show_menu:muneVisible}">
            <v-btn
                icon
                dark
                color="primary"
                class="menu_btn"
                v-if="muneVisible"
                @click="handleChangeMenuVisible(false)"
            >
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <!-- <v-btn
                icon
                dark
                color="primary"
                class="menu_btn"
                v-else
                @click="handleChangeMenuVisible(true)"
            >
                <v-icon>menu</v-icon>
            </v-btn>-->

            <div class="menu_list" @click="handleChangeMenuVisible(false)">
                <router-link
                    :to="'/' + item.path"
                    class="nav-link"
                    v-for="(item,index) in menus"
                    :key="index"
                >{{$t("header."+item.name)}}</router-link>
            </div>
        </v-card>
    </v-toolbar>
</template>
<script>
export default {
    data() {
        return {
            btntext: "中文",
            muneVisible: false
        };
    },
    created() {},
    computed: {
        locale(key) {
            return this.$t("header." + key);
        },
        menus() {
            const { options } = this.$router;
            return options.routes[0].children.map(item => {
                item["active"] = false;
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
            this.$store.commit("handleChangeMlmlh");
        },
        tmlx() {
            this.$store.commit("handleChangeYmlmlh");
        },
        handleCutover() {
            if (this.$i18n.locale === "zh_CN") {
                this.$i18n.locale = "en_US";
                this.btntext = "中文";
            } else {
                this.$i18n.locale = "zh_CN";
                this.btntext = "EN";
            }
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
