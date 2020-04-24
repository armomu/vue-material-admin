<template>
    <div
        class="login_container"
        :class="{login_mlmlh: mlmlh}"
    >

        <v-img
            src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg"
            gradient="rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)"
            contain
        />
        <v-toolbar absolute flat dark color="transparent" min-width="100%">
                <v-btn text disabled>Login Page</v-btn>
				<v-spacer></v-spacer>
                <v-btn
					text
                    small
                    :to="{ name: 'charts' }"
				>
					<v-icon style="margin-right: 10px">mdi-chart-areaspline</v-icon>charts
				</v-btn>
                <v-btn
					text
                    small
                    :to="{ name: 'login' }"
				>
					<v-icon style="margin-right: 10px">mdi-fingerprint</v-icon>Login
				</v-btn>
                <v-btn
					text
                    small
					target="_blank"
					href="https://github.com/Groundhog-Chen/vue-material-admin"
				>
					<v-icon
						title="https://github.com/Groundhog-Chen/vue-material-admin"
						>mdi-github-circle</v-icon>
				</v-btn>
			</v-toolbar>
        <div class="wrap">
            <div class="wrap_title">Material Design</div>
            <v-card class="inner_card">
                <div class="left">
                    <div class="title">
                        Sign in to vue-material-admin
                    </div>
                    <div class="row">
                        <v-text-field
                            label="Account"
                            min-width="100%"
                            prepend-icon="mdi-account-outline"
                        ></v-text-field>
                    </div>
                    <div class="row">
                        <v-text-field
                            label="Password"
                            min-width="100%"
                            prepend-icon="mdi-account-lock-outline"
                        ></v-text-field>
                    </div>
                    <div class="row row_f">
                        <v-btn
                            large
                            color="primary"
                            style="margin-left: 30px"
                            @click="handleSignBtn"
                        >Sign in</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            icon
                            href="mailto:894620576@qq.com"
                            class="icon_mine_email"
                            title="mailto:894620576@qq.com"
                        >
                            <v-icon>mdi-email</v-icon>
                        </v-btn>
                        <v-btn
                            icon
                            target="_blank"
                            title="https://github.com/Groundhog-Chen/vue-material-admin"
                            href="https://github.com/Groundhog-Chen/vue-material-admin"
                        >
                            <v-icon>mdi-github-circle</v-icon>
                        </v-btn>
                    </div>
                </div>
                <a
                    class="right primary"
                    href="https://vuetifyjs.com"
                    target="_blank"
                >
                    <div>
                        <div
                            class="icon"
                            style="background-image: url('https://cdn.vuetifyjs.com/images/logos/v-alt.svg'); background-position: center center;"
                        ></div>
                        <div class="title">
                            Material UI Component
                        </div>
                    </div>
                </a>
            </v-card>
        </div>
        <v-footer class="login_footer" dark color="transparent">
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }} Created with by Groundhog.chen</div>
        </v-footer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mlmlh: false
        };
    },
    methods: {
        handleSignBtn() {
            this.mlmlh = true;
            this.$store.commit('handleSignIn');
            setTimeout(() => {
                this.$router.push('/task/mine');
            }, 300);
        }
    }
};
</script>
<style lang="scss" scoped>
.login_container {
    height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    position: relative;

    .v-image {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
        .v-image__image {
            background-position: center center;
            background-size: 100vh auto;
        }
    }
    .login_footer {
        position: absolute;
        left: 0;
        bottom: 0;
        line-height: 50px;
        width: 100%;
    }
    .wrap {
        position: relative;
        z-index: 1;
        .wrap_title {
            font-size: 50px;
            color: #fff;
            text-align: center;
            margin-bottom: 90px;
            animation: fadeInUp 0.3s linear;
        }
        .inner_card {
            background: #fff;
            width: 900px;
            display: flex;
            align-items: center;
            border-radius: 3px;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
            animation: fadeInUp 0.3s linear;
            .left {
                width: 500px;
                padding: 0 40px;
                margin: 0 10px;
                .row {
                    margin-top: 30px;
                }
                .row_f {
                    display: flex;
                    align-items: center;
                }
            }
            .right {
                height: 400px;
                text-align: center;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                .icon {
                    width: 150px;
                    height: 150px;
                    margin: 0 auto;
                }
                .title {
                    color: #fff;
                    margin-top: 30px;
                }
            }
        }
    }
}
.login_mlmlh {
    transform: scale(5);
    opacity: 0;
}

@media screen and (max-width: 960px) and (min-width: 320px) {
    .login_container {
        .wrap {
            .wrap_title {
                font-size: 36px;
                margin-bottom: 30px;
            }
            .inner_card {
                width: auto;
                margin: 30px;
                .left {
                    width: auto;
                    padding: 30px;
                }
                .right {
                    display: none;
                }
            }
        }
    }
}
</style>
