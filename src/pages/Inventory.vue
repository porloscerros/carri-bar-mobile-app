<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Inventario"  col="1"/>
            </GridLayout>
        </ActionBar>
        
        <ListView ~mainContent for="item in listOfItems">
            <v-template>
                <GridLayout columns="*, *, *">
                    <Button :text="`${item.name}`" col="0"
                        @tap="onItemTap(item)" />
                    <Button :text="`${item.quantity}`" col="1"
                        @tap="onItemTap(item)" />
                    <Button :text="`${item.measurement_unit.name}`" col="2"
                        @tap="onItemTap(item)" />
                </GridLayout>
            </v-template>
        </ListView>

    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    //import CardInventory from '../components/CardInventory';
    //import { Fab } from '@nstudio/nativescript-floatingactionbutton';
    //import { apiFactory } from "../api/apiFactory";
    //const inventoriesApi = apiFactory.get('inventories');

    export default {
        name: "Inventory",
        mixins: [ sideDrawer ],
        components: {
            //CardInventory,
            //Fab,
        },
        data () {
            return {
                loading: true,
                listOfItems:[]
            }
        },
        methods:{
            async fetchItems () {
                this.loading = true;
                try {
                    //const { data } = await inventoriesApi.get();
                    const { data } = await this.$http.get(`/v1/inventories`);
                    if(data)
                        this.listOfItems = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            onItemTap(item) {
                console.log(item);
                // this.$navigateTo(TypeList, {props: {service:service, location:this.location}})
            },
            add(item) {
                console.log(item);
                // this.$navigateTo(TypeList, {props: {service:service, location:this.location}})
            },
        },
        mounted() {
            console.log('Inventory mounted');
            this.fetchItems();
        },
    }
</script>

<style scoped>

</style>