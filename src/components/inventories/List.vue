<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Inventario"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadListView ~mainContent @itemTap="onItemTap" class="items-list" for="item in items" v-if="!isLoading">
            <ListViewLinearLayout scrollDirection="Vertical" v-tkListViewLayout/>
            <v-template>
                <StackLayout class="items-list__item">
                    <GridLayout class="items-list__item-content" columns="*, *" rows="*, *" height="120">

                        <Label :text="item.name" class="items-list__item-name font-weight-bold"/>

                        <Label class="m-r-5" col="1" horizontalAlignment="right">
                            <FormattedString ios.fontFamily="system">
                                <Span text="Cantidad: "/>
                                <Span :text="item.quantity"/>
                            </FormattedString>
                        </Label>
                        <Label class="m-r-5" row="2" col="1" horizontalAlignment="right">
                            <FormattedString ios.fontFamily="system">
                                <Span text="Costo: "/>
                                <Span text.decode="&dollar;"/>
                                <Span :text="item.cost"/>
                            </FormattedString>
                        </Label>

                    </GridLayout>
                </StackLayout>
            </v-template>
        </RadListView>
        <ActivityIndicator :busy="isLoading" v-else/>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer';
    import Details from "./Details";

    export default {
        mixins: [ sideDrawer ],
        computed: {
            isLoading() {
                return !this.items.length;
            }
        },
        data() {
            return {
                loading: true,
                items: [],
                searchQuery: '',
            }
        },
        methods: {
            async fetchItems () {
                this.loading = true;
                try {
                    const { data } = await this.$http.get(`/v1/inventories`);
                    if(data)
                        this.items = data;
                } catch(error) {
                    console.log(error);
                }
                this.loading = false;
            },
            onItemTap(args) {
                this.$emit("select", args.item);
                this.$navigateTo(Details, {props: {item: args.item}});
            }
        },
        mounted() {
            console.log('Inventory List mounted');
            this.fetchItems();
        },
    };
</script>

<style lang="scss" scoped>
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .items-list {
        &__item {
            padding: 0 0 8 0;
            @include colorize($background-color: background-alt-10);

            &-content {
                padding: 8 15 4 15;
                @include colorize($background-color: background);
            }

            &-name,
            &-icon {
                @include colorize($contrasted-color: complementary background 30% 0%);
            }
        }
    }
</style>
