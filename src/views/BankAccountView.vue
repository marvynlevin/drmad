<template>
  <div style="margin-top: 10%">
    <h1>Consulter le solde du compte et les transactions</h1>

    <span>Numéro de compte</span>
    <input v-model="accountNumber" placeholder="Entrez le numéro de compte" />

    <!-- Boutons désactivés si le numéro de compte est invalide -->
    <button @click="fetchAccountAmount" :disabled="!isAccountNumberValid">
      Afficher le solde
    </button>
    <button @click="fetchAccountTransactions" :disabled="!isAccountNumberValid">
      Afficher les transactions
    </button>
    <button @click="resetInput">Reset</button> <!-- Nouveau bouton Reset -->

    <!-- Affichage d'erreur si le numéro de compte est invalide -->
    <p v-if="accountNumberError === -1">Numéro de compte erroné.</p>

    <!-- Affichage du montant du compte si accountNumberError vaut 1 -->
    <p v-if="accountNumberError === 1 && accountAmount !== null">
      Solde du compte : {{ accountAmount }} €
    </p>

    <!-- Message si aucun solde trouvé ou compte incorrect -->
    <p v-else-if="accountNumberError === 1 && accountAmount === null">
      Aucun compte trouvé ou identifiant incorrect.
    </p>

    <!-- Affichage des transactions sous forme de tableau si accountNumberError vaut 1 -->
    <div>
      <h2>Transactions sous forme de tableau</h2>
      <table v-if="accountNumberError === 1 && accountTransactions && accountTransactions.length > 0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Compte</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in accountTransactions" :key="transaction._id">
            <td>{{ formatDate(transaction.date.$date) }}</td>
            <td>{{ transaction.account }}</td>
            <td>{{ transaction.amount }} €</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucune transaction disponible.</p>
    </div>

    <h2>Transactions sous forme de liste</h2>
    <ul v-if="accountNumberError === 1 && accountTransactions.length > 0">
      <li v-for="transaction in accountTransactions" :key="transaction._id">
        {{ formatDate(transaction.date.$date) }} : {{ transaction.amount }} €
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BankAccountView',
  data: () => ({
    accountNumber: '', // Champ pour saisir l'ID du compte
  }),
  computed: {
    ...mapState(['accountAmount', 'accountTransactions', 'accountNumberError']), // Mapper l'état d'erreur

    isAccountNumberValid() {
      // Vérification de la validité du numéro de compte
      const accountPattern = /^[a-zA-Z0-9]{22}-\d{7}$/;
      return accountPattern.test(this.accountNumber);
    }
  },
  methods: {
    ...mapActions(['getAccountAmount', 'getAccountTransactions', 'resetAccountState']), // Mapper les actions du store

    fetchAccountAmount() {
      console.log('Fetching account amount for:', this.accountNumber);
      this.getAccountAmount(this.accountNumber);
    },

    fetchAccountTransactions() {
      console.log('Fetching transactions for:', this.accountNumber);
      this.getAccountTransactions(this.accountNumber);
    },

    resetInput() {
      this.accountNumber = ''; // Réinitialiser le champ de saisie
      this.resetAccountState(); // Réinitialiser l'état du compte
    },

    formatDate(dateString) {
      if (!dateString) return 'Date invalide';
      const date = new Date(dateString);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return date.toLocaleString('fr-FR', options);
    }
  }
}
</script>

<style scoped>
/* Style basique */
input {
  margin: 10px 0;
  padding: 8px;
}

button {
  margin: 10px 0;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #45a049;
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
