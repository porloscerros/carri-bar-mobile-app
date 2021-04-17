<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Inventario"  col="1"/>
            </GridLayout>
        </ActionBar>

        <grid-layout ~mainContent rows="auto, *">
            <list-view row="1"  for="item in items">
                <v-template>
                    <Card :item="item"></Card>
                </v-template>
            </list-view>
            <fab
                    @tap="onCreate"
                    row="1"
                    rippleColor="#f1f1f1"
                    class="fab-button"
            ></fab>
        </grid-layout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    import Card from "./ListItemCard";

    export default {
        mixins: [ sideDrawer ],
        components: {
            Card,
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
