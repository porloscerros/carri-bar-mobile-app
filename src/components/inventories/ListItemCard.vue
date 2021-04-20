<template>
    <GridLayout class="list-group-item" columns="auto, *, auto" rows="70, 30">
        <Label :text="item.name"
               @touch="onTouch($event, item)"
               col="0" row="0"
        ></Label>
        <Label :text="item.quantity"
               @touch="onTouch($event, item)"
               col="1"  row="0"
               horizontalAlignment="right"
               :class="{ 'yellow': isUnderRecommended(item), 'red': isUnderMinimum(item)  }"
        ></Label>
        <Label :text="item.measurement_unit.name"
               @touch="onTouch($event, item)"
               col="2"  row="0"
               horizontalAlignment="left"
               :class="{ 'yellow': isUnderRecommended(item), 'red': isUnderMinimum(item)  }"
        ></Label>
    </GridLayout>
</template>

<script>
    const dialogs = require('tns-core-modules/ui/dialogs');

    export default {
        name: "ListItemCard",
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
                this.$navigateTo(this.$routes.InventoryDetail, {
                    props: { item: item, }
                })
            },
            onDoubleTap() {
                console.log("DoubleTap!");
            },
            onLongPress(item) {
                console.log("longPress!");
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
                console.log('Event Name:', event.eventName);
                if(event.action === "down") {
                    this.start = new Date().getTime();
                    console.log('this.start:', this.start)
                }
                if(event.action === "up") {
                    this.end = new Date().getTime();
                    console.log('this.end:', this.end);
                    const duration = parseInt(this.end) - parseInt(this.start);
                    console.log('duration:', duration)
                    console.log('Custom Event', duration > 200? "longpress": "tap")
                    if(duration > 200)
                        this.onLongPress(item);
                    else
                        this.onItemTap(item);
                }

            },
            isUnderMinimum(item) {
                return item.quantity <= item.minimum_quantity;
            },
            isUnderRecommended(item) {
                return item.quantity < item.recommended_quantity && item.quantity > item.minimum_quantity;
            },
        }
    }
</script>

<style scoped>
</style>