const mongoose = require("mongoose");
const { Schema } = mongoose;

const SettingSchema = new Schema({
  name: { type: String, require: true },
  value: { type: String, require: true },
});

module.exports = mongoose.model("Settings", SettingSchema);
