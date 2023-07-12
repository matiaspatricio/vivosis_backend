const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs/promises");

//const { v4: uuid } = require("uuid");

const clienteRouter = require("./routes/ClienteRoutes");
const pedidoRouter = require("./routes/PedidoRoutes");
const ingresoRouter = require("./routes/IngresoRoutes");
const productoRouter = require("./routes/ProductoRoutes");
const categoriaRouter = require("./routes/CategoriaRoutes");

const port = process.env.PORT || 3001;
const pw = "mongodb+srv://matiasnrpatricio:WNgzaMPh3512oiCf@cluster0.ukh6b1r.mongodb.net/vivosis";
//const pw = "mongodb+srv://matiasnrpatricio:WNgzaMPh3512oiCf@cluster0.ukh6b1r.mongodb.net/?retryWrites=true&w=majority/vivosis";
const app = express();

// Configurar las opciones de CORS
const corsOptions = {
  origin: ["https://vivosis-frontend.vercel.app","http://localhost:3000"], // Reemplaza con la URL correcta de tu frontend
  credentials: true, // Permitir el intercambio de cookies y encabezados de autenticación
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use("/api/cliente", clienteRouter);
app.use("/api/pedido", pedidoRouter);
app.use("/api/ingreso", ingresoRouter);
app.use("/api/producto", productoRouter);
app.use("/api/categoria", categoriaRouter);




mongoose.connect(pw);
// Configurar mongoose

//mongoose.connect("mongodb://127.0.0.1:27017/vivosis");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
