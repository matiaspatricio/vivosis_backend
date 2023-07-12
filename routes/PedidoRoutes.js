const express = require("express");
const {
  getAllPedidos,
  getPedidosPendientes,
  createPedido,
  getPedidoById,
  getPedidoByCliente,
  updatePedido,
  deletePedido,
} = require("../controllers/PedidoController");

const router = express.Router();

router.route("/getallpedidos").get(getAllPedidos);
router.route("/getpedidospendientes").get(getPedidosPendientes);
router.route("/getpedidobycliente/:id_cliente").get(getPedidoByCliente);
router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido)
router.route("/").post(createPedido);

module.exports = router;
 