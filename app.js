const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, DATABASE_URL } = require("./utils/config");
const router = require("./routes");
const { NOT_FOUND } = require("./utils/errors");

const app = express();

mongoose
  .connect(DATABASE_URL)
  .catch((err) => console.error(`Database connection error: ${err.message}`));

app.use(cors());
app.use(express.json());
app.use("/", router);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

module.exports = app;
