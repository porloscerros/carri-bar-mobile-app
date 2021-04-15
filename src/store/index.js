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
        apiBaseUrl: 'https://la-bohemia.herokuapp.com/api', //http://192.168.43.189:8080/api',
        loadingCount: 0,
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
            console.log('store actions init')
            dispatch('auth/loadLocalStoredToken', null, { root: true });
        },
        incrementLoading (context) {
            context.commit('INCREMENT_LOADING');
        },
        decrementLoading (context) {
            context.commit('DECREMENT_LOADING');
        },
    },
});