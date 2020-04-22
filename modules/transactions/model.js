const shortid = require("shortid");
const moment = require("moment");
let db = require("../../db");

const TransactionType = {
  CREDIT: "credit",
  DEBIT: "debit",
};

class TransactionSchema {
  constructor(type, amount) {
    this.id = shortid.generate();
    this.type = type;
    this.amount = amount;
    this.effectiveDate = moment().format("YYYY-MM-DD HH:mm:ss");
  }

  static balance = 1000;

  static getCurrentBalance = () => TransactionSchema.balance;
  static get = (id) => db.find((t) => t.id === id);
  static save = (transaction) => (db = [...db, transaction]);
  static list = () => db;

  apply = () => {
    switch (this.type) {
      case TransactionType.CREDIT:
        TransactionSchema.balance += this.amount;
        break;
      case TransactionType.DEBIT:
        if (TransactionSchema.balance < this.amount)
          throw new Error("Insuficient balance");
        TransactionSchema.balance -= this.amount;
        break;
      default:
        throw new Error("Transaction type not supported");
    }
    TransactionSchema.save(this);
  };
}

module.exports = {
  TransactionSchema,
  TransactionType,
};
