<template>
    <Label @tap="callback($event)" class="fas" :text="'fa-times' | fonticon"/>
</template>

<script>
    export default {
        name: "CancelBtn",
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
        color: #ff0007;
    }
</style>