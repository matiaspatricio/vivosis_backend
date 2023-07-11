const ProductoModel = require("../models/producto");

exports.getAllProductos = async () => {
  return await ProductoModel.find();
};
exports.createProducto = async (producto) => {
  return await ProductoModel.create(producto);
};
exports.getProductoById = async (id) => {
  return await ProductoModel.findById(id);
};

exports.updateProducto = async (id, producto) => {
  return await ProductoModel.findByIdAndUpdate(id, producto);
};

exports.deleteProducto = async (id) => {
  return await ProductoModel.findByIdAndDelete(id);
};
