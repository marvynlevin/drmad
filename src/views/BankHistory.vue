<template>
  <div style="margin-top: 30px; margin-left: 12%; margin-right: 12%;">
    <h2>
      <slot name="title">Opérations passées</slot>
    </h2>

    <!-- Filtrage par période -->
    <div style="margin-bottom: 20px;">
      <label>
        <input type="checkbox" v-model="filterActive"/>
        Filtrer par période
      </label>
      <div v-if="filterActive" style="margin-top: 10px;">
        <label>
          Du :
          <input type="date" v-model="startDate" @input="validateDates"/>
        </label>
        <label style="margin-left: 10px;">
          Au :
          <input type="date" v-model="endDate" @input="validateDates"/>
        </label>
      </div>
    </div>

    <!-- Table des transactions -->
    <DataTable
        :headers="tableHeaders"
        :items="filteredTransactions"
        ref="resetCheckBox"
        itemCheck
        itemButton
        tableButton
        @itemClicked="showTransactionDetails"
        @tableClicked="showSelectedTransactions"
    >

      <template #cell-amount="{ item }">
        <span :class="item.formattedAmount.class">
          {{ item.formattedAmount.value }} €
        </span>
      </template>

      <template #cell-type="{ item }">
        <span>{{ item.type }}</span>
      </template>

      <template #item-button-label>
        Détails
      </template>
      <template #table-button-label>
        Voir
      </template>
    </DataTable>

    <!-- Dialogues -->
    <div v-if="dialogVisible" class="dialog">
      <div class="dialog-content">
        <h3>Transaction(s) sélectionnée(s)</h3>
        <p v-html="dialogMessage"></p>
        <button @click="dialogVisible = false">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BankHistory",
  components: {
    DataTable,
  },
  data() {
    return {
      filterActive: false,
      startDate: null,
      endDate: null,
      transactions: [], // Initialement vide
      dialogVisible: false,
      dialogMessage: "",
      tableHeaders: [
        {label: "Montant", name: "amount"},
        {label: "Date", name: "date"},
        {label: "Type", name: "type"},
      ],
    };
  },
  computed: {
    ...mapGetters("bank", ["getTransactions", "getCurrentAccount", "isUserLoggedIn"]),

    filteredTransactions() {
      let filtered = [...this.transactions].sort(
          (a, b) => new Date(b.date) - new Date(a.date) // Tri décroissant
      );

      if (this.filterActive) {
        if (this.startDate) {
          filtered = filtered.filter(
              (t) => new Date(t.date) >= new Date(this.startDate)
          );
        }
        if (this.endDate) {
          filtered = filtered.filter(
              (t) => new Date(t.date) <= new Date(this.endDate)
          );
        }
      }

      return filtered.map((item) => ({
        ...item,
        formattedAmount: this.formatAmount(item.amount),
        type: item.amount < 0 ? "S" : "D",
      }));
    },
  },
  methods: {
    ...mapActions("bank", ["getAccountTransactions"]),

    validateDates() {
      if (this.startDate && this.endDate && this.startDate > this.endDate) {
        if (this.startDate) {
          this.endDate = null;
        } else {
          this.startDate = null;
        }
      }
      this.$refs.resetCheckBox.resetSelection();

    },
    showTransactionDetails(transaction) {
      this.dialogMessage = `Transaction sélectionnée : <br><br> ${transaction.id}`;
      this.dialogVisible = true;
    },
    showSelectedTransactions(selectedTransactions) {
      if (selectedTransactions.length === 0) {
        this.dialogMessage = "Aucune transaction sélectionnée.";
      } else {
        const ids = selectedTransactions.map((t) => t.id).join(", <br> ");
        this.dialogMessage = `Transactions sélectionnées : <br><br> ${ids}`;
      }
      this.dialogVisible = true;
    },
    loadTransactions() {
      // Charge les transactions du getter Vuex
      const transactions = this.getTransactions;

      // Transforme et stocke les transactions
      this.transactions = transactions.map((t) => ({
        id: t.uuid,
        amount: t.amount,
        date: new Date(t.date["$date"]).toISOString().split("T")[0],
      }));
    },

    formatAmount(amount) {
      return {
        value: amount,
        class: amount < 0 ? "negative" : "positive",
      };
    },
  },
  mounted() {
    if (this.getCurrentAccount !== null) {
      this.loadTransactions();
    }

    if (!this.isUserLoggedIn) {
      this.$router.push('/bank/home');
    }
  },
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.positive {
  color: #0e6e0e;
}

.negative {
  color: #b11414;
}
</style>