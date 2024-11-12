import Vue from 'vue';
import VueRouter from 'vue-router';
import VirusesView from '../views/VirusesView.vue';
import BankAccountView from '../views/BankAccountView.vue';
import ShopLoginView from '../views/ShopLoginView.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/viruses', name: 'VirusesView', component: VirusesView },
  { path: '/bank-account', name: 'BankAccountView', component: BankAccountView },
  { path: '/login', name: 'ShopLoginView', component: ShopLoginView },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
