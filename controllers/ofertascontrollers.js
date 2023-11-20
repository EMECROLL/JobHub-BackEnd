const bd = require("../config/bd");

// Lógica para crear una oferta laboral
exports.createJobOffer = (req, res) => {
  const { empresa, descripcion, logoUrl, imagenUrl, tipoVacante, num_telefonico } = req.body;
  const idUsuario = req.params.idUsuario; // Obtener el idUsuario de los parámetros

  const query = "INSERT INTO ofertas_laborales (empresa, descripcion, logo_url, imagen_url, tipoVacante, num_telefonico, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [empresa, descripcion, logoUrl, imagenUrl, tipoVacante, num_telefonico, idUsuario]; // Agregar idUsuario a los valores

  bd.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al crear la oferta laboral" });
    } else {
      res.status(201).json({ mensaje: "Oferta laboral creada con éxito" });
    }
  });
};



// Lógica para obtener todas las ofertas laborales
exports.getJobOffers = (req, res) => {
  const query = "SELECT * FROM ofertas_laborales";
  bd.query(query, (err, ofertas) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener las ofertas laborales" });
    } else {
      res.status(200).json(ofertas);
    }
  });
};

// Lógica para obtener una oferta laboral por ID
exports.getJobOfferById = (req, res) => {
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
};

// Lógica para obtener ofertas laborales por tipo de vacante
exports.getJobOffersByType = (req, res) => {
  const { tipoVacante } = req.params;
  const query = "SELECT * FROM ofertas_laborales WHERE tipoVacante = ?";

  bd.query(query, [tipoVacante], (err, ofertas) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener ofertas laborales" });
    } else {
      res.status(200).json(ofertas);
    }
  });
};

// Lógica para actualizar una oferta laboral por ID
exports.updateJobOfferById = (req, res) => {
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
};

// Lógica para eliminar una oferta laboral por ID
exports.deleteJobOfferById = (req, res) => {
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
};
