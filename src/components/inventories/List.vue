<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <open-drawer-btn col="0" @tap="openDrawer()"></open-drawer-btn>
                <Label col="1" class="title" text="Inventario" />
            </GridLayout>
        </ActionBar>

        <grid-layout ~mainContent rows="auto, *">
            <list-view row="1"  for="item in items">
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
                    const { data } = await this.$http.get(`/v1/inventories`);
                    if(data)
                        this.items = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            onCreate() {
                this.$navigateTo(this.$routes.InventoryCreate);
            },
        },
        mounted() {
            console.log('Inventory List mounted');
            this.fetchItems();
        },
    };
</script>

<style lang="scss" scoped>
    .red {
        color: #ff4081;
    }
    .blue {
        color: #4758ff;
    }
    .green {
        color: #4eff31;
    }
</style>
