<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card flat>
      <v-card-title>
        <span class="headline">Рекдактор контакта</span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
          <v-row no-gutters>
            <v-col cols="12" class="mb-4 mt-4">
              <v-text-field
                class="ma-0"
                hide-details
                spellcheck="false" 
                label="Имя" 
                v-model="contact.name"
                outlined
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" class="mb-4">
              <v-text-field
                class="ma-0"
                hide-details
                spellcheck="false" 
                label="Компания" 
                v-model="contact.company"
                outlined
              >
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                class="ma-0"
                hide-details
                spellcheck="false" 
                label="e-mail" 
                v-model="contact.email"
                outlined
              >
              </v-text-field>
            </v-col>              

          </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-row
          class="mb-1 mt-1"
          justify="center"
          no-gutters
        >
          <v-btn color="success" class="mr-2 ml-2" @click="editSave"><v-icon small left>mdi-account-check</v-icon>Сохранить</v-btn>
          <v-btn color="secondary" class="mr-2 ml-2" @click="editClose"><v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Закрыть</v-btn>
        </v-row>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog', 'contact'],

methods: {
    editSave() {
      this.$emit('editSave')
    },
    editClose() {
      this.$emit('editClose')
    }
  },
}
</script>

<style>

</style>