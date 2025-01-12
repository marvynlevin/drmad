<template>
  <div>
    <!-- Barre de navigation -->
    <div class="bg-navbar">
      <NavBar
          :links="navBarLink"
          @logout="handleLogout"
      />
    </div>

    <div style="display: flex; margin-top: 0px; margin-left: 2%; margin-right: 2%;">
      <!-- Menu vertical à gauche -->
      <VerticalMenu
          :items="verticalMenuItems"
          :ifCurrentAccount="ifCurrentAccount"
      >
        <template #menu-title="{ label }">
          <strong><u>{{ label }}</u></strong>
        </template>
      </VerticalMenu>

      <!-- Contenu central avec vue dynamique -->
      <div style="flex-grow: 1; margin-left: 20px;">
        <h1>Banque</h1>
        <router-view name="bankmain">
          <template #account-amount="{ balance }">
            <input
                type="text"
                :value="balance + ' €'"
                readonly
                :class="{'negative': balance < 0, 'positive': balance >= 0}"
            />
          </template>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import VerticalMenu from "@/components/VerticalMenu.vue";
import {mapState, mapGetters, mapActions} from "vuex";

export default {
  name: 'BankView',
  components: {
    NavBar,
    VerticalMenu
  },
  data() {
    return {
      navBarLink: [],
      verticalMenuItems: [
        {type: "title", label: "Opérations"},
        {type: "link", label: "Solde", to: "/bank/amount"},
        {type: "link", label: "Débit/Virement", to: "/bank/operation"},
        {type: "title", label: "États"},
        {type: "link", label: "Relevé", to: "/bank/history"},
      ]
    };
  },
  computed: {
    ...mapState("bank", ["accountAmount", "currentAccount"]),
    ...mapGetters("bank", ["isUserLoggedIn"]),

    // Récupère la valeur de "ifCurrentAccount"
    ifCurrentAccount() {
      return this.isUserLoggedIn;
    },
  },

  watch: {
    isUserLoggedIn(newValue) {
      if (newValue) {
        // Si utilisateur connecté, afficher Déconnexion
        this.navBarLink = [{label: "Logout", to: "/bank/logout", color: "#c14e33"}];
      } else {
        // Sinon, afficher Mon compte
        this.navBarLink = [{label: "Mon compte", to: "/bank/account", color: "#FF8264"}];
      }
    },
  },
  methods: {
    ...mapActions("bank", ["logout"]),

    handleLogout() {
      this.$router.push('/bank/logout');
    },
  },
  mounted() {
    // Idem au montage
    if (this.isUserLoggedIn) {
      this.navBarLink = [{label: "Logout", to: "/bank/logout", color: "#c14e33"}];
    } else {
      this.navBarLink = [{label: "Mon compte", to: "/bank/account", color: "#FF8264"}];
    }
  }
};
</script>

<style scoped>
.bg-navbar {
  border-bottom: 2px solid #FF8264;
  background-color: white;
}
</style>
