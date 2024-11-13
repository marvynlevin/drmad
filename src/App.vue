<template>
  <div id="app">

    <!-- Instance de NavBar avec écoute de l'événement menu-clicked -->
    <NavBar style="z-index: 2;" :titles="menuItems" @menu-clicked="navigateToView"/>

    <!-- Affiche la vue en fonction de la route actuelle -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import {mapActions} from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      // Définit les boutons du menu avec leur texte et couleur
      menuItems: [
        // { text: 'Viruses', color: '#416E3E' },
        // { text: 'Compte bancaire', color: '#5B3E6E' },
        {text: 'Login', color: '#FF8264'},
      ],
    };
  },
  methods: {
    ...mapActions(['getAllViruses']),

    navigateToView(index) {
      try {
        switch (index) {
            // case 0:
            //   this.$router.push({ name: 'VirusesView' }).catch((error) => {
            //     if (error.name !== 'NavigationDuplicated') {
            //       throw error;
            //     }
            //   });
            //   break;
            // case 1:
            //   this.$router.push({ name: 'BankAccountView' }).catch((error) => {
            //     if (error.name !== 'NavigationDuplicated') {
            //       throw error;
            //     }
            //   });
            //   break;
          case 0:
            this.$router.push({name: 'ShopLogin'}).catch((error) => {
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
  // mounted() {
  //   this.getAllViruses();
  // },
};
</script>

<style>
body {
  margin-left: 12%;
  margin-right: 12%;
}

h1, h2, h3, h4, h5, h6, p, a, li, ul, button, input, span {
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
