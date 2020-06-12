<template>
  <v-card flat class="d-inline-flex flex-wrap">
    <ContactCard v-for="contact in contacts" :key="contact.id"
      :contact="contact"
      :bookmarked="bookmarked"
    />
  </v-card>
</template>

<script>
import ContactCard from '@/components/ContactCard.vue'

export default {
  props: ['contacts', 'bookmarked'],

  components: {
    ContactCard
  },
}
</script>

<style>

</style>