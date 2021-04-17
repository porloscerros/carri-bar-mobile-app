<template>
    <GridLayout columns="*, auto" rows="*, *">
        <Label :text="type.toUpperCase()" class="car-list-odd" col="0" colSpan="2" row="0"/>
        <Label :text="selected.name" @tap="onSelectorTap" class="car-list-even" col="0" row="1"/>
        <Label @tap="onSelectorTap" class="fas car-list-even" col="1" row="1" text.decode="&#xf054;"/>
    </GridLayout>
</template>

<script>
    import * as constants from "~/shared/cars/constants";
    import selectorModal from "./SelectorModal";

    export default {
        name: "Selector",
        model: {
            prop: "text",
            event: "select"
        },
        props: ["type", "label", "text", "items", "value"],
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
                this.$showModal(selectorModal, {
                    props: {
                        title: `Selecciona ${this.type[0].toUpperCase() + this.type.substr(1)}`,
                        items: this.items,
                        selected: this.selected
                    }
                }).then(selected => {
                    if (!selected) {
                        return;
                    }
                    this.selected = selected;
                    this.$emit("select", selected.id);
                });
            }
        },
        watch: {
            text(value) {
                this.selected = value;
            }
        },
        mounted() {
            console.log('Inventory Edit Selector mounted');
            this.selected.id = this.value;
            let item = this.items.find(item => {
                console.log('Inventory Edit Selector mounted');
                return item.id === this.value;
            });
            if (item)
                this.selected.name = item.name;
        },
    }
</script>
