<template>
  <div id="app">

    <!-- Instance de NavBar avec écoute de l'événement menu-clicked -->
    <NavBar :titles="menuItems" @menu-clicked="navigateToView" />

    <!-- Affiche la vue en fonction de la route actuelle -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      // Définit les boutons du menu avec leur texte et couleur
      menuItems: [
        { text: 'Viruses', color: '#416E3E' },
        { text: 'Compte bancaire', color: '#5B3E6E' },
        { text: 'Login', color: '#3E5B6E' },
      ],
    };
  },
  methods: {
    ...mapActions(['getAllViruses']),

    navigateToView(index) {
      try {
        switch (index) {
          case 0:
            this.$router.push({ name: 'VirusesView' }).catch((error) => {
              if (error.name !== 'NavigationDuplicated') {
                throw error;
              }
            });
            break;
          case 1:
            this.$router.push({ name: 'BankAccountView' }).catch((error) => {
              if (error.name !== 'NavigationDuplicated') {
                throw error;
              }
            });
            break;
          case 2:
            this.$router.push({ name: 'ShopLoginView' }).catch((error) => {
              if (error.name !== 'NavigationDuplicated') {
                throw error;
              }
            });
            break;
          default:
            console.error('Index de menu invalide:', index);
        }
      } catch (error) {
        console.error('Erreur de navigation:', error);
      }
    },
  },
  mounted() {
    this.getAllViruses();
  },
};
</script>

<style scoped>
/* Styles d'application */
</style>
