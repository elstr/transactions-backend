const express = require("express");

const q = require("../../helpers/q");
const transactions = require("./controller");

const router = express.Router();

router.get("/", transactions.getBalance);
router.get("/transactions", transactions.list);
router.get("/transactions/:id", transactions.get);
router.post("/transactions", (req, res) => {
  q.push({ req, res, fn: transactions.apply });
});


module.exports = router;
