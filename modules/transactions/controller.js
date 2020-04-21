const Network = require("../../helpers/network");
const network = new Network();

class TransactionsController {
  static getBalance(req, res) {
    try {
      network.setSuccess(200, "Current balance", 100);
      return network.send(res);
    } catch (error) {
      network.setError(500, error.message );
      return network.send(res);
    }
  }

  static get(req, res) {
    try {
      network.setSuccess(200, "Transaction found", {id: 1});
      return network.send(res);
    } catch (error) {
      network.setError(500, error.message );
      return network.send(res);
    }
  }

  static async apply(req, res) {
    try {
      network.setSuccess(201, "Transaction stored", {id: 1});
      return network.send(res);
    } catch (error) {
      network.setError(500, error.message );
      return network.send(res);
    } 
  }

  static list(req, res) {
    try {
      network.setSuccess(200, "Transactions found", [{id:1}, {id: 2}]);
      return network.send(res);
    } catch (error) {
      network.setError(500, error.message );
      return network.send(res);
    }
  }
}

module.exports = TransactionsController;
