const qrate = require("qrate");

/**
 * All endpoints implementing queueing must return a Network object from the controller called
 * to be able to send a response.
 * @param {function} fn  Function to be called for each item in the queue
 * See modules/transactions/controller.js apply method to see network being returned
 * See routes modules/transactions/routes.js post method to see queueing applied
 */
const worker = async function ({ req, res, fn }) {
  const result = await fn(req);
  result.send(res);
};

module.exports = qrate(worker);
