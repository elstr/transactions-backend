const express = require("express");
const transactions = require("./controller");

const router = express.Router();

router.get("/", transactions.getBalance);
router.get("/transactions", transactions.list);
router.get("/transactions/:id", transactions.get);
router.post("/transactions", transactions.apply);

module.exports = router;
