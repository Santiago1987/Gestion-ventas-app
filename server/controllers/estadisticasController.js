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
  let { frDate, toDate, detalle } = req.query;

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

  if (detalle === "false") {
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
  }
  if (detalle === "true") {
    response.map((data) => {
      let { _id, fecha, refNum, totalPesos, totalDolares } = data;
      fecha = moment(fecha).utc();
      result.push({
        id: _id,
        fecha: moment(fecha).format("DD/MM/YYYY"),
        time: moment(fecha).format("HH:mm:ss"),
        reference: refNum,
        totalPesos,
        totalDolares,
      });
    });
  }

  res.send(result).status(200);
  return;
};

// STOCK FINALES DE LOS ARTICULOS
estdisticas.getStock = async (req, res) => {
  let response = null;
  let result = [];
  let error = "";

  try {
    response = await Articulos.find();
  } catch (err) {
    console.log("error " + err);
    error = "error " + err;
  }

  if (error !== "") {
    res.send(error).status(500);
    return;
  }

  if (response.length > 0) {
    result = response.map((stk) => {
      let { _id, descripcion, stock } = stk;
      return { _id, descripcion, stock };
    });
  }

  res.send(result).status(200);
  return;
};

estdisticas.getMovimientosStock = async (req, res) => {
  let id = req.params.id;

  if (id === undefined) {
    res.send({ id: 0, message: "missing filter" }).status(400);
    return;
  }

  let response = null;
  let result = [];
  let error = "";

  try {
    response = await Stock.find({ artID: id });
  } catch (err) {
    console.log("error " + err);
    error = "error " + err;
  }

  if (error !== "") {
    res.send(error).status(500);
    return;
  }

  if (response.length > 0) {
    result = response.map((stk) => {
      let { variacion, razon, fecha, stkFinal } = stk;
      return { variacion, razon, fecha, stkFinal };
    });
  }

  res.send(result).status(200);
  return;
};

estdisticas.getDetallesVentas = async (req, res) => {
  let response = null;
  let error = "";
  let result = [];

  let { id } = req.params;

  if (id === undefined) {
    res.send({ id: 0, message: "missing filter" }).status(400);
    return;
  }

  try {
    response = await VentasDetalle.find({ idRecipe: id });
  } catch (err) {
    console.log("error " + err);
    error = "error " + err;
  }

  if (error !== "") {
    res.send({ id: 0, message: error }).status(500);
    return;
  }

  if (response.length > 0) {
    await Promise.all(
      response.map(async (dat) => {
        let { _id, idArt, cantidad, precioPesos, precioDolar, total } = dat;

        result.push({
          id: _id,
          descripcion: await getArtDescr(idArt),
          cantidad,
          precioPesos,
          precioDolar,
          total,
        });

        return;
      })
    );
  }

  res.send(result).status(200);
  return;
};

module.exports = estdisticas;

const getArtDescr = async (id) => {
  let response = "";
  let descripcion = "";

  try {
    response = await Articulos.find({ _id: id });
  } catch (err) {
    console.log("error " + err);
    error = "error " + err;
  }

  if (response.length > 0) {
    descripcion = response[0].descripcion;
  }

  return descripcion;
};
