<template>
  <header class="header">
    <span class="text">
      Общая аналитика
    </span>

    <div class="datePicker" @click="toggleSelectDate">
      <span class="icon-event_note DatePickerIcon"></span>
      <DatePicker ref="datePicker" v-model="pickedDate" class="dateInput" 
        placeholder="Выберите дату"
        format="DD.MM.YYYY"
      />
    </div>

    <button class="btnApply" @click="loading">Применить</button>

    <button class="btnChangedata" @click="genData">Изменить данные</button>

  </header>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ru'

export default {
  components: {
    DatePicker
  },

  data: () => ({
    pickedDate: null,
  }),

  methods: {
    toggleSelectDate() {
      this.$refs.datePicker.focus()
    },
    genData() {
      let result = []
      result.push({sum: this.getRandom(1000, 4000), percent: this.getRandom(5, 20)/100})
      result.push({sum: this.getRandom(6000000, 8000000), percent: -this.getRandom(50, 200)/100})
      result.push({sum: this.getRandom(1500, 3000), percent: -this.getRandom(400, 600)/100})
      this.$store.commit('change_data', result)
    },
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    loading() {
      if (this.pickedDate) {
        this.$emit('loading')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;

    .text {
      font-weight: bold;
      font-size: 32px;
      line-height: 37px;
      color: #000000;
    }

    .DatePickerIcon {
      margin: 8px 10px 8px 10px;
      font-size: 1.5rem;
    }
    
    .datePicker {
      display: flex;
      align-items: center;
      border: 1px solid #DDDDDD;
      border-radius: 10px;
      height: 40px;
      width: 240px;
      margin-left: 45px;
      background-color: #FFFFFF;
    }

    .dateInput {
      width: 180px;
    }

    button {
      height: 40px;
      border-radius: 10px;
      outline: none;
      cursor: pointer;
    }

    .btnApply {
      width: 105px;
      background-color: $default_color;
      border: none;
      margin-left: 5px;
      color: #FFFFFF;
    }

    .btnChangedata {
      width: 150px;
      background-color: #FFFFFF;
      border: 2px solid #0043C4;
      margin-left: 45px;
      color: #0043C4;
    }
  }
</style>