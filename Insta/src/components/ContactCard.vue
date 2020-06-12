<template>
  <v-card class="ma-4" width="400px">
    <v-card-title>
      {{contact.name}}
    </v-card-title>
    <v-card-subtitle>
      {{contact.company}}
    </v-card-subtitle>
    <v-card-text>
      {{contact.email}}
      <v-btn v-if="!bookmarked"
        color="pink"
        dark
        absolute
        bottom
        right
        fab
        small
        @click="bookmarkContact"
      >
        <v-icon>mdi-bookmark-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['contact', 'bookmarked'],

  methods: {
    async bookmarkContact() {
      await this.$store.dispatch('serverRequest', {action: 'bookmark_contact', data: {contactId: this.contact.id, userId: this.$store.state.userId}})
      this.$store.commit('addBookmark', this.contact.id)
    }
  },
}
</script>

<style scoped>
  
</style>