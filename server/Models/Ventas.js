const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipe = new Schema({
  refNum: { type: Number, required: true },
  fecha: { type: Date, required: true },
  totalPesos: { type: Number, require: true },
  totalDolares: { type: Number, require: true },
  descuento: { type: Number, require: true },
  details: [
    {
      idProduct: { type: String, require: true },
      cantidad: { type: Number, require: true },
      precioDolar: { type: Number, require: true },
      precioPesos: { type: Number, require: true },
      descripcion: { type: String, require: true },
      total: { type: Number, require: true },
    },
  ],
});

module.exports = mongoose.model("Recipe", recipe);
