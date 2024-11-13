<template>
  <div>
    <h2>Page de paiement</h2>
    <p>Commande ID: {{ orderId }}</p> <!-- Affichage de l'orderId passé en props -->
  </div>
</template>

<script>
export default {
  name: 'ShopPay',
  props: ['orderId'],  // Le paramètre orderId est passé comme prop
};
</script>


<style scoped>

</style>