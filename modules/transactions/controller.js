const { TransactionSchema } = require("./model");
const validations = require("../../helpers/validations");

const Network = require("../../helpers/network");
const network = new Network();

class TransactionsController {
  static processing = false;

  static getBalance(req, res) {
    try {
      if (!TransactionsController.processing) {
        const currentBalance = TransactionSchema.getCurrentBalance();
        network.setSuccess(200, "Current balance", currentBalance);
      } else {
        network.setError(
          409,
          "Currently processing update operation - Retry in a second"
        );
      }
      return network.send(res);
    } catch (error) {
      network.setError(500, error.message);
      return network.send(res);
    }
  }

  static get(req, res) {
    try {
      const { id } = req.params;
      const transaction = TransactionSchema.get(id);
      if (transaction) {
        network.setSuccess(200, "Transaction found", transaction);
      } else {
        network.setError(404, "Transaction not found");
      }
      return network.send(res);
    } catch (error) {
      network.setError(500, error.message);
      return network.send(res);
    }
  }

  static async apply(req, res) {
    TransactionsController.processing = true;
    try {
      const { type, amount } = req.body;

      const tranType = validations.transactionType(type);
      if (!tranType) throw new Error("Transaction not supported");

      const tranAmount = validations.transactionAmount(amount);
      if (!tranAmount) throw new Error("Incorrect transaction amount format");

      const transaction = new TransactionSchema(tranType, tranAmount);
      transaction.apply();

      network.setSuccess(200, "Transaction saved", transaction);
    } catch (error) {
      network.setError(500, error.message);
    } finally {
      TransactionsController.processing = false;
      return network;
    }
  }

  static list(req, res) {
    try {
      const transactions = TransactionSchema.list();
      network.setSuccess(200, "Transactions found", transactions);
      return network.send(res);
    } catch (error) {
      network.setError(500, error.message);
      return network.send(res);
    }
  }
}

module.exports = TransactionsController;
