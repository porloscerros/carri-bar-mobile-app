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
                selected: {}
            };
        },
        methods: {
            onPicked(event) {
                let picker = this.$refs.apiPicker.nativeView;
                this.selected = this.getOptionById(picker.selectedValue);
                this.emitChange()
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
                this.selected = this.getOptionById(value);
            },
            // selected: {
            //     handler(newValue) {
            //         console.log("selected watcher:" + newValue.id + " modified")
            //         console.log(newValue)
            //     },
            //     deep: true
            // }
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
    // Import the theme’s variables. If you’re using a color scheme
    // other than “light”, switch the path to the alternative scheme,
    // for example '~nativescript-theme-core/scss/dark'.
    @import "~@nativescript/theme/core";
    @import "~@nativescript/theme/default";

    // Custom colors
    $background-dark: #F8F8F8 !default;
    $background-light: #FFFFFF !default;

    $blue-dark: #022734 !default;
    $blue-light: #02556E !default;
    $blue-50: rgba($blue-dark, 0.5) !default;
    $blue-20: rgba($blue-dark, 0.2) !default;
    $blue-10: rgba($blue-dark, 0.1) !default;

    $accent-dark: #3A53FF !default;
    $accent-light: #4781FE !default;

    $success-dark: #06CE6A !default;
    $success-light: #00E676 !default;

    $warning-dark: #f39c11 !default;
    $warning-light: #F2C112 !default;

    $error-dark: #D84039 !default;
    $error-light: #ED473F !default;

    $midnight-dark: #0F336D !default;
    $midnight-light: #14418B !default;

    $night-dark: #023141 !default;
    $night-light: #01526C !default;

    // Sizes
    $base-font-size: 11;

    $border-width: 1;
    $border-radius: 3;


    /**
     * Theme variables overrides
    **/

    // Colors
    $background: #fff;
    $primary: lighten(#000, 13%);
    $secondary: lighten(#000, 46%);
    $disabled: lighten(#000, 62%);
    $accent: $accent-dark;
    $error: $error-light;

    // SideDrawer
    $item-color-android : #737373;
    $item-active-background: #F8F8F8;
    $item-active-color: $accent;
    $item-active-icon-color: $item-active-color;
    $item-color-ios: $blue-dark;
    $item-color-android: $blue-dark;

    $side-drawer-header-background: #fafafa;
    $side-drawer-header-brand: #737373;
    $side-drawer-background: #FFFFFF;

    // ActionBar
    // $ab-background: $accent;
    // $ab-color: $white;

    // Buttons
    $btn-color-inverse: $white;
    $btn-color: $accent;
    $btn-color-secondary: darken($btn-color, 10%);
    $btn-color-outline-highlighted: lighten($btn-color, 10%);

    //Text colors
    $headings-color: $blue-dark;
    $secondary: $blue-dark;
    $text-color: $blue-dark;

    .item-template-label {
        margin-left: 20;
    }
    .green-label {
        color: green;
    }
    .red-label {
        color: red;
    }
    PickerField.picker {
        margin: 10;
        height: 40;
        color: #fff;
        placeholder-color: #DDD;
        background: #404040;
    }
</style>