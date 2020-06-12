<template>
  <v-card>
    <v-card-title>
      Контакты
    </v-card-title>
    
    <v-divider/>

    <v-card-text>
      <DisplayContacts
        :contacts="this.$store.state.contacts"
        :bookmarked="false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import DisplayContacts from '@/components/DisplayContacts.vue'
import {eventBus} from '@/main'

export default {
  components: {
    DisplayContacts
  },
  methods: {
    async getContacts() {
      eventBus.$emit('startLoading')
      await this.$store.dispatch('serverRequest', {action: 'get_contacts', data: ''})
      eventBus.$emit('endLoading')
    }
  },
  mounted() {
    this.getContacts()
  }
}
</script>


<style lang="scss" scoped>

</style>