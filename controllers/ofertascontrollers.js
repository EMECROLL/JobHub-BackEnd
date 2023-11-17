const bd = require("../config/bd"); 
// Lógica para crear una oferta laboral
exports.createJobOffer = (req, res) => {
  const { empresa, descripcion, logoUrl, imagenUrl, tipoVacante, num_telefonico } = req.body;

  const query = "INSERT INTO ofertas_laborales (empresa, descripcion, logo_url, imagen_url, tipoVacante, num_telefonico) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [empresa, descripcion, logoUrl, imagenUrl, tipoVacante, num_telefonico];

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



const query = "SELECT * FROM ofertas_laborales WHERE tipo_vacante = ?";
  bd.query(query, [tipoVacante], (err, ofertas) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener ofertas laborales" });
    } else {
      res.status(200).json(ofertas);
    }
  });
