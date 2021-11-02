const stock = {};
const Articulos = require("../Models/Articulos");

stock.movement = async ({ cant, razon, id }) => {
  let today = new Date();

  let article = await Articulos.findById(id);

  if (article === {}) return article;

  let { stock } = article;

  if (razon === "venta") {
    stkfinal = parseInt(stock) - parseInt(cant);
  } else if (razon === "ingreso") {
    stkfinal = parseInt(stock) + parseInt(cant);
  }

  let newmov = {
    variacion: cant,
    razon,
    fecha: today,
    fechaSTR: getFecha(today),
  };

  try {
    await Articulos.updateOne(
      { _id: id },
      { stock: stkfinal, $push: { stockMove: newmov } }
    );
  } catch (err) {
    console.log("stock error: ", err);
    return article;
  }
  article = await Articulos.findById(id);

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
