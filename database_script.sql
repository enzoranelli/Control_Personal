
use controlpersonal;

CREATE TABLE personal(
 idPersonal INT NOT NULL AUTO_INCREMENT, 
 Nombre VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL, 
 DNI INT NOT NULL, 
 puesto VARCHAR(100) NOT NULL, 
 telefono INT NOT NULL, 
 correo VARCHAR(50) NOT NULL, 
 direccion VARCHAR(100) NOT NULL, 
 seccion INT NOT NULL, 
 horasTrabajoXDia INT NOT NULL,
 PRIMARY KEY (idPersonal), 
 UNIQUE (DNI)
 );

CREATE TABLE huella(
	idHuella INT NOT NULL AUTO_INCREMENT,
    Persona INT NOT NULL,
    PRIMARY KEY(idHuella),
    FOREIGN KEY(Persona) REFERENCES personal(idPersonal) 
);

CREATE TABLE Ingreso_Salida(
	Id INT NOT NULL AUTO_INCREMENT,
    Persona INT NOT NULL,
    Fecha DATETIME,
    PRIMARY KEY (Id),
    FOREIGN KEY(Persona) REFERENCES personal(idPersonal) 
);