const express = require('express');
const multer = require('multer');
const jobOffers = require('../models/ofertas');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/ofertas-laborales', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'imagen', maxCount: 1 }]), (req, res) => {
  const { titulo, descripcion, empresa, tipoVacante } = req.body;
  const logo = req.files['logo'][0];
  const imagen = req.files['imagen'][0];
  const logoUrl = `/logos/${logo.originalname}`;
  const imageUrl = `/imagenes/${imagen.originalname}`;

  const ofertaLaboral = jobOffers.addJobOffer(titulo, descripcion, empresa, tipoVacante, logoUrl, imageUrl);

  res.status(201).json(ofertaLaboral);
});

router.get('/ofertas-laborales', (req, res) => {
  const ofertas = jobOffers.getJobOffers();
  res.json(ofertas);
});

router.get('/ofertas-laborales/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const oferta = jobOffers.getJobOffer(id);
  if (oferta) {
    res.json(oferta);
  } else {
    res.status(404).json({ error: 'Oferta laboral no encontrada' });
  }
});

module.exports = router;
