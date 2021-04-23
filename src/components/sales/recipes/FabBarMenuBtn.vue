<template>
    <Fab
            @tap="openItemPickerModal"
            class="fas fab-button" :text="'fa-cocktail' | fonticon"
    ></Fab>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import ItemPickerModal from './ItemPickerModal';
    import QuantityModal from './QuantityModal';

    export default {
        name: "FabBarMenuBtn",
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
                items: 'sales/barRecipes',
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
        horizontal-align: left;
        vertical-align: bottom;
        font-size: 8;
    }
</style>