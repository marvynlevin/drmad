<template>
  <div style="margin-top: 30px; margin-left: 12%; margin-right: 12%;">
    <h2>Page des soldes</h2>
    <div style="display: flex; flex-direction: column; width: 100%">
      <!-- Utilisation du scoped-slot pour afficher le solde -->
      <slot
          name="account-amount"
          :balance="accountAmount"
      >

        <!-- Affichage par défaut du solde -->
        <input
            type="text"
            :value="accountAmount + ' €'"
            :class="{'negative': accountAmount < 0, 'positive': accountAmount >= 0}"
            readonly
        />
      </slot>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'BankAmount',
  components: {},
  computed: {
    ...mapState("bank", ["accountAmount"]),
    ...mapGetters("bank", ['isUserLoggedIn']),
  },
  created() {
    const accountNumber = this.$route.params.accountNumber;
    if (accountNumber) {
      this.getAccountAmount(accountNumber);
    }
  },
  methods: {
    ...mapActions("bank", ["getAccountAmount"]),
  },

  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push('/bank/home');
    }
  },
}
</script>

<style scoped>
input.positive {
  color: #0e6e0e;
}

input.negative {
  color: #b11414;
}
</style>