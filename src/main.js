import VueDevtools from 'nativescript-vue-devtools';
import Vue from 'nativescript-vue';
import routes from '~/router';
import store from '~/store/index';
import axiosConfig from './api/axios-config';
import sideDrawer from '~/components/sideDrawer';
import drawerContent from '~/components/drawerContent';


if(TNS_ENV !== 'production') {
    Vue.use(VueDevtools);
}

store.dispatch("init");
axiosConfig.init();

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes;

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
);

new Vue({
    beforeCreate() {
        console.log('Vue instance beforeCreate')
    },
    created() {
        console.log('Vue instance created')
    },
    mounted() {
        console.log('Vue instance mounted')
        //console.log(this.$http.defaults)
    },
    store,
    render (h) {
        return h(
            sideDrawer,
            [
                h(drawerContent, { slot: 'drawerContent' }),
                h(routes.Login, { slot: 'mainContent' })
            ]
        )
    }
}).$start();
