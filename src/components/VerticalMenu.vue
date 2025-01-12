<template>
  <div class="vertical-menu">
    <div v-for="(item, index) in items" :key="index">

      <!-- Si l'élément est de type title -->
      <div v-if="item.type === 'title'">
        <slot name="menu-title" :label="item.label">{{ item.label }}</slot>
      </div>

      <!-- Si l'élément est de type link -->
      <div v-else-if="item.type === 'link'">
        <span @click="goTo(item.to)">
          <slot name="menu-link" :label="item.label">
            <button
                :disabled="!ifCurrentAccount"
                :class="{'disabled-button': !ifCurrentAccount}"
            >{{ item.label }}</button>
          </slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerticalMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
    ifCurrentAccount: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    goTo(to) {
      if (this.ifCurrentAccount) {
        this.$router.push(to).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.error(err);
          }
        });
      }
    }
  },
};
</script>

<style scoped>
.vertical-menu {
  display: flex;
  flex-direction: column;
  padding-right: 40px;
  padding-top: 20px;
  align-items: flex-start;
  height: 70vh;
  border-right: #f88265 solid 2px;
}

.vertical-menu div {
  margin: 4px 0;
}

button {
  padding: 10px 20px;
  margin-right: auto;
  display: flex;
  border: none;
  color: white;
  background-color: #f88265;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.disabled-button {
  background-color: #ffaf9c;
  cursor: not-allowed;
}

.disabled-button:hover {
  background-color: #ffaf9c;
  cursor: not-allowed;
}

button:disabled {
  background-color: #ffaf9c;
  cursor: not-allowed;
}

span {
  cursor: pointer;
}

span:hover button {
  background-color: #ed613f;
}
</style>
