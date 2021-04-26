<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <nav-back col="0" @tap="onCancelButtonTap"></nav-back>
                <Label col="1" class="title" text="Nueva Venta"/>
                <save-btn v-if="!isUpdating" col="2" @tap="onDoneButtonTap"></save-btn>
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
    import NavBack from '~/components/buttons/NavBack'
    import SaleForm from '~/components/sales/Form'
    import {mapActions} from "vuex";

    export default {
        name: "Create",
        components: {
            SaleForm,
            SaveBtn,
            NavBack,
        },
        data() {
            return {
                isUpdating: false,
            };
        },
        methods: {
            ...mapActions({
                setSaleInitialState: 'sales/setSaleInitialState'
            }),
            onCancelButtonTap() {
                this.navigateToList();
            },
            navigateToList() {
                this.setSaleInitialState();
                this.$navigateTo(this.$routes.SaleList, {
                    animated: true,
                    transition: 'slideRight'
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
                    this.navigateToList();
                } catch(error) {
                    console.log(error);
                    console.error(error.response.data);
                    // console.log(Object.keys(error.response))
                    // console.log(error.response.headers)
                    if(error.response.status === 422) {
                        console.log(error.response.data.message)
                        console.log(error.response.data.errors)
                        const printData = Object.values(error.response.data.errors)
                            .map(entry => entry.join(', '))
                            .join('. ');
                        alert({
                            title: error.response.data.message,
                            message: printData,
                            okButtonText: 'Ok'
                        });
                    }
                }
                this.isUpdating = false;
            },
        },
        mounted() {
            this.setSaleInitialState();
        }
    }
</script>

<style scoped>

</style>