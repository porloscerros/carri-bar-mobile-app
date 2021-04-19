<template>
    <GridLayout rows="60, 50">
        <PickerField :selectedValue="selected.id" :text="selected.name" hint="Elije"
                     ref="apiPicker"
                     row="0"
                     padding="10"
                     for="item in pickerObjects"
                     textField="name"
                     valueField="id"
                     pickerTitle="Selecciona:"
                     @textChange="onPicked"
        >
            <v-template>
                <GridLayout rows="auto, auto">
                    <Label :text="item.name" row="0" class="item-template-label"></Label>
                </GridLayout>
            </v-template>
        </PickerField>
    </GridLayout>
</template>

<script>
    export default {
        name: "SelectPicker",
        props: ['options', 'value', 'label'],
        data() {
            return {
                pickerObjects: [],
                pickerTitle: "Selecciona",
                title: "Value APIs",
                selected: {
                    id: null,
                    name: ''
                }
            };
        },
        methods: {
            onPicked(event) {
                if (!this.$refs.apiPicker)  return;
                let picker = this.$refs.apiPicker.nativeView;
                let item = this.getOptionById(picker.selectedValue);
                if (item) {
                    this.selected = item;
                }
            },
            getOptionById(id) {
                return this.options.find(item => {
                    return item.id === id;
                });
            },
            emitChange(e) {
                this.$emit('select', this.selected.id);
            },
        },
        watch: {
            value(value) {
                console.log('watch  value', value)
                this.selected = this.getOptionById(value);
            },
            selected: {
                handler(newValue) {
                    console.log('watch  selected', newValue);
                    this.emitChange();
                },
                deep: true
            }
        },
        mounted() {
            console.log('SelectPicker mounted');
            this.pickerObjects = this.options;
            let item = this.getOptionById(this.value);
            if (item)
                this.selected = item;
        },
    };
</script>

<style lang="scss">

</style>