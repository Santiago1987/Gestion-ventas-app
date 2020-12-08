const express = require("express");
const test = require("../controllers/data.js");
const article = require("../controllers/articleCotroller.js");

const router = express.Router();
//------------------------------------------------------------------------------------------
router.get("/get", test.get);

router.post("/post", test.post);
//------------------------------------------------------------------------------------------

//POST: guardar articulos
router.post("/save/articles", article.saveArticle);

//GET: obtener lista de articulos
router.get("/article/list", article.getListArticles);

module.exports = router;
