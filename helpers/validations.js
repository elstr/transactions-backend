const { TransactionType } = require("../modules/transactions/model");

module.exports = {
  transactionType: (type) => {
    switch (type.toLowerCase()) {
      case TransactionType.CREDIT:
        return TransactionType.CREDIT;
      case TransactionType.DEBIT:
        return TransactionType.DEBIT;
      default:
        return false;
    }
  },
  transactionAmount: (amount) => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.exec(amount) ? parseFloat(regex.exec(amount)["input"]) : null;
  },
};
