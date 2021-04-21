<template>

    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <cancel-btn col="0" @tap="onCancelButtonTap"></cancel-btn>
                <Label col="1" class="title" text="Nueva Venta"/>
                <save-btn col="2" @tap="onDoneButtonTap"></save-btn>
            </GridLayout>
        </ActionBar>

        <GridLayout ~mainContent class="home-panel p-20">
            <SaleForm ref="form"></SaleForm>
            <ActivityIndicator :busy="isUpdating"/>
        </GridLayout>

    </Page>
</template>

<script>
    import SaveBtn from '~/components/buttons/SaveBtn'
    import CancelBtn from '~/components/buttons/CancelBtn'
    import SaleForm from './Form'
    export default {
        name: "Create",
        components: {
            SaleForm,
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
                this.navigateToList();
            },
            navigateToList() {
                this.$navigateTo(this.$routes.SaleList, {
                    animated: true,
                    transition: 'fade'
                });
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
                    let response = await this.$http.post(`/v1/sales`, data);
                    console.log('store.auth signIn response.data', response.data)
                    this.navigateToList();
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
            },
        },
    }
</script>

<style scoped>

</style>