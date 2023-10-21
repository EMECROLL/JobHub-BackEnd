create database JobHub;
use JobHub;

CREATE TABLE ofertas_laborales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255),
  descripcion TEXT,
  empresa VARCHAR(255),
  tipo_vacante VARCHAR(255),
  logo_url VARCHAR(255),
  imagen_url VARCHAR(255)
);

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url)
VALUES ('Desarrollador Web', 'Descripción de la oferta...', 'Google', 'División de Tecnología', 'https://1000marcas.net/wp-content/uploads/2020/02/logo-Google-500x281.png', 'https://realestatemarket.com.mx/images/2021/09-septiembre/2109/google-comprara-edificio-oficinas-g.jpg');

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url)
VALUES ('Diseñador Gráfico', 'Descripción de la oferta...', 'Microsoft', 'División de Tecnología', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png', 'https://www.experimenta.es/wp-content/uploads/2017/07/DuPont-Corian-Microsoft-Munich-Andreas-Frisch-GSP-architekten-5.jpg');
INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url)
VALUES ('Diseñador Gráfico', 'Descripción de la oferta...', 'GBM +', 'División de Tecnologías', 'https://assets.website-files.com/632ddeb5d4d5b76a3759dad5/633efb0bf46b61b8ab88032e_GBM_K.svg', 'https://www.eleconomista.com.mx/__export/1594739720993/sites/eleconomista/img/2020/07/13/edificio_bmv__elr_1.jpg_554688468.jpg');

SELECT * FROM ofertas_laborales;
INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url)
VALUES ('Diseñador Gráfico', 'Descripción de la oferta...', 'Moon Palace', 'División de Tecnologías', 'https://assets.website-files.com/632ddeb5d4d5b76a3759dad5/633efb0bf46b61b8ab88032e_GBM_K.svg', 'https://www.moonpalacecancun.com/content_aling_1080x813_6dc48e8c7c.jpg');

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url)
VALUES ('Diseñador Gráfico', 'Descripción de la oferta...', '	Riu', 'División de Turismo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png', 'https://www.experimenta.es/wp-content/uploads/2017/07/DuPont-Corian-Microsoft-Munich-Andreas-Frisch-GSP-architekten-5.jpg');


TRUNCATE TABLE ofertas_laborales;

SELECT * FROM ofertas_laborales WHERE id = 1;

UPDATE ofertas_laborales
SET imagen_url = 'https://www.eleconomista.com.mx/__export/1594739720993/sites/eleconomista/img/2020/07/13/edificio_bmv__elr_1.jpg_554688468.jpg'
WHERE id = 3;