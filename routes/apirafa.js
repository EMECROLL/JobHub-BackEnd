const express = require('express');
const bd = require("../config/bd");
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Ruta de inicio equis de')
}
)

router.get('/verformulario', (req, res) => {
    bd.query('SELECT * FROM formulario', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener la informacion del formulario" });
      } else {
        res.status(200).json(result);
      }
    });
  });

router.post('/anadirformulario', (req, res) => {
    const { FormNombre, FormMensaje, FormNumero, FormCorreo } = req.body;

    const consulta = 'INSERT INTO formulario (FormNombre, FormMensaje, FormNumero, FormCorreo) VALUES (?, ?, ?, ?)';
    const valores = [FormNombre, FormMensaje, FormNumero, FormCorreo];

    bd.query(consulta, valores, (error, resultados) => {
        if (error) {
            res.status(500).send('Error al agregar datos al formulario');
            throw error;
        }

        res.status(200).json({ mensaje: 'Datos agregados correctamente', resultados });
    });
});

module.exports = router;