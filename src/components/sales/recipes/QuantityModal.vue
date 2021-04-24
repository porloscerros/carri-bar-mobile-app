<template>
    <Frame>
        <Page>
            <ActionBar>
                <GridLayout width="100%" columns="auto, *">
                    <nav-back col="0" @tap="$modal.close"></nav-back>
                    <Label col="1" class="title" :text="item? item.name: 'no has seleccionado receta'"/>
                </GridLayout>
            </ActionBar>
            <StackLayout>
                <Label text="Cantidad:" style="font-size: 14;"></Label>
                <TextField v-model="quantity" @loaded="showKeyboard" @returnPress="onAddItem" keyboardType="number" horizontalAlignment="center" height="70" width="80%"></TextField>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script>
    import {Utils as utils} from "@nativescript/core";
    import {mapActions, mapGetters} from "vuex";
    import NavBack from '~/components/buttons/NavBack'

    export default {
        name: "QuantityModal",
        components: {
            NavBack,
        },
        computed: {
            ...mapGetters({
                item: 'sales/recipe',
            }),
        },
        data() {
            return {
                quantity: null,
            };
        },
        methods: {
            ...mapActions({
                setRecipe: 'sales/setRecipe',
            }),
            onItemTap(e) {
            },
            onAddItem(e) {
                console.log({quantity: this.quantity});
                this.setRecipe({quantity: this.quantity});
                this.$modal.close('selected');
            },
            showKeyboard({ object }) {
                if (object.android) {
                    setTimeout(() => {
                        object.focus();
                        utils.ad.showSoftInput(object);
                    }, 10);
                } else {
                    object.focus();
                }
            }
        },
        mounted() {
            console.log('QuantityModal mounted');
        },
    }
</script>

<style scoped>

</style>