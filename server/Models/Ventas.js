const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipe = new Schema({
  refNum: { type: Number, required: true },
  fecha: { type: String, required: true },
  totalPesos: { type: Number, require: true },
  totalDolares: { type: Number, require: true },
  Descuento: { type: Number, require: true },
});

module.exports = mongoose.model("Recipe", recipe);
