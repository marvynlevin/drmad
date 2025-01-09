import {items, shopusers, bankaccounts, transactions} from './data'

const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

function shopLogin(data) {
    if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}

    let user = shopusers.find(e => e.login === data.login)
    if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'}

    const isPasswordValid = bcrypt.compareSync(data.password, user.password);
    if (!isPasswordValid) {
        return {error: 1, status: 404, data: 'login/pass incorrect'}
    }

    if (!user.session) {
        user.session = uuidv4();
    }

    let u = {
        _id: user._id,
        name: user.name,
        login: user.login,
        email: user.email,
        session: user.session
    }
    return {error: 0, status: 200, data: u}
}

function getAllViruses() {
    return {error: 0, data: items}
}

function getAccountAmount(number) {
    if (!number || typeof number !== 'string' || number.trim() === '') {
        return {error: 1, status: 400, data: 'Numéro de compte non fourni ou invalide.'};
    }

    const account = bankaccounts.find(acc => acc.number === number);

    if (!account) {
        return {error: 1, status: 404, data: 'Compte bancaire non trouvé.'};
    }

    return {error: 0, status: 200, data: account.amount};
}

function getAccountTransactions(number) {
    if (!number || typeof number !== 'string' || number.trim() === '') {
        return {error: 1, status: 400, data: 'Numéro de compte non fourni ou invalide.'};
    }

    const account = bankaccounts.find(acc => acc.number === number);

    if (!account) {
        return {error: 1, status: 404, data: 'Compte bancaire non trouvé.'};
    }

    const accountTransactions = transactions.filter(trx => trx.account === account._id);

    if (accountTransactions.length > 0) {
        return {error: 0, status: 200, data: accountTransactions};
    } else {
        return {error: 1, status: 404, data: 'Aucune transaction trouvée pour ce compte.'};
    }
}

function updateBasket(userId, basket) {
    const user = shopusers.find(u => u._id === userId);
    if (!user) {
        return {error: 1, status: 404, data: 'Utilisateur non trouvé.'};
    }
    user.basket = basket;
    return {error: 0, status: 200, data: 'Panier mis à jour.'};
}

function getBasket(userId) {
    const user = shopusers.find(u => u._id === userId);
    if (!user) {
        return {error: 1, status: 404, data: 'Utilisateur non trouvé.'};
    }
    return {error: 0, status: 200, data: user.basket || {items: []}};
}

function createOrder(userId, order) {
    // Recherche de l'utilisateur
    const user = shopusers.find((u) => u._id === userId);
    if (!user) {
        return {error: 1, status: 404, data: "Utilisateur non trouvé."};
    }

    // Calcul du total de la commande (avec promotions)
    const total = order.items.reduce((sum, {item, amount}) => {
        let price = item.price;

        // Vérifier si le prix est valide
        if (typeof price !== 'number' || price <= 0) {
            console.error(`Prix invalide pour l'article ${item.name}`);
            return sum;
            // Si le prix est invalide, on passe à l'élément suivant sans ajouter de montant.
        }

        // Appliquer la promotion (si elle existe)
        if (item.promotion && item.promotion.length > 0) {
            const promotion = item.promotion[0];

            // Vérifier si la promotion est valide
            if (typeof promotion.discount === 'number' && promotion.discount >= 0) {
                price -= promotion.discount;
            }

            if (typeof promotion.amount === 'number' && promotion.amount >= 0) {
                price = Math.max(price, promotion.amount);
            }
        }

        // Ajouter le total de cet élément à la somme
        return sum + (price * amount);
    }, 0);

    // Vérifier si le total est un nombre valide
    if (isNaN(total) || total < 0) {
        return {error: 1, status: 500, data: "Erreur dans le calcul du total."};
    }

    // Gestion de la date : objet + $date OU chaîne ISO
    let isoDate;
    if (order.date && order.date.$date) {
        isoDate = order.date; // Gardez l'objet tel quel, sans modification
    } else if (typeof order.date === "string") {
        isoDate = { $date: new Date(order.date).toISOString() }; // Créer l'objet avec $date
    } else {
        isoDate = { $date: new Date().toISOString() }; // Créer l'objet avec $date
    }

    // Création de l'objet commande
    const newOrder = {
        ...order,
        total,
        date: isoDate,
        status: "waiting_payment",
        uuid: uuidv4(),
    };

    // Ajout de la commande au tableau orders de l'utilisateur
    user.orders = user.orders || [];
    user.orders.push(newOrder);

    // Retourner le uuid de la commande
    return {error: 0, status: 200, data: {uuid: newOrder.uuid}};
}

function payOrder(userId, orderId) {
    const user = shopusers.find(u => u._id === userId);
    if (!user) {
        return {error: 1, status: 404, data: 'Utilisateur non trouvé.'};
    }

    const order = user.orders.find(o => o.uuid === orderId);
    if (!order) {
        return {error: 1, status: 404, data: 'Commande non trouvée.'};
    }

    // if (order.status !== "waiting_payment") {
    //     return { error: 1, status: 400, data: 'Commande déjà payée ou non valide pour paiement.' };
    // }
    //
    // const account = bankaccounts.find(acc => acc.number === user.accountNumber);
    // if (!account) {
    //     return { error: 1, status: 404, data: 'Compte bancaire non trouvé.' };
    // }
    //
    // if (account.amount < order.total) {
    //     return { error: 1, status: 400, data: 'Fonds insuffisants pour effectuer le paiement.' };
    // }

    // account.amount -= order.total;
    order.status = "finalized";
    console.log("Order pay :", order);

    return {error: 0, status: 200, data: order};
}

function getOrders(userId) {
    const user = shopusers.find((u) => u._id === userId);
    console.log("User orders: ", user.orders);
    if (!user) {
        return {error: 1, status: 404, data: 'Utilisateur non trouvé.'};
    }
    return {error: 0, status: 200, data: user.orders || []};
}

function updateOrderStatus(userId, orderId, status) {
    const user = shopusers.find(u => u._id === userId);
    if (!user) {
        return {error: 1, status: 404, data: 'Utilisateur non trouvé.'};
    }

    const order = user.orders.find(o => o.uuid === orderId);
    if (!order) {
        return {error: 1, status: 404, data: 'Commande non trouvée.'};
    }

    order.status = status;
    return {error: 0, status: 200, data: `Statut de la commande mis à jour à ${status}.`};
}

export default {
    shopLogin,
    getAllViruses,
    getAccountAmount,
    getAccountTransactions,
    updateBasket,
    getBasket,
    createOrder,
    payOrder,
    getOrders,
    updateOrderStatus,
};