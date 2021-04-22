<template>
    <Page>
        <ActionBar title="Carta Comida"/>
        <StackLayout>
            <Button @tap="$modal.close" text="Cancelar" />

            <Label text="Cantidad:" />
            <TextField v-model="quantity" @loaded="showKeyboard" keyboardType="number" horizontalAlignment="center" height="70" width="80%"></TextField>

            <Button @tap="onAddItem" text="OK" />
        </StackLayout>
    </Page>
</template>

<script>
    import {Utils as utils} from "@nativescript/core";
    import {mapActions} from "vuex";

    export default {
        name: "QuantityModal",
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