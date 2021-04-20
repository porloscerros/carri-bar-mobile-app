<template>
    <GridLayout class="list-group-item" columns="auto, *, auto" rows="70, 30"
                :class="{ 'yellow': isUnderRecommended(item), 'red': isUnderMinimum(item)  }"
    >
        <Label :text="item.name"
               @tap="onItemTap(item)"
               col="0" row="0"
        ></Label>
        <Label :text="item.quantity"
               @touch="onTouch"
               col="1"  row="0"
               horizontalAlignment="right"
        ></Label>
        <Label :text="item.measurement_unit.name"
               @tap="onItemTap(item)"
               col="2"  row="0"
               horizontalAlignment="left"
        ></Label>
    </GridLayout>

</template>

<script>
    export default {
        name: "ListItemCard",
        props: ['item'],
        methods: {
            onItemTap(item) {
                console.log('card item tap')
                console.log(item)
                this.$emit("tap", item);
                this.$navigateTo(this.$routes.InventoryDetail, {
                    props: {
                        item: item,
                        startpoint: "startpoint Y",
                        endpoint: "point x"
                    }
                })
            },
            onDoubleTap() {
                console.log("DoubleTap!");
            },
            onLongPress() {
                console.log("longPress!");
            },
            onTouch(event) {
                console.log("onTouch!");
                console.log('Name:', event.eventName)
                console.log('Touch: x: ' + event.getX() + ' y: ' + event.getY());

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