<template>
  <div>
    <ul>
      <!-- Boucle pour chaque item dans data -->
      <li v-for="(item, index) in data" :key="item.realIndex" style="display: flex; align-items: center;">
        <span>{{ item.label }}</span> <!-- Affiche le label de l'élément -->

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

        <!-- Affichage du champ de saisie numérique si itemAmount est vrai -->
        <input
            v-if="itemAmount"
            type="number"
            v-model.number="amountValues[item.realIndex]"
            style="margin-right: 10px; width: 60px;"
            :min="0"
            :max="item.stock"
            @input="validateAmount(item.realIndex); initStock()"
            :placeholder="'0'"
        />

        <!-- Bouton de l'item si itemButton.show est vrai -->
        <button
            v-if="itemButton.show"
            @click="emitItemButtonClicked(item.realIndex, amountValues[item.realIndex])"
            :disabled="amountValues[item.realIndex] == 0 || amountValues[item.realIndex] > item.stock"
        >
          {{ itemButton.text }}
        </button>

        <!-- Affichage du bouton de suppression -->
        <button
            v-if="showDelete"
            @click="deleteItem(index)">
          Supprimer
        </button>
      </li>
    </ul>

    <div class="border-top-full"></div>

    <!-- Bouton de la liste si listButton.show est vrai -->
    <button
        v-if="listButton.show"
        @click="emitListButtonClickedWithSelectedItems"
    >
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CheckedList',
  props: {
    data: Array,
    fields: Array,
    itemCheck: Boolean,
    checked: {
      type: Array,
      default: () => [],
    },
    itemButton: {
      type: Object,
      default: () => ({show: false, text: 'Ajouter au panier'})
    },
    listButton: {
      type: Object,
      default: () => ({show: false, text: 'Ajouter sélectionnés au panier'})
    },
    itemAmount: Boolean,
    showDelete: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      // amountValues = { 0: 10, 1: 5, 2: 0, 3: 0 };
      amountValues: this.data.reduce((i, item) => {
        i[item.realIndex] = item.stock || 0;
        return i;
      }, {}),
    };
  },
  watch: {
    data(newData) {
      console.log('Données reçues dans CheckedList:', newData);
    }
  },
  methods: {
    // Émet l'événement checked-changed avec l'indice de la case cochée
    emitCheckedChanged(index) {
      this.$emit('checked-changed', index);
    },

    // Émet l'événement item-button-clicked avec l'indice du bouton cliqué et la valeur du champ numérique
    emitItemButtonClicked(realIndex, amount) {
      if (amount && realIndex >= 0) {
        this.$emit('item-button-clicked', { index: realIndex, amount });
      } else {
        console.error("Erreur : index ou quantité non valide", { realIndex, amount });
      }
    },

    // Émet l'événement list-button-clicked avec les couples indice/valeur champ numérique pour les items sélectionnés
    emitListButtonClickedWithSelectedItems() {
      const selectedItems = this.checked
          .map((isChecked, index) => isChecked ? {
            index: this.data[index].realIndex,
            amount: this.amountValues[this.data[index].realIndex] || 0
          } : null)
          .filter(item => item !== null);

      this.$emit('list-button-clicked', selectedItems);

      // Désélectionne les items après l'émission de l'événement
      this.$emit('update:checked', this.checked.map(() => false));
    },

    // Émet l'événement deleteItem avec l'indice du bouton cliqué
    deleteItem(index) {
      this.$emit('deleteItem', index);
    },

    // Validation de la quantité (empêcher les valeurs invalides)
    validateAmount(index) {
      const item = this.data[index];
      const stock = item.stock || 0;
      const amount = this.amountValues[item.realIndex];

      if (amount < 0) {
        this.amountValues[item.realIndex] = 0;
      } else if (amount > stock) {
        this.amountValues[item.realIndex] = stock;
      }
    },

    // Fonction initStock pour réinitialiser les quantités
    initStock() {
      console.log('Stock mis à jour!');
      this.data.forEach((item) => {
        if (!this.amountValues[item.realIndex]) {
          this.$set(this.amountValues, item.realIndex, item.stock || 0);
        }
      });
    },
  },
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

button:disabled {
  background-color: #ffaf9c;
  cursor: not-allowed;
}

button {
  background-color: #f88265;
}

button:hover:enabled {
  background-color: #ed613f;
}

.border-top-full {
  border-top: 1px solid #ed613f;
  margin-bottom: 17px;
}

input {
  margin: 10px 0;
  padding: 8px;
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
