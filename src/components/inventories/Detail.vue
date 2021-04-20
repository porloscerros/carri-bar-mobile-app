<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <nav-back col="0" @tap="$navigateBack()"></nav-back>
                <Label col="1" class="title" :text="itemData.name"/>
                <edit-btn col="2" @tap="onEditButtonTap"></edit-btn>
            </GridLayout>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <GridLayout columns="auto,auto" rows="*, *, *, *, *, *">
                    <Label class="p-l-15 p-b-10 m-r-20" text="Costo"/>
                    <Label class="p-b-10" col="1">
                        <FormattedString>
                            <Span text.decode="&dollar;"/>
                            <Span :text="itemData.cost"/>
                        </FormattedString>
                    </Label>

                    <Label class="p-l-15 p-b-10 m-r-20" row="1" text="Cantidad"/>
                    <Label :text="itemData.quantity+' '+itemData.measurement_unit.name" class="p-b-10" col="1" row="1"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="3" text="Cantidad Recomendada"/>
                    <Label :text="itemData.recommended_quantity+' '+itemData.measurement_unit.name" class="p-b-10" col="1" row="3"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="4" text="Cantidad Mínima"/>
                    <Label :text="itemData.minimum_quantity+' '+itemData.measurement_unit.name" class="p-b-10" col="1" row="4"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import NavBack from '~/components/buttons/NavBack';
    import EditBtn from '~/components/buttons/EditBtn';
    export default {
        props: ["item"],
        components: {
            NavBack,
            EditBtn
        },
        computed: {
            itemData() {
                return this.item || {};
            }
        },
        methods: {
            onEditButtonTap() {
                this.$navigateTo(this.$routes.InventoryEdit, {
                    transition: "slideTop",
                    backstackVisible: false,
                    props: {item: this.itemData}
                });
            }
        }
    };
</script>

<style lang="scss">

</style>