<template>
  <v-card>
    <v-card-title>
      Избранные контакты
    </v-card-title>
    
    <v-divider/>

    <v-card-text>
      <DisplayContacts
        :contacts="bookmarkedContacts"
        :bookmarked="true"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import DisplayContacts from '@/components/DisplayContacts.vue'

export default {
  components: {
    DisplayContacts
  },

  computed: {
    bookmarkedContacts() {
      let contacts = this.$store.state.contacts
      let bookmarks = this.$store.state.userBookmarks
      return contacts.filter(item => {
        return bookmarks.indexOf(item.id) === -1? false:true
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>