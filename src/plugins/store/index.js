import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false,
        colors: [
            {
                name: 'default',
                color: '#1890ff',
                active: true
            },
            {
                name: 'deep-purple',
                color: '#673AB7',
                active: false
            },
            {
                name: 'pink',
                color: '#E91E63',
                active: false
            },
            {
                name: 'teal',
                color: '#009688',
                active: false
            },
            {
                name: 'navy',
                color: '#323259',
                active: false
            }
        ]
    },
    mutations: {
        handleSignIn(state) {
            state.isLogin = true;
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

        }
    },
    actions: {

    }
});
