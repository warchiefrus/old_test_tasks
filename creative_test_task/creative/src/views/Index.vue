<template>
  <section class="wrapper">
    <div class="apartments">
      <Card v-for="(apartment, index) of $store.state.apartments" :key="index"
        :apartment="apartment"
        @addLike="addLikeToApartment"
      />
    </div>
  </section>
</template>

<script>
import Card from '@/components/_Card'
export default {
  components: {
    Card
  },
  methods: {
    addLikeToApartment(apartment) {
      this.$store.commit('addLikeToApartment', apartment)
    }
  }
}
</script>

<style>
  .apartments {
    padding: 20px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (max-width: 340px) {
    .apartments {
      padding: 0;
    }
  }
  
  .wrapper {
    margin: 0 auto;
    max-width: 1200px;
    min-height: 100vh;
    box-shadow: 0px 16px 16px rgba(0, 0, 0, 0.07);
  }

</style>