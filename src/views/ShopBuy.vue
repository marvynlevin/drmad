<template>
  <div>
    <h2>Page d'achat</h2>
    <div class="flex">
      <!-- Liste des articles -->
      <div class="row border">
        <ItemsList></ItemsList>
      </div>

      <!-- Panier -->
      <div class="row border">
        <BasketList></BasketList>
      </div>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/ItemList.vue';
import BasketList from '@/components/BasketList.vue';
import {mapGetters} from "vuex";

export default {
  name: 'ShopBuy',
  components: {
    ItemsList,
    BasketList
  },

  computed: {
    ...mapGetters("shop", ['isUserLoggedIn']),
  },

  // Si on est plus connecté alors, on retourne à la page de login (idem pour toutes les autres pages)
  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push('/shop/login');
    }
  },
}
</script>

<style scoped>
.flex {
  display: flex;
}

.row {
  padding: 10px;
  margin: 5px;
  flex-direction: row;
}

.border {
  border: 1px solid #bc7a22;
  border-radius: 10px;
  width: 50%;
  max-width: 50vw;
  min-height: 65vh;
}

button:disabled {
  background-color: #ffaf9c;
  cursor: not-allowed;
}

button {
  background-color: #FF8264;
}

button:hover:enabled {
  background-color: #FF8264;
}
</style>
