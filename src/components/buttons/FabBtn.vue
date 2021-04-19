<template>
    <Fab
            @tap="callback($event)"
            rippleColor="#f1f1f1"
            class="fas fab-button" :text="'fa-plus' | fonticon"
    ></Fab>
</template>

<script>
    export default {
        name: "FabBtn",
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
    .fab-button {
        height: 55;
        width: 55; /* this is required on iOS - Android does not require width so you might need to adjust styles */
        margin: 15;
        background-color: #ff4081;
        horizontal-align: right;
        vertical-align: bottom;
        font-size: 8;
    }
</style>