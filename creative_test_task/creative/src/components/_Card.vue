<template>
  <div class="card">
    <h4 class="card__header">{{apartment.attributes.title}}</h4>
    <div class="card__attrs">
      <div>Комнат: </div>
      <div>{{apartment.attributes.rooms}}</div>

      <div>Адресс: </div>
      <div>{{addressFull}}</div>

      <div>Площадь: </div>
      <div>{{areaFull}}</div>

      <div>Агент:</div>
      <div>{{agentFull}}</div>
    </div>
    <div class="card__likes">
      <div>Лайков: {{apartment.likes}}<button class="like-button" @click="addLike">Нравится</button></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['apartment'],
  computed: {
    addressFull() {
      const addr = this.apartment.attributes.address
      return `${addr.city}, ${addr.street}, ${addr.house}, ${addr.room}`
    },
    areaFull() {
      const attrs = this.apartment.attributes
      return `${attrs.area} ${attrs.unit}`
    },
    agentFull() {
      const agent = this.apartment.relationships.attributes
      return `${agent.last_name} ${agent.first_name} ${agent.middle_name}`
    }
  },
  methods: {
    addLike() {
      this.$emit('addLike', this.apartment)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    background-color: rgb(207, 230, 245);
    padding: 10px 10px 40px 10px;
    position: relative;
  }

  .card__header {
    height: 3em;
  }

  .card__attrs {
    display: grid;
    grid-template-columns: 0.6fr 1fr;
    text-align: left;
    gap: 10px;
  }

  .like-button {
    outline: none;
    background-color: rgb(108, 194, 108);
    border: none;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .card__likes {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>