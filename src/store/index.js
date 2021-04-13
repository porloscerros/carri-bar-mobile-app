import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import sideDrawer from './modules/sideDrawer';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sideDrawer,
        auth
    },
    state: {
        appName: 'La Bohemia Admin',
        apiBaseUrl: 'http://192.168.43.189:8080/api', // http://la-bohemia.herokuapp.com/api
        loadingCount: 0,
    },
    mutations: {
        INCREMENT_LOADING (state) {
            state.loadingCount ++;
        },
        DECREMENT_LOADING (state) {
            state.loadingCount --;
        },
    },
    actions: {
        init ({ dispatch }) {
            dispatch('auth/loadLocalStoredToken', null, { root: true });
        },
        incrementLoading (context) {
            context.commit('INCREMENT_LOADING');
        },
        decrementLoading (context) {
            context.commit('DECREMENT_LOADING');
        },
    },
    getters: {
        isLoading: state => {
            return state.loadingCount > 0;
        },
        appName: state => {
            return state.appName;
        },
        apiBaseUrl: state => {
            return state.apiBaseUrl;
        },
    }
});