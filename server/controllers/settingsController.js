const settings = {};
const Settings = require("../Models/Settings");

//------------------------------------------------------------------------
//GET: obtener los settings
settings.getSettings = async (req, res) => {
  const settings = await Settings.find();

  const values = Object.values(settings);

  let result = {};

  for (i = 0; i < values.length; i++) {
    let { name, value } = values[i];
    let sett = {};
    sett[name] = value;
    result = { ...result, ...sett };
  }

  res.status(200).send(result);
};

//------------------------------------------------------------------------
// POST: guardado de los settings
settings.saveSettings = async (req, res) => {
  const body = req.body;
  let settings = [];
  let seteos = {};

  const names = Object.keys(body);
  const values = Object.values(body);

  for (i = 0; i < names.length; i++) {
    let sett = { name: names[i], value: values[i] };
    settings.push(sett);
  }

  if (settings.length === 0) return;

  await Promise.all(
    settings.map(async (s) => {
      let { name, value } = s;

      let result = await Settings.find({ name });

      if (result.length === 0) {
        let dbSett = new Settings(s);
        await dbSett.save();
      }

      let response = await Settings.updateOne({ name }, { value });

      let { ok } = response;
      if (ok === 1) seteos[name] = value;
    })
  );

  res.status(200).json({ ...seteos });
  return;
};

module.exports = settings;
