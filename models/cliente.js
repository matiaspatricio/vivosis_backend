const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
  /*_id: {
    type: mongoose.Types.ObjectId,
    required: false
  },*/
  id: String,
  nombre: String,
  telefono: String,
  direccion: String,
  localidad: String,
  estado: String,
  comentarios: String,
  usuario: String
  
  
});

module.exports = mongoose.model("Cliente", clienteSchema);
