<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <nav-back col="0" @tap="$navigateBack()"></nav-back>
                <Label col="1" class="title" :text="'Venta #'+itemData.id"/>
                <edit-btn col="2" @tap="onEditButtonTap"></edit-btn>
            </GridLayout>
        </ActionBar>

        <StackLayout>
            <GridLayout columns="*,*" rows="*, *" height="100">
                <Label :text="itemData.date | formatDate" row="0" colSpan="2" horizontalAlignment="center"></Label>
                <Label :text="itemData.table" col="0" row="1" horizontalAlignment="center"></Label>
                <Label col="1" row="1"  horizontalAlignment="center">
                    <FormattedString>
                        <Span text="Total: "/>
                        <Span text.decode="&dollar;"/>
                        <Span :text="itemData.total" fontWeight="Bold"/>
                    </FormattedString>
                </Label>
            </GridLayout>

            <ListView for="recipe in item.recipes">
                <v-template>
                    <RecipeCard :item="recipe"></RecipeCard>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
    import NavBack from '~/components/buttons/NavBack';
    import EditBtn from '~/components/buttons/EditBtn';
    import RecipeCard from "./recipes/RecipeListItem";
    export default {
        props: ["item"],
        components: {
            NavBack,
            EditBtn,
            RecipeCard,
        },
        computed: {
            itemData() {
                return this.item || {};
            }
        },
        methods: {
            onEditButtonTap() {
                this.$navigateTo(this.$routes.InventoryEdit, {
                    props: {item: this.itemData},
                    animated: true,
                    transition: 'fade',
                });
            }
        },
        mounted() {
            console.log('Sale Detail mounted');
            console.log(this.item);
        },
    };
</script>

<style lang="scss">

</style>