const express = require("express");
const article = require("../controllers/articleCotroller.js");
const ventas = require("../controllers/ventasController");
const stock = require("../controllers/stockController");
const settings = require("../controllers/settingsController");
const estadisticas = require("../controllers/estadisticasController");
const close = require("../controllers/closerController");

const router = express.Router();

//--------------------Articulos-----------------------------------------
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

//--------------------Ventas-----------------------------------------
//POST: Guardar venta
router.post("/save/venta", ventas.saveRecipe);

//--------------------Stock-----------------------------------------
router.post("/save/stkmov", stock.saveMov);

//--------------------Settings-----------------------------------------
//GET: obtener los settings
router.get("/settings", settings.getSettings);

//POST: Guardar settings
router.post("/settings/save", settings.saveSettings);

module.exports = router;

//--------------------Estadisticas-----------------------------------------

router.get("/estadisticas/ventas", estadisticas.getVentas);

router.get("/estadisticas/stock", estadisticas.getStock);

router.get(
  "/estadisticas/stock/movimientos/:id",
  estadisticas.getMovimientosStock
);

router.get(
  "/estadisticas/stock/ventas/detalle/:id",
  estadisticas.getDetallesVentas
);

//--------------------Closers-----------------------------------------
//GET: obtenes listado de productos y totales
router.get("/close/list", close.getData);

//POST: guardado de cierre de periodo
router.post("/close/save", close.saveData);
