const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "JobHub",
  port: 3307
});

app.post("/registro", (req, res) => {

  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const correo = req.body.correo;
  const contrasenia = req.body.contrasenia;

  db.query("INSERT INTO usuarios(nombre, apellido, correo, contrasenia) VALUES (?,?,?,?)", 
    [nombre,apellido,correo,contrasenia],
    (err, result) => {
    console.log(err);
  }
  )
})

app.post('/inicioSesion', (req,res) => {

  const correo = req.body.correo;
  const contrasenia = req.body.contrasenia;

  db.query("SELECT * FROM usuarios WHERE correo = ? AND contrasenia = ?", 
    [correo,contrasenia],
    (err, resultado) => {

      if (err) {
        res.send({err: err});
      }

      if(resultado.length > 0){
        res.send(resultado);
      } else {
        res.send({message: "Correo/Contraseña incorrecta"});
      }
  })
})

app.listen(3001, () => {
  console.log("Servidor Iniciado");
});
