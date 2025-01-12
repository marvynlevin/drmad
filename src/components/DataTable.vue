<template>
  <div>
    <table>
      <thead>
      <tr>
        <th v-if="itemCheck">Selection</th>
        <th v-for="header in headers" :key="header.name">
          {{ header.label }}
        </th>
        <th v-if="itemButton">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item._id">
        <td v-if="itemCheck">
          <input type="checkbox" v-model="selectedItems" :value="item"/>
        </td>

        <td v-for="header in headers" :key="header.name">

          <!-- Vérifier si le nom de la colonne est amount -->
          <span v-if="header.name === 'amount'" :class="getAmountClass(item[header.name])">
            {{ item[header.name] }} €
          </span>

          <!-- Sinon afficher la valeur directement -->
          <span v-else>
            {{ item[header.name] }}
          </span>
        </td>

        <td v-if="itemButton">
          <button @click="handleItemClick(item)">
            <slot name="item-button-label">Bouton</slot>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="tableButton" style="margin-top: 30px">
      <button @click="handleTableClick">
        <slot name="table-button-label">Envoyer</slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  components: {},
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemCheck: {
      type: Boolean,
      default: false,
    },
    itemButton: {
      type: Boolean,
      default: false,
    },
    tableButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedItems: [], // Stocke les objets sélectionnés
    };
  },
  methods: {
    // Emet événement avec item cliqué
    handleItemClick(item) {
      this.$emit("itemClicked", item);
    },

    // Emet événement avec items sélectionnés
    handleTableClick() {
      this.$emit("tableClicked", this.selectedItems);
    },

    // Méthode pour déterminer la classe du montant verte ou rouge
    getAmountClass(amount) {
      return amount < 0 ? "negative" : "positive";
    },

    // Reset la selection des checkbox
    resetSelection() {
      this.selectedItems = [];
    },
  },
};
</script>

<style scoped>
.positive {
  color: #0e6e0e;
}

.negative {
  color: #b11414;
}

button {
  padding: 10px 20px;
  margin: auto;
  display: flex;
  border: none;
  color: white;
  background-color: #f88265;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
</style>