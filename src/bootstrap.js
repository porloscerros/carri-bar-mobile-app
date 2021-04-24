import VueDevtools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue';
import PickerField from "@nativescript/picker/vue";
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import moment from 'moment';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');
Vue.use(VueDevtools);

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer);
Vue.registerElement('Fab', () => require('@nstudio/nativescript-floatingactionbutton').Fab);
Vue.registerElement('CardView', () => require('@nstudio/nativescript-cardview').CardView);
Vue.use(PickerField);

// fontawesome icons
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    'fa': './assets/css/fontawesome.min.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm')
    }
});
