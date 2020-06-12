<template>
    <v-row justify="center" align="center" class="rForm">
			<v-col cols="12" sm="10" md="8" lg="6">
				<v-card
					class="mx-auto"
					max-width="340"
				>
					<v-card-title>Регистрация</v-card-title>
					
					<v-divider></v-divider>
					
					<v-card-text>
						<v-form ref="form" :value="formValid">
							<v-text-field
								v-model="name"
								:rules="nameRules"
								:counter="50"
								label="ФИО"
								required
								validate-on-blur
							></v-text-field>

							<v-text-field
								v-model="company"
								:rules="companyRules"
								:counter="40"
								label="Организация"
								required
								validate-on-blur
							></v-text-field>

							<v-text-field
								v-model="email"
								:rules="emailRules"
								label="E-mail"
								required
								class="mt-3"
								autocomplete="username"
								validate-on-blur
							></v-text-field>

							<v-text-field
								class="mt-3"
								v-model="password1"
								:rules="passwordRules"
								:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
								label="Пароль"
								required
								:type="show1 ? 'text' : 'password'"
								@click:append="show1 = !show1"
								counter
								autocomplete="new-password"
								validate-on-blur
							></v-text-field>

							<v-text-field
								class="mt-3"
								v-model="password2"
								:rules="passwordConfirmationRule"
								:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
								label="Подтвердите пароль"
								required
								:type="show2 ? 'text' : 'password'"
								@click:append="show2 = !show2"
								counter
								autocomplete="new-password"
								validate-on-blur
							></v-text-field>
						</v-form>

						<span v-if="emailBusy" class="error--text d-flex justify-start">Такой E-mail уже зарегистрирован</span>
					</v-card-text>
					<v-card-actions>
					<v-btn class="btnFullWidth" @click="register" color="primary">Зарегистрироваться</v-btn>
					</v-card-actions>
				</v-card>
		</v-col>
	</v-row>
</template>

<script>
import {mapActions} from 'vuex'
import {eventBus} from '@/main'

export default {
	computed: {
		passwordConfirmationRule() {
			return [() => (this.password1 === this.password2) || 'Пароли не совпадают'];
		},
	},
	data: () => ({
		emailBusy: false,
		registered: false,
		formValid: false,
		name: '',
		company: '',
		email: '',
		password1: '',
		password2: '',
		show1: false,
		show2: false,
		nameRules: [
			v => !!v || 'Укажите имя',
			v => (v && v.length <= 50) || 'Не должно превышать 20 символов',
		],
		companyRules: [
			v => !!v || 'Укажите имя',
			v => (v && v.length <= 40) || 'Не должно превышать 40 символов',
		],
		emailRules: [
			v => !!v || 'Укажите e-mail',
			v => /.+@.+\..+/.test(v) || 'Некорректный e-mail',
		],
		passwordRules: [
			v => !!v || 'Придумайте пароль', 
			v => (v && v.length >= 8) || 'Пароль должен содержать минимум 8 символов',
			v => /(?=.*[A-Z])/.test(v) || 'Добавьте заглавную английскую букву', 
			v => /(?=.*\d)/.test(v) || 'Добавьте хотя цифру', 
		],   
	}),

	methods: {
		...mapActions(['serverLogin']),
		async register() {
			this.formValid = this.$refs.form.validate()
			if (this.formValid) {
				eventBus.$emit('startLoading')
				let result = false
				result = await this.serverLogin({action:'register_user', data: {name: this.name, company: this.company, 
					email: this.email, password: this.password1}})

				eventBus.$emit('endLoading')
				if (result) {
					this.name = ''
					this.company = ''
					this.email = ''
					this.password1 = ''
					this.password2 = ''
					this.$router.push('/login')                  
				} else {
					this.emailBusy = true
				}
			}
		},
	},
}
</script>

<style scoped>
	.rForm {
		height: 100vh;
	}
	.btnFullWidth {
		width: 90%;
		margin: 5%;
	}
</style>