<template>
  <div>
    <h2>Page de paiement</h2>

    <div class="flex flex-row">
      <span>Commande UUID: {{ orderId }}</span>

      <!-- Champ de saisie pour l'UUID de commande -->
      <input
          type="text"
          placeholder="Entrez l'UUID de la commande"
          v-model="orderInput"
      />

      <span>Transaction UUID: {{ transactionId }}</span>

      <!-- Champ de saisie pour l'UUID de transaction bancaire -->
      <input
          type="text"
          placeholder="Entrez l'UUID de transaction bancaire"
          v-model="transactionId"
      />
    </div>
    <!-- Bouton de paiement -->
    <button @click="payOrder">Payer</button>
  </div>
</template>

<script>
import shopService from '@/services/shop.service';
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'ShopPay',
  props: ['orderId'],
  data() {
    return {
      orderInput: this.orderId || '',
      transactionId: '',
    };
  },

  computed: {
    ...mapGetters("bank", ["getTransactions"]),
    ...mapGetters("shop", ["userId", "isUserLoggedIn"]),
  },

  methods: {
    ...mapState("shop", ["orders"]),
    ...mapActions("shop", ["fetchOrders"]),

    async payOrder() {

      console.log("Orders: ", this.fetchOrders);
      console.log("Transact: ", this.getTransactions);

      console.log("Order UUID:", this.orderInput);

      const orderId = this.orderInput;
      const transactionId = this.transactionId;
      const userId = this.userId;

      // Vérifier que l'ID de commande est valide
      if (!orderId || !transactionId) {
        alert("Veuillez entrer un UUID de commande et un UUID de transaction.");
        return;
      }

      // Appeler la méthode de paiement du service
      const result = await shopService.payOrder(userId, orderId, transactionId);

      if (result.error) {
        // Afficher l'erreur si la commande n'a pas été trouvée
        alert(result.data);
      } else {
        alert("Commande payée avec succès !");

        // Rediriger vers la page des commandes
        this.$router.push(`/shop/orders`);
      }
    }
  },
  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push('/shop/login');
    }
  },
};
</script>