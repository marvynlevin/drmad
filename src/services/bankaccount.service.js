import LocalSource from "@/datasource/controller";

async function getAccountAmount(number) {
    console.log("BankService: Getting account amount for:", number);

    try {
        const accountAmount = await LocalSource.getAccountAmount(number);

        // Si on obtient une réponse valide
        if (accountAmount && accountAmount.error === 0) {
            return {error: 0, status: 200, data: accountAmount.data};
        }

        // Retour en cas d'erreur ou de données non trouvées
        return {error: 1, status: 404, data: 'Compte non trouvé ou identifiant incorrect.'};

    } catch (error) {
        console.error("Erreur dans getAccountAmount:", error);
        return {error: 1, status: 500, data: 'Erreur serveur'};
    }
}

async function getAccountTransactions(number) {
    console.log("BankService: Getting transactions for:", number);

    try {
        const accountTransactions = await LocalSource.getAccountTransactions(number);

        // Si on obtient une réponse valide
        if (accountTransactions && accountTransactions.error === 0) {
            return {error: 0, status: 200, data: accountTransactions.data};
        }

        // Retour en cas d'erreur ou de données non trouvées
        return {error: 1, status: 404, data: 'Aucune transaction trouvée pour ce compte.'};

    } catch (error) {
        console.error("Erreur dans getAccountTransactions:", error);
        return {error: 1, status: 500, data: 'Erreur serveur'};
    }
}

export default {
    getAccountAmount,
    getAccountTransactions,
};
