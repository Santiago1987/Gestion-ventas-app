const stock = {};
const Stock = require("../Models/Stock");
const Articulos = require("../Models/Articulos");

stock.movement = async ({ cant, razon, id }) => {
  let today = new Date();
  let result,
    resArt = {};

  let article = await Articulos.findById(id);

  if (article === {}) return article;

  let { stock } = article;
  let stkFinal = 0;

  if (razon === "venta") {
    stkFinal = parseInt(stock) - parseInt(cant);
  } else if (razon === "ingreso") {
    stkFinal = parseInt(stock) + parseInt(cant);
    article.ingreso = cant;
  }

  let newMov = {
    variacion: cant,
    razon,
    fecha: today,
    fechaSTR: getFecha(today),
    artID: id,
    stkFinal,
  };

  article.stock = stkFinal;

  let newStk = new Stock(newMov);
  try {
    result = await newStk.save();
    resArt = await Articulos.updateOne({ _id: id }, article);
  } catch (err) {
    console.log("stock error: ", err);
    return article;
  }

  return article;
};

stock.delAllMov = async ({ id }) => {
  let result = "";

  try {
    result = await Articulos.deleteMany({ _id: id });
  } catch (err) {
    console.log("Error: ", err);
    return { id: 0 };
  }

  return { id };
};

stock.saveMov = async (req, res) => {
  let { id, cant } = req.body;

  let art = await stock.movement({ cant, razon: "ingreso", id });

  res.status(200).json(art);
};

//------------------------------------------------------------------------
const getFecha = (date) => {
  return `${addZero(date.getDate())}/${addZero(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${addZero(date.getHours())}:${addZero(
    date.getMinutes()
  )}:${addZero(date.getSeconds())}`;
};

const addZero = (num) => {
  if (num.toString().length === 1) num = `0${num}`;
  return num;
};

module.exports = stock;
