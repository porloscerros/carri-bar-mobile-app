<template>
    <GridLayout columns="*, auto" rows="*, *">
        <Label :text="label.toUpperCase()" col="0" colSpan="2" row="0"/>
        <Label :text="selected.name" @tap="onSelectorTap" col="0" row="1"/>
        <Label @tap="onSelectorTap" class="fas" col="1" row="1" text.decode="&#xf054;"/>
    </GridLayout>
</template>

<script>
    import * as constants from "~/shared/cars/constants";
    // import selectorModal from "./SelectorModal";

    export default {
        name: "Selector",
        model: {
            prop: "text",
            event: "select"
        },
        props: ["value", "options", "label", "text", ],
        data() {
            return {
                selected: {
                    id: null,
                    name: '',
                }
            }
        },
        methods: {
            onSelectorTap() {
                action("Your message", "Cancel button text", this.mapOptionsNames())
                    .then(result => {
                        console.log(result);
                        // this.emitChange(result)
                    });
            },
            getOptionById(id) {
                return this.options.find(item => {
                    return item.id === id;
                });
            },
            getOptionNameById() {

            },
            mapOptionsNames() {
                return this.options.map(item => {
                    return item.name;
                });
            },
            emitChange(e) {
                this.$emit('select', e);
            },
        },
        watch: {
            value(value) {
                this.selected = this.getOptionById(value);
            }
        },
        mounted() {
            console.log('Inventory Edit Selector mounted');
            let item = this.getOptionById(this.value);
            if (item)
                this.selected = item;
        },
    }
</script>
