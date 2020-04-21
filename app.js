const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// routes
const transactions = require("./modules/transactions/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", transactions);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server ready at port ${port}`));
