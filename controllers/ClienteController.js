const ClienteService = require("../services/ClienteService");
const ClienteModel = require("../models/cliente")

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await ClienteService.getAllClientes();    
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const cliente = await ClienteService.createCliente(req.body);
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await ClienteService.getClienteById(req.params.id);
    res.json(cliente);
    
    //res.json({ data: cliente, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const cliente = await ClienteService.updateCliente(req.params.id, req.body);
    res.json(cliente);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await ClienteService.deleteCliente(req.params.id);
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

