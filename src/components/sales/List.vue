<template>
    <grid-layout rows="auto, *">
        <list-view row="1" for="item in items" class="list-group">
            <v-template>
                <ListItem @tap="onEdit" @longPress="onDelete" :item="item"></ListItem>
            </v-template>
        </list-view>
        <fab-btn
                @tap="onCreate"
                row="1"
        ></fab-btn>
        <ActivityIndicator :busy="loading"/>
    </grid-layout>
</template>

<script>
    import ListItem from "./ListItem";
    import FabBtn from "../buttons/FabBtn";

    export default {
        name: 'SalesList',
        components: {
            ListItem,
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
            console.log(`${this.$options.name} Monted!`);
            this.fetchItems();
        },
    };
</script>

<style lang="scss" scoped>

</style>
