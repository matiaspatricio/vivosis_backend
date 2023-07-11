const CategoriaService = require("../services/CategoriaService");

exports.getAllCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaService.getAllCategorias();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaService.createCategoria(req.body);
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoriaById = async (req, res) => {
  try {
    const categoria = await CategoriaService.getCategoriaById(req.params.id);
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaService.updateCategoria(req.params.id, req.body);
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaService.deleteCategoria(req.params.id);
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
