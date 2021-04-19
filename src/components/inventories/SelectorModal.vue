<template>
    <grid-layout ~mainContent rows="auto, *">
        <list-view row="1"  for="item in items">
            <v-template>
                <Card :item="item"></Card>
            </v-template>
        </list-view>
        <fab-btn
                @tap="onCreate"
                row="1"
        ></fab-btn>
    </grid-layout>
    <GridLayout android:class="modal-input -android"
                ios:class="modal-input -ios"
                rows="auto, *, auto"
                verticalAlignment="top">
        <Label :text="title" class="h3 modal-input__header"/>
        <RadListView :items="source" @itemTap="itemSelected" class="modal-input__list" row="1"
                     selectionBehavior="Press">
            <v-template>
                <GridLayout>
                    <GridLayout android:visibility="collapsed" class="modal-input__list-item" columns="*,auto">
                        <Label :text="item.value.name"></Label>

                        <Label class="fas modal-input__list-check" col="1"
                               text.decode="&#xf00c;"
                               v-show="item.value === selectedValue"/>
                    </GridLayout>

                    <GridLayout class="modal-input__list-item" columns="auto,*" ios:visibility="collapsed">
                        <Label class="far modal-input__list-icon"
                               text.decode="&#xf111;" v-show="item.value !== selectedValue"
                               verticalAlignment="center"/>

                        <Label class="far modal-input__list-icon selected"
                               text.decode="&#xf192;" v-show="item.value === selectedValue"
                               verticalAlignment="center"/>

                        <Label :text="item.value.name" col="1"/>
                    </GridLayout>
                </GridLayout>
            </v-template>
        </RadListView>

        <Button @tap="$modal.close()"
                class="-outline"
                horizontalAlignment="right"
                ios:visibility="collapsed"
                row="3"
                text="CANCELAR"/>
    </GridLayout>
</template>

<script>
  export default {
    name: "SelectorModal",

    props: ["title", "items", "selected"],

    data() {
      return {
        source: this.items.map((value, index) => ({index, value})),
        selectedValue: this.selected
      };
    },

    methods: {
      itemSelected(e) {
        this.selectedValue = e.item.value;
        this.$modal.close(this.selectedValue);
      }
    }
  }
</script>

<style lang="scss">

</style>
