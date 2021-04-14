<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Ventas"  col="1"/>
            </GridLayout>
        </ActionBar>

        <grid-layout ~mainContent rows="auto, *">
            <list-view row="1"  for="item in list">
                <v-template>
                    <GridLayout columns="*, *, *">
                        <Button :text="`${item.date}`" col="0"
                                @tap="onItemTap(item)"></Button>
                        <Button :text="`$${item.total}`" col="1"
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
    const dialogs = require('tns-core-modules/ui/dialogs');

    export default {
        name: "List",
        mixins: [ sideDrawer ],
        components: {
            //CardInventory,
        },
        data () {
            return {
                loading: true,
                list:[],
                form: {
                    name: '',
                    quantity: null,
                    measurement_unit_id: null,
                    minimum_quantity: 0,
                    recommended_quantity: 0,
                    cost: null,
                },
                measurement_units: []
            }
        },
        methods:{
            async fetchItems () {
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/sales`);
                    if(data)
                        this.list = data;
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
                    title: item.date,
                    message: `Total: $${item.total}`,
                    okButtonText: "OK"
                })
                // this.$navigateTo(TypeList, {props: {service:service, location:this.location}})
            },
            add() {
                // this.$navigateTo(TypeList, {props: {service:service, location:this.location}})

                alert({
                    title: 'Haciendo...',
                    message: `Aún estamos trabajando en esta funcionalidad.`,
                    okButtonText: "OK"
                })
            },
        },
        mounted() {
            console.log('Sales List mounted');
            this.fetchItems();
            // this.fetchMU();
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