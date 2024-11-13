import BankService from "@/services/bankaccount.service";

export default {
    namespaced: true,
    state : () => ({
        accountAmount: 0,
        accountTransactions: [],
        accountNumberError: 0, // 0: pas d'erreur, 1: valide, -1: erreur
    }),
    mutations: {
        updateAccountAmount(state, accountAmount) {
            state.accountAmount = accountAmount;
        },
        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions;
        },
        updateNumberError(state, error) {
            state.accountNumberError = error;
        },
    },
    actions: {
        async getAccountAmount({ commit }, accountNumber) {
            try {
                const response = await BankService.getAccountAmount(accountNumber);
                if (response.error === 0) {
                    commit("updateAccountAmount", response.data);
                    commit('updateNumberError', 1); // Num valide
                } else {
                    commit('updateAccountAmount', null);
                    commit('updateNumberError', -1); // Num imvalide
                }
            } catch (error) {
                console.error("Erreur réseau", error);
                commit('updateNumberError', -1);
            }
        },
        async getAccountTransactions({ commit }, accountNumber) {
            try {
                const response = await BankService.getAccountTransactions(accountNumber);
                if (response.error === 0) {
                    commit("updateAccountTransactions", response.data);
                    commit("updateNumberError", 1);
                } else {
                    commit('updateAccountTransactions', null);
                    commit('updateNumberError', -1);
                }
            } catch (error) {
                console.error(("Erreur réseau", error));
            }
        },
        resetAccountState({ commit }) {
            commit('updateAccountAmount', null);
            commit('updateAccountTransactions', []);
            commit('updateNumberError', 0);
        },
    },
    getters: {
        getAccountAmount(state) {
            return state.accountAmount;
        },
        getAccountTransactions(state) {
            return state.accountTransactions;
        },
        getAccountNumberError(state) {
            return state.accountNumberError;
        },
    },
};