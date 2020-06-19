<template>
  <div
    @dragenter.stop.prevent="dragenter"
    @dragleave.stop.prevent="dragleave"
    @dragover.stop.prevent
    @drop.stop.prevent="drop"
    :style="opacity"
    class="card"
  >
    <div class="card__top" :style="cardTopHeight"></div>
    <div 
      draggable
      @dragstart="dragstart"
      class="card__body"
      @dragend="dragend"
    >
      <div class="card__close" @click="closeClick">&times;</div>
      <div><span class="id">id: </span>{{card.id}}</div>
      <div>{{card.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card'],

  data: () => ({
    opacity: 'opacity: 1;',
    cardTopHeight: 'height: 10px;',
  }),

  methods: {
    closeClick() {
      this.$store.dispatch('deleteCard', this.card)
    },

    dragstart() {
      setTimeout(() => {
        this.opacity = 'opacity: 0;'  
      }, 10)
      
      this.$store.commit('set_draggedCard', this.card)
    },

    dragenter() {
      if (this.$store.state.draggedCard != this.card&&!this.isNextCard()) {
        setTimeout(() => {this.cardTopHeight = 'height: 120px;'}, 0)
      }
    },

    dragleave() {
      this.cardTopHeight = 'height: 10px;'
    },

    drop() {
      if (this.$store.state.draggedCard != this.card&&!this.isNextCard()) {
        let draggedCard = this.$store.state.draggedCard
        this.$store.dispatch('updateCard', 
            {id: draggedCard.id, 
              card: {row: this.card.row, seq_num: this.card.seq_num, text: draggedCard.text}
            }
        )
        this.cardTopHeight = 'height: 10px;'
      } 
    },

    isNextCard() {
      let result = false
      let draggedCard = this.$store.state.draggedCard
      if (this.card.seq_num == (draggedCard.seq_num + 1)&&this.card.row == draggedCard.row) {
        result = true
      }
      return result
    },

    dragend() {
      setTimeout(() => {
        this.display = 'display: block;'
        this.opacity = 'opacity: 1;'
        this.$store.commit('dragEnd', this.card)
      }, 200)

    }
  },

  mounted() {
    if (!this.card.id) {
      this.opacity = 'opacity: 0.1;'
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    .card__top {
      opacity: 1;
      border: none;
      transition: all 0.2s ease-in-out;
    }
    .card__body {
      position: relative;
      display: grid;
      text-align: left;
      padding: 10px;
      background-color: #191a1d;
      color: #afafaf;
      overflow-y: hidden;
      text-overflow: ellipsis;
      border: none;
      height: 100px;
      cursor: pointer;

      .id{
        color: white;
      }
      .card__close {
        position: absolute;
        top: 1px;
        right: 3px;
        color: #afafaf;
        cursor: pointer;
      }
    }
  }
 

</style>