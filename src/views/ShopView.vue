<template>
  <div>
    <div class="bg-navbar">
      <NavBar
          :links="dynamicMenuItems"
          @logout="logoutUser"
      />
    </div>

    <div style="margin-top: 30px; margin-left: 12%; margin-right: 12%;">
      <h1>Boutique</h1>
      <router-view name="shopmain"></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {mapMutations, mapState} from "vuex";

export default {
  name: 'ShopView',
  components: {NavBar},
  computed: {
    ...mapState("shop", ["shopUser"]),
    isUserLoggedIn() {
      return this.shopUser !== null; // Vérifie si l'utilisateur est connecté
    },
    dynamicMenuItems() {
      if (this.isUserLoggedIn) {
        // Si connecté, afficher le menu complet
        return [
          {label: "Boutique", color: "#FF8264", to: "/shop/buy"},
          {label: "Commandes", color: "#FF8264", to: "/shop/orders"},
          {label: "Payer", color: "#FF8264", to: "/shop/pay"},
          {label: "Logout", color: "#c14e33", to: "/shop/login"},
        ];
      } else {
        // Si non connecté, afficher uniquement Login
        return [
          {label: "Authentification", color: "#FF8264", to: "/shop/login"},
        ];
      }
    },
  },

  methods: {
    ...mapMutations("shop", ["updateShopUser"]),

    logoutUser() {
      this.updateShopUser(null);  // Mise à jour du store pour déconnecter l'utilisateur
      localStorage.removeItem("shopUser");  // Nettoyage du localStorage
      this.$router.push({name: "ShopLogin"});  // Redirection vers la page de login
    },
  },
};
</script>

<style scoped>
.bg-navbar {
  border-bottom: 2px solid #FF8264;
  background-color: white;
}
</style>