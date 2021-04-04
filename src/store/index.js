import Vue from 'vue';
import Vuex from 'vuex';
import sideDrawer from './modules/sideDrawer';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sideDrawer,
    },
});