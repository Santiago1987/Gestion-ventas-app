const ventas = {};
const Recipe = require("../Models/Ventas");
const RecipeDetail = require("../Models/DetalleVentas");

//------------------------------------------------------------------------
// POST: Guardar venta
ventas.saveRecipe = async (req, res) => {
  const {
    fecha,
    totalPesos,
    totalDolares,
    descuento,
    listArticulos,
  } = req.body;

  let resultRCP,
    resultRCPD = null;
  let error = "";
  let newRecipe = new Recipe({ fecha, totalPesos, totalDolares, descuento });

  try {
    result = await Recipe.save();
    let idRecipe = result._id;

    listArticulos.map((art) => {});
  } catch (err) {
    console.log("error", err);
    error = err;
  }
};
