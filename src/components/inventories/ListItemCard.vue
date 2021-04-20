<template>
    <GridLayout class="list-group-item" columns="auto, *, auto" rows="70"
                :class="{
                    'red': item.quantity <= item.minimum_quantity,
                    'yellow': item.quantity < item.recommended_quantity
                }">
        <Label :text="item.name"
               @tap="onItemTap(item)"
               col="0" row="0"
        ></Label>
        <Label :text="item.quantity" @touch="onTouch" col="1" horizontalAlignment="right"></Label>
        <Label :text="item.measurement_unit.name" @tap="onItemTap(item)" col="2" horizontalAlignment="left"></Label>
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
    .red {
        color: #ff4081;
    }
    .blue {
        color: #4758ff;
    }
    .yellow {
        color: #feff35;
    }
    .green {
        color: #4eff31;
    }
</style>