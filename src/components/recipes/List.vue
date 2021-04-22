<template>
    <ScrollView height="100%">
        <ListView for="item in items" class="list-group">
            <v-template>
                <Card :item="item" @tap="onTap(item)"></Card>
            </v-template>
        </ListView>
    </ScrollView>
</template>

<script>
    import Card from "./ListItemCard";
    import {mapActions} from "vuex";

    export default {
        components: {
            Card,
        },
        props: ["items"],
        computed: {
            isLoading() {
                return !this.items.length;
            },
        },
        data() {
            return {
                loading: true,
                searchQuery: '',
            }
        },
        methods: {
            ...mapActions({
                setRecipe: 'sales/setRecipe',
            }),
            async fetchItems () {
                this.loading = true;
                try {
                    const params = {
                        'params': {
                            type: 1,
                        }
                    };
                    const { data } = await this.$http.get(`/v1/recipes`, params);
                    if(data)
                        this.items = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            onTap(item) {
                console.log('List tap', item);
                this.setRecipe(item);
                this.$emit('tap', item);
            },
        },
        mounted() {
            console.log('Recipe List mounted');
            console.log(this.items);
            // this.fetchItems();
        },
    };
</script>

<style lang="scss" scoped>

</style>
