const ventas = {};
const Recipe = require("../Models/Ventas");
const RecipeDetail = require("../Models/DetalleVentas");
const stock = require("../controllers/stockController");

//------------------------------------------------------------------------
// POST: Guardar venta
ventas.saveRecipe = async (req, res) => {
  let result = "";
  let resLn = "";
  let stkLn = null;
  let stkupd = [];

  let { refNum, fecha, totalPesos, totalDolares, descuento, lines } = req.body;

  let error = "";
  let newRecipe = new Recipe({
    refNum,
    fecha,
    totalPesos,
    totalDolares,
    descuento,
  });

  try {
    result = await newRecipe.save();
    let index = result._id;

    await Promise.all(
      lines.map(async (ln) => {
        let { id, descripcion, precioPesos, precioDolar, cant, total } = ln;

        let newLn = new RecipeDetail({
          idRecipe: index,
          idArt: id,
          descripcion,
          precioPesos,
          precioDolar,
          cantidad: cant,
          total,
        });

        resLn = await newLn.save();
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
