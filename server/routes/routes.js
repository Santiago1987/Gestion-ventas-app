const express = require("express");
const article = require("../controllers/articleCotroller.js");

const router = express.Router();

//GET: obtener lista de articulos
router.get("/article/list", article.getListArticles);

// GET: Unico articulo
router.get("/article/:id", article.getArticle);

//POST: guardar articulos
router.post("/save/articles", article.saveArticle);

// POST: Nuevo articulo
router.post("/save/newArticle", article.newArticle);

// UPDATE: Update article
router.post("/update/article/:id", article.updArticle);

// DELETE: Delete article
router.delete("/delete/article/:id", article.delArticle);

module.exports = router;
