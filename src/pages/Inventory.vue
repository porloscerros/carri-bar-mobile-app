<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Inventario"  col="1"/>
            </GridLayout>
        </ActionBar>

        <grid-layout ~mainContent rows="auto, *">
            <list-view row="1"  for="item in listOfItems">
                <v-template>
                    <GridLayout columns="*, *, *">
                        <Button :text="`${item.name}`" col="0"
                                @tap="onItemTap(item)"></Button>
                        <Button :text="`${item.quantity}`" col="1"
                                @tap="onItemTap(item)"></Button>
                        <Button :text="`${item.measurement_unit.name}`" col="2"
                                @tap="onItemTap(item)"></Button>
                    </GridLayout>
                </v-template>
            </list-view>
            <fab
                    @tap="add"
                    row="1"
                    icon="res://ic_add_white"
                    rippleColor="#f1f1f1"
                    class="fab-button"
            ></fab>
        </grid-layout>

    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    //import CardInventory from '../components/CardInventory';
    const dialogs = require('tns-core-modules/ui/dialogs');

    export default {
        name: "Inventory",
        mixins: [ sideDrawer ],
        components: {
            //CardInventory,
        },
        data () {
            return {
                loading: true,
                listOfItems:[],
                form: {
                    name: '',
                    quantity: null,
                    measurement_unit_id: null,
                    minimum_quantity: 0,
                    recommended_quantity: 0,
                    cost: null,
                    // 'name' => 'required|string|max:64',
                    // 'quantity' => 'required|numeric',
                    // 'minimum_quantity' => 'required|numeric',
                    // 'recommended_quantity' => 'required|numeric',
                    // 'cost' => 'required|numeric',
                    // 'measurement_unit_id' => 'required|integer',
                },
                measurement_units: []
            }
        },
        methods:{
            async fetchItems () {
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/inventories`);
                    if(data)
                        this.listOfItems = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            async fetchMU () {
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/measurement-units`);
                    if(data)
                        this.measurement_units = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            async submitCreate () {
                this.loading = true;
                try {
                    await this.$http.post(`/v1/inventories`, this.form);
                    this.fetchItems();
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            onItemTap(item) {
                alert({
                    title: item.name,
                    message: `Cantidad: ${item.quantity} ${item.measurement_unit.name}\nCosto: $${item.cost}\nCantidad Mínima: ${item.minimum_quantity} ${item.measurement_unit.name} \nCantidad Recomendada: ${item.recommended_quantity} ${item.measurement_unit.name}`,
                    okButtonText: "OK"
                })
                // this.$navigateTo(TypeList, {props: {service:service, location:this.location}})
            },
            add() {
                // this.$navigateTo(TypeList, {props: {service:service, location:this.location}})
                prompt({
                    title: "Nombre",
                    message: "El nombre del ingrediente:",
                    okButtonText: "OK",
                    cancelButtonText: "Cancelar",
                    defaultText: this.form.name,
                    inputType: dialogs.inputType.text
                }).then(result => {
                    this.form.name = result.text;
                    prompt({
                        title: "Cantidad",
                        message: "La cantidad existente del ingrediente:",
                        okButtonText: "OK",
                        cancelButtonText: "Cancelar",
                        defaultText: this.form.quantity,
                        inputType: dialogs.inputType.number
                    }).then(result => {
                        this.form.quantity = result.text;
                        let options = this.measurement_units.map(mu => mu.name);
                        action(
                            "Unidad de Medida",
                            "Cancelar",
                            options
                        ).then(result => {
                            this.form.measurement_unit_id = this.measurement_units.find(mu => mu.name === result).id;
                            prompt({
                                title: "Costo",
                                message: "El precio de compra:",
                                okButtonText: "OK",
                                cancelButtonText: "Cancelar",
                                defaultText: this.form.cost,
                                inputType: dialogs.inputType.number
                            }).then(result => {
                                this.form.cost = result.text;
                                this.submitCreate();
                            });
                        });
                    });
                });
            },
        },
        mounted() {
            console.log('Inventory mounted');
            this.fetchItems();
            this.fetchMU();
        },
    }
</script>

<style scoped>
    .fab-button {
        height: 70;
        margin: 15;
        background-color: #ff4081;
        horizontal-align: right;
        vertical-align: bottom;
    }
</style>