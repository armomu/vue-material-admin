import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false,
        colors: [
            {
                name: 'blue',
                color: '#1890ff',
                active: false
            },
            {
                name: 'green',
                color: '#4CAF50',
                active: true
            },
            {
                name: 'pink',
                color: '#E91E63',
                active: false
            },
            {
                name: 'navy',
                color: '#323259',
                active: false
            }
        ],
        curTime: new Date().getTime(),
        darkMode: false
    },
    mutations: {
        handleSignIn(state) {
            state.isLogin = true;
        },
        handleSetTIme(state) {
            state.curTime = new Date().getTime();
        },
        handleSignOut(state) {
            state.isLogin = false;
        },
        handleSetColor(state, val) {
            for (let i = 0; i < state.colors.length; i++) {
                if (state.colors[i].active) {
                    state.colors[i].active = false;
                }
                if (state.colors[i].name === val || state.colors[i].color === val || i === val) {
                    state.colors[i].active = true;
                }
            }
        },
        handleDarkMode(state, status) {
            state.darkMode = status;
        },
    }
});
