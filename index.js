const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs/promises");

// Importar las rutas
const clienteRouter = require("./routes/ClienteRoutes");
const pedidoRouter = require("./routes/PedidoRoutes");
const ingresoRouter = require("./routes/IngresoRoutes");
const productoRouter = require("./routes/ProductoRoutes");
const categoriaRouter = require("./routes/CategoriaRoutes");
const authRouter = require("./routes/AuthRoutes");

const port = process.env.PORT || 3001;
const pw = "mongodb+srv://matiasnrpatricio:WNgzaMPh3512oiCf@cluster0.ukh6b1r.mongodb.net/vivosis";
const app = express();

// Configurar las opciones de CORS
const corsOptions = {
  origin: ["https://vivosis-frontend.vercel.app", "http://localhost:3000"], // Reemplaza con la URL correcta de tu frontend
  credentials: true, // Permitir el intercambio de cookies y encabezados de autenticación
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/cliente", clienteRouter);
app.use("/api/pedido", pedidoRouter);
app.use("/api/ingreso", ingresoRouter);
app.use("/api/producto", productoRouter);
app.use("/api/categoria", categoriaRouter);
app.use("/api/auth", authRouter);

// Conectar a la base de datos
mongoose.connect(pw, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    // Iniciar el servidor una vez que se haya establecido la conexión a la base de datos
    app.listen(port, () => {
      console.log(`Servidor en ejecución en el puerto: ${port}`);
    });
  })
  .catch(error => {
    console.error("Error al conectar a la base de datos:", error);
  });

  
// Exportar la aplicación Express (módulo por defecto)
module.exports = app;