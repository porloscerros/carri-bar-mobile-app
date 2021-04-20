<template>
    <ScrollView>
        <GridLayout rows="auto, *" width="100%">
            <StackLayout class="headerContent">
                <Label class="drawer-header" :text="user? user.name: 'desconocido'"/>
                <Label class="drawer-header-username" :text="user? `@${user.username}`: '@'"/>
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="drawerMenuContent">
                    <Label class="drawer-item"
                           v-for="(page, i) in pages"
                           @tap="goToPage(page.component)"
                           :text="page.name"
                           :key="i"
                    />
                    <Button class="drawer-close-button" @tap="closeDrawer()">Cerrar Menú</Button>
                    <Button class="drawer-logout" @tap="logout">Salir</Button>
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </ScrollView>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "drawerContent",
        mixins: [sideDrawer],
        computed: {
            ...mapGetters({
                appName: 'appName',
                user: 'auth/user',
                isAuthenticated: 'auth/authenticated',
            })
        },
        // watch: {
        //     isAuthenticated(newValue, oldValue) {
        //         console.log('Drawer Content watcher');
        //         console.log('isAuthenticated =', newValue);
        //         if(!newValue) {
        //             this.$navigateTo(this.$routes.Login);
        //             this.closeDrawer()
        //         }
        //     }
        // },
        data () {
            return {
                // define our pages, making sure the component matches that defined in /app/router/index.js
                pages: [
                    { name: 'Home', component: this.$routes.Home },
                    { name: 'Ventas', component: this.$routes.SaleList },
                    { name: 'Inventario', component: this.$routes.InventoryList },
                    { name: 'Recetas', component: this.$routes.Recipes },
                ],
            }
        },
        methods: {
            ...mapActions({
                signOut: 'auth/signOut',
            }),
            goToPage (pageComponent) {
                this.$navigateTo(pageComponent, {
                    animated: true,
                    transition: 'fade'
                });
                this.closeDrawer();
            },
            logout (e) {
                this.signOut();
            },
        },
        mounted() {
            console.log('Drawer Content mounted');
            console.log('isAuthenticated =', this.isAuthenticated);
            // if(!this.isAuthenticated)
            //     this.$navigateTo(this.$routes.Login);
        },
    }
</script>

<style scoped>
    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
    .drawer-close-button {
        margin-top: 20;
        padding: 10 10 10 10;
        background-color: #53ba82;
        color: #ffffff;
    }

    .headerContent {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #333333;
        color: #ffffff;
        font-size: 18;
    }
    .drawer-header-username {
        font-size: 14;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 18;
    }
</style>