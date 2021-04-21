import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import sideDrawer from './modules/sideDrawer';

const connectivity = require("connectivity");

Vue.use(Vuex);

const checkNetwork = () => {
    return connectivity.getConnectionType();
};

export default new Vuex.Store({
    modules: {
        sideDrawer,
        auth
    },
    state: {
        appName: 'La Bohemia Admin',
        apiBaseUrl: 'https://la-bohemia.herokuapp.com/api', //http://192.168.43.189:8080/api',
        connection: 0,
        loadingCount: 0,
    },
    getters: {
        isOnLine: state => {
            return state.connection > 0;
        },
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
        SET_CONNECTION (state, payload) {
            state.connection = payload;
        },
        INCREMENT_LOADING (state) {
            state.loadingCount ++;
        },
        DECREMENT_LOADING (state) {
            state.loadingCount --;
        },
    },
    actions: {
        init ({ commit, dispatch }) {
            console.log('store actions init');
            let network = checkNetwork();
            commit('SET_CONNECTION', network);
            dispatch('auth/loadLocalStoredToken');
            dispatch('auth/me');
        },
        incrementLoading (context) {
            context.commit('INCREMENT_LOADING');
        },
        decrementLoading (context) {
            context.commit('DECREMENT_LOADING');
        },
    },
});