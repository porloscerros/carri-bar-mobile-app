<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden"/>
            <GridLayout columns="50, *">
                <Label class="action-bar-title" text="Ventas" colSpan="2"/>

                <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
            </GridLayout>
        </ActionBar>

        <SaleList></SaleList>

    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import { SelectedPageService } from "../../shared/selected-page-service";
    import SaleList from '../../components/sales/List'

    export default {
        name: 'SaleIndex',
        components: {
            SaleList,
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        },
        mounted() {
            console.log(`${this.$options.name} Monted!`);
            SelectedPageService.getInstance().updateSelectedPage("Sale");
        },
    };
</script>

<style scoped lang="scss">

</style>
