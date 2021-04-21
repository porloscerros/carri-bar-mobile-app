<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <GridLayout width="100%" columns="auto, *">
                <open-drawer-btn col="0" @tap="openDrawer()"></open-drawer-btn>
                <Label col="1" class="title" text="App" />
            </GridLayout>
        </ActionBar>

        <ScrollView>
            <StackLayout class="home-panel p-20">
                <Label v-if="isAuthenticating" textWrap="true" class="description-label" text="Autenticando en el servidor..."></Label>
                <Label v-else-if="isAuthenticated" textWrap="true" class="description-label" :text="'Hola '+user.name "></Label>
                <Label v-else textWrap="true" class="description-label" text="No estás autenticado. Ir a Login..."></Label>
                <Label v-if="isOnLine" textWrap="true" class="description-label" text="Estás On Line"></Label>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    import {mapActions, mapGetters} from 'vuex';
    import Theme from "@nativescript/theme";
    import OpenDrawerBtn from "../components/buttons/OpenDrawerBtn";

    export default {
        name: "Home",
        mixins: [ sideDrawer ],
        components: {
            OpenDrawerBtn,
        },
        computed: {
            ...mapGetters({
                appName: 'appName',
                isOnLine: 'isOnLine',
                isAuthenticated: 'auth/authenticated',
                isAuthenticating: 'auth/isAuthenticating',
                user: 'auth/user',
            })
        },
        watch: {
            isAuthenticated(newValue, oldValue) {
                console.log('App watcher');
                console.log('isAuthenticated cambió a', newValue);
                console.log('no se está autenticando =', newValue);
                if(!this.isAuthenticating && !newValue) {
                    this.$navigateTo(this.$routes.Login);
                }
            }
        },
        data() {
            return {
                networkStatus: this.isOnLine
            };
        },
        methods: {

        },
        mounted() {
            console.log('App mounted');
            console.log('isOnLine', this.isOnLine);
            console.log('isAuthenticated', this.isAuthenticated);
            console.log('isAuthenticating', this.isAuthenticating);

            if(this.isOnLine && !this.isAuthenticating && !this.isAuthenticated) {
                this.$navigateTo(this.$routes.Login);
            }
            // Theme.setMode(Theme.Light);
            Theme.toggleMode();
        },
    }
</script>

<style scoped>

</style>