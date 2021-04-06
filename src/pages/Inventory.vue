<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Inventario"  col="1"/>
            </GridLayout>
        </ActionBar>

        <GridLayout ~mainContent columns="*" rows="*">
            <Label class="message" :text="text" col="0" row="0"/>
            <ListView for="item in listOfItems" @itemTap="onItemTap" :visibility="loading?'hidden':'visible'" >
                <v-template>
                    <!-- Shows the list item label in the default color and style. -->
                    <Label :text="item.name" />
                </v-template>
            </ListView>
            <ActivityIndicator :busy="loading" row="1" col="1"/>
        </GridLayout>

    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';

    export default {
        name: "Inventory",
        mixins: [ sideDrawer ],
        data () {
            return {
                text: 'Hello Page One!',
                loading: true,
                listOfItems:[
                    {"id":"accounting","name":"Accounting"},
                    {"id":"airport","name":"Airport"},
                    {"id":"veterinary_care","name":"Veterinary Care"},
                    {"id":"zoo","name":"Zoo"}
                ]
            }
        },
        methods:{
            onItemTap(e) {
                let item = e.item;
                console.log(item)
                // this.$navigateTo(TypeList, {props: {service:service, location:this.location}})
            }
        },
        created() {
            setTimeout(() => {console.log("This appears after 3 seconds")}, 3000);
            setTimeout(() => {
                this.loading = false
            }, 2000);
        }
    }
</script>

<style scoped>

</style>