<template>
    <div class="login">
        <v-card class="form">
            <div class="label">
                <img :src="logo" height="70" />
                <div class="title my-2">Welcome back</div>
            </div>
            <div class="mt-4">
                <div class="mb-2" style="font-weight: 700">Email</div>
                <v-text-field
                    model-value=""
                    type="password"
                    variant="outlined"
                    density="compact"
                    clearable
                    placeholder="Email"
                    hide-details
                ></v-text-field>
            </div>
            <div class="my-4">
                <div class="mb-2 mt-4" style="font-weight: 700">Password</div>
                <v-text-field
                    model-value=""
                    type="password"
                    variant="outlined"
                    density="compact"
                    placeholder="Password"
                    clearable
                    hide-details
                ></v-text-field>
            </div>
            <div class="my-6">
                <v-btn
                    color="primary"
                    variant="flat"
                    block
                    size="large"
                    type="submit"
                    href="/vue-material-admin/"
                    >Login</v-btn
                >
            </div>
            <div class="d-flex">
                <v-divider></v-divider>
                <div class="text-center">Or</div>
                <v-divider></v-divider>
            </div>
            <v-btn
                class="my-4"
                style="text-transform: none"
                color="white"
                variant="flat"
                block
                size="large"
                href="/"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    role="img"
                    class="icon"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.64 9.20419C17.64 8.56601 17.5827 7.95237 17.4764 7.36328H9V10.8446H13.8436C13.635 11.9696 13.0009 12.9228 12.0477 13.561V15.8192H14.9564C16.6582 14.2524 17.64 11.9451 17.64 9.20419Z"
                        fill="#4285F4"
                    ></path>
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
                        fill="#34A853"
                    ></path>
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
                        fill="#FBBC05"
                    ></path>
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
                        fill="#EA4335"
                    ></path>
                </svg>
                <div class="ml-2">Google</div>
            </v-btn>
        </v-card>
        <!-- <div class="group">
            <v-card class="desc">
                <div class="logo mt-4">
                    <img :src="logo" height="60" />
                    <div class="text-h5 mt-2">Material UI</div>
                </div>
                <div class="mt-4">
                    vue-material-admin is a free open source mid-backend template based on Vuetify
                </div>
                <div class="mt-4">
                    made with by ❤️
                    <a
                        target="_blank"
                        style="
                            color: rgba(
                                var(--v-theme-on-background),
                                var(--v-high-emphasis-opacity)
                            );
                        "
                        href="https://github.com/jaywoow"
                        >Chen HuaJie</a
                    >
                </div>
            </v-card>
        </div> -->
    </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/admin-logo.png';
import { reactive } from 'vue';
const state = reactive({
    email: '',
    password: '',
});
</script>
<style lang="scss" scoped>
.login {
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    .form {
        border-radius: 8px;
        box-shadow: none;
        width: 520px;
        margin: 0 auto;
        padding: 40px;
        padding-bottom: 16px;
        .label {
            text-align: center;
            .title {
                font-size: 32px;
                font-weight: bold;
            }
        }
        .d-flex {
            .text-center {
                flex: 0 0 60px;
            }
        }
    }
}
@media only screen and (max-width: 778px) {
}
</style>
