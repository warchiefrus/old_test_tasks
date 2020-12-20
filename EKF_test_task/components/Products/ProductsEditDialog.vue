<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">Редактирование</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-text-field
            v-model="itemName"
            hide-details
            outlined
            class="ma-2"
          ></v-text-field>

          <v-text-field
            v-model="itemCode"
            hide-details
            outlined
            class="ma-2"
          ></v-text-field>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-row
            class="mb-1 mt-1"
            justify="center"
            no-gutters
          >
            <v-btn color="secondary" class="mr-2 ml-2" @click="closeEditor">
              Закрыть
            </v-btn>
          </v-row>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: [ 'item', 'dialog' ],
  computed: {
    itemName: {
      get() {
        return this.item ? this.item.name : ''
      },
      set(value) {
        this.$store.commit('updateProduct', { field: 'name', item: this.item, value })
      }
    },
    itemCode: {
      get() {
        return this.item ? this.item.vendor_code : ''
      },
      set(value) {
        this.$store.commit('updateProduct', { field: 'vendor_code', item: this.item, value })
      }
    }
  },
  methods: {
    closeEditor() {
      this.$emit('closeEditor')
    }
  }
}
</script>

<style>

</style>