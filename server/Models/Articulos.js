const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArtciculoSchema = new Schema({
  descripcion: { type: String, required: true },
  prDolar: { type: Number, required: true },
  stock: { type: Number, required: true },
  ingreso: { type: Number, required: true },
});

module.exports = mongoose.model("Articulos", ArtciculoSchema);
