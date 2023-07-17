const PedidoModel = require("../models/pedido");
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');
const { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfToday } = require('date-fns');



exports.getAllPedidos = async () => {
  return await PedidoModel.find().sort({ _id: -1 });
};

exports.getPedidosPendientes = async () => {
  return await PedidoModel.find({
    estado_pedido: { $nin: ['FINALIZADO', 'CANCELADO'] }
  }).sort({ _id: -1 });
};

exports.createPedido = async (pedido) => {
  return await PedidoModel.create(pedido);
};

exports.getPedidoById = async (id) => {
  return await PedidoModel.findById(id);
};

exports.getPedidoByCliente = async (id_cliente) => {
  return await PedidoModel.find({ id_cliente: id_cliente }).exec();
};

exports.updatePedido = async (id, pedido) => {
  return await PedidoModel.findByIdAndUpdate(id, pedido);
};

exports.deletePedido = async (id) => {
  return await PedidoModel.findByIdAndDelete(id);
};

exports.getPedidosHoy = async () => {
  const timeZone = 'America/Argentina/Buenos_Aires';
  const today = utcToZonedTime(new Date(), timeZone);
  const startOfTodayDate = zonedTimeToUtc(startOfDay(today), timeZone);
  const endOfToday = zonedTimeToUtc(endOfDay(today), timeZone);

  return await PedidoModel.find({
    fecha: { $gte: startOfTodayDate, $lte: endOfToday }
  });
};

exports.getPedidosAyer = async () => {
  const timeZone = 'America/Argentina/Buenos_Aires';
  const yesterday = utcToZonedTime(subDays(new Date(), 1), timeZone);
  const startOfYesterday = zonedTimeToUtc(startOfDay(yesterday), timeZone);            
  const endOfYesterday = zonedTimeToUtc(endOfDay(yesterday), timeZone);

  console.log('yesterday', yesterday);
  console.log('startOfYesterday', startOfYesterday);
  console.log('endOfYesterday', endOfYesterday);

  return await PedidoModel.find({
    fecha: { $gte: startOfYesterday, $lte: endOfYesterday }
  });
};


exports.getPedidosSemana = async () => {
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // 1 represents Monday as the start of the week
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });

  return await PedidoModel.find({
    fecha: { $gte: startOfThisWeek, $lte: endOfThisWeek }
  });
};

exports.getPedidosMes = async (startOfMonth, endOfMonth) => {
  return await PedidoModel.find({
    fecha: { $gte: startOfMonth, $lte: endOfMonth }
  });
};
