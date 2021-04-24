<template>
    <GridLayout columns="*" rows="auto, *, auto" height="100%">
        <StackLayout col="0" row="0">
            <Label :text="form.date | formatDate" horizontalAlignment="center"></Label>

            <TextField v-model="form.table"
                       horizontalAlignment="center"
                       textAlignment="center"
                       hint="mesa..."
                       height="70"
                       width="80%"
            ></TextField>

            <Label horizontalAlignment="center" class="total my-3">
                <FormattedString>
                    <Span text="Total: "/>
                    <Span text.decode="&dollar;"/>
                    <Span :text="total" fontWeight="Bold"/>
                </FormattedString>
            </Label>
        </StackLayout>

        <Scrollview row="1">
            <ListView v-if="form" for="recipe in item.recipes">
                <v-template>
                    <ListItem :item="recipe"></ListItem>
                </v-template>
            </ListView>
        </Scrollview>

        <GridLayout row="2" columns="*, *" rows="auto">
            <BarMenuBtn col="0"></BarMenuBtn>
            <FoodMenuBtn col="1"></FoodMenuBtn>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import SelectPicker from "../inputs/SelectPicker";
    import BarMenuBtn from "./recipes/FabBarMenuBtn";
    import FoodMenuBtn from "./recipes/FabFoodMenuBtn";
    import ListItem from "./recipes/ListItem";
    const dialogs = require('tns-core-modules/ui/dialogs');

    export default {
        name: "Form",
        // props: {
        //     item: {
        //         type: Object,
        //         default() {
        //             return {
        //                 id: null,
        //                 date: new Date().toISOString(),
        //                 table: '',
        //                 total: 0,
        //                 recipes: [],
        //             }
        //         }
        //     },
        // },
        components: {
            SelectPicker,
            ListItem,
            BarMenuBtn,
            FoodMenuBtn,
        },
        computed: {
            ...mapGetters({
                item: 'sales/sale',
                recipes: 'sales/form',
                saleForm: 'sales/form',
            }),
            total() {
                return this.item.recipes.reduce((valorAnterior, valorActual) => {
                    return valorAnterior + (valorActual.quantity * valorActual.price);
                }, 0);
            },
        },
        data() {
            return {
                form: {},
                recipe: {},
                dialogOpen: false,
            };
        },
        watch: {
            form: {
                handler(newValue) {
                    // console.log('watch  form', newValue);
                },
                deep: true
            }
        },
        methods: {
            ...mapActions({
                setRecipes: 'sales/setRecipes',
            }),
            async fetchRecipes () {
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/recipes`);
                    if(data) {
                        this.setRecipes(data);
                        // this.recipes = data;
                    }
                } catch(error) {
                    console.error(error);
                }
                this.loading = false;
            },
            onRecipesSelected(value) {
                let recipe = this.findRecipeById(value);
                this.recipe = {
                    recipe: recipe,
                    recipe_id: value,
                    quantity: 0,
                    price: recipe.price
                };
                prompt({
                    title: 'Cantidad',
                    okButtonText: 'OK',
                    cancelButtonText: 'Cancelar',
                    inputType: dialogs.inputType.number
                })
                    .then(result => {
                        console.log(`Dialog result: ${result.result}, text: ${result.text}`)
                        // if (result.result)
                        this.recipe.quantity = parseInt(result.text);
                        this.form.recipes.push(this.recipe);
                    });
            },
            findRecipeById(id) {
                return this.recipes.find(item => {
                    return item.id === id;
                })
            },
        },
        mounted() {
            console.log('Sale Form mounted');
            this.fetchRecipes();
            this.form = this.saleForm;
        },
    }
</script>

<style scoped>
    TextField {
        font-size: 18;
    }
    Datepicker {
        color: white;
    }
    .total {
        font-size: 20;
    }
</style>