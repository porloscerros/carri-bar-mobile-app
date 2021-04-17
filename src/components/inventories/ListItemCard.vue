<template>
    <GridLayout columns="*, *, *">
        <Button :text="`${item.name}`" col="0"
                @touch="onTouch"
        ></Button>
        <Button :text="`${item.quantity}`" col="1"
                @tap="onItemTap(item)"
                @doubleTap="onDoubleTap(item)"
                @longPress="onLongPress"
        ></Button>
        <Button :text="`${item.measurement_unit.name}`" col="2"
                @tap="onItemTap(item)"
                @doubleTap="onDoubleTap(item)"
        ></Button>
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
                // this.$navigateTo(this.$routes.InventoryDetail, {props: {item: item.item}});
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
        }
    }
</script>

<style scoped>

</style>