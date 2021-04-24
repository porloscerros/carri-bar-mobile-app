<template>
    <FlexboxLayout justifyContent="space-between"
                   @tap="onTap(item)"
                   separatorColor="#ff4081"
    >

        <Label :text="item.recipe.name" width="50%"></Label>

        <Label :text="item.quantity" width="20%" horizontalAlignment="center" textAlignment="center"></Label>

        <Label width="30%" textWrap="true" horizontalAlignment="right" textAlignment="right">
            <FormattedString>
                <Span text.decode="&dollar;"/>
                <span :text="calculateSubtotal(item)" fontWeight="Bold"/>
            </FormattedString>
        </Label>

    </FlexboxLayout>

</template>

<script>
    export default {
        name: "SaleRecipesListItem",
        props: ['item'],
        data() {
            return {
                start: 0,
                end: 0,
            }
        },
        methods: {
            calculateSubtotal(item) {
                return Number(item.quantity) * Number(item.price);
            },
            onTap(item) {
                console.log("Tap!");
                this.$emit("tap", item);
            },
            onDoubleTap() {
                console.log("DoubleTap!");
            },
            onLongPress(item) {
                console.log("LongPress!");
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
                        this.onTap(item);
                }
            },
        },
        mounted() {
            console.log(`${this.$options.name} Monted!`);
        },
    }
</script>

<style scoped>

</style>