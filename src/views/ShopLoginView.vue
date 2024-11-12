<template>
  <div style="margin-top: 10%">
    <h1>Login</h1>

    <span>Login</span><input v-model="login">
    <span>Password</span><input v-model="password">
    <button @click="shopLogin({login, password})">Login</button>
    <p v-if="shopUser">{{shopUser}}</p>
  </div>

</template>

<script>

import {mapState, mapActions} from 'vuex'
export default {
  name: 'ShopLoginView',
  data: () => ({
    login: '',
    password:'',
  }),
  computed: {
    ...mapState(['shopUser'])
  },
  methods: {
    ...mapActions(['shopLogin']),
  }
}
</script>

<style scoped>
input {
  margin: 10px 0;
  padding: 8px;
}

button {
  margin: 10px 0;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #45a049;
}

p {
  margin-top: 10px;
  font-size: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
