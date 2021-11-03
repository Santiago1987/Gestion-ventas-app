const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/electronicHerDB", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB getion ventas connected"))
  .catch((err) => console.error(err));
