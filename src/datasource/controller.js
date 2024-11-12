import { items, shopusers, bankaccounts, transactions } from './data'
import {v4 as uuidv4} from 'uuid'
/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

function shopLogin(data) {
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  // pour simplifier : test uniquement le login
  let user = shopusers.find(e => e.login === data.login)
  if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'}
  // générer un uuid de session pour l'utilisateur si non existant
  if (!user.session) {
    user.session = uuidv4()
  }
  // retourne uniquement les champs nécessaires
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

// Nouvelle fonction ajoutée : récupérer le montant d'un compte bancaire
function getAccountAmount(number) {
  // Vérifier que le numéro de compte est défini et non vide
  if (!number || typeof number !== 'string' || number.trim() === '') {
    return { error: 1, status: 400, data: 'Numéro de compte non fourni ou invalide.' };
  }

  // Rechercher le compte dans le tableau bankaccounts
  const account = bankaccounts.find(acc => acc.number === number);

  // Vérifier si le compte existe
  if (!account) {
    return { error: 1, status: 404, data: 'Compte bancaire non trouvé.' };
  }

  // Si le compte est trouvé, renvoyer le montant du compte
  return { error: 0, status: 200, data: account.amount };
}

function getAccountTransactions(number) {
  if (!number || typeof number !== 'string' || number.trim() === '') {
    return { error: 1, status: 400, data: 'Numéro de compte non fourni ou invalide.' };
  }

  const account = bankaccounts.find(acc => acc.number === number);

  if (!account) {
    return { error: 1, status: 404, data: 'Compte bancaire non trouvé.' };
  }

  const accountTransactions = transactions.filter(trx => trx.account === account._id);

  if (accountTransactions.length > 0) {
    return { error: 0, status: 200, data: accountTransactions };
  } else {
    return { error: 1, status: 404, data: 'Aucune transaction trouvée pour ce compte.' };
  }
}

export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions
}