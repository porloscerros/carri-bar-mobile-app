<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label :text="appName" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Inventario"  col="1"/>
            </GridLayout>
        </ActionBar>

        <GridLayout ~mainContent columns="*" rows="*">
            <ListView for="item in listOfItems" @itemTap="onItemTap" :visibility="loading?'hidden':'visible'" >
                <v-template>
                    <Label :text="item.name" />
                </v-template>
            </ListView>
            <ActivityIndicator :busy="loading" row="1" col="1"/>
        </GridLayout>

    </Page>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import sideDrawer from '~/mixins/sideDrawer';
    import { apiFactory } from "../api/apiFactory";
    const inventoriesApi = apiFactory.get('inventories');

    export default {
        name: "Inventory",
        mixins: [ sideDrawer ],
        computed: {
            ...mapGetters({
                appName: 'appName',
                user: 'auth/user',
            })
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
                    const { data } = await inventoriesApi.get();
                    this.listOfItems = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            onItemTap(e) {
                let item = e.item;
                console.log(item)
                // this.$navigateTo(TypeList, {props: {service:service, location:this.location}})
            }
        },
        mounted() {
            console.log('Inventory mounted');
            this.fetchItems();
        },
    }
</script>

<style scoped>

</style>