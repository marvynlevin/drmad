<template>
  <div class="basket-container">
    <h2>Mon Panier</h2>
    <CheckedList
        :data="basketItems"
        :showDelete="true"
        @deleteItem="handleDeleteItem"
    />
    <button @click="clearBasket">Vider le panier</button>
    <button @click="checkout">Acheter</button>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";
import CheckedList from "@/components/CheckedList.vue";
import ShopService from "@/services/shop.service.js";

export default {
  name: "BasketList",
  components: {
    CheckedList,
  },
  computed: {
    ...mapState("shop", ["basket", "shopUser"]),
    ...mapGetters('shop', ['userId']),

    basketItems() {
      return this.basket.items.map(({item: itemId, amount}) => {
        const item = this.$store.state.shop.viruses.find(virus => virus._id === itemId);
        return item ? {id: item._id, label: `${item.name} x${amount}`} : null;
      }).filter(item => item !== null);
    },
  },
  methods: {
    ...mapActions("shop", ["fetchBasket", "removeItemFromBasket", "clearBasket"]),
    handleDeleteItem(index) {
      const itemId = this.basket.items[index].item;
      this.removeItemFromBasket(itemId);
      console.log(this.basketItems);
    },
    async checkout() {
      if (this.basket.items.length === 0) {
        alert("Votre panier est vide !");
        return;
      }

      const {data: viruses} = await ShopService.getAllViruses();

      // Création de l'objet commande
      const order = {
        items: this.basket.items.map(({item: itemId, amount}) => {
          const item = viruses.find(virus => virus._id === itemId);

          if (item) {
            return {
              item: {
                name: item.name,
                description: item.description,
                price: item.price,
                promotion: item.promotion,
                object: item.object,
              },
              amount,
            };
          } else {
            console.error(`Article avec l'ID ${itemId} introuvable`);
            return null;
          }
        }).filter(item => item !== null), // Filtrer les éléments invalides
        date: new Date().toISOString(),
      };

      console.log("Order :", JSON.stringify(order.items, null, 2));

      try {
        const response = await ShopService.createOrder(this.userId, order);

        if (response.error === 0) {
          alert("Commande validée avec succès !");
          const uuid = response.data.uuid;

          // Vider le panier et rediriger vers /shop/pay/:uuid
          this.clearBasket();
          this.$router.push(`/shop/pay/${uuid}`);
        } else {
          alert(`Erreur lors de la commande : ${response.data}`);
        }
      } catch (error) {
        console.error("Erreur lors de l'achat :", error);
      }
    },
  },
  created() {
    this.fetchBasket();
  },
};
</script>

<style scoped>
button {
  margin-bottom: 15px;
}
</style>