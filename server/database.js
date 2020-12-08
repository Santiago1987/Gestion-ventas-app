const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/gestionVentasApp", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB getion ventas connected"))
  .catch((err) => console.error(err));
