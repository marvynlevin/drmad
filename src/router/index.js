import Vue from 'vue';
import VueRouter from 'vue-router';

import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopLogin from "@/views/ShopLogin.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopPay from "@/views/ShopPay.vue";
import ShopOrders from "@/views/ShopOrders.vue";

import BankView from "@/views/BankView.vue";
import BankHome from "@/views/BankHome.vue";
import BankAccount from "@/views/BankAccount.vue";
import BankAmount from "@/views/BankAmount.vue";
import BankOperation from "@/views/BankOperation.vue";
import BankHistory from "@/views/BankHistory.vue";
import BankLogout from "@/views/BankLogout.vue";

import HomeDefault from "@/views/Home.vue"

Vue.use(VueRouter);

const routes = [

    //
    //
    //     ACCUEIL
    //
    //

    {
        path: '/',
        component: HomeDefault,
        name: 'Home', // Redirection par défaut vers Home
    },

    //
    //
    //     SHOP
    //
    //

    {
        path: '/shop',
        name: 'ShopView',
        component: ShopView,
        redirect: '/shop/home', // par défaut vers ShopHome
        children: [
            {
                //   /shop/home
                path: 'home',
                name: 'ShopHome',
                components: {shopmain: ShopHome},
                alias: '/shop',
            },
            {
                //   /shop/login
                path: 'login',
                name: 'ShopLogin',
                components: {shopmain: ShopLogin},
            },
            {
                //   /shop/buy
                path: 'buy',
                name: 'ShopBuy',
                components: {shopmain: ShopBuy},
            },
            {
                //   /shop/pay/:orderId
                path: 'pay/:orderId',
                name: 'ShopPay',
                components: {shopmain: ShopPay},
                props: {shopmain: true},
            },
            {
                //   /shop/pay
                path: 'pay',
                name: 'ShopPayWithOutId',
                components: {shopmain: ShopPay},
                props: {shopmain: true},
            },
            {
                //   /shop/orders
                path: 'orders',
                name: 'ShopOrders',
                components: {shopmain: ShopOrders},
            },
        ]
    },

    //
    //
    //     BANK
    //
    //

    {
        path: '/bank',
        name: 'BankView',
        component: BankView,
        redirect: '/bank/home', // par défaut vers BankHome
        children: [
            {
                // Alias pour /bank/home
                path: 'home',
                name: 'BankHome',
                components: {bankmain: BankHome},
                alias: '/bank',
            },
            {
                // /bank/account
                path: 'account',
                name: 'BankAccount',
                components: {bankmain: BankAccount},
            },
            {
                // /bank/amount
                path: 'amount',
                name: 'BankAmount',
                components: {bankmain: BankAmount},
            },
            {
                // /bank/operation
                path: 'operation',
                name: 'BankOperation',
                components: {bankmain: BankOperation},
            },
            {
                // /bank/history
                path: 'history',
                name: 'BankHistory',
                components: {bankmain: BankHistory},
            },
            {
                // /bank/logout
                path: 'logout',
                name: 'BankLogout',
                components: {bankmain: BankLogout},
            },
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
