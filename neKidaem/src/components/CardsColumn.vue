<template>
  <div class="cardsColumn">
    <div class="cardsColumn__header" :style="`background-color:${headerColor};`">
      {{headerName}} ({{items.length}})
    </div>

    <div class="cardsColumn__body"
     @drop.prevent="drop"
     @dragover.prevent
    >

      <Card v-for="card in items" :key="card.id"
        :card="card"
      />

      <div v-if="addMode">
        <textarea class="cardsColumn__input" v-model="cardText" placeholder="Введите заголовок для этой карточки" @keyup.enter="addCard">
        </textarea>
      </div>

      <div v-if="addMode" class="cardsColumn__actions">
        <button @click="addCard" class="cardsColumn__addButton">Добавить карточку</button>
        <button @click="cancel" class="cardsColumn__delButton"><span class="icon">&times;</span></button>
      </div>
      <div v-else class="cardsColumn__actions">
        <button @click="addMode = true" class="cardsColumn__plusButton">
          <span class="icon">+</span><span class="cardsColumn__plusButton_text">Добавить карточку</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  props: ['headerColor', 'headerName', 'dataName', 'index'],

  computed: {
    items() {
      return this.$store.state.cards.filter(item => {
        return this.index == item.row
      })
    }
  },

  components: {
    Card
  },

  data: () => ({
    cardText: null,
    addMode: false,
    
  }),

  methods: {
    addCard() {
      this.$store.dispatch('postCard', {
        "row": this.index,
        "text": this.cardText
      })
      this.addMode = false
      this.cardText = null
    },
    cancel() {
      this.addMode = false
    },

    drop() {
      let draggedCard = this.$store.state.draggedCard
      if (draggedCard) {
        this.$store.dispatch('updateCard', 
          {id: draggedCard.id, 
            card: {row: this.index, seq_num: this.items.length, text: draggedCard.text}
          }
        )
        this.$store.commit('dragEnd')
      }
    },
  },

  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .cardsColumn {
    width: 100%;
    min-width: 230px;
    .cardsColumn__header {
      padding: 12px 4%;
      text-align: left;
      border: solid 1px rgb(48, 46, 46);
    }
    .cardsColumn__body {
      padding: 4%;
      background-color: #2d2d35;
      .cardsColumn__input {
        width: 100%;
        height: 10vh;
        padding: 10px;
        margin-top: 10px;
        background-color: #57575a;
        color: #afafaf;
        resize: none;
        border: none;
      }
      .cardsColumn__actions {
        display: flex;
        justify-content: flex-start;
        margin-top: 10px;
        button {
          border: none;
          color: #afafaf;
          display: flex;
          align-items: center;
        }
        button:hover {
          background-color: #414141;
        }
        .cardsColumn__addButton {
          background-color: #5f6163;
          margin-right: 15px;
          padding: 0px 20px;
        }
        .cardsColumn__delButton {
          background-color: transparent;
        }
        .cardsColumn__plusButton {
          width: 100%;
          padding: 6px 0;
          background-color: transparent;
          text-align: left;
        }     
        .icon {
          font-size: 1.6rem;
        }   
        .cardsColumn__plusButton_text {
          margin-left: 10px;
        }
      }
    }
  }
</style>

