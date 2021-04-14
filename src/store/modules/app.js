// import Cookies from 'js-cookie';

const app = {
    state: {
        device: 'desktop',
        tagsView: true

    },
    mutations: {
        onChangeTagsView(state, status) {
            state.tagsView = status;
        },
    }
};
export default app;