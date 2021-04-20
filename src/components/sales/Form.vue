<template>
    <ScrollView>
        <StackLayout class="item-list">
            <Label class="item-list-odd" text="Nombre:"/>
            <TextField v-model="form.name" :class="{ 'item-list-even': true, 'placeholder-error': !form.name }" :text="form.name"
                       hint="El nombre es requerido" height="50"/>

            <Label class="item-list-odd" text="Costo:"/>
            <TextField v-model="form.cost" :text="form.cost" keyboardType="number" height="50" />

            <Label class="item-list-odd" text="Cantidad Actual:"/>
            <TextField v-model="form.quantity" :text="form.quantity" keyboardType="number" height="50" />

            <Label class="item-list-odd" text="Cantidad Recomendada:"/>
            <TextField v-model="form.recommended_quantity" :text="form.recommended_quantity" keyboardType="number" height="50" />

            <Label class="item-list-odd" text="Cantidad Mínima:"/>
            <TextField v-model="form.minimum_quantity" :text="form.minimum_quantity" keyboardType="number" height="50" />

            <Label class="item-list-odd" text="Unidad de Medida:"/>
            <select-picker v-if="measurement_units.length" class="text-center"
                           label="Unidad de Medida:"
                           hint="Click here"
                           :options="measurement_units"
                           :value="form.measurement_unit_id"
                           @select="onMUSelected"
            ></select-picker>
        </StackLayout>
    </ScrollView>
</template>

<script>
    import SelectPicker from "../inputs/SelectPicker";
    export default {
        name: "Form",
        props: {
            item: {
                type: Object,
                default() {
                    return {
                        id: null,
                        name: '',
                        cost: null,
                        quantity: null,
                        measurement_unit_id: null,
                        measurement_unit: {
                            id: null,
                            name: ''
                        },
                        recommended_quantity: null,
                        minimum_quantity: null,
                    }
                }
            },
        },
        components: {
            SelectPicker,
        },
        data() {
            return {
                form: {
                    id: this.item? this.item.id: null,
                    name: this.item.name,
                    cost: this.item.cost,
                    quantity: this.item.quantity,
                    measurement_unit_id: this.item.measurement_unit? this.item.measurement_unit.id: null,
                    recommended_quantity: this.item.recommended_quantity,
                    minimum_quantity: this.item.minimum_quantity,
                },
                measurement_units: [],
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
                this.$navigateTo(this.$routes.InventoryList);
            },
            onDoneButtonTap() {
                this.$emit("submit", this.form);
            },
            async fetchMU () {
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/measurement-units`);
                    if(data)
                        this.measurement_units = data;
                } catch(error) {
                    console.error(error);
                }
                this.loading = false;
            },
            onMUSelected(value) {
                this.form.measurement_unit_id = value;
            }
        },
        mounted() {
            console.log('Inventory Form mounted');
            this.fetchMU();
        },
    }
</script>

<style scoped>

</style>