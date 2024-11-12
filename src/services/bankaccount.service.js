import LocalSource from "@/datasource/controller";

function getAccountAmount(number) {
  console.log("BankService: Getting account amount for:", number);
  const accountAmount = LocalSource.getAccountAmount(number);

  if (accountAmount) {
    return { error: 0, status: 200, data: accountAmount.data }; // Ce qui doit être renvoyé
  }

  return { error: 1, status: 404, data: 'Compte non trouvé ou identifiant incorrect.' };
}

function getAccountTransactions(number) {
  console.log("BankService: Getting transactions for:", number);
  const accountTransactions = LocalSource.getAccountTransactions(number);

  if (accountTransactions) {
    return { error: 0, status: 200, data: accountTransactions.data };
  }

  return { error: 1, status: 404, data: 'Aucune transaction trouvée pour ce compte.' };
}

export default {
  getAccountAmount,
  getAccountTransactions
};
