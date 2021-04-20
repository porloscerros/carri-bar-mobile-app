<template>
    <Page>
        <List :cars="items" />
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    import List from './List'

    export default {
        mixins: [ sideDrawer ],
        components: {
            List,
        },
        // computed: {
        //     ...mapGetters({
        //         appName: 'appName',
        //         user: 'auth/user',
        //         isAuthenticated: 'auth/authenticated',
        //     })
        // },
        // watch: {
        //     isAuthenticated(newValue, oldValue) {
        //         console.log('Drawer Content watcher');
        //         console.log('isAuthenticated =', newValue);
        //         if(!newValue) {
        //             this.$navigateTo(this.$routes.Login);
        //             this.closeDrawer()
        //         }
        //     }
        // },
        data() {
            return {
                cars: Object.values(db.cars),
                loading: true,
                items:[],
                searchQuery: '',
            }
        },
        methods: {
            async fetchItems () {
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/inventories`);
                    if(data)
                        this.items = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
        },
        mounted() {
            console.log('Inventory Index mounted');
            this.fetchItems();
        },
    }
</script>
