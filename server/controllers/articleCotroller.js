const article = {};
const Articulos = require("../Models/Articulos");

//------------------------------------------------------------------------
// GET: Lista de articulos
article.getListArticles = async (req, res) => {
  const list = await Articulos.find();
  console.log(list);

  res.status(200).send(list);
};

// GET: Unico articulo
article.getArticle = async (req, res) => {
  const article = await Articulos.findById(req.params.id);

  res.status(200).send(article);

  return;
};

//------------------------------------------------------------------------
// POST: Guardado de articulos
article.saveArticle = (req, res) => {
  const articles = req.body;
  let error = "";

  articles.map(async (art) => {
    let { descripcion, precio, stock } = art;
    let newArticle = new Articulos({ descripcion, precio, stock });

    try {
      await newArticle.save();
    } catch (err) {
      console.log("error", err);
      error = err;
    }
  });

  if (error === "") {
    res.status(200).json({ message: "ok" });
  } else {
    res.status(400).json({ _id: 0, error });
  }
  return;
};

// POST: Nuevo articulo
article.newArticle = async (req, res) => {
  const { descripcion, stock, precio } = req.body;

  let newArticle = Articulos({ descripcion, stock, precio });

  let result = 0;
  try {
    result = await newArticle.save();
  } catch (err) {
    res.status(400).json({ _id: 0, err });
  }
  res.status(200).send(result);

  return;
};

//------------------------------------------------------------------------
// UPDATE: Update article
article.updArticle = async (req, res) => {
  let id = req.params.id;
  let result = 0;
  try {
    result = await Articulos.updateOne({ _id: id }, req.body);
  } catch (err) {
    res.status(400).json({ _id: 0, err });
  }
  res.status(200).send(result);
};

//------------------------------------------------------------------------
// DELETE: Delete article
article.delArticle = async (req, res) => {
  const id = req.params.id;
  let result = 0;
  try {
    result = await Articulos.remove({ _id: id });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ _id: 0 });
  }

  res.status(200).send(result);
};

module.exports = article;
