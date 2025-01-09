<template>
  <div>
    <h2>Page de paiement</h2>
    <p>Commande ID: {{ orderId }}</p>

    <!-- Champ de saisie pour l'ID de commande -->
    <input
        type="text"
        placeholder="Entrez l'ID de la commande"
        v-model="orderInput"
    />

    <!-- Bouton de paiement -->
    <button @click="payOrder">Payer</button>
  </div>
</template>

<script>
import shopService from '../services/shop.service';

export default {
  name: 'ShopPay',
  // La props orderId est passée par le parent
  props: ['orderId'],
  data() {
    return {
      // Initialisation du champ de saisie avec la props ou une valeur vide
      orderInput: this.orderId || '',
    };
  },
  methods: {
    async payOrder() {
      // Utiliser l'ID saisi dans le champ ou la prop
      const orderId = this.orderInput;

      // Vérifier que l'ID de commande est valide
      if (!orderId) {
        alert("Veuillez entrer un ID de commande.");
        return;
      }

      // Appeler la méthode de paiement du service
      const result = await shopService.payOrder(orderId, this.$store.state.shop.shopUser._id);

      if (result.error) {
        // Afficher l'erreur si la commande n'a pas été trouvée
        alert(result.data);
      } else {
        alert("Commande payée avec succès !");

        // Rediriger vers la page des commandes
        this.$router.push(`/shop/orders`);
      }
    }
  }
};
</script>

<style scoped>
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
