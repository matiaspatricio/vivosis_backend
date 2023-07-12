const express = require("express");
const {
  getAllIngresos,
  createIngreso,
  getIngresoById,
  updateIngreso,
  deleteIngreso,
} = require("../controllers/IngresoController");

const router = express.Router();

router.route("/getallingresos").get(getAllIngresos);
router.route("/:id").get(getIngresoById).put(updateIngreso).delete(deleteIngreso);
router.route("/").post(createIngreso);

module.exports = router;
 