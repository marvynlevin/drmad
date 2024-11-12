<template>
  <div>
    <ul>
      <!-- Boucle pour chaque item dans data -->
      <li v-for="(item, index) in data" :key="index" style="display: flex; align-items: center;">

        <!-- Affichage de la case à cocher si itemCheck est vrai -->
        <input
          v-if="itemCheck"
          type="checkbox"
          :checked="checked[index]"
          @change="emitCheckedChanged(index)"
          style="margin-right: 10px;"
        />

        <!-- Affichage des champs de l'item selon fields -->
        <span>
          <span v-for="field in fields" :key="field" style="margin-right: 10px;">
            {{ item[field] }}
          </span>
        </span>

        <!-- Bouton de l'item si itemButton.show est vrai -->
        <button
          v-if="itemButton.show"
          @click="emitItemButtonClicked(index)"
        >
          {{ itemButton.text }}
        </button>

      </li>
    </ul>

    <!-- Bouton de la liste si listButton.show est vrai -->
    <button
      v-if="listButton.show"
      @click="emitListButtonClicked"
    >
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CheckedList',
  props: {
    data: Array,         // Les données sources
    fields: Array,       // Champs à afficher pour chaque objet
    itemCheck: Boolean,  // Si les items ont une case à cocher
    checked: Array,      // État de chaque case à cocher
    itemButton: Object,  // Paramètres pour le bouton de chaque item
    listButton: Object,  // Paramètres pour le bouton global de la liste
  },
  methods: {
    // Émet l'événement checked-changed avec l'indice de la case cochée
    emitCheckedChanged(index) {
      this.$emit('checked-changed', index);
    },

    // Émet l'événement item-button-clicked avec l'indice du bouton cliqué
    emitItemButtonClicked(index) {
      this.$emit('item-button-clicked', index);
    },

    // Émet l'événement list-button-clicked quand le bouton global est cliqué
    emitListButtonClicked() {
      this.$emit('list-button-clicked');
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

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
