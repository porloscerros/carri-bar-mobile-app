<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="itemData.name" horizontalAlignment="center"/>
            <ActionItem @tap="onEditButtonTap" android.position="right" ios.position="right">
                <Label text="Edit" verticalAlignment="center"/>
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <GridLayout columns="auto,auto" row="2" rows="*, *, *, *, *, *">
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
    export default {
        props: ["item"],

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
