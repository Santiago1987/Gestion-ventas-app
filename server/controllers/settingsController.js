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

  const names = Object.keys(body);
  const values = Object.values(body);

  for (i = 0; i < names.length; i++) {
    let sett = { name: names[i], value: values[i] };
    settings.push(sett);
  }

  if (settings.length === 0) return;

  Promise.all(
    settings.map(async (s) => {
      let { name, value } = s;

      let result = await Settings.find({ name });

      if (result.length === 0) {
        let dbSett = new Settings(s);
        await dbSett.save();
      }

      await Settings.updateOne({ name }, { value });

      /*let dbSett = new Settings(s);*/
    })
  );

  res.status(200).json({ _id: 0, message: "settings saved" });
  return;
};

module.exports = settings;
