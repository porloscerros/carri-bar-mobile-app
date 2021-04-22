<template>
    <Page>
        <ActionBar :title="title"/>
        <StackLayout>
            <Button @tap="$modal.close" text="Cancelar" />
            <RecipeList :items="items" @tap="onItemTap" />
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "MiniCrud",
        data() {
            return {
                title: 'Carta Comidas',
            };
        },
    }
</script>

<style scoped>

</style>