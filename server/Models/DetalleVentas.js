const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeDetail = new Schema({
  idRecipe: { type: String, require: true },
  idArt: { type: String, require: true },
  cantidad: { type: Number, require: true },
  PrecioDolar: { type: Number, require: true },
  PrecioPesos: { type: Number, require: true },
});

module.exports = mongoose("RecipeDetail", recipeDetail);
