<template>
    <FlexboxLayout justifyContent="space-between"
                   @touch="onTouch($event, item)"
                   separatorColor="#ff4081"
    >
        <Label :text="item.recipe.name" width="50%"></Label>
        <Label :text="item.quantity" width="20%" horizontalAlignment="center" textAlignment="center"></Label>

        <Label width="30%" textWrap="true" horizontalAlignment="right" textAlignment="right">
            <FormattedString>
                <Span text.decode="&dollar;"/>
                <span :text="item.quantity * item.price" fontWeight="Bold"/>
            </FormattedString>
        </Label>
    </FlexboxLayout>

</template>

<script>
    const dialogs = require('tns-core-modules/ui/dialogs');

    export default {
        name: "RecipeListItem",
        props: ['item'],
        data() {
            return {
                start: 0,
                end: 0,
            }
        },
        methods: {
            onItemTap(item) {
                this.$emit("tap", item);
                this.$navigateTo(this.$routes.SaleDetail, {
                    props: { item: item, },
                    animated: true,
                    transition: 'fade'
                })
            },
            onDoubleTap() {
                console.log("DoubleTap!");
            },
            onLongPress(item) {
                prompt({
                    title: 'Corregir Cantidad',
                    message: 'Ingresa la cantidad real del inventario:',
                    okButtonText: 'OK',
                    cancelButtonText: 'Cancelar',
                    inputType: dialogs.inputType.number
                })
                    .then(result => {
                        console.log(`Dialog result: ${result.result}, text: ${result.text}`)
                    });
            },
            onTouch(event, item) {
                if(event.action === "down") {
                    this.start = new Date().getTime();
                }
                if(event.action === "up") {
                    this.end = new Date().getTime();
                    const duration = parseInt(this.end) - parseInt(this.start);
                    if(duration > 200)
                        this.onLongPress(item);
                    else
                        this.onItemTap(item);
                }
            },
        }
    }
</script>

<style scoped>

</style>