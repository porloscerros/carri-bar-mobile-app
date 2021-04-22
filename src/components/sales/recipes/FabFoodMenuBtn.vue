<template>
    <Fab
            @tap="openItemPickerModal"
            class="fas fab-button" :text="'fa-utensils' | fonticon"
    ></Fab>
</template>

<script>
    import ItemPickerModal from './ItemPickerModal';
    import QuantityModal from './QuantityModal';
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "FabFoodMenuBtn",
        props: {
            url: String,
            disabled: {
                type: Boolean,
                default: false
            },
            hidden: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            ...mapGetters({
                items: 'sales/kitchenRecipes',
                selected: 'sales/recipe',
            }),
        },
        methods: {
            ...mapActions({
                addSaleRecipe: 'sales/addSaleRecipe',
            }),
            callback: function(e) {
                this.$emit('tap', e);
            },
            openItemPickerModal() {
                this.$showModal(ItemPickerModal, { fullscreen: true, props: { items: this.items } })
                    .then(result => {
                        if (result === 'selected') {
                            console.log('ItemPickerModal result', result);
                            this.openQuantityModal();
                        }
                    });
            },
            openQuantityModal() {
                console.log('store.selected', this.selected);
                this.$showModal(QuantityModal, { fullscreen: true })
                    .then(result => {
                        console.log('QuantityModal result', result);
                        if (result === 'selected') {
                            this.addSaleRecipe(this.selected)
                        }
                    });
            },
            onItemTap(e) {
                console.log('FabMenuBtn onItemTap', e);
            }
        }
    }
</script>

<style scoped>
    .fab-button {
        height: 55;
        width: 55; /* this is required on iOS - Android does not require width so you might need to adjust styles */
        margin: 15;
        background-color: #ff4081;
        horizontal-align: right;
        vertical-align: bottom;
        font-size: 8;
    }
</style>