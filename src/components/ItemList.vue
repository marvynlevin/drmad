<template>
  <div>
    <h2>Gestion des Items</h2>

    <!-- Filtres -->
    <div>
      <!-- Filtre de prix -->
      <div>
        <input type="checkbox" v-model="enablePriceFilter" id="enablePriceFilter">
        <label for="enablePriceFilter">Activer le filtre de prix</label>
        <br>
        <label for="filterprice">Prix inférieur à : </label>
        <input v-model="priceFilter" id="filterprice" type="number" @input="validatePriceFilter"
               :disabled="!enablePriceFilter">
      </div>

      <!-- Filtre de nom -->
      <div>
        <input type="checkbox" v-model="enableNameFilter" id="enableNameFilter">
        <label for="enableNameFilter">Activer le filtre de nom</label>
        <br>
        <label for="filtername">Nom de l'item : </label>
        <input v-model="nameFilter" id="filtername" type="text" :disabled="!enableNameFilter">
      </div>

      <!-- Filtre de stock -->
      <div>
        <input type="checkbox" v-model="enableStockFilter" id="enableStockFilter">
        <label for="enableStockFilter">Afficher seulement les items en stock</label>
      </div>
    </div>

    <div class="border-top-full"></div>

    <!-- Affichage des items avec le composant CheckedList -->
    <CheckedList
        :data="filteredItems"
        :fields="['name', 'price']"
        :itemCheck="true"
        :checked="checked"
        :itemButton="{ show: true, text: 'Ajouter au panier' }"
        :listButton="{ show: true, text: 'Ajouter sélectionnés au panier' }"
        :itemAmount="true"
        @checked-changed="updateChecked"
        @item-button-clicked="addItemToCart"
        @list-button-clicked="addSelectedItemsToCart"
    />
    <p v-if="filteredItems.length === 0">Aucun item ne correspond aux critères de filtre.</p>

    <div class="border-top-full"></div>

    <div>
      <!-- Parcourir les données pour chaque virus -->
      <div v-for="(item, index) in viruses" :key="index">

        <!-- Affichage des promotions uniquement si elles existent -->
        <div v-if="item.promotion && item.promotion.length > 0">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p v-for="promo in item.promotion" :key="promo._id">
            Promotion: {{ promo.discount }}% de réduction pour un achat de {{ promo.amount }} ou plus
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckedList from './CheckedList.vue';
import {mapState, mapActions} from 'vuex';

export default {
  name: 'ItemsList',
  components: {
    CheckedList
  },
  data() {
    return {
      priceFilter: '',
      nameFilter: '',
      enablePriceFilter: false,
      enableNameFilter: false,
      enableStockFilter: false,
      checked: [],
    };
  },
  computed: {
    ...mapState("shop", ['viruses', 'shopUser']),

    // Applique les filtres pour obtenir les items filtrés
    filteredItems() {
      let items = this.viruses;


      // Filtrer par prix
      if (this.enablePriceFilter && this.priceFilter !== '') {
        const priceLimit = Number(this.priceFilter);
        items = items.filter(item => item.price < priceLimit);
      }

      // Filtrer par nom
      if (this.enableNameFilter && this.nameFilter) {
        const searchTerm = this.nameFilter.toLowerCase();
        items = items.filter(item => item.name.toLowerCase().includes(searchTerm));
      }

      // Filtrer par stock
      if (this.enableStockFilter) {
        items = items.filter(item => item.stock > 0);
      }

      // Ajout d'une propriété `realIndex` pour conserver l'index d'origine
      return items.map(item => ({
        ...item,
        realIndex: this.viruses.findIndex(virus => virus === item), // Trouver l'index réel
      }));
    }
  },
  watch: {
    priceFilter: "resetChecked",
    nameFilter: "resetChecked",
    enablePriceFilter: "resetChecked",
    enableNameFilter: "resetChecked",
    enableStockFilter: "resetChecked",

    viruses(newViruses) {
      // Initialise les cases à cocher en fonction des données
      if (Array.isArray(newViruses)) {
        this.checked = newViruses.map(() => false);
      } else {
        console.warn('viruses doit être un tableau.');
      }
    }
  },
  mounted() {
    // Initialise les cases à cocher lors du montage
    this.getAllViruses();
    this.checked = this.viruses.map(() => false);
  },
  methods: {
    ...mapActions("shop", ["getAllViruses", "addItemToBasket"]),

    // Valide la valeur du filtre de prix
    validatePriceFilter() {
      const priceValue = Number(this.priceFilter);
      if (isNaN(priceValue)) {
        this.priceFilter = '';
      }
    },

    // Gère l'ajout individuel au panier
    addItemToCart({index, amount}) {
      const virus = this.viruses[index];
      console.log("Virus à ajouter :", virus, "Quantité :", amount);

      // Vérifie que le virus existe avant de l'ajouter
      if (amount > 0 && virus) {
        // Appel de l'action Vuex pour ajouter l'item au panier
        this.addItemToBasket({item: virus, amount});
      } else {
        console.error("Virus ou quantité non valide.", {item: virus, amount});
      }
    },

    // Gère l'ajout des éléments sélectionnés au panier
    addSelectedItemsToCart(selectedItems) {
      selectedItems.forEach(({index, amount}) => {
        const virus = this.viruses[index];
        if (amount > 0 && virus) {
          console.log(virus);
          this.addItemToBasket({item: virus, amount});
        }
      });
    },

    // Met à jour la liste des cases cochées
    updateChecked(newChecked) {
      this.checked[newChecked] = true;
    },

    // Réinitialiser à false les cases à cocher
    resetChecked() {
      this.checked = [];
    },
  },
};
</script>

<style scoped>
.border-top-full {
  border-top: 1px solid #ed613f;
  margin-bottom: 17px;
  margin-top: 15px;
}
</style>