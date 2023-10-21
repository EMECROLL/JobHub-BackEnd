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

// app.post('/inicioSesion', (req,res) => {
//   const sql = "SELECT * FROM usuarios WHERE correo = ? AND contrasenia = ?";
  
//   db.query(sql, [req.body.correo, req.body.contrasenia], (error, datos) => {
    
//     if(sql.length > 0) {
//       return res.json("Inicio de sesión exitoso");
//     } else {
//       return res.json("Credenciales incorrectas");
//     }    
//     if(error) return res.json("Error al iniciar sesión");
//   })
// })

app.post('/inicioSesion', (req,res) => {
  const correo = req.body.correoLog
  const contrasenia = req.body.contraseniaLog
  
  db.query("SELECT * FROM usuarios WHERE correo = ? AND contrasenia = ?", [correo, contrasenia], (err, result) => {
    if(err) {
      res.json(err);
    }else if(result.length > 0) {
      res.json("Inicio de sesión exitoso");
    }else {
      res.json("Credenciales incorrectas");
    };
  })
})

app.listen(3001, () => {
  console.log("Servidor Iniciado");
});