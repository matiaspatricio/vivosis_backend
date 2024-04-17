const ClienteModel = require("../models/cliente");

exports.getAllClientes = async () => {
  
  return await ClienteModel.find()/*.limit(15)*/;
  
};

exports.createCliente = async (cliente) => {
  return await ClienteModel.create(cliente);
};
exports.getClienteById = async (id) => {
  return await ClienteModel.findById(id);
};

exports.updateCliente = async (id, cliente) => {
  return await ClienteModel.findByIdAndUpdate(id, cliente);
};

exports.deleteCliente = async (id) => {
  return await ClienteModel.findByIdAndDelete(id);
};
