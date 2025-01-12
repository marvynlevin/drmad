import LocalSource from "@/datasource/controller";

// Ce n'est pas utilisée dans mon code voir controller.js
async function getAccount(number) {
    return LocalSource.getAccount(number);
}

async function getTransactions(number) {
    return LocalSource.getTransactions(number);
}

async function createWithdraw(data) {
    return LocalSource.createWithdraw(data);
}

async function createPayment(data) {
    return LocalSource.createPayment(data);
}

export default {
    getAccount,
    getTransactions,
    createWithdraw,
    createPayment,
};
