const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/routes.js");

const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares  {instrucciones que se ejecutan ANTES de entrar a los metodos html}
app.use(morgan("dev")); //middleware que muestra informacion por cada request del cliente
app.use(express.json()); //para recibir o enviar formato json
app.use(cors());

// DB
require("./database");

//Routes
app.use("/data", routes);

//Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
