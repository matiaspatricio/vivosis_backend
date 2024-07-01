const PedidoModel = require("../models/pedido");
const { zonedTimeToUtc, utcToZonedTime } = require("date-fns-tz");
const {
  startOfDay,
  endOfDay,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfToday,
  subMonths,
  startOfMonth,
  endOfMonth,
} = require("date-fns");
const timeZone = "America/Argentina/Buenos_Aires";

exports.getAllPedidos = async () => {
  return await PedidoModel.find({
    estado_pedido: { $nin: ["PENDIENTE", "PREPARADO"] },
  })
    .sort({ _id: -1 })
    .limit(999); // Limita la cantidad de resultados a 1000;s
};

exports.getPedidosPendientes = async () => {
  return await PedidoModel.find({
    estado_pedido: { $nin: ["FINALIZADO", "CANCELADO"] },
  }).sort({ _id: -1 }); // Ordena por ID en orden descendente para obtener los últimos primero
  //  .limit(1000); // Limita la cantidad de resultados a 1000
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
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = utcToZonedTime(new Date(), timeZone);
  const startOfTodayDate = startOfDay(today);
  const endOfToday = endOfDay(today);

  // Consulta para obtener el total de hoy
  const resultadoHoy = await PedidoModel.aggregate([
    {
      $match: {
        fecha: { $gte: startOfTodayDate, $lte: endOfToday },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$total" },
      },
    },
  ]);

  // Consulta para obtener la cantidad de pedidos del dia
  const resultadoDia = await PedidoModel.aggregate([
    {
      $match: {
        fecha: { $gte: startOfTodayDate, $lte: endOfToday },
      },
    },
    {
      $group: {
        _id: null,
        QTotal: { $sum: 1 },
      },
    },
  ]);

  // Preparar el objeto de respuesta
  const totalHoy = resultadoHoy.length > 0 ? resultadoHoy[0].total : 0;
  const cantidadDia = resultadoDia.length > 0 ? resultadoDia[0].QTotal : 0;

  return { totalHoy, cantidadDia };
};
exports.getPedidosAyer = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const yesterday = utcToZonedTime(subDays(new Date(), 1), timeZone);
  const startOfYesterday = zonedTimeToUtc(startOfDay(yesterday), timeZone);
  const endOfYesterday = zonedTimeToUtc(endOfDay(yesterday), timeZone);

  const resultadoAyer = await PedidoModel.aggregate([
    {
      $match: {
        fecha: { $gte: startOfYesterday, $lte: endOfYesterday },
      },
    },
    {
      $group: {
        _id: null, // Agrupar todos los documentos sin distinción
        total: { $sum: "$total" }, // Sumar el campo 'total' de todos los documentos que coincidan
        cantidad: { $sum: 1 }, // Contar la cantidad de documentos que coincidan
      },
    },
  ]);

  // Preparar el objeto de respuesta
  const totalAyer = resultadoAyer.length > 0 ? resultadoAyer[0].total : 0;
  const cantidadAyer = resultadoAyer.length > 0 ? resultadoAyer[0].cantidad : 0;

  return { totalAyer, cantidadAyer };
};
exports.getPedidosSemana = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = zonedTimeToUtc(startOfToday(), timeZone);
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // 1 representa el lunes como inicio de la semana
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });

  const resultadoSemana = await PedidoModel.aggregate([
    {
      $match: {
        fecha: { $gte: startOfThisWeek, $lte: endOfThisWeek },
      },
    },
    {
      $group: {
        _id: null, // Agrupar todos los documentos sin distinción
        total: { $sum: "$total" }, // Sumar el campo 'total' de todos los documentos que coincidan
        cantidad: { $sum: 1 }, // Contar la cantidad de documentos que coincidan
      },
    },
  ]);

  // Preparar el objeto de respuesta
  const totalSemana = resultadoSemana.length > 0 ? resultadoSemana[0].total : 0;
  const cantidadSemana =
    resultadoSemana.length > 0 ? resultadoSemana[0].cantidad : 0;

  return { totalSemana, cantidadSemana };
};
exports.getPedidosSemanaAnterior = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = zonedTimeToUtc(startOfToday(), timeZone);
  const startOfLastWeek = startOfWeek(subDays(today, 7), { weekStartsOn: 1 }); // Restar 7 días para obtener el inicio de la semana anterior
  const endOfLastWeek = endOfWeek(subDays(today, 7), { weekStartsOn: 1 });

  // Ajustar las fechas para que sean la última hora del día
  const endOfLastWeekWithTime = new Date(endOfLastWeek.getTime() + 86399999);

  const resultado = await PedidoModel.aggregate([
    {
      $match: {
        fecha: { $gte: startOfLastWeek, $lte: endOfLastWeekWithTime },
      },
    },
    {
      $group: {
        _id: null, // Agrupar todos los documentos sin distinción
        total: { $sum: "$total" }, // Sumar el campo 'total' de todos los documentos que coincidan
        cantidad: { $sum: 1 }, // Contar la cantidad de documentos que coincidan
      },
    },
  ]);

  // Preparar el objeto de respuesta
  const totalSemanaAnterior = resultado.length > 0 ? resultado[0].total : 0;
  const cantidadSemanaAnterior =
    resultado.length > 0 ? resultado[0].cantidad : 0;

  return { totalSemanaAnterior, cantidadSemanaAnterior };
};
exports.getPedidosMes = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = zonedTimeToUtc(startOfToday(), timeZone);
  const startOfThisMonth = startOfMonth(today);
  const endOfThisMonth = endOfDay(today);

  const resultado = await PedidoModel.aggregate([
    {
      $match: {
        fecha: { $gte: startOfThisMonth, $lte: endOfThisMonth },
      },
    },
    {
      $group: {
        _id: null, // Agrupar todos los documentos sin distinción
        total: { $sum: "$total" }, // Sumar el campo 'total' de todos los documentos que coincidan
        cantidad: { $sum: 1 }, // Contar la cantidad de documentos que coincidan
      },
    },
  ]);

  // Preparar el objeto de respuesta
  const totalMes = resultado.length > 0 ? resultado[0].total : 0;
  const cantidadMes = resultado.length > 0 ? resultado[0].cantidad : 0;

  return { totalMes, cantidadMes };
};

exports.getPedidosMesAnterior = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = zonedTimeToUtc(startOfToday(), timeZone);
  const startOfLastMonth = subMonths(startOfMonth(today), 1);
  const endOfLastMonth = endOfDay(subMonths(endOfMonth(today), 1));
  

  const resultado = await PedidoModel.aggregate([
    {
      $match: {
        fecha: { $gte: startOfLastMonth, $lte: endOfLastMonth },
      },
    },
    {
      $group: {
        _id: null, // Agrupar todos los documentos sin distinción
        total: { $sum: "$total" }, // Sumar el campo 'total' de todos los documentos que coincidan
        cantidad: { $sum: 1 }, // Contar la cantidad de documentos que coincidan
      },
    },
  ]);

  // Preparar el objeto de respuesta
  const totalMesAnterior = resultado.length > 0 ? resultado[0].total : 0;
  const cantidadMesAnterior = resultado.length > 0 ? resultado[0].cantidad : 0;

  return { totalMesAnterior, cantidadMesAnterior };
};
