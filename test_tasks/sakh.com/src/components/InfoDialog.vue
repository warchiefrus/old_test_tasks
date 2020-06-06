<template>
	<v-layout row justify-center>
			<v-dialog v-model="dialog" persistent max-width="500px">
					<v-card>
						<v-card-title>
							<span class="headline">
									<v-icon color="error">mdi-alert-decagram</v-icon>
									Ошибка!
							</span>
						</v-card-title>

						<v-divider></v-divider>

						<v-card-text class="messageText mt-2 mb-1">
								{{ message }}
						</v-card-text>
						<v-divider></v-divider>

						<v-card-actions>
							<v-row
								class="mb-1 mt-1"
								justify="center"
								no-gutters
							>
								<v-btn color="secondary" @click="closeInfo" rounded><v-icon left>mdi-close-circle-outline</v-icon>Закрыть</v-btn>
							</v-row>
						</v-card-actions>
					</v-card>
			</v-dialog>
	</v-layout>
</template>

<script>


export default {
	props: ['dialog', 'message'],
	computed: {

	},
	data: () => ({

	}),
	methods: {
		closeInfo() {
			this.$emit('closeInfo')
		},
	},
}
</script>

<style scoped>
	.messageText {
		font-size: 1.2rem;
	}
</style>