<template>
  <div id="app">
      <NavBar
          :links="dynamicLinks"
      >
        <template #nav-button="{ label }">

          <!-- Affichage de l'image pour 'boutique' -->
          <img v-if="label === 'boutique'" src="@/assets/logoDrMad.svg" alt="Shop Icon"
               @click="handleLogoClick('shop')"/>

          <!-- Affichage de l'image pour 'banque' -->
          <img v-else-if="label === 'banque'" src="@/assets/logoRevolout.svg" alt="Bank Icon"
               @click="handleLogoClick('bank')"/>
        </template>
      </NavBar>
    <!-- Vue affichée en fonction de la route -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {mapMutations} from "vuex";

export default {
  name: 'App',
  components: {NavBar},
  data() {
    return {
      dynamicLinks: [
        {label: "boutique", to: "/shop", color: "#FF8264"},
        {label: "banque", to: "/bank", color: "#FF8264"},
      ],
    };
  },
  methods: {
    ...mapMutations("shop", ["updateShopUser"]),

    // logoutUser() {
    //   this.updateShopUser(null);  // Mise à jour du store pour déconnecter l'utilisateur
    //   localStorage.removeItem("shopUser");  // Nettoyage du localStorage
    //   this.$router.push({name: "ShopLogin"});  // Redirection vers la page de login
    // },

    handleLogoClick(target) {

      // Effectuer la déconnexion
      // this.logoutUser();

      // Vérifier si la route actuelle est déjà la page de login
      if (this.$route.name !== 'ShopLogin') {
        // Si ce n'est pas la page de login, alors on redirige
        if (target === 'shop') {
          this.$router.push({name: 'ShopLogin'});
        } else if (target === 'bank') {
          this.$router.push({name: 'BankLogin'});
        }
      }
    }
  },
};
</script>

<style>
h1, h2, h3, h4, h5, h6, p, a, li, ul, u, button, input, span, label, th, td {
  font-family: "Bahnschrift", Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #FFAA64;
  font-weight: bolder;
  font-style: italic;
}

h2 {
  color: #FFAA64;
}

u {
  font-size: 20px;
  text-decoration-color: #FF8264;
  text-decoration-style: solid;
}

button {
  padding: 15px 50px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  border-radius: 10px;
}

button:disabled {
  background-color: #ffaf9c;
  cursor: not-allowed;
}

button {
  background-color: #f88265;
  margin-bottom: 15px;
}

button:hover:enabled {
  background-color: #ed613f;
}

input {
  margin: 10px;
  padding: 10px 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  border: 2px solid #FFAA64;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #FFAA64;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: column;
}

.error {
  margin-top: 10px;
  color: red;
}

.success {
  margin-top: 10px;
  color: green;
}
</style>
