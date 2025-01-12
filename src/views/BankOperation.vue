<template>
  <div style="margin-top: 30px; margin-left: 12%; margin-right: 12%;">
    <slot name="operation-title">
      <h2>Débit / Virement</h2>
    </slot>

    <!-- Champ pour le montant -->
    <div style="margin-top: 20px; display: flex; flex-direction: column">
      <label for="amount">Montant :</label>
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          placeholder="Entrez un montant"
      />
    </div>

    <!-- Case à cocher pour le destinataire -->
    <div style="margin-top: 20px;">
      <input
          type="checkbox"
          id="recipient-toggle"
          v-model="isDestEnabled"
      />
      <label for="recipient-toggle">Destinataire</label>
    </div>

    <!-- Champ pour le destinataire (affiché uniquement si la case est cochée) -->
    <div v-if="isDestEnabled" style="margin-top: 10px; display: flex; flex-direction: column">
      <label for="recipient">Numéro du destinataire :</label>
      <input
          id="recipient"
          type="text"
          v-model="dest"
          placeholder="Entrez le numéro du destinataire"
      />
    </div>

    <!-- Bouton de validation -->
    <div style="margin-top: 20px;">
      <button @click="validateOperation">Valider</button>
    </div>

    <!-- Message de validation ou d'erreur -->
    <div v-if="successMessage" class="success-message">
      <span>{{ successMessage }}</span>
    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'BankOperation',
  components: {},
  data() {
    return {
      amount: 0,                  // montant saisi
      isDestEnabled: false,       // statut de case à cocher
      dest: "",                   // num de destinataire
      successMessage: "",         // message de success
    };
  },
  methods: {
    ...mapActions("bank", ["createPayment", "createWithdraw"]),

    async validateOperation() {
      try {
        if (this.amount <= 0) {
          alert("Veuillez entrer un montant valide");
          return;
        }
        if (this.isDestEnabled && !this.dest) {
          alert("Veuillez entrer un numéro de destinataire");
          return;
        }

        // Effectuer le virement ou le débit
        let res;
        if (this.isDestEnabled) {
          res = await this.createPayment({
            accountId: this.getCurrentAccount,
            destNumber: this.dest,
            amount: this.amount,
          });
        } else {
          res = await this.createWithdraw({
            accountId: this.getCurrentAccount,
            amount: this.amount,
          });
        }

        console.log("vue:", res);


        // Vérifier la réponse
        if (res.error === 0) {
          this.successMessage = `L'opération est validée avec l'ID : ${res.data.transaction.uuid}. Nouveau solde : ${res.data.newBalance}€.`;

          // Effacer le message après 5 sec
          setTimeout(() => {
            this.successMessage = "";
          }, 5000);
        } else {
          alert(`Erreur : ${res.data || "Une erreur s'est produite."}`);
        }
      } catch (error) {
        alert("Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.");
      }
    },
  },
  computed: {
    ...mapGetters("bank", ["getCurrentAccount", "getLastTransaction", "getTransactionError", "getTransactions", "isUserLoggedIn"]),
  },

  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push('/bank/home');
    }
  },
};
</script>