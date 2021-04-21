require('./bootstrap');
import Vue from 'nativescript-vue'
import routes from '~/router';
import store from '~/store/index';
import axiosConfig from './api/axios-config';
import sideDrawer from '~/components/sideDrawer';
import drawerContent from '~/components/drawerContent';


store.dispatch("init");
axiosConfig.init();
Vue.prototype.$routes = routes;

new Vue({
    store,
    render (h) {
        return h(
            sideDrawer,
            [
                h(drawerContent, { slot: 'drawerContent' }),
                h(routes.App, { slot: 'mainContent' })
            ]
        )
    },
    methods: {

    },
    beforeCreate() {
        console.log('Vue instance beforeCreate')
    },
    created() {
        console.log('Vue instance created')
    },
    mounted() {
        console.log('Vue instance mounted')
    },
}).$start();
