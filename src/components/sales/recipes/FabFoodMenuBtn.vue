<template>
    <Fab
            @tap="openRecipePickerModal"
            class="fas fab-button" :text="'fa-utensils' | fonticon"
    ></Fab>
</template>

<script>
    import RecipePickerModal from './RecipePickerModal';
    import RecipeQuantityModal from './RecipeQuantityModal';
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
            openRecipePickerModal() {
                this.$showModal(RecipePickerModal, {
                    fullscreen: true,
                    props: {
                        items: this.items
                    }
                })
                    .then(result => {
                        if (result === 'selected') {
                            this.openRecipeQuantityModal();
                        }
                    });
            },
            openRecipeQuantityModal() {
                this.$showModal(RecipeQuantityModal, {
                    fullscreen: true
                })
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
        horizontal-align: right;
        vertical-align: bottom;
        font-size: 8;
    }
</style>