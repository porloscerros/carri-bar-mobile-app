<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <open-drawer-btn col="0" @tap="openDrawer()"></open-drawer-btn>
                <Label col="1" class="title" text="Ventas" />
            </GridLayout>
        </ActionBar>

        <grid-layout ~mainContent rows="auto, *">
            <list-view row="1" for="item in items" class="list-group">
                <v-template>
                    <Card :item="item"></Card>
                </v-template>
            </list-view>
            <fab-btn
                    @tap="onCreate"
                    row="1"
            ></fab-btn>
        </grid-layout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    import OpenDrawerBtn from "../buttons/OpenDrawerBtn";
    import Card from "./ListItemCard";
    import FabBtn from "../buttons/FabBtn";
    import Theme from "@nativescript/theme";

    export default {
        mixins: [ sideDrawer ],
        components: {
            OpenDrawerBtn,
            Card,
            FabBtn,
        },
        computed: {
            isLoading() {
                return !this.items.length;
            }
        },
        data() {
            return {
                loading: true,
                items: [],
                searchQuery: '',
            }
        },
        methods: {
            async fetchItems () {
                this.loading = true;
                try {
                    const params = {
                        'params': {
                            with_recipes: true
                        }
                    };
                    const { data } = await this.$http.get(`/v1/sales`, params);
                    console.log(data)
                    if(data)
                        this.items = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            onCreate() {
                this.$navigateTo(this.$routes.SaleCreate, {
                    animated: true,
                    transition: 'fade'
                });
            },
        },
        mounted() {
            console.log('Sale List mounted');
            this.fetchItems();

            // Theme.setMode(Theme.Light);
            Theme.toggleMode();
        },
    };
</script>

<style lang="scss" scoped>

</style>
