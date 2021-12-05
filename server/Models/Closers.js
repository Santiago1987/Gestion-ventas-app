const mongoose = require("mongoose");
const { Schema } = mongoose;

const detailSchema = new Schema({
  idArticulo: { type: String, require: true },
  cantidad: { type: Number, require: true },
  totalUSD: { type: Number, require: true },
  totalPesos: { type: Number, require: true },
  totalNerd: { type: Number, require: true },
});

const salesListSchema = new Schema({
  idReceipt: { type: String, require: true },
});

const closerSchema = new Schema({
  fromDate: { type: Date, require: true },
  toDate: { type: Date, require: true },
  totalPesos: { type: Number, require: true },
  totalDolar: { type: Number, require: true },
  totalSuppl: { type: Number, require: true },
  totalCantidad: { type: Number, require: true },
  details: [{ type: detailSchema, require: true }],
  salesList: [{ type: salesListSchema, require: true }],
});

module.exports = mongoose.model("Closers", closerSchema);
