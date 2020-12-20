<template>
  <tr class="tr">
    <td class="td">
      <button v-if="editMode" class="btn btn-success actionBtn" @click="saveRow">С</button>
      <button v-else class="btn btn-primary actionBtn" @click="switchToEditMode">Р</button>
      
      <button v-if="editMode" class="btn btn-warning actionBtn" @click="cancelEdit">О</button>
      <button v-else class="btn btn-danger actionBtn" @click="deleteRow">У</button>
    </td>


    <td class="td tdText">
      <div v-if="editMode">
        <TableSelectCell
          :spr="this.sprs.regions"
          :selectedItemId="rowData.region"
          fieldName="region"
        />
      </div>
      <span v-else>{{ region }}</span>
    </td>
    <td class="td tdText">
      <div v-if="editMode">
        <TableSelectCell
          :spr="this.sprs.customers"
          :selectedItemId="rowData.customer"
          fieldName="customer"
        />
      </div>
      <span v-else>{{ customer }}</span>      
    </td>    
    <td class="td tdText">
      <div v-if="editMode">
        <TableSelectCell
          :spr="this.sprs.drillingRigs"
          :selectedItemId="rowData.drilling"
          fieldName="drilling"
          @selectChange="selectChange"
        />
      </div>
      <span v-else>{{ drilling }}</span>       
    </td>   

    <td v-for="(item, index) in rowData.dataMonth" :key="index" class="td tdNumber">
      <div v-if="editMode">
        <TableNumberCell
          :itemValue="item.passage"
          :index="index"
          @numberChange="numberChange"
        />
      </div>
      <span v-else>{{ item.passage }}</span>       
      
    </td>           
    <td v-if="editMode" class="td bold tdNumber">
      {{ totalPassageCopy }}
    </td> 
    <td v-else class="td bold tdNumber">
      {{ totalPassage }}
    </td> 


    
  </tr>
</template>

<script>
import TableSelectCell from './TableSelectCell'
import TableNumberCell from './TableNumberCell'

export default {
  props: ['rowData', 'sprs'],
  components: {TableSelectCell, TableNumberCell},
  computed: {
    region() {
      return this.sprs.regions.filter(item => {return item.id == this.rowData.region})[0].text
    },
    customer() {
      return this.sprs.customers.filter(item => {return item.id == this.rowData.customer})[0].text
    },
    drilling() {
      return this.sprs.drillingRigs.filter(item => {return item.id == this.rowData.drilling})[0].text
    },
    totalPassage() {
      return +this.rowData.dataMonth.reduce((sum, item) => { return sum += +item.passage},0).toFixed(2)
    },
  },
  data: () => ({
    editMode: false,
    rowDataCopy: {},
    totalPassageCopy: 0
  }),

  methods: {
    deleteRow() {
      this.$emit('deleteRow', this.rowData.id)
    },
    switchToEditMode() {
      Object.assign(this.rowDataCopy, JSON.parse(JSON.stringify(this.rowData)))
      this.editMode = true
    },
    saveRow() {
      this.$emit('updateRow', this.rowDataCopy)
      this.editMode = false
      this.rowDataCopy = {}
    },
    numberChange(value, index) {
      if (value === '' && !+value) {
        value = 0
      }
      this.rowDataCopy.dataMonth[index].passage = +value
      this.totalPassageCopy = +this.rowDataCopy.dataMonth.reduce((sum, item) => { return sum += +item.passage},0).toFixed(2)
    },
    selectChange(id, name) {
      this.rowDataCopy[name] = id
    },
    cancelEdit() {
      this.editMode = false
      this.rowDataCopy = {}
    }
  },

  mounted() {
    if (this.rowData.new) {
      this.switchToEditMode()
    }
  }

}
</script>

<style scoped>
  .actionBtn {
    margin: 5px;
    width: 20px;
    height: 20px;
    padding: 0;
  }

</style>