<template>
    <ScrollView>
        <GridLayout rows="auto, *" width="100%">
            <StackLayout class="headerContent">
                <Label class="drawer-header" :text="user? user.name: 'desconocido'"/>
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="drawerMenuContent">
                    <Label class="drawer-item"
                            v-for="(page, i) in pages"
                            @tap="goToPage(page.component)"
                            :text="page.name"
                            :key="i"
                    />
                    <Button class="drawer-close-button" @tap="closeDrawer()">Close Drawer</Button>
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </ScrollView>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    import { mapGetters } from 'vuex';

    export default {
        name: "drawerContent",
        mixins: [sideDrawer],
        computed: {
            ...mapGetters({
                appName: 'appName',
                user: 'auth/user',
            })
        },
        data () {
            return {
                // define our pages, making sure the component matches that defined in /app/router/index.js
                pages: [
                    { name: 'Home', component: this.$routes.Home },
                    { name: 'Inventario', component: this.$routes.Inventory },
                    { name: 'Recetas', component: this.$routes.Recipes },
                    { name: 'Login', component: this.$routes.Login },
                ]
            }
        },
        methods: {
            goToPage (pageComponent) {
                this.$navigateTo(pageComponent)
                this.closeDrawer()
            }
        }
    }
</script>

<style scoped>
.title {
  text-align: left;
  padding-left: 16;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
.drawer-close-button {
  margin-top: 20;
  padding: 10 10 10 10;
  background-color: #53ba82;
  color: #ffffff;
}

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: #333333;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
}
</style>