<template>
  <div>
    <h2>Page de connexion</h2>

    <!--Formulaire réactif-->
    <form @submit.prevent="handleLogin" class="flex flex-col">
      <label for="login">Login</label>
      <input
        id="login"
        v-model="login"
        type="text"
        placeholder="Entrez votre login"
        required
        ref="login"
        @keydown.enter="focusNextField('password')"
      />

      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Entrez votre mot de passe"
        required
        ref="password"
        @keydown.enter="focusNextField('submit')"
      />
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <button
        id="submit"
        type="submit"
        ref="submitButton"
      >
        Se connecter
      </button>
    </form>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'ShopLogin',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
      successMessage: "",
    };
  },
  computed: {
    ...mapState('shop', ['shopUser'])
  },
  methods: {
    ...mapActions('shop', ['shopLogin']),
    async handleLogin() {
      console.log("Login demandé avec:", {login: this.login, password: this.password});

      try {
        const response = await this.shopLogin({login: this.login, password: this.password});

        console.log("Réponse de la connexion:", response);

        if (response && response.error === 0) {
          // Connexion établie
          this.successMessage = "Compte valide ! Redirection ...";
          this.errorMessage = '';
          this.login = '';
          this.password = '';

          // Rediriger vers la page d'achat
          setTimeout(() => {
            this.$router.push("/shop/buy");
          }, 300);
        } else {

          // Connexion refusée
          this.errorMessage = response ? response.data : 'Erreur inattendue lors de la connexion.';
          this.successMessage = '';
        }
      } catch (error) {
        this.errorMessage = 'Erreur inattendue lors de la connexion.';
        this.successMessage = '';
        console.error("Erreur :", error);
      }
    },
    focusNextField(nextField) {
      if (nextField === 'password') {
        this.$refs.password.focus();
      } else if (nextField === 'submit') {
        this.$refs.submitButton.click();
      }
    }
  }
};
</script>


<style scoped>
p {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bolder;
  font-style: italic;
}
</style>