
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


INSERT
    INTO
        personal
    VALUES
(NULL,'Enzo Ranelli',44706466,'programador',1166032130,'enzo.ranelli@gmail.com','CALLE 123',1,8);

INSERT
    INTO
        personal
    VALUES
(NULL,'Carlos Perez',24706466,'contador',1154087130,'carlos.perez@gmail.com','CALLE 876',1,10);

INSERT
    INTO
        personal
    VALUES
(NULL,'Maria Juana',3345671,'Tech Leader',2147483647,'mariajuana@gmail.com','CALLE 7345634',4,6);

SELECT * FROM personal;
DELETE FROM personal;
SET SQL_SAFE_UPDATES=0;


