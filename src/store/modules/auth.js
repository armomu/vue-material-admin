const auth = {
    state: {
        isLogin: false,
    },
    mutations: {
        handleSignIn(state) {
            state.isLogin = true;
        },
        handleSignOut(state) {
            state.isLogin = false;
        }
    }
};
export default auth;