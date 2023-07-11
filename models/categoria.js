const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategoriaSchema = new Schema({
  nombre: String
});

const categoriaSchema = new Schema({
  nombre: String,
  subcategorias: [subcategoriaSchema]
});


module.exports = mongoose.model("Categoria", categoriaSchema);
