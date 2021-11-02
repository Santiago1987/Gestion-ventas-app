const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockMmoveSchema = new Schema({
  variacion: { type: Number, required: true },
  razon: { type: String, required: true },
  fecha: { type: Date, required: true },
  fechaSTR: { type: String, require: true },
});

const ArtciculoSchema = new Schema({
  descripcion: { type: String, required: true },
  prDolar: { type: Number, required: true },
  stock: { type: Number, required: true },
  ingreso: { type: Number, required: true },
  stockMove: [{ type: stockMmoveSchema, require: false }],
});

module.exports = mongoose.model("Articulos", ArtciculoSchema);
