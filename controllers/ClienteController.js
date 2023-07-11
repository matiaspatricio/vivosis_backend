const ClienteService = require("../services/ClienteService");
const ClienteModel = require("../models/cliente")

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await ClienteService.getAllClientes();    
    //res.set('X-Total-Count', totalClientes);
    // res.setHeader("X-Total-Count", `${10}`);
    // res.setHeader('Content-Range','clientes 20/20');
    // res.setHeader('X-Content-Type-Options','nosniff');    
    // res.setHeader('Access-Control-Expose-Headers', "X-Total-Count, Content-Range");
    
    //res.setHeader('Access-Control-Expose-Headers', "X-Total-Count");
    
    res.json(clientes);
    //res.json({ data: clientes}); 
    //res.json({ data: clientes, status: "success" }); 
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

