<template>
    <Page>
        <ActionBar>
            <!-- HACK - we should remove the navigation button -->
            <NavigationButton visibility="collapsed"/>
            <Label horizontalAlignment="center" :text="`Editar ${form.name}`"/>
            <ActionItem @tap="onCancelButtonTap" ios.position="left">
                <Label text="Cancelar" verticalAlignment="center"/>
            </ActionItem>
            <ActionItem ios.position="right">
                <Label :isEnabled="isModelValid" :isUserInteractionEnabled="isModelValid" @tap="onDoneButtonTap"
                       text="Done"
                       verticalAlignment="center"/>
            </ActionItem>
        </ActionBar>

        <GridLayout>
            <ScrollView>
                <StackLayout class="item-list">
                    <Label class="item-list-odd" text="Nombre"/>
                    <TextField v-model="form.name" :class="{ 'item-list-even': true, 'placeholder-error': !form.name }" :text="form.name"
                               hint="El nombre es requerido" height="50"/>

                    <Label class="item-list-odd" text="Costo"/>
                    <TextField v-model="form.cost" :text="form.cost" keyboardType="number" height="50" />

                    <Label class="item-list-odd" text="Cantidad Actual"/>
                    <TextField v-model="form.quantity" :text="form.quantity" keyboardType="number" height="50" />


                    <Selector v-if="measurement_units.length"
                              type="Unidad de Medida"
                              :items="measurement_units"
                              :value="form.measurement_unit_id"
                              @select="onMUSelected"
                    />

                </StackLayout>
            </ScrollView>

            <ActivityIndicator :busy="isUpdating"/>
        </GridLayout>
    </Page>
</template>

<script>
    import { alert } from "@nativescript/core";
    import List from "./List";
    import Selector from "./Selector";

    export default {
        components: {
            Selector
        },
        props: ["item"],
        data() {
            return {
                isUpdating: false,
                form: {
                    id: this.item.id,
                    name: this.item.name,
                    cost: this.item.cost,
                    quantity: this.item.quantity,
                    measurement_unit_id: this.item.measurement_unit? this.item.measurement_unit.id: null,
                    recommended_quantity: this.item.quantity,
                    minimum_quantity: this.item.quantity,
                },
                measurement_units: [],
            };
        },
        computed: {
            isModelValid() {
                return !!this.form.name && !!this.form.quantity;
            },
            // form() {
            //     return this.item || {};
            // }
        },
        methods: {
            onCancelButtonTap() {
                this.$navigateBack();
            },
            onDoneButtonTap() {
                console.log(this.form)
                /* ***********************************************************
                * By design this app is set up to work with read-only sample data.
                * Follow the steps in the "Firebase database setup" section in app/readme.md file
                * and uncomment the code block below to make it editable.
                *************************************************************/

                this.submitForm();
                return;
                let queue = Promise.resolve();
                this.isUpdating = true;

                queue.then(() => itemService.update(this.form))
                    .then(() => {
                        this.isUpdating = false;

                    this.$navigateTo(List, {
                        animated: true,
                        clearHistory: true,
                        transition: {
                            name: "slideBottom",
                            duration: 200,
                            curve: "ease"
                        }
                    });
                    })
                    .catch((errorMessage) => {
                        this.isUpdating = false;

                        alert({ title: "Oops!", message: errorMessage, okButtonText: "Ok" });
                    });

                /* ***********************************************************
                * Comment out the code block below if you made the app editable.
                *************************************************************/
                // alert({
                //     title: "Read-Only Template!",
                //     message: `Check out the "Firebase database setup" section in the readme file to make it editable.`,
                //     okButtonText: "Ok"
                // }).then(() => {
                //     this.$navigateTo(List, {
                //         animated: true,
                //         clearHistory: true,
                //         transition: {
                //             name: "slideBottom",
                //             duration: 200,
                //             curve: "ease"
                //         }
                //     });
                // });
            },
            async submitForm () {
                this.loading = true;
                try {
                    let data = JSON.stringify(this.form);
                    let response = await this.$http.put(`/v1/inventories/${this.form.id}`, data);
                    // let response = await axios.post(url, credentials);
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
                this.loading = false;
            },
            async fetchMU () {
                console.log('Inventory Edit fetchMU');
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/measurement-units`);
                    if(data)
                        this.measurement_units = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            onMUSelected(value) {
                this.form.measurement_unit_id = value;
            }
        },
        mounted() {
            console.log('Inventory Edit mounted');
            this.fetchMU();
        },
    };
</script>

<style lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .item-list {

        &-even,
        &-odd {
            padding: 10 15;
            margin: 0;
            border-bottom-width: const(border-width);
            @include colorize($border-color: background-alt-20);
        }

        &-odd {
            @include colorize(
                    $background-color: background-alt-10,
                    $color: secondary
            );
        }

        &__value {
            width: 65;
            text-align: right;
            @include colorize($contrasted-color: complementary background 30% 10%);
        }

        TextField.placeholder-error {
            @include colorize($placeholder-color: error);
        }

        Slider {
            @include colorize(
                    $contrasted-background-color: complementary background 20% 0%,
                    $contrasted-color: complementary background 20% 0%
            );
        }
    }

    .thumb {

        background-size: cover;
        background-repeat: no-repeat;
        font-size: 25;
        font-weight: bold;

        &__add {
            background-color: transparent;
            border-radius: const(border-radius-sm);
            border-width: const(border-width);
            @include colorize(
                    $border-color: background-alt-20,
                    $color: background-alt-20
            );
        }

        &__remove {
            background-color: rgba(grey, 0.5);
            @include colorize($color: background);
        }
    }
</style>
