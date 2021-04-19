<template>
    <Label @tap="callback($event)" class="fas button" :text="'fa-bars' | fonticon"/>
</template>

<script>
    export default {
        name: "OpenDrawerBtn",
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
            callback: function (e) {
                this.$emit('tap', e);

            },
        },
    }
</script>

<style scoped>
    .button {
        background-color: #ff4081;
    }
</style>