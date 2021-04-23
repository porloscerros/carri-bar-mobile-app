<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <nav-back col="0" @tap="onCancelButtonTap"></nav-back>
                <Label col="1" class="title" text="Editar Venta"/>
                <save-btn v-if="!isUpdating" col="2" @tap="onDoneButtonTap"></save-btn>
            </GridLayout>
        </ActionBar>

        <GridLayout ~mainContent class="home-panel p-20">
            <SaleForm v-if="isMounted" ref="form"></SaleForm>
            <ActivityIndicator :busy="isUpdating"/>
        </GridLayout>
    </Page>
</template>

<script>
    import SaveBtn from '~/components/buttons/SaveBtn'
    import NavBack from '~/components/buttons/NavBack'
    import SaleForm from './Form'
    import {mapActions} from "vuex";

    export default {
        components: {
            SaleForm,
            SaveBtn,
            NavBack,
        },
        props: ["item"],
        data() {
            return {
                isUpdating: false,
                isMounted: false,
            };
        },
        methods: {
            ...mapActions({
                setSale: 'sales/setSale',
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
                this.isUpdating = true;
                let form = this.$refs.form.form;
                try {
                    let data = JSON.stringify(form);
                    let response = await this.$http.put(`/v1/sales/${form.id}`, data);
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
            console.log('Inventory Edit mounted');
            this.setSale(this.item).then(() => {
                this.isMounted = true;
            })
        },
    };
</script>

<style lang="scss">
    .item-list {
        TextField {
            text-align: center;
            font-size: 16;
        }
    }
    .fa-check {
        color: green !important;
    }

    fa-times {
        border: 1px solid red;
    }
</style>
