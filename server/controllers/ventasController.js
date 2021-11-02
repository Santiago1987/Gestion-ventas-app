const ventas = {};
const Receipt = require("../Models/Ventas");
const stock = require("../controllers/stockController");
const moment = require("moment");

//------------------------------------------------------------------------
// POST: Guardar venta
ventas.saveRecipe = async (req, res) => {
  let result = "";
  let stkupd = [];
  let ditails = [];

  let { refNum, fecha, totalPesos, totalDolares, descuento, lines } = req.body;
  let error = "";

  try {
    let receipt = {
      refNum,
      fecha: moment.parseZone(fecha).local(),
      totalPesos,
      totalDolares,
      descuento,
      ditails,
    };

    let newReceipt = new Receipt(receipt);
    result = await newReceipt.save();

    let idHead = result._id;

    await Promise.all(
      lines.map(async (ln) => {
        let { id, descripcion, precioPesos, precioDolar, cant, total } = ln;

        let newLn = {
          idArticle: id,
          descripcion,
          precioPesos,
          precioDolar,
          cantidad: cant,
          total,
        };

        let detres = await Receipt.updateOne(
          { _id: idHead },
          {
            $push: {
              details: newLn,
            },
          }
        );

        stkLn = await stock.movement({ cant, razon: "venta", id });
        stkupd.push(stkLn);
      })
    );
  } catch (err) {
    console.log("error", err);
    error = err;
  }

  if (error !== "") {
    res.status(400).json([{ _id: 0, error }]);
  }
  res.status(200).json(stkupd);
  return;
};

module.exports = ventas;
