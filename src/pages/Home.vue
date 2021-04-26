<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden"/>
            <GridLayout columns="50, *">
                <Label class="action-bar-title" text="Home" colSpan="2"/>

                <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
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
    import * as utils from "~/shared/utils";
    import { SelectedPageService } from "../shared/selected-page-service";
    import {mapGetters} from "vuex";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Home");
        },
        computed: {
            ...mapGetters({
                isOnLine: 'isOnLine',
                isAuthenticated: 'auth/authenticated',
                isAuthenticating: 'auth/isAuthenticating',
                user: 'auth/user',
            }),
            message() {
                return "<!-- Page content goes here -->";
            }
        },
        watch: {
            isAuthenticated(newValue) {
                if(!this.isAuthenticating && !newValue)
                    this.$navigateTo(this.$routes.Login);
            }
        },
        data() {
            return {
                networkStatus: this.isOnLine
            };
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        },
        mounted() {
            console.log('Home mounted');
            if (this.isOnLine && !this.isAuthenticating && !this.isAuthenticated)
                this.$navigateTo(this.$routes.Login);

        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
