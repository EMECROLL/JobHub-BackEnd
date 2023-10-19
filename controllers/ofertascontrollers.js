const bd = require("../config/bd");
const JobOffer = require("../models/JobOffer");

// Lógica para crear una oferta laboral
exports.createJobOffer = (req, res) => {
  const { titulo, descripcion, empresa, tipoVacante } = req.body;
  const logoUrl = `/logos/${req.files['logo'][0].originalname}`;
  const imageUrl = `/imagenes/${req.files['imagen'][0].originalname}`;

  const nuevaOferta = new JobOffer(titulo, descripcion, empresa, tipoVacante);

  const query = "INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [nuevaOferta.titulo, nuevaOferta.descripcion, nuevaOferta.empresa, nuevaOferta.tipoVacante, logoUrl, imageUrl];

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
