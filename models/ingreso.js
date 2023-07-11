const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingresoSchema = new Schema({
  /*_id: {
    type: mongoose.Types.ObjectId,
    required: false
  },*/
  id: String,
  fecha_ingreso: String,
  id_articulo: String,
  nombre_articulo: String,
  cantidad: Number,  
  costo_unitario: Number,
  precio: Number,
  total: Number,
  motivo: String,
  comentarios: String,
  usuario: String
  
  
});

module.exports = mongoose.model("Ingreso", ingresoSchema);

