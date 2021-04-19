<template>
    <Label @tap="callback($event)" class="fas text-success" :text="'fa-check' | fonticon" />
</template>

<script>
    export default {
        name: "SaveBtn",
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
        border: 1px solid blue;
    }
</style>