<template>

    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <cancel-btn col="0" @tap="onCancelButtonTap"></cancel-btn>
                <Label col="1" class="title" text="Editar Inventario"/>
                <save-btn col="2" @tap="onDoneButtonTap"></save-btn>
            </GridLayout>
        </ActionBar>

        <GridLayout>
            <inventory-form ref="form"></inventory-form>
            <ActivityIndicator :busy="isUpdating"/>
        </GridLayout>

    </Page>
</template>

<script>
    import SaveBtn from '~/components/buttons/SaveBtn'
    import CancelBtn from '~/components/buttons/CancelBtn'
    import InventoryForm from './Form'
    export default {
        name: "Create",
        components: {
            InventoryForm,
            SaveBtn,
            CancelBtn,
        },
        data() {
            return {
                isUpdating: false,
            };
        },
        methods: {
            onCancelButtonTap() {
                this.$navigateTo(this.$routes.InventoryList);
            },
            onDoneButtonTap() {
                this.submitForm();
            },
            async submitForm () {
                let form = this.$refs.form.form;
                console.log('Create submitForm', form);
                this.isUpdating = true;
                try {
                    let data = JSON.stringify(form);
                    let response = await this.$http.post(`/v1/inventories`, data);
                    console.log('store.auth signIn response.data', response.data)
                } catch(error) {
                    console.log(error);
                    console.error(error.response.data);
                    console.log(Object.keys(error.response))
                    console.log(error.response.headers)
                    if(error.response.status === 422) {
                        console.log('Revisa los siguientes datos!')
                        console.log(error.response.data.errors)
                    }
                }
                this.isUpdating = false;
                this.$navigateTo(this.$routes.InventoryList);
            },
        },
    }
</script>

<style scoped>

</style>