<template>
  <v-card class="ma-4 pb-4" width="400px">
    <v-card-title>
      {{contact.name}}
    </v-card-title>
    <v-card-subtitle>
      {{contact.company}}
    </v-card-subtitle>
    <v-card-text>
      {{contact.email}}
      <v-btn
        color="secondary"
        absolute
        bottom
        left
        fab
        x-small
        @click="editContact"
      >
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>

      <v-btn
        color="error"
        absolute
        bottom
        right
        fab
        x-small
        @click="deleteContact"
      >
        <v-icon>mdi-account-minus</v-icon>
      </v-btn>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['contact'],

  methods: {
    deleteContact() {
      this.$emit('deleteContact', this.contact)
    },
    editContact() {
      this.$emit('editContact', this.contact)
    }
  },
}
</script>

<style scoped>
  
</style>