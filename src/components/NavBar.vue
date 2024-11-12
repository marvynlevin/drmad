<template>
  <div class="fix">
    <!-- Boucle pour générer un bouton pour chaque élément dans la prop titles -->
    <button
      v-for="(item, index) in titles"
      :key="index"
      :style="{ backgroundColor: item.color }"
      @click="handleClick(index)"
    >
      {{ item.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    titles: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleClick(index) {
      // Emet l'événement 'menu-clicked' avec l'index du bouton cliqué
      this.$emit('menu-clicked', index);
    }
  }
};
</script>

<style scoped>
.fix {
  position: fixed;
  top: 4%;
}

button {
  padding: 15px 50px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

</style>
