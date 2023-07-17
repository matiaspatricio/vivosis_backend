const PedidoModel = require("../models/pedido");
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');
const { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfToday } = require('date-fns');
const timeZone = 'America/Argentina/Buenos_Aires';


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
  const today = utcToZonedTime(new Date(), timeZone);
  const startOfTodayDate = zonedTimeToUtc(startOfDay(today), timeZone);
  const endOfToday = zonedTimeToUtc(endOfDay(today), timeZone);

  return await PedidoModel.find({
    fecha: { $gte: startOfTodayDate, $lte: endOfToday }
  });
};

exports.getPedidosAyer = async () => {  
  const yesterday = utcToZonedTime(subDays(new Date(), 1), timeZone);
  const startOfYesterday = zonedTimeToUtc(startOfDay(yesterday), timeZone);            
  const endOfYesterday = zonedTimeToUtc(endOfDay(yesterday), timeZone);

  return await PedidoModel.find({
    fecha: { $gte: startOfYesterday, $lte: endOfYesterday }
  });
};


exports.getPedidosSemana = async () => {
  const lastWeek = zonedTimeToUtc(new Date());
  const startOfThisWeek = zonedTimeToUtc(startOfWeek(lastWeek, { weekStartsOn: 1 })); // 1 represents Monday as the start of the week
  const endOfThisWeek = zonedTimeToUtc(endOfWeek(lastWeek, { weekStartsOn: 1 }));

  /*console.log("lastWeek", lastWeek);
  console.log("startOfThisWeek", startOfThisWeek);
  console.log("endOfThisWeek", endOfThisWeek);*/

  return await PedidoModel.find({
    fecha: { $gte: startOfThisWeek, $lte: endOfThisWeek }
  });
};

exports.getPedidosMes = async (startOfMonth, endOfMonth) => {
  return await PedidoModel.find({
    fecha: { $gte: startOfMonth, $lte: endOfMonth }
  });
};

exports.getPedidosSemanaAnterior = async () => {
  const today = zonedTimeToUtc(new Date());
  const startOfLastWeek = zonedTimeToUtc(startOfWeek(today, { weekStartsOn: 1 })); // 1 represents Monday as the start of the week
  const endOfLastWeek = zonedTimeToUtc(endOfWeek(today, { weekStartsOn: 1 }));

  // Ajustar las fechas para que sean la última hora del día
  const endOfLastWeekWithTime = zonedTimeToUtc(new Date(endOfLastWeek.getTime() + 86399999));

  /*console.log("today", today);
  console.log("startOfLastWeek", startOfLastWeek);
  console.log("endOfLastWeek", endOfLastWeekWithTime);*/

  return await PedidoModel.find({
    fecha: { $gte: startOfLastWeek, $lte: endOfLastWeekWithTime }
  });
};
