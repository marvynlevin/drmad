import LocalSource from "@/datasource/controller";

async function shopLoginFromLocalSource(data) {
    // récupération auprès de la source locale
    return LocalSource.shopLogin(data)
}

/*
async function shopLoginFromAPI(data) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
 */

async function getAllVirusesFromLocalSource() {
    // récupération auprès de la source locale
    return LocalSource.getAllViruses()
}

/*
async function getAllVirusesFromAPI() {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function shopLogin(data) {
    let response = null;
    try {
        // Essayer de récupérer l'utilisateur avec la source locale (par exemple, localStorage)
        response = await shopLoginFromLocalSource(data);

        if (response.error === 0) {
            // Si la connexion est réussie, on stocke l'utilisateur dans le store
            // Sauvegarder l'utilisateur dans localStorage pour persistance de la session
            localStorage.setItem('shopUser', JSON.stringify(response.data));
        }
    } catch (err) {
        response = {error: 1, status: 404, data: 'Erreur réseau, impossible de se connecter.'}
    }
    return response;
}

async function getAllViruses() {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await getAllVirusesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses'}
    }
    return response
}

async function updateBasket(userId, basket) {
    return LocalSource.updateBasket(userId, basket);
}

async function getBasket(userId) {
    return LocalSource.getBasket(userId);
}

async function createOrder(userId, order) {
    try {
        const response = await LocalSource.createOrder(userId, order);
        return response;
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        return {error: 1, status: 500, data: "Erreur interne du serveur."};
    }
}

async function payOrder(orderId) {
    // Récupérer l'utilisateur connecté depuis localStorage
    const userJson = localStorage.getItem('shopUser');
    if (!userJson) {
        return {error: 1, data: 'Utilisateur non connecté.'};
    }
    const userId = JSON.parse(userJson)._id;

    try {
        const response = await LocalSource.payOrder(userId, orderId);
        return response;
    } catch (error) {
        console.error('Erreur lors du paiement de la commande :', error);
        return {error: 1, status: 500, data: 'Erreur interne du serveur.'};
    }
}

async function getOrders(userId) {
    try {
        return await LocalSource.getOrders(userId);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        return {error: 1, status: 500, data: "Erreur interne du serveur."};
    }
}

async function updateOrderStatus(userId, orderId, status) {
    try {
        return await LocalSource.updateOrderStatus(userId, orderId, status);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut de la commande :", error);
        return {error: 1, status: 500, data: "Erreur interne du serveur."};
    }
}


export default {
    shopLogin,
    getAllViruses,
    updateBasket,
    getBasket,
    createOrder,
    payOrder,
    getOrders,
    updateOrderStatus,
}