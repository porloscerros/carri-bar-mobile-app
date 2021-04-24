<template>
    <Frame>
        <Page>
            <ActionBar>
                <GridLayout width="100%" columns="auto, *">
                    <nav-back col="0" @tap="$modal.close"></nav-back>
                    <Label col="1" class="title" text="Carta"/>
                </GridLayout>
            </ActionBar>
            <StackLayout>
                <List :items="items" @tap="onItemTap" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script>
    import List from './List'
    import NavBack from '~/components/buttons/NavBack'
    import {mapActions} from "vuex";
    export default {
        name: "RecipePickerModal",
        props: ["items"],
        components: {
            List,
            NavBack,
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