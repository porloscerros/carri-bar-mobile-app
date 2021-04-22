<template>
    <Page>
        <ActionBar title="Carta Comida"/>
        <StackLayout>
            <Button @tap="$modal.close" text="Cancelar" />
            <RecipeList :items="items" @tap="onItemTap" />
        </StackLayout>
    </Page>
</template>

<script>
    import RecipeList from '../../recipes/List'
    import {mapActions} from "vuex";
    export default {
        name: "RecipePickerModal",
        props: ["items"],
        components: {
            RecipeList
        },
        methods: {
            ...mapActions({
                setRecipe: 'sales/setRecipe',
            }),
            onItemTap(item) {
                // console.log('Modal tap', item);
                let obj = {
                    recipe: {
                        id: item.id,
                        name: item.name
                    },
                    price: item.price,
                    recipe_id: item.id,
                };
                this.setRecipe(obj);
                this.$modal.close('selected');
            },
        },
        mounted() {
            console.log('RecipePickerModal mounted');
        },
    }
</script>

<style scoped>

</style>