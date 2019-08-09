import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false,
        ymlmlh: false,
        mlmlh: false
    },
    mutations: {
        handleChangeMlmlh(state){
            state.mlmlh = !state.mlmlh;
        },
        handleChangeYmlmlh(state){
            state.ymlmlh = !state.ymlmlh;
        },
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
