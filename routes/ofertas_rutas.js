const express = require('express');
const bd = require("../config/bd");
const router = express.Router();

// Ruta para crear una oferta laboral
router.post('/ofertas-laborales/:idUsuario', (req, res) => {
  const { empresa, descripcion, logoUrl, imagenUrl, tipoVacante, num_telefonico } = req.body;
  const idUsuario = req.params.idUsuario;

  const query = "INSERT INTO ofertas_laborales (empresa, descripcion, logo_url, imagen_url, tipoVacante, num_telefonico, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [empresa, descripcion, logoUrl, imagenUrl, tipoVacante, num_telefonico, idUsuario];

  bd.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al crear la oferta laboral" });
    } else {
      res.status(201).json({ mensaje: "Oferta laboral creada con éxito" });
    }
  });
});

// Ruta para obtener todas las ofertas laborales
router.get('/ofertas-laborales', (req, res) => {
  bd.query(`SELECT * FROM ofertas_laborales`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener las ofertas laborales" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para obtener una oferta laboral por ID
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

// Ruta para obtener ofertas laborales por tipo de vacante
router.get('/ofertas-laborales/tipo/:tipoVacante', (req, res) => {
  const tipoVacante = req.params.tipoVacante;
  const query = "SELECT * FROM ofertas_laborales WHERE tipoVacante = ?";

  bd.query(query, [tipoVacante], (err, ofertas) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener ofertas laborales" });
    } else {
      res.status(200).json(ofertas);
    }
  });
});

// Ruta para obtener ofertas laborales por ID de usuario
router.get('/ofertas-laborales-usuario/:idUsuario', (req, res) => {
  const idUsuario = req.params.idUsuario;
  const query = "SELECT * FROM ofertas_laborales WHERE usuario_id = ?";

  bd.query(query, [idUsuario], (err, ofertas) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener las ofertas laborales del usuario" });
    } else if (ofertas.length > 0) {
      res.status(200).json(ofertas);
    } else {
      res.status(404).json({ error: "No se encontraron ofertas laborales para este usuario" });
    }
  });
});

// Ruta para actualizar una oferta laboral por ID
router.put('/ofertas-laborales/:id', (req, res) => {
  const { empresa, descripcion, logoUrl, imagenUrl, tipoVacante, num_telefonico } = req.body;
  const id = req.params.id;

  const query = "UPDATE ofertas_laborales SET empresa=?, descripcion=?, logo_url=?, imagen_url=?, tipoVacante=?, num_telefonico=? WHERE id=?";
  const values = [empresa, descripcion, logoUrl, imagenUrl, tipoVacante, num_telefonico, id];

  bd.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al actualizar la oferta laboral" });
    } else {
      res.status(200).json({ mensaje: "Oferta laboral actualizada con éxito" });
    }
  });
});

// Ruta para eliminar una oferta laboral por ID
router.delete('/ofertas-laborales/:id', (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM ofertas_laborales WHERE id = ?";

  bd.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al eliminar la oferta laboral" });
    } else {
      res.status(200).json({ mensaje: "Oferta laboral eliminada con éxito" });
    }
  });
});

module.exports = router;
