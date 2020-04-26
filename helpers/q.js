const qrate = require("qrate");

/**
 * All endpoints implementing queueing must return a Network object from the controller called
 * to be able to send a response.
 * See modules/transactions/controller.js apply method
 * @param {function} fn  Function to be called for each item in the queue
 * @param {function} done Function called automatically when item finished processing
 */
const worker = async function ({ req, res, fn }) {
  const result = await fn(req);
  result.send(res);
};

module.exports = qrate(worker);
