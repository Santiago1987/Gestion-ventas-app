const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipe = new Schema({
  refNum: { type: Number, required: true },
  fecha: { type: Date, required: true },
  totalPesos: { type: Number, require: true },
  totalDolares: { type: Number, require: true },
  descuento: { type: Number, require: true },
});

module.exports = mongoose.model("Recipe", recipe);
