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

router.route("/getAllPedidos").get(getAllPedidos);
router.route("/getPedidosPendientes").get(getPedidosPendientes);
router.route("/getPedidoByCliente/:id_cliente").get(getPedidoByCliente);
router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido)
router.route("/").post(createPedido);

module.exports = router;
 