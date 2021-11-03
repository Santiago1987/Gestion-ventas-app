const article = {};
const Articulos = require("../Models/Articulos");

const stock = require("../controllers/stockController");

//------------------------------------------------------------------------
// GET: Lista de articulos
article.getListArticles = async (req, res) => {
  const list = await Articulos.find();
  let result = [];

  list.map((art) => {
    let { _id, descripcion, prDolar, stock, ingreso } = art;
    result.push({ _id, descripcion, prDolar, stock, ingreso });
  });

  res.status(200).send(result);
};

// GET: Unico articulo
article.getArticle = async (req, res) => {
  const article = await Articulos.findById(req.params.id);

  let { _id, descripcion, prDolar, stock, ingreso } = article;

  let result = {};
  result = { _id, descripcion, prDolar, stock, ingreso };

  res.status(200).send(result);

  return;
};

//------------------------------------------------------------------------
// POST: Guardado de articulos
article.saveArticle = (req, res) => {
  const articles = req.body;
  let error = "";
  let result = null;
  let stockMove = [];

  articles.map(async (art) => {
    let { descripcion, prDolar, stock, ingreso } = art;
    let newArticle = new Articulos({
      descripcion,
      prDolar,
      stock,
      ingreso,
      stockMove,
    });

    try {
      result = await newArticle.save();
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

// POST: SAVE IMPORT ARTICLE FROIM EXCEL FILE
article.saveFile = (list) => {
  let stockMove = [];
  if (list.length < 0) {
    console.log("Error no articles list");
    return;
  }
  list.map(async (art) => {
    let { descripcion, prDolar, stock, ingreso } = art;
    let newArticle = new Articulos({
      descripcion,
      prDolar,
      stock,
      ingreso,
      stockMove,
    });

    try {
      result = await newArticle.save();
    } catch (err) {
      console.log("error", err);
      error = err;
    }
  });

  console.log("Proccess finished");
};

// POST: Nuevo articulo
article.newArticle = async (req, res) => {
  const { descripcion, stock, prDolar, ingreso } = req.body;
  let stockMove = [];

  let newArticle = new Articulos({
    descripcion,
    stock,
    prDolar,
    ingreso,
    stockMove,
  });

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
    res.status(400).json({ id: 0, err });
  }
  result = req.body;
  result.id = id;
  res.status(200).send(result);
};

//------------------------------------------------------------------------
// DELETE: Delete article
article.delArticle = async (req, res) => {
  const id = req.params.id;
  let result = 0;
  try {
    result = await Articulos.deleteOne({ _id: id });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ id: 0, error: err });
    return;
  }
  let idstk = stock.delAllMov(id);
  if (idstk === 0) {
    res.status(500).json({ id: 0, error: "ERROR EN BORRADO DE STOCK" });
    return;
  }

  res.status(200).send({ id });
  return;
};

module.exports = article;
