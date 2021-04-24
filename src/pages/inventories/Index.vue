<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden"/>
            <GridLayout columns="50, *">
                <Label class="action-bar-title" text="Featured" colSpan="2"/>

                <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
            </GridLayout>
        </ActionBar>

        <InventoryList></InventoryList>

    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import { SelectedPageService } from "~/shared/selected-page-service";
    import InventoryList from '~/components/inventories/List'

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Featured");
        },
        components: {
            InventoryList,
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
