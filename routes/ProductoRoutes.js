const express = require("express");
const {
  getAllProductos,
  createProducto,
  getProductoById,
  updateProducto,
  deleteProducto,
} = require("../controllers/ProductoController");

const router = express.Router();

router.route("/getallproductos").get(getAllProductos);
router.route("/:id").get(getProductoById).put(updateProducto).delete(deleteProducto);
router.route("/").post(createProducto);

module.exports = router;
 