const stock = {};
const Stock = require("../Models/Stock");
const Articulos = require("../Models/Articulos");

stock.movement = async ({ cant, razon, id }) => {
  let today = new Date();
  let result = {};
  let article = Articulos.find({ _id: id });

  if (article === {}) return article;
  let { stock } = article;
  let stkFinal = stock - cant;

  let newMov = {
    variacion: cant,
    razon,
    fecha: today,
    fechaSTR: getFecha(today),
    artId: id,
    stkFinal,
  };

  let newStk = new Stock(newMov);
  try {
    result = await newStk.save();
  } catch (err) {
    console.log("stock error: ", err);
    return article;
  }

  article.stock = stkFinal;

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

stock.saveMov = (req, res) => {
  console.log("req.body", req.body);
  let { id, cant } = req.body;

  let art = this.movement({ cant, razon: "ingreso", id });

  res.status(200).json({ id, stock: art.stock });
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
