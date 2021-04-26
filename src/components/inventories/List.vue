<template>
    <grid-layout rows="auto, *">
        <list-view row="1" for="item in items" class="list-group">
            <v-template>
                <ListItem :item="item"></ListItem>
            </v-template>
        </list-view>
        <fab-btn
                @tap="onCreate"
                row="1"
        ></fab-btn>
    </grid-layout>
</template>

<script>
    import ListItem from "./ListItemCard";
    import FabBtn from "../buttons/FabBtn";

    export default {
        components: {
            ListItem,
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
                this.$navigateTo(this.$routes.InventoryCreate, {
                    animated: true,
                    transition: 'fade'
                });
            },
        },
        mounted() {
            console.log('Inventory List mounted');
            this.fetchItems();
        },
    };
</script>

<style lang="scss" scoped>

</style>
