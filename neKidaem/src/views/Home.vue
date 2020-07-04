<template>
  <div class="container">
    <CardsColumn v-for="(column, index) in columns" 
      :index="index"
      :key="index"
      :headerColor="column.headerColor"
      :headerName="column.headerName"
      :dataName="column.dataName"
    />
  </div>
</template>

<script>
import CardsColumn from '@/components/CardsColumn.vue'

export default {
  components: {
    CardsColumn
  },

  data: () => ({
    columns: [],
    
  }),

  async mounted() {
    await this.$store.dispatch('login')
    await this.$store.dispatch('getCards')   
    setInterval(() => {this.$store.dispatch('refreshToken')}, 60000) 
    
    this.columns = [
      {headerColor: '#fb7f44', headerName: 'ON-HOLD', dataName: 'onHold'},
      {headerColor: '#2c90c1', headerName: 'IN-PROGRESS', dataName: 'inProgress'},
      {headerColor: '#f4cf45', headerName: 'NEEDS-REVIEW', dataName: 'needsReview'},
      {headerColor: '#00bb63', headerName: 'APPROVED', dataName: 'approved'}
    ]
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background-color: #30333b;
    min-height: 100vh;
    padding: 3% 3%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3%;
  }
</style>
