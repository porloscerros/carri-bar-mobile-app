<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <nav-back col="0" @tap="onCancelButtonTap"></nav-back>
                <Label col="1" class="title" :text="'Venta #'+item.id"></Label>
                <save-btn v-if="!isUpdating" col="2" @tap="onDoneButtonTap"></save-btn>
            </GridLayout>
        </ActionBar>

        <GridLayout class="home-panel p-20">
            <SaleForm ref="form"></SaleForm>
            <ActivityIndicator :busy="isUpdating"></ActivityIndicator>
        </GridLayout>
    </Page>
</template>

<script>
    import SaveBtn from '~/components/buttons/SaveBtn'
    import NavBack from '~/components/buttons/NavBack'
    import SaleForm from '~/components/sales/Form'
    import {mapActions} from "vuex";

    export default {
        name: 'SaleEdit',
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
                setTimeout(() => {
                    this.$navigateTo(this.$routes.SaleList, {
                        animated: true,
                        transition: 'slideRight'
                    });
                }, 1);
            },
            onDoneButtonTap() {
                this.submitForm();
            },
            async submitForm () {
                this.isUpdating = true;
                let form = this.$refs.form.form;
                console.log('form', form)
                try {
                    let data = JSON.stringify(form);
                    let response = await this.$http.put(`/v1/sales/${form.id}`, data);
                    console.log('response', response)
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
            console.log(`${this.$options.name} Monted!`);
        },
        created() {
            console.log(`${this.$options.name} Created!`);
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
