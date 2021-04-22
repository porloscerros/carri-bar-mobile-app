<template>
    <Fab
            @tap="callback($event)"
            class="fas fab-button" :text="'fa-cocktail' | fonticon"
    ></Fab>
</template>

<script>
    export default {
        name: "FabBarMenuBtn",
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
        horizontal-align: left;
        vertical-align: bottom;
        font-size: 8;
    }
</style>