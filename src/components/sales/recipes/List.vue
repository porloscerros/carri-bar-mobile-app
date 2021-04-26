<template>
    <ScrollView height="100%">
        <ListView for="item in items" class="list-group">
            <v-template>
                <ListItem :item="item" @tap="onTap(item)"></ListItem>
            </v-template>
        </ListView>
    </ScrollView>
</template>

<script>
    import ListItem from "./ListItem";
    import {mapActions} from "vuex";

    export default {
        name: 'RecipesList',
        components: {
            ListItem,
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
            onTap(item) {
                this.setRecipe(item);
                this.$emit('tap', item);
            },
        },
        mounted() {
            console.log(`${this.$options.name} Monted!`);
        },
    };
</script>

<style lang="scss" scoped>

</style>
