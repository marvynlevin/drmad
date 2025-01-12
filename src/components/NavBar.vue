<template>
    <div class="flex flex-row">
      <div
          style="display: flex; flex-direction: row; text-align: center; align-items: center; justify-content: center; margin-top: 5px">
        <button style="margin-bottom: 10px; margin-right: 10px"
                v-for="(item, index) in links"
                :key="index"
                :style="{ backgroundColor: item.color }"
                @click="goTo(item, index)"
        >
          <slot name="nav-button" :label="item.label">{{ item.label }}</slot>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goTo(item) {
      // Si l'élément est Logout, émettre un événement vers le parent
      if (item.label === "Logout") {
        // Émettre l'événement logout pour gérer la déconnexion
        this.$emit('logout');
      } else {
        // Si c'est un autre bouton, navigation normale
        this.$router.push(item.to).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.error(err);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.bg-navbar {
  border-bottom: 2px solid #FF8264;
  background-color: white;
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
</style>
