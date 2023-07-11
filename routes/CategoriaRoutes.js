const express = require("express");
const {
  getAllCategorias,
  createCategoria,
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
} = require("../controllers/CategoriaController");

const router = express.Router();

router.route("/getAllCategorias").get(getAllCategorias);
router.route("/:id").get(getCategoriaById).put(updateCategoria).delete(deleteCategoria);
router.route("/").post(createCategoria);

module.exports = router;
 