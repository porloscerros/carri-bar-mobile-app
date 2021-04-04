<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="La Bohemia App"  col="1"/>
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
        name: "Home",
        mixins: [ sideDrawer ],
        data () {
            return {
                text: 'Hello Home Page!'
            }
        },
    }
</script>

<style scoped>

</style>