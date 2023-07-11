const express = require("express");
const {
  getAllClientes,
  createCliente,
  getClienteById,
  updateCliente,
  deleteCliente,
} = require("../controllers/ClienteController");

const router = express.Router();

router.route("/getAllClientes").get(getAllClientes);
router.route("/:id").get(getClienteById).put(updateCliente).delete(deleteCliente);
router.route("/").post(createCliente);

module.exports = router;
 