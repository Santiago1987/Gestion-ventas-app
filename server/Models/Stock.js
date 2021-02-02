const mongoose = require("mongoose");
const { Schema } = mongoose;

const StockSchema = new Schema({
  ingreso: { type: Number, required: true },
  fecha: { type: String, required: true },
  artID: { type: String, required: true },
  stkFinal: { type: Number, required: true },
});

module.exports = mongoose.model("Stock", StockSchema);
