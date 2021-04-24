<template>
    <Frame id="recipe-picker-modal-frame" >
        <Page>
            <ActionBar>
                <GridLayout width="100%" columns="auto, *">
                    <nav-back col="0" @tap="$modal.close"></nav-back>
                    <Label col="1" class="title" text="Carta"/>
                </GridLayout>
            </ActionBar>
            <StackLayout>
                <ScrollView height="100%">
                    <ListView for="item in items" class="list-group">
                        <v-template>
                            <FlexboxLayout justifyContent="space-between"
                                           @touch="onItemTap(item)"
                                           separatorColor="#ff4081"
                            >
                                <Label :text="item.name" width="50%"></Label>

                                <Label :text="item.quantity" width="20%" horizontalAlignment="center" textAlignment="center"></Label>

                                <Label width="30%" textWrap="true" horizontalAlignment="right" textAlignment="right">
                                    <FormattedString>
                                        <Span text.decode="&dollar;"/>
                                        <span :text="item.price" fontWeight="Bold"/>
                                    </FormattedString>
                                </Label>
                            </FlexboxLayout>
                        </v-template>
                    </ListView>
                </ScrollView>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script>
    import NavBack from '~/components/buttons/NavBack'
    import {mapActions} from "vuex";
    export default {
        name: "RecipePickerModal",
        props: ["items"],
        components: {
            NavBack,
        },
        methods: {
            ...mapActions({
                setRecipe: 'sales/setRecipe',
            }),
            onItemTap(item) {
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
            console.log(`${this.$options.name} Monted!`)
        },
    }
</script>

<style scoped>

</style>