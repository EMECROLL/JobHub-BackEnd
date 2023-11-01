// Rutas
const express = require('express');
const multer = require('multer');
const bd = require("../config/bd");
const router = express.Router(); 
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/ofertas-laborales', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'imagen', maxCount: 1 }]), (req, res) => {
  const { empresa, logoUrl, imagenUrl, tipoVacante } = req.body; // Usar los nombres correctos aquí
  const logo = req.files['logo'][0];
  const imagen = req.files['imagen'][0];
  const logo_url = `/logos/${logo.originalname}`;
  const imagen_url = `/imagenes/${imagen.originalname}`;

  const query = "INSERT INTO ofertas_laborales (empresa, logo_url, imagen_url, tipoVacante) VALUES (?, ?, ?, ?)";
  const values = [empresa, logo_url, imagen_url, tipoVacante];

  bd.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al crear la oferta laboral" });
    } else {
      res.status(201).json({ mensaje: "Oferta laboral creada con éxito" });
    }
  });
});

router.get('/ofertas-laborales', (req, res) => {
  bd.query(`SELECT * FROM ofertas_laborales`, (err, result) => {
    if (err) {
      console.error(err); // Imprime el mensaje de error en la consola para diagnóstico
      res.status(500).send(err); // Envía el mensaje de error en la respuesta
    } else {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(400).send('Datos no existentes');
      }
    }
  });
});

router.get('/ofertas-laborales/:id', (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM ofertas_laborales WHERE id = ?";

  bd.query(query, [id], (err, oferta) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener la oferta laboral" });
    } else if (oferta.length > 0) {
      res.status(200).json(oferta[0]);
    } else {
      res.status(404).json({ error: "Oferta laboral no encontrada" });
    }
  });
});

router.get('/ofertas-laborales/:tipoVacante', (req, res) => {
  const tipoVacante = req.params.tipoVacante;
  const query = "SELECT * FROM ofertas_laborales WHERE tipoVacante = ?";

  bd.query(query, [tipoVacante], (err, ofertas) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener las ofertas laborales" });
    } else if (ofertas.length > 0) {
      res.status(200).json(ofertas);
    } else {
      res.status(404).json({ error: "Oferta laboral no encontrada" });
    }
  });
});
module.exports = router;
