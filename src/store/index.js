import Vue from 'vue';
import Vuex from 'vuex';
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
    },
    getters: {},
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async logOut({commit}) {
            await router.push('Login');
            commit('setUser', null);
            localStorage.removeItem('user');
        }
    },
    modules: {}
});
