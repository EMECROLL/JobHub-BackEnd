const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Importa y utiliza las rutas de ofertas laborales
const jobOfferRoutes = require("./routes/ofertas_rutas.js");
app.use("/api", jobOfferRoutes);

const userRoutes = require("./routes/usuarios.routes.js")
app.use(userRoutes)

const formRoutes = require("./routes/apirafa.js")
app.use(formRoutes)

// Importa y utiliza las rutas de usuarios
// const userRoutes = require("./routes/userRoutes");
// app.use("/api", userRoutes);

// const port = process.env.PORT || 3001;

app.listen(3001, () => {
  console.log(`Servidor en ejecución en el puerto ${3001}`);
});
