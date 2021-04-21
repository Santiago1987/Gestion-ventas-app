const estdisticas = {};
const moment = require("moment");

const Articulos = require("../Models/Articulos");
const Ventas = require("../Models/Ventas");
const VentasDetalle = require("../Models/DetalleVentas");
const Stock = require("../Models/Stock");

//------------------------------------------------------------------------
// GET: Lista de ventas en un determinado periodo
estdisticas.getVentas = async (req, res) => {
  let response = null;
  let error = "";
  let result = [];
  let { frDate, toDate } = req.query;
  const today = new Date();

  if (toDate) toDate = moment(toDate + " 23:59:59");

  if (!toDate) toDate = moment(new Date());
  if (!frDate) frDate = moment(new Date()).add(-1, "months");

  try {
    response = await Ventas.find({ fecha: { $gte: frDate, $lte: toDate } });
  } catch (err) {
    console.log("error " + err);
    error = "error " + err;
  }

  if (error !== "") {
    res.send(error).status(500);
    return;
  }

  if (response.length === 0) {
    res.send([]).status(200);
    return;
  }

  response.map((data) => {
    let { fecha, totalPesos, totalDolares } = data;
    fecha = moment(fecha).format("DD/MM/YYYY");
    let index = result.findIndex((d) => d.fecha === fecha);

    if (index === -1) {
      result.push({ fecha, totalPesos, totalDolares });
      return;
    }

    // ACUMULACION
    result[index].totalPesos += totalPesos;
    result[index].totalDolares += totalDolares;

    //REDONDEO A DOS DECIMALES
    result[index].totalPesos =
      Math.round((result[index].totalPesos + Number.EPSILON) * 100) / 100;

    result[index].totalDolares =
      Math.round(result[index].totalDolares * 100) / 100;

    return;
  });

  res.send(result).status(200);
};

module.exports = estdisticas;
