<template>
    <Label @tap="callback($event)" class="fa" :text="'fa-arrow-left' | fonticon" />
</template>

<script>
    export default {
        name: "NavBack",
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

</style>