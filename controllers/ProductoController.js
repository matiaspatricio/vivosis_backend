const ProductoService = require("../services/ProductoService");

exports.getAllProductos = async (req, res) => {
  try {
    const productos = await ProductoService.getAllProductos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createProducto = async (req, res) => {
  try {
    const producto = await ProductoService.createProducto(req.body);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await ProductoService.getProductoById(req.params.id);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const producto = await ProductoService.updateProducto(req.params.id, req.body);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const producto = await ProductoService.deleteProducto(req.params.id);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
