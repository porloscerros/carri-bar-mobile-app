<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label :text="appName" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Home"  col="1"/>
            </GridLayout>
        </ActionBar>

        <GridLayout ~mainContent columns="*" rows="*">
            <Label class="message" :text="text" col="0" row="0"/>
        </GridLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    import { mapGetters } from 'vuex';

    export default {
        name: "Home",
        mixins: [ sideDrawer ],
        computed: {
            ...mapGetters({
                appName: 'appName',
                user: 'auth/user',
            })
        },
        data () {
            return {
                text: 'Hello Home Page!',
            }
        },
        mounted() {
            
        }
    }
</script>

<style scoped>

</style>