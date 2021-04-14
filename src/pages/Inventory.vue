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

    export default {
        name: "Inventory",
        mixins: [ sideDrawer ],
        components: {
            //CardInventory,
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
    .fab-button {
        height: 70;
        margin: 15;
        background-color: #ff4081;
        horizontal-align: right;
        vertical-align: bottom;
    }
</style>