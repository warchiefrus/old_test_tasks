<template>
  <main class="main">
    <h1>Vue test task</h1>
    <div class="content">
      <AsidePannel
				:sprs="sprs"
				:currentYear="currentYear"
				:tableData="tableData"
				@yearChange="yearChange"
			/>
			<Table 
				:tableData="tableData"
				:sprs="sprs"
				@deleteRow="deleteRow"
				@updateRow="updateRow"
				@addRow="addRow"
			/>
    </div>
  </main>
</template>


<script>
import AsidePannel from "./components/AsidePannel"
import Table from "./components/Table"

export default {
  components: {
    AsidePannel, Table
	},
	data: () => ({
		sprs: {},
		tableData: [],
		currentYear: 2019
	}),
	methods: {
		yearChange(year) {
			this.currentYear = year
			this.filterYear()
		},
		async filterYear() {
			this.tableData = await fetch(`/api/test-task?year=${this.currentYear}`).then(response => response.json())
		},
		async deleteRow(id) {
			this.tableData = this.tableData.filter(item => {return item.id != id})
			let error = await fetch(`/api/test-task/item?id=${id}`, {METHOD: 'DELETE'}).then(response => response.json())
      if (error.length) {
        throw(error)
      }
		},
		async updateRow(rowDataCopy) {
			this.tableData = this.tableData.map(item => {
				if (item.id === rowDataCopy.id) {
					Object.assign(item, rowDataCopy)
				}
				return item
			})
			let error = await fetch(`/api/test-task/item?id=${rowDataCopy.id}`, {METHOD: 'PUT'}).then(response => response.json())
			if (error.length) {
        throw(error)
      }
		},
		async addRow() {
			let newItem =	{
				"id": + new Date(),
				"year": this.currentYear,
				"region": 1,
				"customer": 1,
				"drilling": 1,
				"new": true,
				"dataMonth": [
					{
						"month": 1,
						"passage": 0
					},
					{
						"month": 2,
						"passage": 0
					},
					{
						"month": 3,
						"passage": 0
					},
					{
						"month": 4,
						"passage": 0
					},
					{
						"month": 5,
						"passage": 0
					},
					{
						"month": 6,
						"passage": 0
					},
					{
						"month": 7,
						"passage": 0
					},
					{
						"month": 8,
						"passage": 0
					},
					{
						"month": 9,
						"passage": 0
					},
					{
						"month": 10,
						"passage": 0
					},
					{
						"month": 11,
						"passage": 0
					},
					{
						"month": 12,
						"passage": 0
					}
				]
			}
			
			let error = await fetch(`/api/test-task`, {METHOD: 'POST'}).then(response => response.json())
			if (error.length) {
        throw(error)
			}
			this.tableData.push(newItem)
		}
	},

	created() {
		this.sprs = window.vueData
		this.currentYear = this.sprs.years[this.sprs.years.length - 2].text
	},
	async mounted() {
		this.filterYear()
	}
};
</script>

<style>
.main {
	text-align: center;
}
.content {
  display: grid;
  grid-template-columns: 100px 1fr;
}

.table {
  width: 100%;
  border: 1px solid #ccc;
}

.thead {
	position: sticky;
	top: 0;
}

.tr {
  display: grid;
	min-width: 1000px;
  min-height: 0;
  grid-template-columns: 0.5fr repeat(3, 1fr) repeat(12, 0.5fr) 0.5fr;
}

.th {
	background-color: rgb(199, 215, 250);
  border: 1px solid #ccc;
	font-weight: 400;
}

.td {
	min-width: 0;
	padding: 2px;
	overflow: visible; 
	word-break: break-all;
	white-space: normal;
	height:auto;
	border: 1px solid #ccc;
}

.tdText {
	text-align: left;
}

.tdNumber {
	text-align: right;
}

.bold {
	font-weight: 600;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


</style>


