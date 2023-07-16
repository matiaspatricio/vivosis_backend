const PedidoService = require("../services/PedidoService");

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
    const pedidos = await getPedidosHoy();
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
exports.getPedidosMes = async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

    const pedidosMes = await PedidoService.getPedidosMes(startOfMonth, endOfMonth);
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
