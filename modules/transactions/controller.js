const Mutex = require('async-mutex').Mutex;
const { TransactionSchema } = require("./model");
const validations = require("../../helpers/validations");

const Network = require("../../helpers/network");
const network = new Network();

class TransactionsController {
  static getBalance(req, res) {
    try {
      const currentBalance = TransactionSchema.getCurrentBalance();
      network.setSuccess(200, "Current balance", currentBalance);
      return network.send(res);

    } catch (error) {
      network.setError(500, error.message );
      return network.send(res);
    }
  }

  static get(req, res) {
    try {
      const { id } = req.params;
      const transaction = TransactionSchema.get(id);
      
      network.setSuccess(200, "Transaction found", transaction);
      return network.send(res);

    } catch (error) {
      network.setError(500, error.message );
      return network.send(res);
    }
  }

  static async apply(req, res) {
    const mutex = new Mutex();
    const release = await mutex.acquire();
    try {
      const { type, amount } = req.body;

      const tranType = validations.transactionType(type);
      if (!tranType) throw new Error("Transaction not supported");

      const tranAmount = validations.transactionAmount(amount);
      if (!tranAmount) throw new Error("Incorrect transaction amount format");

      const transaction = new TransactionSchema(tranType, tranAmount);
      transaction.apply()
      
      network.setSuccess(201, "Transaction stored", transaction);
      return network.send(res);

    } catch (error) {
      network.setError(500, error.message );
      return network.send(res);
    } finally {
      release();
    }

  }

  static list(req, res) {
    try {
      const transactions = TransactionSchema.list();

      network.setSuccess(200, "Transactions found", transactions);
      return network.send(res);
      
    } catch (error) {
      network.setError(500, error.message );
      return network.send(res);
    }
  }
}

module.exports = TransactionsController;
