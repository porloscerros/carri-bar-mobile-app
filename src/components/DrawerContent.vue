<template lang="html">
    <GridLayout rows="auto, *" class="nt-drawer__content">
        <StackLayout row="0" class="nt-drawer__header">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;"/>
            <Label class="nt-drawer__header-brand" :text="user? user.name: 'desconocido'"/>
            <Label class="nt-drawer__header-footnote" :text="user? `@${user.username}`: null"/>
        </StackLayout>

        <ScrollView row="1" class="nt-drawer__body">
            <StackLayout>
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Home)">
                    <Label col="0" text.decode="&#xf015;" class="nt-icon fas"/>
                    <Label col="1" text="Home" class="p-r-10"/>
                </GridLayout>

                <GridLayout v-if="['admin', 'sales'].includes(role)" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Sale' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Sale)">
                    <Label col="0" class="nt-icon fas" :text="'fa-chart-line' | fonticon"/>
                    <Label col="1" text="Ventas" class="p-r-10"/>
                </GridLayout>

                <GridLayout v-if="['admin', 'inventory'].includes(role)" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Inventory' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Inventory)">
                    <Label col="0" class="nt-icon fas" :text="'fa-box' | fonticon"/>
                    <Label col="1" text="Inventario" class="p-r-10"/>
                </GridLayout>

                <StackLayout class="hr"/>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Settings' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"/>
                    <Label col="1" text="Settings" class="p-r-10"/>
                </GridLayout>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Settings' ? ' -selected': '')"
                            @tap="logout">
                    <Label col="0" class="nt-icon fas yellow" :text="'fa-sign-out-alt' | fonticon"/>
                    <Label col="1" text="Salir" class="p-r-10"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
    import Home from "../pages/Home";
    import Sale from "../pages/sales/Index";
    import Inventory from "../pages/inventories/Index";
    import Settings from "../pages/Settings";
    import * as utils from "~/shared/utils";
    import { SelectedPageService } from "~/shared/selected-page-service";
    import {mapActions, mapGetters} from "vuex";

    export default {
        mounted() {
            SelectedPageService.getInstance().selectedPage$
                .subscribe((selectedPage) => this.selectedPage = selectedPage);
        },
        computed: {
            ...mapGetters({
                isAuthenticated: 'auth/authenticated',
                user: 'auth/user',
            }),
            role() {
                return this.user? this.user.role.keyname: null
            }
        },
        data() {
            return {
                Home: Home,
                Sale: Sale,
                Inventory: Inventory,
                Settings: Settings,
                selectedPage: "",
            };
        },
        components: {
            Home,
            Sale,
            Inventory,
            Settings
        },
        methods: {
            ...mapActions({
                signOut: 'auth/signOut',
            }),
            onNavigationItemTap(component) {
                this.$navigateTo(component, {
                    clearHistory: true
                });
                utils.closeDrawer();
            },
            logout (e) {
                utils.closeDrawer();
                this.signOut();
            },
        }
    };
</script>

<style scoped lang="scss">

</style>
