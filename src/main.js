import Vue from 'nativescript-vue';
import routes from '~/router';
import store from '~/store/index';
import sideDrawer from '~/components/sideDrawer';
import drawerContent from '~/components/drawerContent';
// import VueDevtools from 'nativescript-vue-devtools';
//
// if(TNS_ENV !== 'production') {
//   Vue.use(VueDevtools)
// }

store.dispatch("init");

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes;

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
);

new Vue({
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
