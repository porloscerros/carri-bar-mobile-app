<template>
    <Fab
            @tap="openRecipesPickerModal"
            class="fas fab-button" :text="'fa-cocktail' | fonticon"
    ></Fab>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import ItemPickerModal from './RecipePickerModal';
    import QuantityModal from './RecipeQuantityModal';

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
            openRecipesPickerModal() {
                this.$showModal(ItemPickerModal, {
                    fullscreen: true,
                    props: {
                        items: this.items
                    }
                })
                    .then(result => {
                        if (result === 'selected') {
                            this.openQuantityModal();
                        }
                    });
            },
            openQuantityModal() {
                this.$showModal(QuantityModal, { fullscreen: true })
                    .then(result => {
                        if (result === 'selected') {
                            this.addSaleRecipe(this.selected)
                        }
                    });
            },
            onItemTap(e) {
                console.log('FabMenuBtn onItemTap');
            }
        },
        mounted() {
            console.log(`${this.$options.name} Monted!`);
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