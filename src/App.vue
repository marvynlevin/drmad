<template>
  <div id="app">

    <!-- Instance de NavBar avec écoute de l'événement menu-clicked -->
    <NavBar style="z-index: 2;"
            :titles="dynamicMenuItems"
            @menu-clicked="navigateToView"/>

    <!-- Affiche la vue en fonction de la route actuelle -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  methods: {
    navigateToView(index) {
      try {
        if (this.isUserLoggedIn) {
          // Menu pour les utilisateurs connectés
          switch (index) {
            case 0: // Buy
              this.$router.push({name: 'ShopBuy'}).catch((error) => {
                if (error.name !== 'NavigationDuplicated') {
                  throw error;
                }
              });
              break;
            case 1: // Orders
              this.$router.push({name: 'ShopOrders'}).catch((error) => {
                if (error.name !== 'NavigationDuplicated') {
                  throw error;
                }
              });
              break;
            case 2: // Pay
              this.$router.push({name: 'ShopPayWithOutId'}).catch((error) => {
                if (error.name !== 'NavigationDuplicated') {
                  throw error;
                }
              });
              break;
            case 3: // Logout
              this.logoutUser();
              break;
            default:
              console.error('Index de menu invalide pour un utilisateur connecté:', index);
          }
        } else {
          // Menu pour les utilisateurs non connectés
          switch (index) {
            case 0: // Login
              this.$router.push({name: 'ShopLogin'}).catch((error) => {
                if (error.name !== 'NavigationDuplicated') {
                  throw error;
                }
              });
              break;
            default:
              console.error('Index de menu invalide pour un utilisateur non connecté:', index);
          }
        }
      } catch (error) {
        console.error('Erreur de navigation:', error);
      }
    },
    logoutUser() {
      // Supprimer l'utilisateur du store et du localStorage
      this.$store.commit('shop/updateShopUser', null);
      localStorage.removeItem('shopUser');
      this.$router.push({name: 'ShopLogin'}); // Rediriger vers la page de connexion
    },
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.state.shop.shopUser !== null; // Vérifie si un utilisateur est connecté
    },
    dynamicMenuItems() {
      if (this.isUserLoggedIn) {
        // Si l'utilisateur est connecté, afficher tous les boutons
        return [
          {text: 'Buy', color: '#FF8264'},
          {text: 'Orders', color: '#FF8264'},
          {text: 'Pay', color: '#FF8264'},
          {text: 'Logout', color: '#c14e33'},
        ];
      } else {
        // Si l'utilisateur n'est pas connecté, afficher uniquement le bouton Login
        return [
          {text: 'Login', color: '#FF8264'},
        ];
      }
    },
  },

};
</script>

<style>
body {
  margin-left: 12%;
  margin-right: 12%;
}

h1, h2, h3, h4, h5, h6, p, a, li, ul, button, input, span, label {
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

input {
  margin: 10px;
  padding: 10px 20px;
}
</style>
