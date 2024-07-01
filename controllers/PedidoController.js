const PedidoService = require("../services/PedidoService");
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');
const { startOfMonth, endOfMonth, format } = require('date-fns');
const timeZone = 'America/Argentina/Buenos_Aires';

exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await PedidoService.getAllPedidos();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidosPendientes = async (req, res) => {
  try {
    const pedidos = await PedidoService.getPedidosPendientes();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidosHoy = async (req, res) => {
  try {
    const pedidos = await PedidoService.getPedidosHoy();
    res.json(pedidos);
  } catch (error) {
    console.log('Error al obtener los pedidos de hoy:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los pedidos de hoy' });
  }
};

exports.getPedidosAyer = async (req, res) => {
  try {
    const pedidosAyer = await PedidoService.getPedidosAyer();
    res.json(pedidosAyer);
  } catch (error) {
    console.log("Error al obtener los pedidos de ayer:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los pedidos de ayer" });
  }
};

exports.getPedidosSemana = async (req, res) => {
  try {
    const pedidosSemana = await PedidoService.getPedidosSemana();
    res.json(pedidosSemana);
  } catch (error) {
    console.log("Error al obtener los pedidos de la semana:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los pedidos de la semana" });
  }
};
exports.getPedidosSemanaAnterior = async (req, res) => {
  try {
    const pedidos = await PedidoService.getPedidosSemanaAnterior();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener los pedidos de la semana anterior:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los pedidos de la semana anterior' });
  }
};

exports.getPedidosMes = async (req, res) => {
  try {
    // Asegúrate de definir la zona horaria correcta, por ejemplo, 'America/Argentina/Buenos_Aires'
    
    
    // Obtiene la fecha actual en la zona horaria especificada
    const zonedDate = utcToZonedTime(new Date(), timeZone);
    console.log('Fecha actual en la zona horaria especificada:', zonedDate);
    // Utiliza date-fns para obtener el inicio y el fin del mes basado en la fecha zonificada
    const start = startOfMonth(zonedDate);
    const end = endOfMonth(zonedDate);
    console.log('Inicio del mes:', start, 'Fin del mes:', end);

    // Ajusta el fin del mes para incluir el último día completo
    const adjustedEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999);    

    const pedidosMes = await PedidoService.getPedidosMes(start, adjustedEnd);
    res.json(pedidosMes);
  } catch (error) {
    console.log("Error al obtener los pedidos del mes:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los pedidos del mes" });
  }
};
exports.createPedido = async (req, res) => {
  try {
    const pedido = await PedidoService.createPedido(req.body);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidoService.getPedidoById(req.params.id);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoByCliente = async (req, res) => {
  try {
    const pedido = await PedidoService.getPedidoByCliente(req.params.id_cliente);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePedido = async (req, res) => {
  try {
    const pedido = await PedidoService.updatePedido(req.params.id, req.body);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePedido = async (req, res) => {
  try {
    const pedido = await PedidoService.deletePedido(req.params.id);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTotalesDashboard = async (req, res) => {
  try {
    // Llamadas asincrónicas a cada método para obtener los totales
    const pedidosHoy = await PedidoService.getPedidosHoy();    
    const pedidosAyer = await PedidoService.getPedidosAyer();
    const pedidosSemana = await PedidoService.getPedidosSemana();
    const pedidosSemanaAnterior = await PedidoService.getPedidosSemanaAnterior();
    const pedidosMes = await PedidoService.getPedidosMes();
    const pedidosMesAnterior = await PedidoService.getPedidosMesAnterior();

    console.log('Totales para el dashboard:', pedidosHoy, pedidosAyer, pedidosSemana, pedidosSemanaAnterior, pedidosMes, pedidosMesAnterior)

    // Construcción del objeto de respuesta
    const totalesDashboard = {
      pedidosHoy: pedidosHoy, // Asegúrate de que estos métodos devuelvan un objeto con una propiedad 'total'
      pedidosAyer: pedidosAyer,
      pedidosSemana: pedidosSemana,
      pedidosSemanaAnterior: pedidosSemanaAnterior,
      pedidosMes: pedidosMes,
      pedidosMesAnterior: pedidosMesAnterior
    };
    console.log('Totales para el dashboard:', totalesDashboard);

    // Envío del objeto de respuesta
    res.json(totalesDashboard);
  } catch (error) {
    console.log("Error al obtener los totales para el dashboard:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los totales para el dashboard" });
  }
};