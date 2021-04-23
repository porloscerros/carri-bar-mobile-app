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
                    <Card @tap="onEdit" @longPress="onDelete" :item="item"></Card>
                </v-template>
            </list-view>
            <fab-btn
                    @tap="onCreate"
                    row="1"
            ></fab-btn>
            <ActivityIndicator :busy="loading"/>
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
                    transition: 'slide'
                });
            },
            onEdit(item) {
                this.$navigateTo(this.$routes.SaleEdit, {
                    props: { item: item, },
                    animated: true,
                    transition: 'slide'
                })
            },
            onDelete(item) {
                confirm({
                    title: "¿Confirma eliminar la Venta?",
                    message: "Esta operación no se puede deshacer",
                    okButtonText: "OK",
                    cancelButtonText: "Cancelar"
                }).then(result => {
                    console.log(result);
                    if (result)
                        alert('Esta característica aún no está disponible.')
                });
            }
        },
        mounted() {
            console.log('Sale List mounted');
            this.fetchItems();
        },
    };
</script>

<style lang="scss" scoped>

</style>
