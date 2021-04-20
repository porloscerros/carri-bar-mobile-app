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
    .fas {
        font-family: "FontAwesome", 'fa-solid-900';
        color: #01ff00;
    }
</style>