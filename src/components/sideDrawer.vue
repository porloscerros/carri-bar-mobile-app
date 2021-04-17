<template lang="html">
    <RadSideDrawer ref="drawer" drawerLocation="Left" class="main-content" :gesturesEnabled="gesturesEnabled">
        <StackLayout ~drawerContent backgroundColor="#ffffff">
            <slot name="drawerContent"></slot>
        </StackLayout>
        <Frame ~mainContent>
            <slot name="mainContent"></slot>
        </Frame>
    </RadSideDrawer>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';

    export default {
        name: "sideDrawer",
        mixins: [sideDrawer],
    }
</script>

<style scoped>
    .main-content {
        font-size: 18;
        font-family: "Roboto", "Roboto-Regular";
    }
</style>