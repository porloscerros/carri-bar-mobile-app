<template>
    <GridLayout @touch="onTouch($event, item)" class="list-group-item" columns="auto, *" rows="70, 30">
        <Label :text="item.date | formatDate"
               col="0" row="0"
        ></Label>
        <Label :text="item.table"
               col="1"  row="0"
               horizontalAlignment="right"
               :class="{ 'red': !isPayed(item)  }"
        ></Label>
        <Label textWrap="true" col="1" row="1" horizontalAlignment="right" :class="{ 'red': !isPayed(item)  }">
            <FormattedString >
                <span text="$" />
                <span :text="item.total" fontWeight="Bold" />
            </FormattedString>
        </Label>
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
            isPayed(item) {
                return true;
            },
        }
    }
</script>

<style scoped>
</style>