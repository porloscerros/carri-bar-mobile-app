require('./bootstrap');
import Vue from 'nativescript-vue';
import routes from '~/router';
import store from '~/store/index';
import axiosConfig from './api/axios-config';
import sideDrawer from '~/components/sideDrawer';
import drawerContent from '~/components/drawerContent';
import { mapGetters } from 'vuex';

store.dispatch("init");
axiosConfig.init();
// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes;

new Vue({
    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/authenticated',
        })
    },
    watch: {
        isAuthenticated(newValue, oldValue) {
            console.log('Vue instance watcher');
            console.log('isAuthenticated =', newValue);
            if(!newValue) {
                this.$navigateTo(this.$routes.Login);
                this.closeDrawer()
            }
        }
    },
    beforeCreate() {
        console.log('Vue instance beforeCreate')
    },
    created() {
        console.log('Vue instance created')
    },
    mounted() {
        console.log('Vue instance mounted')
        if(!this.isAuthenticated)
            this.$navigateTo(this.$routes.Login);
    },
    store,
    render (h) {
        return h(
            sideDrawer,
            [
                h(drawerContent, { slot: 'drawerContent' }),
                h(routes.InventoryList, { slot: 'mainContent' })
            ]
        )
    }
}).$start();
