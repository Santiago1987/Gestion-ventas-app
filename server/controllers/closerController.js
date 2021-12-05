const Closers = require("../Models/Closers");
const Ventas = require("../Models/Ventas");
const moment = require("moment");
const close = {};

close.getData = async (req, res) => {
  let fromDate = "";
  let toDate = moment(new Date());
  let salesList = [];
  let artList = [];
  let totalPes = 0;
  let totalDol = 0;
  let totalN = 0;
  let totalCant = 0;
  let salesIDs = [];

  let lastClose = await Closers.find();

  if (lastClose.length === 0) {
    let firstSale = await Ventas.find().sort({ _id: -1 }).limit(1);
    let { fecha } = firstSale[0];
    fromDate = fecha;
  } else {
    let { toDate } = lastClose;
    fromDate = toDate;
  }

  let frDate = moment(fromDate).add(-1, "days");

  try {
    salesList = await Ventas.find({
      fecha: { $gte: frDate },
      procesado: false,
    });
  } catch (err) {
    console.log("error " + err);
    error = "error " + err;
  }

  if (salesList.length === 0) {
    res.send([]).status(200);
    return;
  }

  await Promise.all(
    salesList.map(async (s) => {
      let { _id, totalPesos, totalDolares, totalNerd } = s;

      totalPes += totalPesos;
      totalDol += totalDolares;
      totalN += totalNerd;
      salesIDs.push(_id);

      let resdetail = await Ventas.findOne(
        { _id },
        {
          _id: 0,
          refNum: 0,
          fecha: 0,
          totalPesos: 0,
          totalDolares: 0,
          descuento: 0,
          procesado: 0,
        }
      );
      let { details } = resdetail;

      details.map((d) => {
        let {
          idArticle,
          descripcion,
          precioPesos,
          precioDolar,
          precioNerd,
          cantidad,
        } = d;
        let totp = precioPesos * cantidad;
        let totd = precioDolar * cantidad;
        let totn = precioNerd * cantidad;
        totalCant += cantidad;

        let index = artList.findIndex((a) => a.idArticle === idArticle);

        if (index === -1) {
          artList.push({
            idArticle,
            descripcion,
            precioPesos: totp,
            precioDolar: totd,
            precioNerd: totn,
            cantidad,
          });
          return;
        }

        artList[index].precioPesos += totp;
        artList[index].precioDolar += totd;
        artList[index].precioNerd += totn;
        artList[index].cantidad += cantidad;
      });
    })
  );

  let result = {
    fromDate,
    toDate,
    totalPes,
    totalCant,
    totalDol,
    totalN,
    artList,
    salesIDs,
  };

  res.send(result).status(200);
};

close.saveData = async (req, res) => {
  let toDate = moment(new Date()).add(-3, "hours");
  let result = {};

  let { fromDate, totalPes, totalCant, totalDol, totalN, artList, salesIDs } =
    req.body;

  let details = artList.map((art) => {
    let { idArticle, precioPesos, precioDolar, precioNerd, cantidad } = art;
    return {
      idArticulo: idArticle,
      cantidad,
      totalUSD: precioDolar,
      totalPesos: precioPesos,
      totalNerd: precioNerd,
    };
  });

  let salesList = salesIDs.map((s) => ({ idReceipt: s }));

  let closer = {
    fromDate,
    toDate,
    totalPesos: totalPes,
    totalCantidad: totalCant,
    totalDolar: totalDol,
    totalSuppl: totalN,
    details,
    salesList,
  };

  try {
    let newCloser = new Closers(closer);
    result = await newCloser.save();

    let { salesList } = result;

    if (salesList.length > 0) {
      salesList.map(async (s) => {
        let { idReceipt } = s;
        let res = await Ventas.updateOne(
          { _id: idReceipt },
          { procesado: true }
        );
      });
    }
  } catch (err) {
    console.log(err);
  }

  res.send(closer).status(200);
  return;
};

module.exports = close;
