<template>
    <div class="login_container">
        <div class="left">
            <div class="logo">
                <img src="../../assets/Material-admin-logo.png" />
            </div>
            <div class="form">
                <div class="title">Welcome back</div>
                <div class="row">
                    <v-text-field
                        label="Account"
                        model-value="Groundhog.chen"
                        variant="outlined"
                        readonly
                        density="comfortable"
                        hint="Account tips"
                        clearable
                    ></v-text-field>
                </div>
                <div class="row">
                    <v-text-field
                        label="Password"
                        model-value="Groundhog.chen"
                        type="password"
                        variant="outlined"
                        density="comfortable"
                        hint="Password tips"
                        clearable
                    ></v-text-field>
                </div>
                <div class="row row_f">
                    <v-btn block color="primary" size="large" type="submit" href="/">Sign in</v-btn>
                </div>
            </div>
        </div>
        <!-- <div class="right">
            <img src="../../assets/login.png" />
        </div> -->
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.login_container {
    height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    .left {
        flex: 1;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .logo {
            position: absolute;
            left: 10px;
            top: 10px;
            img {
                height: 38px;
            }
        }
        .form {
            width: 400px;
            margin: 0 auto;
            .title {
                font-size: 36px;
                font-weight: 700;
                font-family: Roboto, sans-serif !important;
                margin-bottom: 20px;
            }
            .row {
                margin-top: 16px;
            }
        }
    }
    .right {
        img {
            width: auto;
            height: 100%;
        }
    }
}

@media screen and (max-width: 960px) and (min-width: 320px) {
    .login_container {
        .left {
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
