const test = {};

test.get = (req, res) => {
  res.json({ message: "funca bro" }).status(200);
};

test.post = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.status(200).json({ mes: "todo ok" });
};

module.exports = test;
