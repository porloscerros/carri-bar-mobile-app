<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <cancel-btn col="0" @tap="onCancelButtonTap"></cancel-btn>
                <Label col="1" class="title" text="Editar Inventario"/>
                <save-btn col="2" @tap="onDoneButtonTap"></save-btn>
            </GridLayout>
        </ActionBar>

        <GridLayout>
            <ScrollView>
                <StackLayout class="item-list">
                    <Label class="item-list-odd" text="Nombre:"/>
                    <TextField v-model="form.name" :class="{ 'item-list-even': true, 'placeholder-error': !form.name }" :text="form.name"
                               hint="El nombre es requerido" height="50"/>

                    <Label class="item-list-odd" text="Costo:"/>
                    <TextField v-model="form.cost" :text="form.cost" keyboardType="number" height="50" />

                    <Label class="item-list-odd" text="Cantidad Actual:"/>
                    <TextField v-model="form.quantity" :text="form.quantity" keyboardType="number" height="50" />

                    <Label class="item-list-odd" text="Unidad de Medida:"/>
                    <select-picker v-if="measurement_units.length" class="text-center"
                                   label="Unidad de Medida:"
                                   hint="Click here"
                                   :options="measurement_units"
                                   :value="form.measurement_unit_id"
                                   @select="onMUSelected"
                    ></select-picker>

                    <Label class="item-list-odd" text="Cantidad Recomendada:"/>
                    <TextField v-model="form.recommended_quantity" :text="form.recommended_quantity" keyboardType="number" height="50" />

                    <Label class="item-list-odd" text="Cantidad Mínima:"/>
                    <TextField v-model="form.minimum_quantity" :text="form.minimum_quantity" keyboardType="number" height="50" />
                </StackLayout>
            </ScrollView>

            <ActivityIndicator :busy="isUpdating"/>
        </GridLayout>
    </Page>
</template>

<script>
    import SaveBtn from '~/components/buttons/SaveBtn'
    import CancelBtn from '~/components/buttons/CancelBtn'
    import SelectPicker from "../inputs/SelectPicker";

    export default {
        components: {
            SelectPicker,
            SaveBtn,
            CancelBtn,
        },
        props: ["item"],
        data() {
            return {
                isUpdating: false,
                form: {
                    id: this.item? this.item.id: null,
                    name: this.item.name,
                    cost: this.item.cost,
                    quantity: this.item.quantity,
                    measurement_unit_id: this.item.measurement_unit? this.item.measurement_unit.id: null,
                    recommended_quantity: this.item.quantity,
                    minimum_quantity: this.item.quantity,
                },
                measurement_units: [],
            };
        },
        computed: {
            isModelValid() {
                return !!this.form.name && !!this.form.quantity;
            },
        },
        methods: {
            onCancelButtonTap() {
                this.$navigateTo(this.$routes.InventoryList);
            },
            onDoneButtonTap() {
                console.log(this.form)
                this.submitForm();

                /* ***********************************************************
                * By design this app is set up to work with read-only sample data.
                * Follow the steps in the "Firebase database setup" section in app/readme.md file
                * and uncomment the code block below to make it editable.
                *************************************************************/

                // let queue = Promise.resolve();
                // this.isUpdating = true;
                //
                // queue.then(() => itemService.update(this.form))
                //     .then(() => {
                //         this.isUpdating = false;
                //
                //     this.$navigateTo(this.$routes.InventoryList, {
                //         animated: true,
                //         clearHistory: true,
                //         transition: {
                //             name: "slideBottom",
                //             duration: 200,
                //             curve: "ease"
                //         }
                //     });
                //     })
                //     .catch((errorMessage) => {
                //         this.isUpdating = false;
                //
                //         alert({ title: "Oops!", message: errorMessage, okButtonText: "Ok" });
                //     });
            },
            async submitForm () {
                this.isUpdating = true;
                try {
                    let data = JSON.stringify(this.form);
                    let response = await this.$http.put(`/v1/inventories/${this.form.id}`, data);
                    console.log('store.auth signIn response.data', response.data)
                } catch(error) {
                    console.log(error);
                    console.error(error.response.data);
                    console.log(Object.keys(error.response))
                    console.log(error.response.headers)
                    if(error.response.status === 422) {
                        console.log('Revisa los siguientes datos!')
                        console.log(error.response.data.errors)
                    }
                }
                this.isUpdating = false;
            },
            async fetchMU () {
                console.log('Inventory Edit fetchMU');
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
                console.log('onMUSelected',value);
                this.form.measurement_unit_id = value;
            }
        },
        mounted() {
            console.log('Inventory Edit mounted');
            this.fetchMU();
        },
    };
</script>

<style lang="scss">
    .item-list {
        TextField {
            text-align: center;
            font-size: 16;
        }
    }
    .fa-check {
        color: green !important;
    }

    fa-times {
        border: 1px solid red;
    }
</style>
