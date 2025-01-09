<template>
  <div>
    <h2>Shop Login</h2>

    <div class="flex flex-col">
      <span>Login</span><input v-model="login">

      <span>Password</span><input v-model="password" type="password">
      <!-- Afficher le message d'erreur si la connexion échoue -->
      <p v-if="errorMessage" style="color: #FFAA64; font-weight: bolder; font-style: italic">{{ errorMessage }}</p>

      <button @click="handleLogin">Enregistrer</button>
    </div>
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
      errorMessage: ''
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
        const response = await this.shopLogin({ login: this.login, password: this.password });

        console.log("Réponse de la connexion:", response);

        if (response && response.error === 0) {
          this.errorMessage = '';
          this.login = '';
          this.password = '';

          // Rediriger vers la page d'achat
          this.$router.push('/shop/buy');
        } else {
          this.errorMessage = response ? response.data : 'Erreur inattendue lors de la connexion.';
        }
      } catch (error) {
        this.errorMessage = 'Erreur inattendue lors de la connexion.';
        console.error("Erreur catchée:", error);
      }
    }
  }
};
</script>


<style scoped>
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

button:disabled {
  background-color: #ffaf9c;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #ed613f;
}

button:hover:enabled {
  background-color: #FF8264;
}

p {
  margin-top: 10px;
  font-size: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>