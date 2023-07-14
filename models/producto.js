const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  /*_id: {
    type: mongoose.Types.ObjectId,
    required: false
  },*/
  id: String,
  nombre: String,
  id_categoria: String,
  categoria: String,
  id_subcategoria: String,
  subcategoria: String,
  precio: Number,  
  costo: Number,
  fecha_costo: String,
  stock: Number,
  comentarios: String,
  usuario: String
  
  
});

module.exports = mongoose.model("Producto", productoSchema);
