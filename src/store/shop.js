import ShopService from '@/services/shop.service';

export default {
    namespaced: true,
    state: () => ({
        viruses: [],
        shopUser: null,
    }),
    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses;
        },
        updateShopUser(state, shopUser) {
            state.shopUser = shopUser;
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
        async shopLogin({commit}, credentials) {
            try {
                const response = await ShopService.shopLogin(credentials);
                if (response && response.error === 0) {
                    commit('updateShopUser', response.data);
                    return response;
                } else {
                    console.error("Erreur de connexion:", response.data);
                    return {error: 1, data: 'Échec de la connexion.'}; // Retourner une erreur si la réponse est invalide
                }
            } catch (err) {
                console.error("Erreur réseau:", err);
                return { error: 1, data: 'Erreur réseau lors de la connexion.' }; // Retourner une erreur réseau
            }
        },
    },
    getters: {
        getViruses(state) {
            return state.viruses;
        },
        getShopUser(state) {
            return state.shopUser;
        },
    },
};