const mongoose = require("mogoose");
const { Schema } = mongoose;

const SetttingSchema = new Schema({
  dolar: { type: Number, required: true },
});

module.exports = mongoose.model("Settings", SetttingSchema);
