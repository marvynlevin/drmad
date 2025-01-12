<template>
  <div>
    <h2>Mes Commandes</h2>

    <div v-if="!orders || orders.length === 0">
      <p>Aucune commande trouvée.</p>
    </div>
    <div v-else>
      <div v-for="(order, index) in orders" :key="index" class="order">
        <p>
          <strong>Commande #{{ order.uuid }}</strong><br/>
          Montant total : {{ order.total }} €<br/>
          Date :
          {{
            order.date && order.date.$date ? new Date(order.date.$date).toLocaleDateString('fr-FR') : 'Date inconnue'
          }}
          <br/>
          Statut : {{ order.status }}
        </p>

        <div v-if="order.status === 'waiting_payment'">
          <button @click="payOrder(order.uuid)">Payer</button>
          <button @click="cancelOrder(order.uuid)">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";


export default {
  name: "ShopOrders",
  computed: {
    ...mapState("shop", ["shopUser", "orders"]),
    ...mapGetters("shop", ['isUserLoggedIn']),
  },
  methods: {
    ...mapActions("shop", ["fetchOrders", "cancelOrder"]),
    async payOrder(orderId) {
      // Rediriger vers la route de paiement
      this.$router.push(`/shop/pay/${orderId}`);
    },
    async cancelOrder(orderId) {
      const result = await this.$store.dispatch("shop/cancelOrder", {orderId});

      if (result.error === 0) {
        // Actualiser la liste des commandes après annulation
        await this.fetchOrders();
      } else {
        alert("Erreur lors de l'annulation de la commande");
      }
    }
  },
  async beforeMount() {
    // Récupérer les commandes de l'utilisateur lors du montage
    await this.fetchOrders();
  },
  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push('/shop/login');
    }
  },
};
</script>

<style scoped>
.order {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

button:disabled {
  background-color: #ffaf9c;
  cursor: not-allowed;
}

button {
  background-color: #f88265;
  margin-bottom: 15px;
}

button:hover:enabled {
  background-color: #ed613f;
}
</style>
