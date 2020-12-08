const article = {};
const Articulos = require("../Models/Articulos");

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
    res.status(500).json({ message: "nok", error });
  }
  return;
};

// GET: Lista de articulos
article.getListArticles = async (req, res) => {
  const list = await Articulos.find();
  console.log(list);

  res.status(200).send(list);
};

module.exports = article;
