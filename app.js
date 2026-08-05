const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, DATABASE_URL } = require("./utils/config");
const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const auth = require("./middlewares/auth");
const usersRouter = require("./routes/users");
const clothingItemsRouter = require("./routes/clothingItems");
const { NOT_FOUND } = require("./utils/errors");

const app = express();

mongoose
  .connect(DATABASE_URL)
  .catch((err) => console.error(`Database connection error: ${err.message}`));

app.use(cors());
app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

app.use(auth);
app.use("/users", usersRouter);
app.use("/items", clothingItemsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

module.exports = app;
