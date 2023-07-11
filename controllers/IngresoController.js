const IngresoService = require("../services/IngresoService");

exports.getAllIngresos = async (req, res) => {
  try {
    const ingresos = await IngresoService.getAllIngresos();
    res.json(ingresos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createIngreso = async (req, res) => {
  try {
    console.log("Crear ingreso")
    const ingreso = await IngresoService.createIngreso(req.body);
    res.json(ingreso);
    console.log(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIngresoById = async (req, res) => {
  try {
    const ingreso = await IngresoService.getIngresoById(req.params.id);
    res.json(ingreso);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateIngreso = async (req, res) => {
  try {
    const ingreso = await IngresoService.updateIngreso(req.params.id, req.body);
    res.json(ingreso);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteIngreso = async (req, res) => {
  try {
    const ingreso = await IngresoService.deleteIngreso(req.params.id);
    res.json(ingreso);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
