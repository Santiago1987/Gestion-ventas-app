const settings = {};

const Settings = require("../Models/Settings");

//------------------------------------------------------------------------
//GET: obtener los settings
settings.getSettings = async (req, res) => {
  const sett = await Settings.find();

  res.status(200).send(sett);
};

//------------------------------------------------------------------------
// POST: guardado de los settings
settings.saveSettings = async (req, res) => {
  const { dolar } = req.body;
  let error = "";

  let newSettings = new Settings({ dolar });

  try {
    result = await newSettings.save();
  } catch (err) {
    console.log("error", err);
    error = err;
  }

  if (error === "") {
    res.status(200).json({ _id: 1, dolar });
  } else {
    es.status(400).json({ _id: 0, error });
  }

  return;
};

module.exports = settings;
