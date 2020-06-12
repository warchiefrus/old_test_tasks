<template>
  <v-app>
    <v-overlay  :value="overlay" z-index="9999">
      <v-progress-circular indeterminate :size="64"></v-progress-circular> 
    </v-overlay>

    <v-app-bar v-if="this.$route.path != '/register' && this.$route.path != '/login'"
      app
      color="blue-grey lighten-4"
      class="mx-0"
      height="48px"
    >
      
      <div class="d-flex align-center">
        Какойто проект
      </div>

      <v-tooltip  bottom open-delay="500">
        <template v-slot:activator="{on}">
          <v-btn 
            v-on="on"
            text
            class="ml-5"
            to="/" 
            exact
            active-class="accent"
            draggable="false"
          >
            <v-icon>mdi-contacts</v-icon>
          </v-btn>
        </template>
        <span>Контакты</span>
      </v-tooltip>

      <v-tooltip  bottom open-delay="500">
        <template v-slot:activator="{on}">
          <v-btn 
            v-on="on"
            text
            class="ml-5"
            to="/bookmarks" 
            exact
            active-class="accent"
            draggable="false"
          >
            <v-icon>mdi-bookmark</v-icon>
          </v-btn>
        </template>
        <span>Избранные</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-label>{{this.$store.state.user}}</v-label>

			<v-tooltip  bottom open-delay="500">
				<template v-slot:activator="{on}">
					<v-btn 
						v-on="on"
						text
						rounded 
						@click="logout"
						color="error"
						>
						<v-icon dark>fas fa-sign-out-alt</v-icon>
					</v-btn>	
				</template>
				<span>Выйти</span>
			</v-tooltip>	

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    overlay: false
  }),

  methods: {
    startLoading() {
      this.overlay = true
    }, 
    endLoading() {
      this.overlay = false
    },
    logout() {
      this.$store.commit('userLogout')
      this.$router.push('/login')
    }
  },
};
</script>
