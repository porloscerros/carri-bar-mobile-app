<template>
    <StackLayout>
        <StackLayout height="30%">
            <Label :text="form.date | formatDate" horizontalAlignment="center"></Label>

            <TextField v-model="form.table" horizontalAlignment="center" hint="mesa..." height="70" width="80%"></TextField>

            <Label  horizontalAlignment="center">
                <FormattedString>
                    <Span text="Total: "/>
                    <Span text.decode="&dollar;"/>
                    <Span :text="total" fontWeight="Bold"/>
                </FormattedString>
            </Label>
        </StackLayout>

        <GridLayout columns="*" rows="auto, auto, auto, auto" height="40%">
            <Label row="0" text="Carta Cocina:"/>
            <select-picker row="1" v-if="recipes.length" class="text-center"
                           label="Recetas:"
                           hint="Click here"
                           :options="recipes"
                           @select="onRecipesSelected"
            ></select-picker>

            <Label row="2" text="Carta Bar:"/>
            <select-picker row="3" v-if="recipes.length" class="text-center"
                           label="Recetas:"
                           hint="Click here"
                           :options="recipes"
                           @select="onRecipesSelected"
            ></select-picker>
        </GridLayout>

        <ListView for="recipe in form.recipes" height="30%">
            <v-template>
                <RecipeCard :item="recipe"></RecipeCard>
            </v-template>
        </ListView>
    </StackLayout>
</template>

<script>
    import SelectPicker from "../inputs/SelectPicker";
    import RecipeCard from "./RecipeListItem";
    const dialogs = require('tns-core-modules/ui/dialogs');

    export default {
        name: "Form",
        props: {
            item: {
                type: Object,
                default() {
                    return {
                        id: null,
                        date: new Date().toISOString(),
                        table: '',
                        total: 0,
                        recipes: [],
                    }
                }
            },
        },
        components: {
            SelectPicker,
            RecipeCard,
        },
        computed: {
            total() {
                return this.form.recipes.reduce((valorAnterior, valorActual) => {
                    console.log(valorActual)
                    return valorAnterior + (valorActual.quantity * valorActual.price);
                }, 0);
            }
        },
        data() {
            return {
                form: {
                    id: this.item? this.item.id: null,
                    table: this.item.table,
                    total: this.item.total,
                    date: this.item.date,
                    recipes: this.item.recipes,
                },
                recipes: [],
                recipe: {}
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
            onCancelButtonTap() {
                this.$navigateTo(this.$routes.SaleList);
            },
            onDoneButtonTap() {
                this.$emit("submit", this.form);
            },
            async fetchRecipes () {
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/recipes`);
                    if(data)
                        this.recipes = data;
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
            }
        },
        mounted() {
            console.log('Sale Form mounted');
            this.fetchRecipes();
        },
    }
</script>

<style scoped>
    TextField {
        font-size: 18;
    }
</style>