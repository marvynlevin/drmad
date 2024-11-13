<template>
  <div class="fix flex flex-row bg-navbar">
    <div class="left">
      <router-link :to="{ name: 'ShopHome' }">
        <img src="@/assets/logoDrMad.png" alt="Logo">
      </router-link>
    </div>
    <div class="right elt-center">
      <button
      v-for="(item, index) in titles"
      :key="index"
      :style="{ backgroundColor: item.color }"
      @click="handleClick(index)"
    >
      {{ item.text }}
    </button>
    </div>
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
  top: 0px;
  left: 0px;
  padding: 10px;
}

.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.left {
  margin-left: 35px;
}

.right {
  margin-right: 35px;
}

.bg-navbar {
  border-bottom: 2px  solid #FF8264;
  background-color: white;
}

.elt-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
