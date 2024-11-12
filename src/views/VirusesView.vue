<!--<template>-->
<!--  <div>-->
<!--    <h1>Les virus</h1>-->
<!--    <h2>Les virus dans le store en brut</h2>-->
<!--    <p>Le tableau dans le store : {{ viruses }}</p>-->

<!--    <div>-->
<!--      <h2>Tableau des virus</h2>-->
<!--      <table>-->
<!--        <thead>-->
<!--          <tr>-->
<!--            <th>ID</th>-->
<!--            <th>Nom</th>-->
<!--            <th>Description</th>-->
<!--            <th>Prix</th>-->
<!--            <th>Stock</th>-->
<!--            <th>Liens</th>-->
<!--          </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--          <tr v-for="item in viruses" :key="item._id">-->
<!--            <td>{{ item._id }}</td>-->
<!--            <td>{{ item.name }}</td>-->
<!--            <td>{{ item.description }}</td>-->
<!--            <td>{{ item.price }} €</td>-->
<!--            <td>{{ item.stock }}</td>-->
<!--            <td>-->
<!--              <ul>-->
<!--                <li style="list-style: none" v-for="link in item.links" :key="link">-->
<!--                  <a :href="link" target="_blank">{{ link }}</a>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </td>-->
<!--          </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </div>-->

<!--    <h2>Filtrer les virus</h2>-->

<!--    &lt;!&ndash; Filtre de prix &ndash;&gt;-->
<!--    <div>-->
<!--      <input type="checkbox" v-model="enablePriceFilter" id="enablePriceFilter">-->
<!--      <label for="enablePriceFilter">Activer le filtre de prix</label>-->
<!--      <br>-->
<!--      <label for="filterprice">Prix inférieur à : </label>-->
<!--      <input v-model="priceFilter" id="filterprice" type="number" @input="validatePriceFilter" :disabled="!enablePriceFilter">-->
<!--    </div>-->

<!--    &lt;!&ndash; Filtre de nom &ndash;&gt;-->
<!--    <div>-->
<!--      <input type="checkbox" v-model="enableNameFilter" id="enableNameFilter">-->
<!--      <label for="enableNameFilter">Activer le filtre de nom</label>-->
<!--      <br>-->
<!--      <label for="filtername">Nom du virus : </label>-->
<!--      <input v-model="nameFilter" id="filtername" type="text" :disabled="!enableNameFilter">-->
<!--    </div>-->

<!--    &lt;!&ndash; Filtre de stock &ndash;&gt;-->
<!--    <div>-->
<!--      <input type="checkbox" v-model="enableStockFilter" id="enableStockFilter">-->
<!--      <label for="enableStockFilter">Afficher seulement les virus en stock</label>-->
<!--    </div>-->

<!--    &lt;!&ndash; Tableau filtré avec les trois filtres combinés &ndash;&gt;-->
<!--    <h2>Résultats filtrés</h2>-->
<!--    <table v-if="combinedFilteredViruses.length > 0">-->
<!--      <thead>-->
<!--        <tr>-->
<!--          <th>Nom</th>-->
<!--          <th>Prix</th>-->
<!--          <th>Stock</th>-->
<!--        </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--        <tr v-for="virus in combinedFilteredViruses" :key="virus._id">-->
<!--          <td>{{ virus.name }}</td>-->
<!--          <td>{{ virus.price }} €</td>-->
<!--          <td>{{ virus.stock }}</td>-->
<!--        </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--    <p v-else>Aucun virus ne correspond aux critères de filtre.</p>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { mapState } from 'vuex';-->

<!--export default {-->
<!--  name: 'VirusesView',-->
<!--  data: () => ({-->
<!--    priceFilter: '',            // Valeur pour filtrer par prix-->
<!--    nameFilter: '',             // Valeur pour filtrer par nom-->
<!--    enablePriceFilter: false,   // Activation du filtre de prix-->
<!--    enableNameFilter: false,    // Activation du filtre de nom-->
<!--    enableStockFilter: false    // Activation du filtre de stock-->
<!--  }),-->
<!--  computed: {-->
<!--    ...mapState(['viruses']), // Mappe l'état des virus depuis le store-->

<!--    // Liste combinée avec les trois filtres activés-->
<!--    combinedFilteredViruses() {-->
<!--      let filteredViruses = this.viruses;-->

<!--      // Appliquer le filtre de prix si activé-->
<!--      if (this.enablePriceFilter && this.priceFilter !== '') {-->
<!--        const priceLimit = Number(this.priceFilter);-->
<!--        filteredViruses = filteredViruses.filter(virus => virus.price < priceLimit);-->
<!--      }-->

<!--      // Appliquer le filtre de nom si activé-->
<!--      if (this.enableNameFilter && this.nameFilter) {-->
<!--        const searchTerm = this.nameFilter.toLowerCase();-->
<!--        filteredViruses = filteredViruses.filter(virus => virus.name.toLowerCase().includes(searchTerm));-->
<!--      }-->

<!--      // Appliquer le filtre de stock si activé-->
<!--      if (this.enableStockFilter) {-->
<!--        filteredViruses = filteredViruses.filter(virus => virus.stock > 0);-->
<!--      }-->

<!--      return filteredViruses;-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    validatePriceFilter() {-->
<!--      const priceValue = Number(this.priceFilter);-->
<!--      if (isNaN(priceValue)) {-->
<!--        this.priceFilter = '';-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<template>
  <div style="margin-top: 10%">
    <h1>Les virus</h1>
    <h2>Les virus dans le store en brut</h2>
    <p>Le tableau dans le store : {{ viruses }}</p>

    <h2>Filtrer les virus</h2>

    <!-- Filtre de prix -->
    <div>
      <input type="checkbox" v-model="enablePriceFilter" id="enablePriceFilter">
      <label for="enablePriceFilter">Activer le filtre de prix</label>
      <br>
      <label for="filterprice">Prix inférieur à : </label>
      <input v-model="priceFilter" id="filterprice" type="number" @input="validatePriceFilter" :disabled="!enablePriceFilter">
    </div>

    <!-- Filtre de nom -->
    <div>
      <input type="checkbox" v-model="enableNameFilter" id="enableNameFilter">
      <label for="enableNameFilter">Activer le filtre de nom</label>
      <br>
      <label for="filtername">Nom du virus : </label>
      <input v-model="nameFilter" id="filtername" type="text" :disabled="!enableNameFilter">
    </div>

    <!-- Filtre de stock -->
    <div>
      <input type="checkbox" v-model="enableStockFilter" id="enableStockFilter">
      <label for="enableStockFilter">Afficher seulement les virus en stock</label>
    </div>

    <h2>Résultats filtrés</h2>
    <CheckedList
      :data="combinedFilteredViruses"
      :fields="['name', 'price']"
      :itemCheck="true"
      :checked="computedChecked"
      :itemButton="{ show: true, text: 'Détails' }"
      :listButton="{ show: true, text: 'Afficher sélectionnés' }"
      @checked-changed="handleCheckedChanged"
      @item-button-clicked="handleItemButtonClicked"
      @list-button-clicked="handleListButtonClicked"
    />
    <p v-if="combinedFilteredViruses.length === 0">Aucun virus ne correspond aux critères de filtre.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CheckedList from '@/components/CheckedList.vue'; // Assurez-vous que ce chemin est correct

export default {
  name: 'VirusesView',
  components: {
    CheckedList
  },
  data() {
    return {
      priceFilter: '',            // Valeur pour filtrer par prix
      nameFilter: '',             // Valeur pour filtrer par nom
      enablePriceFilter: false,   // Activation du filtre de prix
      enableNameFilter: false,    // Activation du filtre de nom
      enableStockFilter: false,    // Activation du filtre de stock
      selected: []                // Indices des virus sélectionnés
    };
  },
  computed: {
    ...mapState(['viruses']), // Mappe l'état des virus depuis le store

    // Liste combinée avec les trois filtres activés
    combinedFilteredViruses() {
      let filteredViruses = this.viruses;

      // Appliquer le filtre de prix si activé
      if (this.enablePriceFilter && this.priceFilter !== '') {
        const priceLimit = Number(this.priceFilter);
        filteredViruses = filteredViruses.filter(virus => virus.price < priceLimit);
      }

      // Appliquer le filtre de nom si activé
      if (this.enableNameFilter && this.nameFilter) {
        const searchTerm = this.nameFilter.toLowerCase();
        filteredViruses = filteredViruses.filter(virus => virus.name.toLowerCase().includes(searchTerm));
      }

      // Appliquer le filtre de stock si activé
      if (this.enableStockFilter) {
        filteredViruses = filteredViruses.filter(virus => virus.stock > 0);
      }

      return filteredViruses;
    },

    // Computed property pour gérer les cases à cocher
    computedChecked() {
      return this.combinedFilteredViruses.map((virus) => {
        return this.selected.includes(this.viruses.indexOf(virus));
      });
    }
  },
  methods: {
    validatePriceFilter() {
      const priceValue = Number(this.priceFilter);
      if (isNaN(priceValue)) {
        this.priceFilter = '';
      }
    },

    handleCheckedChanged(index) {
      const virusIndex = this.viruses.indexOf(this.combinedFilteredViruses[index]);
      const selectedIndex = this.selected.indexOf(virusIndex);

      // Si l'indice est déjà sélectionné, on le retire
      if (selectedIndex > -1) {
        this.selected.splice(selectedIndex, 1);
      } else {
        // Sinon, on l'ajoute
        this.selected.push(virusIndex);
      }
    },

    handleItemButtonClicked(index) {
      const virus = this.combinedFilteredViruses[index];
      alert(`Nom: ${virus.name}, Stock: ${virus.stock}, En vente: ${virus.stock > 0 ? 'Oui' : 'Non'}`);
    },

    handleListButtonClicked() {
      const selectedViruses = this.selected.map(index => {
        const virus = this.viruses[index];
        return virus.name;
      }).join(', ');
      alert(`Virus sélectionnés: ${selectedViruses}`);
    }
  }
}
</script>

<style scoped>
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
