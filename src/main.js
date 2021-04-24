require('./bootstrap');
import Vue from 'nativescript-vue';
import routes from './router/index';
import store from '~/store/index';
import axiosConfig from './api/axios-config';
import sideDrawer from '~/components/sideDrawer';
import drawerContent from '~/components/drawerContent';
import App from './App';

store.dispatch("init");
axiosConfig.init();
Vue.prototype.$routes = routes;

new Vue({
    store,
    render: h => h(App)
}).$start();
