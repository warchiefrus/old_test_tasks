<template>
	<v-row justify="center" align="center" class="rForm">
		<v-col cols="12" sm="10" md="8" lg="6">
			<v-card
				class="mx-auto"
				max-width="340"
			>
				<v-card-title>Вход в проект</v-card-title>
				
				<v-divider></v-divider>
				
				<v-card-text>
					<v-form ref="form" :value="formValid">
						<v-text-field
							v-model="email"
							:rules="emailRules"
							placeholder="Введите e-mail"
							required
							class="mt-3"
							validate-on-blur
							label="E-mail"
							prepend-icon="fas fa-at"
						></v-text-field>

						<v-text-field
							class="mt-3"
							v-model="password1"
							:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
							label="Пароль"
							placeholder="Введите пароль"
							required
							:type="show1 ? 'text' : 'password'"
							@click:append="show1 = !show1"
							validate-on-blur
							prepend-icon="fas fa-lock"
							@keydown.enter="login"
						></v-text-field>

					</v-form>
					<small v-if="loginTry" class="error--text d-flex justify-start">Неверный логин или пароль</small>
				</v-card-text>

				<v-container class="actionsGrid">
					<v-btn  class="btnFullWidth actionItem" @click="login" color="primary">Войти</v-btn>
					<span class="actionItem">или</span>
					<v-btn text  to="/register" color="info">Зарегистирироватся</v-btn>
				</v-container>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {eventBus} from '@/main'

export default {
	computed: {
		...mapState(['notMyComp', 'reCapchaKey']),
	},
	data: () => ({
		rUser: false,
		loginTry: false,
		formValid: false,
		email: '',
		password1: '',
		show1: false,
		emailRules: [
			v => !!v || 'Укажите e-mail',
			v => /.+@.+\..+/.test(v) || 'Некорректный e-mail',
		],
	}),
	methods: {
		...mapActions(['serverLogin']),
		async login() {
			this.formValid = this.$refs.form.validate()
			let result = false
			if (this.formValid) {
				eventBus.$emit('startLoading')
				result = await this.serverLogin({action:'login_user', data: {email: this.email, password: this.password1}})
				eventBus.$emit('endLoading')
				if (result) {
					this.$router.push('/')
				} else {
					this.loginTry = true
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
	.rForm {
		height: 100vh;
	}

	.actionsGrid {
		display: grid;
		grid-template-columns: 1fr;
		.actionItem {
			margin: auto;
			padding: 4px;
		}
		.btnFullWidth {
			width: 90%;
		}
	}

</style>>
