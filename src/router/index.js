import Vue from 'vue';
import VueRouter from 'vue-router';

import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopLogin from "@/views/ShopLogin.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopPay from "@/views/ShopPay.vue";
import ShopOrders from "@/views/ShopOrders.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/shop',
        name: 'ShopView',
        component: ShopView,
        redirect: '/shop/home', // par défaut vers ShopHome
        children: [
            {
                path: 'home',
                name: 'ShopHome',
                components: { shopmain: ShopHome },
                alias: '/shop', //   /shop/home
            },
            {
                path: 'login',  //   /shop/login
                name: 'ShopLogin',
                components: { shopmain: ShopLogin },
            },
            {
                path: 'buy',  //   /shop/buy
                name: 'ShopBuy',
                components: { shopmain: ShopBuy },
            },
            {
                path: 'pay/:orderId',  //   /shop/pay/:orderId
                name: 'ShopPay',
                components: { shopmain: ShopPay },
                props: { shopmain: true },
            },
            {
                path: 'pay',  //   /shop/pay
                name: 'ShopPayWithOutId',
                components: { shopmain: ShopPay },
                props: { shopmain: true },
            },
            {
                path: 'orders',  //   /shop/orders
                name: 'ShopOrders',
                components: { shopmain: ShopOrders },
            },
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
