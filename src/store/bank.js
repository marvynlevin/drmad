import BankService from "@/services/bankaccount.service";
import {bankaccounts} from "@/datasource/data";

export default {
    namespaced: true,
    state: () => ({
        currentAccount: null,       // Informations sur le compte courant
        accountAmount: 0,           // Solde du compte courant
        accountTransactions: [],    // Transactions associées au compte
        accountNumberError: 0,      // 0 : pas d'erreur, 1 : valide, -1 : erreur
        transactionError: '',       // Message d'erreur lors de création de transaction
    }),
    mutations: {
        updateCurrentAccount(state, account) {
            state.currentAccount = account;
        },

        updateAccountAmount(state, amount) {
            state.accountAmount = amount;
        },

        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions;
        },

        addAccountTransaction(state, transaction) {
            state.accountTransactions = [transaction, ...state.accountTransactions];
        },

        updateNumberError(state, error) {
            state.accountNumberError = error;
        },

        updateTransactionError(state, error) {
            state.transactionError = error;
        },
    },

    actions: {
        async validateAccountNumber({commit}, accountNumber) {
            const account = bankaccounts.find(acc => acc.number === accountNumber);
            if (account) {
                commit("updateCurrentAccount", account._id);
                commit("updateAccountAmount", account.amount);
                commit("updateNumberError", 1);  // Num valide
                commit("updateTransactionError", '');
            } else {
                commit("updateCurrentAccount", null);
                commit("updateAccountAmount", 0);
                commit("updateNumberError", -1); // Num invalide
                commit("updateTransactionError", "Compte non valide");
            }
        },

        async getAccountAmount({commit}, accountNumber) {
            try {
                const response = await BankService.getTransactions(accountNumber);
                if (response.error === 0) {
                    commit("updateAccountAmount", response.data.amount);
                    commit("updateNumberError", 1); // Num valide
                } else {
                    commit("updateAccountAmount", 0);
                    commit("updateNumberError", -1); // Num invalide
                }
            } catch (error) {
                console.error("Erreur réseau", error);
                commit("updateNumberError", -1); // Num invalide
            }
        },

        async getAccountTransactions({commit}, accountNumber) {
            try {
                const response = await BankService.getTransactions(accountNumber);
                if (response.error === 0) {
                    commit("updateAccountTransactions", response.data.transactions);
                    commit("updateTransactionError", '');
                    commit("updateNumberError", 1); // Num valide
                } else {
                    commit("updateAccountTransactions", []);
                    commit("updateNumberError", -1); // Num invalide
                    commit("updateTransactionError", response.data)
                }
            } catch (error) {
                console.error("Erreur réseau", error);
                commit("updateAccountTransactions", []);
                commit("updateNumberError", -1); // Num invalide
            }
        },

        async createWithdraw({commit}, {accountId, amount}) {
            try {
                const response = await BankService.createWithdraw({accountId, amount});

                if (response.error === 0) {
                    commit("updateAccountAmount", response.data.newBalance);
                    commit("updateTransactionError", '');
                    commit("addAccountTransaction", response.data.transaction);
                    return response;
                } else {
                    commit("updateTransactionError", response.data);
                    return response;
                }
            } catch (error) {
                console.error("Erreur", error);
                commit("updateTransactionError", "Erreur");
            }
        },

        async createPayment({commit}, {accountId, destNumber, amount}) {
            try {
                const response = await BankService.createPayment({accountId, destNumber, amount});
                if (response.error === 0) {
                    commit("updateAccountAmount", response.data.newBalance);
                    commit("updateTransactionError", '');
                    commit("addAccountTransaction", response.data.transaction);
                    return response;
                } else {
                    commit("updateTransactionError", response.data);
                    return response;
                }
            } catch (error) {
                console.error("Erreur réseau lors du paiement", error);
                commit("updateTransactionError", "Erreur réseau");
            }
        },

        resetAccountState({commit}) {
            commit("updateAccountAmount", 0);
            commit("updateAccountTransactions", []);
            commit("updateNumberError", 0);
            commit("updateTransactionError", null);
        },

        logout({commit}) {
            commit("updateCurrentAccount", null);
            commit("updateAccountAmount", 0);
            commit("updateAccountTransactions", []);
            commit("updateNumberError", 0);
            commit("updateTransactionError", null);
        },
    },

    getters: {
        isUserLoggedIn: (state) => {
            return state.currentAccount !== null;
        },

        getCurrentAccount(state) {
            return state.currentAccount;
        },

        getAccountAmount(state) {
            return state.accountAmount;
        },

        getTransactions(state) {
            return state.accountTransactions;
        },

        getAccountNumberError(state) {
            return state.accountNumberError;
        },

        getLastTransaction(state) {
            return state.accountTransactions[0];
        },

        getTransactionError(state) {
            return state.transactionError;
        },
    },
};
