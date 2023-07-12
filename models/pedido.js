const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
  /*_id: {
    type: mongoose.Types.ObjectId,
    required: false
  },*/
  id: String,
  fecha: String,
  id_cliente: String,
  nombre_cliente: String,
  id_articulo: String,
  nombre_articulo: String,
  cantidad: Number,
  precio: Number,
  total: Number,
  costo: Number,  
  comentarios: String,
  estado_pedido: String,  
  estado_pago: String,
  usuario: String,
  fecha_entrega: String,
  localidad: String    
  
});

module.exports = mongoose.model("Pedido", pedidoSchema);

