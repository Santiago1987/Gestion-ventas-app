const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeDetail = new Schema({
  idRecipe: { type: String, require: true },
  idArt: { type: String, require: true },
  cantidad: { type: Number, require: true },
  precioDolar: { type: Number, require: true },
  precioPesos: { type: Number, require: true },
  descripcion: { type: String, require: true },
  total: { type: Number, require: true },
});

module.exports = mongoose.model("RecipeDetail", recipeDetail);
