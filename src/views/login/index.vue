<template>
  <div class="login_container" :class="{login_mlmlh: mlmlh}">
    <v-img
      src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-4.jpg"
      gradient="rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)"
    />
    <v-toolbar absolute flat dark color="transparent" min-width="100%">
      <v-btn text disabled>Login Page</v-btn>
      <v-spacer></v-spacer>
      <v-btn text :to="{ name: 'dashboard' }">
        <v-icon style="margin-right: 10px">mdi-chart-areaspline</v-icon>charts
      </v-btn>
      <v-btn text :to="{ name: 'login' }" style="margin: 0 20px">
        <v-icon style="margin-right: 10px">mdi-fingerprint</v-icon>Login
      </v-btn>
      <v-btn text target="_blank" href="https://github.com/Groundhog-Chen/vue-material-admin">
        <v-icon style="margin-right: 10px">mdi-github-circle</v-icon>github
      </v-btn>
    </v-toolbar>
    <div class="wrap">
      <v-card class="inner_card">
        <v-card class="right" color="red" href="https://vuetifyjs.com" target="_blank">
          <v-icon large color="white" style="font-size: 61px;">mdi-vuetify</v-icon>
          <div class="title" color="white">Material UI</div>
        </v-card>
        <div class="left">
          <div class="row">
            <v-text-field
              label="Gorup"
              min-width="100%"
              dense
              value="Javascript Flutter"
              prepend-icon="mdi-incognito"
            ></v-text-field>
          </div>
          <div class="row">
            <v-text-field
              label="Account"
              min-width="100%"
              dense
              value="Groundhog.chen"
              prepend-icon="mdi-account-outline"
            ></v-text-field>
          </div>
          <div class="row">
            <v-text-field
              label="Password"
              min-width="100%"
              value="Groundhog.chen"
              type="password"
              prepend-icon="mdi-lock-outline"
            ></v-text-field>
          </div>
          <div class="row row_f">
            <v-btn
              block
              x-large
              rounded
              color="primary"
              style="margin-left: 30px"
              @click="handleSignBtn"
            >let's go</v-btn>
          </div>
        </div>
      </v-card>
    </div>
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
                this.$router.push('/dashboard');
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
    .inner_card {
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
      animation: fadeInUp 0.3s linear;
      padding-top: 130px;
      padding-bottom: 30px;
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
          justify-content: center;
          margin-top: 10px;
        }
      }
      .right {
        position: absolute;
        width: 86%;
        padding: 20px 0;
        left: 7%;
        top: -30px;
        text-align: center;
        .icon {
          margin: 0 auto;
        }
        .title {
          margin-top: 10px;
          color: #fff;
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
