import Vue from 'vue';
import Vuex from 'vuex';
import BankService from '@/services/bankaccount.service';
import ShopService from '@/services/shop.service';

Vue.use(Vuex);

export default new Vuex.Store({
    state: () => ({
        viruses: [],
        shopUser: null,
        accountAmount: 0,
        accountTransactions: [],
        accountNumberError: 0, // 0: pas d'erreur, 1: valide, -1: erreur
    }),
    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses;
        },
        updateShopUser(state, user) {
            state.shopUser = user;
        },
        updateAccountAmount(state, amount) {
            state.accountAmount = amount;
        },
        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions;
        },
        updateAccountNumberError(state, error) {
            state.accountNumberError = error;
        }
    },
    actions: {
        async getAllViruses({ commit }) {
            try {
                const response = await ShopService.getAllViruses();
                if (response.error === 0) {
                    commit('updateViruses', response.data); // Mettre à jour les virus
                } else {
                    console.error('Erreur lors de la récupération des virus:', response.data);
                }
            } catch (err) {
                console.error('Erreur réseau:', err);
            }
        },
        async shopLogin({ commit }, credentials) {
            try {
                const response = await ShopService.shopLogin(credentials);
                if (response.error === 0) {
                    commit('updateShopUser', response.data); // Mettre à jour l'utilisateur de la boutique
                } else {
                    console.error('Erreur de connexion:', response.data);
                }
            } catch (err) {
                console.error('Erreur réseau:', err);
            }
        },
        async getAccountAmount({ commit }, accountNumber) {
            const response = await BankService.getAccountAmount(accountNumber);
            if (response.error === 0) {
                commit('updateAccountAmount', response.data);
                commit('updateAccountNumberError', 1); // Numéro valide
            } else {
                commit('updateAccountAmount', null);
                commit('updateAccountNumberError', -1); // Erreur de numéro
            }
        },
        async getAccountTransactions({ commit }, accountNumber) {
            const response = await BankService.getAccountTransactions(accountNumber);
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data);
                commit('updateAccountNumberError', 1); // Numéro valide
            } else {
                commit('updateAccountTransactions', []);
                commit('updateAccountNumberError', -1); // Erreur de numéro
            }
        },
        resetAccountState({ commit }) {
            commit('updateAccountAmount', null);
            commit('updateAccountTransactions', []);
            commit('updateAccountNumberError', 0); // Réinitialiser l'état d'erreur
        }
    }
});
