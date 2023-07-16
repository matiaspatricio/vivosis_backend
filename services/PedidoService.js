const PedidoModel = require("../models/pedido");

exports.getAllPedidos = async () => {
  return await PedidoModel.find().sort({ fecha: 1 });
};

exports.getPedidosPendientes = async () => {
  return await PedidoModel.find({
    estado_pedido: { $nin: ['FINALIZADO', 'CANCELADO'] }
  }).sort({ fecha: 1 });
};

exports.createPedido = async (pedido) => {
  return await PedidoModel.create(pedido);
};
exports.getPedidoById = async (id) => {
  return await PedidoModel.findById(id);
};

exports.getPedidoByCliente = async (id_cliente) => {
  // write the code to get a pedido by cliente field
  return await PedidoModel.find({id_cliente  : id_cliente}).exec();
};

exports.updatePedido = async (id, pedido) => {
  return await PedidoModel.findByIdAndUpdate(id, pedido);
};

exports.deletePedido = async (id) => {
  return await PedidoModel.findByIdAndDelete(id);


// Faltaria un servicio para obtener  por otro criterio ej localidad , nombre
};
