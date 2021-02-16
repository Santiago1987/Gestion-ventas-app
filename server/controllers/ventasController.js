const ventas = {};
const Recipe = require("../Models/Ventas");
const RecipeDetail = require("../Models/DetalleVentas");
const Stock = require("../Models/Stock");

//------------------------------------------------------------------------
// POST: Guardar venta
ventas.saveRecipe = async (req, res) => {
  let result = "";
  let resLn = "";

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
      await Stock.movement({ cant, razon: "venta", id });
    });
  } catch (err) {
    console.log("error", err);
    error = err;
  }

  if (error === "") {
    res.status(200).json(lines);
  } else {
    res.status(400).json({ id: 0, error });
  }
  return;
};

module.exports = ventas;
