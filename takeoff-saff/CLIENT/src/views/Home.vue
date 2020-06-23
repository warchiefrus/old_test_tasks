<template>
  <v-card>
    <v-app-bar
      app
      color="blue-grey lighten-4"
      class="mx-0"
      height="48px"
    >
      <div>
        Контакты
      </div>

      <v-tooltip  bottom open-delay="500">
        <template v-slot:activator="{on}">
          <v-btn 
            v-on="on"
            text
            class="ml-5"
            color="primary"
            @click="addContact"
          >
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
        </template>
        <span>Добавить</span>
      </v-tooltip>

      <div class="search">
        <v-text-field
          class="ma-0"
          hide-details
          spellcheck="false" 
          label="" 
          v-model="searchValue"
          rounded
					filled
					outlined
          clearable
          dense
          prepend-inner-icon="mdi-magnify"
        >
        </v-text-field>
      </div>

      <v-spacer/>

      <v-tooltip  bottom open-delay="500">
        <template v-slot:activator="{on}">
          <v-btn 
            v-on="on"
            text
            rounded 
            @click="userLogout"
            color="error"
          >
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>	
        </template>
        <span>Выйти</span>
      </v-tooltip>

    </v-app-bar>

    <v-card flat class="d-inline-flex flex-wrap">
      <ContactCard v-for="contact in visibleContacts" :key="contact.id"
        :contact="contact"
        @deleteContact="deleteContact"
        @editContact="editContact"
      />
    </v-card>

    <EditContact 
      :dialog="editContactDialog"
      :contact="contactInDialog"
      @editSave="editSave"
      @editCancel="editClose"
    /> 
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import ContactCard from '@/components/ContactCard.vue'
import EditContact from '@/components/EditContact.vue'
import Contact from '@/class/Contact'

export default {
  components: {
    ContactCard, EditContact
  },

  computed: {
    ...mapState(['contacts']),
    
    visibleContacts() {
      let contacts = []
      if (this.searchValue) {
        contacts = this.contacts.filter(contact => {
          let result = false 
          for (let key of Object.keys(contact)) {
            if (key != 'id') {
              if (contact[key].toLowerCase().includes(this.searchValue.toLowerCase())) {
                result = true
              }
            }
          }
          return result
        })
      } else {
        contacts = this.contacts
      }
      return contacts
    }
  },

  data: () => ({
    editContactDialog: false,
    contactInDialog: new Contact(),
    contactInDialogOriginal: null,
    searchValue: null,
  }),

  methods: {
    async getContacts() {
      await this.$store.dispatch('getContacts')
    },

    addContact() {
      this.contactInDialog = new Contact()
      this.contactInDialogOriginal = null
      this.editContactDialog = true
    },

    deleteContact(contact) {
      this.$store.dispatch('deleteContact', contact)
    },

    editContact(contact) {
      this.contactInDialog = new Contact(contact)
      this.contactInDialogOriginal = contact
      this.editContactDialog = true
    },

    editSave() {
      if (this.contactInDialogOriginal) {
        this.$store.dispatch('patchContact', {newContact: this.contactInDialog, oldContact: this.contactInDialogOriginal})
      } else {
        this.$store.dispatch('postContact', this.contactInDialog)
      }
      this.editClose()
    },

    editClose() {
      this.editContactDialog = false
      this.contactInDialog = new Contact()
      this.contactInDialogOriginal = null
    },

    userLogout() {
      this.$store.dispatch('logOut')
      this.$router.push('/login')
    }
  },

  mounted() {
    this.getContacts()
  },
}
</script>


<style lang="scss" scoped>
  .search {
    width: 40vw;
  }

</style>