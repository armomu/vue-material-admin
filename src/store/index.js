import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false
    },
    mutations: {
        handleSignIn(state) {
            state.isLogin = true;
        },
        handleSignOut(state) {
            state.isLogin = false;
        },

    },
    actions: {

    }
});
