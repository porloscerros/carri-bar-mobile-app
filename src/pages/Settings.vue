<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden"/>
            <GridLayout columns="50, *">
                <Label class="action-bar-title" text="Settings" colSpan="2"/>

                <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
            </GridLayout>
        </ActionBar>

        <ScrollView>
            <StackLayout class="page__content p-20">
                <GridLayout columns="auto, *">
                    <Label col="0" text="Modo Oscuro"></Label>
                    <Switch col="1" v-model="themeMode"></Switch>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import { SelectedPageService } from "../shared/selected-page-service";import Theme from "@nativescript/theme";

    export default {
        name: 'Settings',
        watch: {
            themeMode (val) {
                Theme.toggleMode();
            }
        },
        data() {
            return {
                themeMode: false,
            };
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
        },
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Settings");
        },
    };
</script>

<style scoped lang="scss">

</style>
