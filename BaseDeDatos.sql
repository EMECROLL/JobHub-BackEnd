create database JobHub;
use JobHub;

CREATE TABLE ofertas_laborales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255),
  descripcion TEXT,
  empresa VARCHAR(255),
  tipo_vacante VARCHAR(255),
  logo_url VARCHAR(255),
  imagen_url VARCHAR(255),
  num_telefonico VARCHAR(128)
);

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Desarrollador Web', 'Descripción de la oferta...', 'Google', 'División de Tecnología', 'https://1000marcas.net/wp-content/uploads/2020/02/logo-Google-500x281.png', 'https://realestatemarket.com.mx/images/2021/09-septiembre/2109/google-comprara-edificio-oficinas-g.jpg','9981503676');

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Redes y telecomunicaciones', 'Descripción de la oferta...', 'Microsoft', 'División de Tecnología', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png', 'https://www.experimenta.es/wp-content/uploads/2017/07/DuPont-Corian-Microsoft-Munich-Andreas-Frisch-GSP-architekten-5.jpg','9981503676');
INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Programador', 'Descripción de la oferta...', 'GBM +', 'División de Tecnología', 'https://assets.website-files.com/632ddeb5d4d5b76a3759dad5/633efb0bf46b61b8ab88032e_GBM_K.svg', 'https://www.eleconomista.com.mx/__export/1594739720993/sites/eleconomista/img/2020/07/13/edificio_bmv__elr_1.jpg_554688468.jpg','9981503676');


INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Camarero', 'Descripción de la oferta...', 'Moon Palace', 'División de Turismo', 'https://assets.website-files.com/632ddeb5d4d5b76a3759dad5/633efb0bf46b61b8ab88032e_GBM_K.svg', 'https://www.moonpalacecancun.com/content_aling_1080x813_6dc48e8c7c.jpg','9981503676');

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Botones', 'Descripción de la oferta...', '	Riu', 'División de Turismo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png', 'https://www.experimenta.es/wp-content/uploads/2017/07/DuPont-Corian-Microsoft-Munich-Andreas-Frisch-GSP-architekten-5.jpg','9981503676');


/*TRUNCATE TABLE ofertas_laborales; */


UPDATE ofertas_laborales
SET imagen_url = 'https://www.riu.com/en/binaris/hotel-riu-peninsula-newlogo_tcm55-258257.jpg?v=tm100222_1157'
WHERE id = 5;

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Contador', 'Descripción de la oferta...', 'Lomas Travel', 'División de Finanzas', 'https://lh3.googleusercontent.com/p/AF1QipNJ1lQGH3CdeoxPse4vgR6QeZgLKAX0RqXWNrk9=w1080-h608-p-no-v0', 'https://www.elpuntosobrelai.com/wp-content/uploads/2020/08/tomas-travel-1.jpg','9981503676');
INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Contador', 'Descripción de la oferta...', 'Nickelodeon', 'División de Finanzas', 'https://d3jgpopn0146zw.cloudfront.net/karismahotels.com-1226842613/cms/imagepool/617c4481d2941.svg', 'https://d3jgpopn0146zw.cloudfront.net/karismahotels.com-1226842613/cms/cache/v2/619c12c95e51e.png/1200x630/fit/80/588e65550045bf43959544b9c9e53be2.png','9981503676');

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Botones', 'Descripción de la oferta...', 'Nickelodeon', 'División de Turismo', 'https://d3jgpopn0146zw.cloudfront.net/karismahotels.com-1226842613/cms/imagepool/617c4481d2941.svg', 'https://d3jgpopn0146zw.cloudfront.net/karismahotels.com-1226842613/cms/cache/v2/619c12c95e51e.png/1200x630/fit/80/588e65550045bf43959544b9c9e53be2.png','9981503676');

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Contador', 'Descripción de la oferta...', 'Honda', 'División de Finanzas', 'https://assets.localagency.io/logo/logo_honda.png', 'https://l21.mx/wp-content/uploads/2014/11/Honda-cancun.jpg','9981503676');

INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Manejador de redes sociales', 'Descripción de la oferta...', 'Starbucks', 'División de Medios', 'https://static.vecteezy.com/system/resources/previews/027/076/030/original/starbucks-logo-transparent-free-png.png', 'https://islacancun.mx/wp-content/uploads/2022/09/STARBUCKS-1.jpg','9981503676');
INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Manejador de redes sociales', 'Descripción de la oferta...', 'La Michoacana', 'División de Medios', 'https://www.heladoslamichoacana.net/images/Logo%20Small%20Hi.png', 'https://media-cdn.tripadvisor.com/media/photo-s/0d/21/09/23/front-entrance-to-la.jpg','9981503676');
INSERT INTO ofertas_laborales (titulo, descripcion, empresa, tipo_vacante, logo_url, imagen_url,num_telefonico)
VALUES ('Efectos especiales', 'Descripción de la oferta...', 'Universal Studios', 'División de Medios', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Universal-Pictures-Logo.svg/2560px-Universal-Pictures-Logo.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/c/c4/USF_Entrance.jpg','9981503676');


SELECT * FROM ofertas_laborales WHERE id = 1;

SELECT * FROM ofertas_laborales;



-- Manuel 

CREATE TABLE usuarios(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    correo VARCHAR(100),
    contrasenia VARCHAR(100)
);

SELECT * FROM usuarios;