import ShopService from '@/services/shop.service';

export default {
    namespaced: true,
    state: () => ({
        viruses: [],
        shopUser: null,
        basket: {items: []},
        orders: [],
    }),

    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses;
        },

        updateShopUser(state, shopUser) {
            state.shopUser = shopUser;
        },

        setBasket(state, basket) {
            state.basket = basket;
        },

        addItemToBasket(state, {item, amount}) {
            const existingItem = state.basket.items.find(basketItem => basketItem.item === item._id);
            if (existingItem) {
                existingItem.amount += amount; // Augmenter quantité
            } else {
                state.basket.items.push({item: item._id, amount}); // Ajouter nouvel item
            }
        },

        removeItemFromBasket(state, itemId) {
            state.basket.items = state.basket.items.filter(basketItem => basketItem.item !== itemId);
        },

        clearBasket(state) {
            state.basket.items = [];
        },

        setOrders(state, orders) {
            state.orders = orders;
        },

        updateOrders(state, {orderId, status}) {
            const order = state.orders.find(o => o.uuid === orderId);
            if (order) {
                order.status = status;
            }
        },

        logout(state) {
            state.shopUser = null;
            state.basket = {items: []};
            state.orders = [];
        },
    },

    actions: {
        async getAllViruses({commit}) {
            try {
                const response = await ShopService.getAllViruses();
                if (response.error === 0) {
                    commit('updateViruses', response.data);
                } else {
                    console.error("Erreur lors de la récupération des virus", response.data);
                }
            } catch (err) {
                console.error("Erreur réseau;", err);
            }
        },

        async shopLogin({commit, dispatch}, credentials) {
            try {
                const response = await ShopService.shopLogin(credentials);
                if (response && response.error === 0) {
                    commit('updateShopUser', response.data);
                    // Sauvegarde de l'utilisateur dans localStorage
                    localStorage.setItem('shopUser', JSON.stringify(response.data));
                    commit('setOrders', [])
                    dispatch('fetchOrders');

                    return response;
                } else {
                    console.error("Erreur de connexion:", response.data);
                    return {error: 1, data: 'Échec de la connexion.'};
                }
            } catch (err) {
                console.error("Erreur réseau:", err);
                return {error: 1, data: 'Erreur réseau lors de la connexion.'};
            }
        },

        async fetchBasket({state, commit}) {
            if (!state.shopUser) {
                console.error('Utilisateur non connecté.');
                return;
            }
            try {
                const response = await ShopService.getBasket(state.shopUser._id);
                if (response.error === 0) {
                    commit('setBasket', response.data);
                } else {
                    console.error("Erreur lors de la récupération du panier:", response.data);
                }
            } catch (err) {
                console.error("Erreur réseau:", err);
            }
        },

        async addItemToBasket({state, commit}, {item, amount}) {
            if (!state.shopUser) {
                console.error('Utilisateur non connecté.');
                return;
            }
            commit('addItemToBasket', {item, amount});
            try {
                const response = await ShopService.updateBasket(state.shopUser._id, state.basket);
                if (response.error !== 0) {
                    console.error("Erreur lors de la mise à jour du panier:", response.data);
                }

            } catch (err) {
                console.error("Erreur réseau:", err);
            }
        },

        async removeItemFromBasket({state, commit}, itemId) {
            if (!state.shopUser) {
                console.error('Utilisateur non connecté.');
                return;
            }
            commit('removeItemFromBasket', itemId);
            try {
                const response = await ShopService.updateBasket(state.shopUser._id, state.basket);
                if (response.error !== 0) {
                    console.error("Erreur lors de la mise à jour du panier:", response.data);
                }
            } catch (err) {
                console.error("Erreur réseau:", err);
            }
        },

        async clearBasket({state, commit}) {
            if (!state.shopUser) {
                console.error('Utilisateur non connecté.');
                return;
            }
            commit('clearBasket');
            try {
                const response = await ShopService.updateBasket(state.shopUser._id, state.basket);
                if (response.error !== 0) {
                    console.error("Erreur lors de la mise à jour du panier:", response.data);
                }
            } catch (err) {
                console.error("Erreur réseau:", err);
            }
        },

        async fetchOrders({state, commit}) {
            if (!state.shopUser) {
                console.error('Utilisateur non connecté.');
                return;
            }
            try {
                const response = await ShopService.getOrders(state.shopUser._id);
                if (response.error === 0) {
                    commit('setOrders', response.data);
                } else {
                    console.error("Erreur lors de la récupération des commandes:", response.data);
                }
            } catch (err) {
                console.error("Erreur réseau:", err);
            }
        },

        async cancelOrder({commit, state}, {orderId}) {
            if (!state.shopUser) {
                console.error('Utilisateur non connecté.');
                return;
            }
            try {
                const response = await ShopService.updateOrderStatus(state.shopUser._id, orderId, 'cancelled');
                if (response.error === 0) {
                    commit('updateOrders', {orderId, status: 'cancelled'});
                    return {error: 0, data: 'Commande annulée avec succès'};
                } else {
                    return {error: 1, data: 'Erreur lors de l\'annulation de la commande'};
                }
            } catch (err) {
                console.error("Erreur réseau:", err);
                return {error: 1, data: 'Erreur réseau lors de l\'annulation'};
            }
        },
    },

    getters: {
        userId: state => {
            return state.shopUser ? state.shopUser._id : null;
        },
        isUserLoggedIn: state => {
            return state.shopUser !== null;
        },
    },
};