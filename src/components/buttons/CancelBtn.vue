<template>
    <Label @tap="callback($event)" class="fas text-danger" :text="'fa-times' | fonticon"/>
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

</style>