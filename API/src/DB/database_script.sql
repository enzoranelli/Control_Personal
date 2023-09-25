use controlpersonal;

CREATE TABLE personal(
	id INT NOT NULL AUTO_INCREMENT, 
	Nombre VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL, 
	DNI INT NOT NULL, 
	puesto VARCHAR(100) NOT NULL, 
	telefono INT NOT NULL, 
	correo VARCHAR(150) NOT NULL,
	direccion VARCHAR(100) NOT NULL, 
	seccion INT NOT NULL, 
	horasTrabajoXDia INT NOT NULL,
	PRIMARY KEY (id), 
	UNIQUE (DNI, correo)
 );

CREATE TABLE usuario(
	id INT NOT NULL AUTO_INCREMENT,
    contrasena VARCHAR(150) NOT NULL,
	correo VARCHAR(150) NOT NULL,
    qr VARCHAR(150) NOT NULL,
    Persona INT NOT NULL,
    rh BOOL NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(Persona) REFERENCES personal(id) ,
    UNIQUE(correo)
);

CREATE TABLE Ingreso_Salida(
	id INT NOT NULL AUTO_INCREMENT,
    Persona INT NOT NULL,
    Fecha DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY(Persona) REFERENCES personal(id) 
);

/*HACER UN POST PARA ADMIN*/


DROP TABLE personal;
DROP TABLE usuario;
DROP TABLE Ingreso_Salida;
SET SQL_SAFE_UPDATES=0;



