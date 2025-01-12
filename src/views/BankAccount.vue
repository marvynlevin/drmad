<template>
  <div class="bank-account" style="margin-top: 30px; margin-left: 12%; margin-right: 12%;">
    <h2>Mon compte</h2>

    <!--Formulaire réactif-->
    <form @submit.prevent="validateAccount">
      <label for="account-number">Numéro de compte :</label>
      <input
          id="account-number"
          v-model="accountNumber"
          placeholder="Entrez votre numéro de compte"
          type="text"
      />
      <p v-if="numberError === -1" class="error">Numéro de compte invalide.</p>
      <p v-if="numberError === 1" class="success">Compte valide ! Redirection...</p>
      <button type="submit">Valider</button>
    </form>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "BankAccount",
  data() {
    return {
      accountNumber: "", // Stocke la saisie utilisateur
    };
  },
  computed: {
    ...mapState("bank", ["accountAmount", "currentAccount"]),
    ...mapGetters("bank", ["getAccountNumberError", "getTransactions"]),
    numberError() {
      return this.getAccountNumberError;
    },
  },
  methods: {
    ...mapActions("bank", ["validateAccountNumber", "getAccountTransactions", "resetAccountState"]),
    ...mapMutations("bank", ["updateCurrentAccount"]),

    async validateAccount() {
      await this.validateAccountNumber(this.accountNumber);

      // Si valide,
      if (this.numberError === 1) {
        // redirige vers la page principale
        setTimeout(() => {
          this.$router.push({name: "BankAmount"});
        }, 300);

        // ajoute les transactions déjà passées
        await this.getAccountTransactions(this.accountNumber);
      }
    },
  },
  mounted() {
    // Réinitialise l'état du compte lors du chargement du composant
    this.resetAccountState();
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

p {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bolder;
  font-style: italic;
}
</style>
