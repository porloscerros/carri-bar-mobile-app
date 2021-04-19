<template>
    <Label @tap="callback($event)" class="fa text-primary" :text="'fa-edit' | fonticon" />
</template>

<script>
    export default {
        name: "EditBtn",
        props: {
            url: String,
            disabled: {
                type: Boolean,
                default: false
            },
            hidden: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            callback: function(e) {
                this.$emit('tap', e);
            }
        }
    }
</script>

<style scoped>
    fa {
        border: 1px solid dodgerblue !important;
    }
</style>