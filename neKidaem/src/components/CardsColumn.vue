<template>
  <div class="cardsColumn">
    <div class="cardsColumn__header" :style="`background-color:${headerColor};`">
      {{headerName}} ({{items.length}})
    </div>

    <div class="cardsColumn__body"
      @drop.prevent.stop="drop"
    >

      <Card v-for="card in items" :key="card.id"
        :card="card"
      />

      <div id="dropArea"
        @dragenter.stop.prevent="dragenter"
        @dragover.prevent.stop
        @dragleave.prevent="dragleave"
      > 
        <div :class="{noPointerEvents}">
          <div class="carddrop" :style="carddropHeight"/>

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
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import {mapState} from 'vuex'

export default {
  props: ['headerColor', 'headerName', 'dataName', 'index'],

  computed: {
    ...mapState(['draggedCard']),
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
    carddropHeight: 'height: 10px;',
    noPointerEvents: false,
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
      if (this.draggedCard) {
        this.$store.dispatch('updateCard', 
          {id: this.draggedCard.id, 
            card: {row: this.index, seq_num: this.items.length, text: this.draggedCard.text}
          }
        )
        this.$store.commit('dragEnd')
        this.carddropHeight = 'height: 10px;'
      }
    },

    dragenter() {
      if (this.items.indexOf(this.draggedCard) != -1) { 
        if (this.items.indexOf(this.draggedCard) != (this.items.length - 1)) {
          this.carddropHeight = 'height: 120px;'
        }
      } else {
        this.carddropHeight = 'height: 120px;'
      }
    },

    dragleave() {
      this.carddropHeight = 'height: 10px;'
    },    
  },

  watch: {
    draggedCard (val) {
      this.noPointerEvents = val? true: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .cardsColumn {
    width: 100%;
    min-width: 230px;
    .noPointerEvents{
      pointer-events: none;
    }
    .carddrop {
      opacity: 0;
      border: none;
      transition: all 0.2s ease-in-out;
    }
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
        background-color: #57575a;
        color: #afafaf;
        resize: none;
        border: none;
        margin-bottom: 10px;
      }
      .cardsColumn__actions {
        display: flex;
        justify-content: flex-start;
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

