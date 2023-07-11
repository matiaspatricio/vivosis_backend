const IngresoModel = require("../models/ingreso");

exports.getAllIngresos = async () => {
  return await IngresoModel.find();
};

exports.createIngreso = async (ingreso) => {
  return await IngresoModel.create(ingreso);
};
exports.getIngresoById = async (id) => {
  return await IngresoModel.findById(id);
};

exports.updateIngreso = async (id, ingreso) => {
  return await IngresoModel.findByIdAndUpdate(id, ingreso);
};

exports.deleteIngreso = async (id) => {
  return await IngresoModel.findByIdAndDelete(id);


// Faltaria un servicio para obtener  por otro criterio ej localidad , nombre
};
