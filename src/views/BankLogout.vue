<template>
  <div style="margin-top: 30px; margin-left: 12%; margin-right: 12%;">
    <h2>Déconnexion en cours...</h2>
    <p>Vous allez être redirigé vers la page d'accueil.</p>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "BankLogout",
  methods: {
    ...mapActions("bank", ["logout"]),

    handleLogout() {
      // Effacer le compte courant dans Vuex
      this.logout();

      // Rediriger après un délai de 1 seconde
      setTimeout(() => {
        this.$router.push("/bank");
      }, 1000);
    }
  },
  mounted() {
    this.handleLogout();
  }
};
</script>