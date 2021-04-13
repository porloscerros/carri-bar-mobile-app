<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="La Bohemia Admin" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Recetas"  col="1"/>
            </GridLayout>
        </ActionBar>

        <GridLayout ~mainContent columns="*" rows="*">
            <Label class="message" :text="text" col="0" row="0"/>
        </GridLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';

    export default {
        name: "Recipes",
        mixins: [ sideDrawer ],
        data () {
            return {
                text: 'Hello Page Two!'
            }
        }
    }
</script>

<style scoped>

</style>