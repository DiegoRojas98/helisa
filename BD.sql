#creacion de base de datos 
CREATE DATABASE Citas;
USE Citas;

#creacion de tablas
CREATE TABLE asesor (
    as_Nombre VARCHAR(55) NOT NULL,
    as_Identificacion VARCHAR(15) PRIMARY  KEY,
    as_TipoIdentificacion VARCHAR(55) NOT NULL,
    as_AñosExperiencia INT NOT NULL,
    as_Especialidad VARCHAR(55) NOT NULL,
    as_HoraInicio VARCHAR(55),
    as_HoraFin VARCHAR(55),
    #campos para la aplicacion web
    as_Rol VARCHAR(55) NOT NULL DEFAULT 'Asesor',
    as_Password VARCHAR(255) NOT NULL,
    as_Estado VARCHAR(30) NOT NULL DEFAULT 'Inactivo' 
);

CREATE TABLE pais(
    pa_Nombre VARCHAR(55) PRIMARY KEY
);

CREATE TABLE ciudad(
    ciu_Nombre VARCHAR(55) PRIMARY KEY,
    ciu_Pais VARCHAR(55),
    FOREIGN KEY (ciu_Pais) REFERENCES pais(pa_Nombre)
);

CREATE TABLE cliente (
    cl_Nombres VARCHAR(30) NOT NULL,
    cl_Apellidos VARCHAR(30) NOT NULL,
    cl_Identificacion VARCHAR(15) PRIMARY  KEY,
    cl_Tipoidentificacion VARCHAR(55) NOT NULL,
    cl_Fechacreacion DATE NOT NULL,
    cl_Password VARCHAR(255) NOT NULL,
    cl_Rol VARCHAR(55) NOT NULL DEFAULT 'Cliente',
    cl_Ciudad VARCHAR(55) NOT NULL,
    cl_Pais VARCHAR(55) NOT NULL,
    FOREIGN KEY (cl_Ciudad) REFERENCES ciudad(ciu_Nombre),
    FOREIGN KEY (cl_Pais) REFERENCES pais(pa_Nombre)
);


CREATE TABLE Citas(
    cit_Id INT PRIMARY KEY AUTO_INCREMENT,
    cit_fecha DATE NOT NULL,
    cit_HoraInicio VARCHAR(55) NOT NULL,
    cit_HoraFin VARCHAR(55) NOT NULL,
    cit_Asesor VARCHAR(15) NOT NULL,
    cit_Cliente VARCHAR(15) NOT NULL,
    FOREIGN KEY (cit_Asesor) REFERENCES asesor(as_Identificacion) ON DELETE CASCADE,
    FOREIGN KEY (cit_Cliente) REFERENCES cliente(cl_Identificacion) ON DELETE CASCADE
);

 

#insercion de datos en la tabla pais y ciudad (estos elementos no tendran acceso)

INSERT INTO pais(pa_Nombre) VALUES ('Colombia');
INSERT INTO pais(pa_Nombre) VALUES ('Peru');
INSERT INTO pais(pa_Nombre) VALUES ('Chile');

INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Bogota','Colombia');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Medellin','Colombia');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Cali','Colombia');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Barranquilla','Colombia');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Cartagena','Colombia');

INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Lima','Peru');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Arequipa','Peru');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Callao','Peru');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Trujillo','Peru');

INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Santiago','chile');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Concepcion','chile');
INSERT INTO ciudad(ciu_Nombre,ciu_Pais)  VALUES ('Valparaiso','chile');


/*insercion de el usuario maestro o adminitrador superior
  este usuario dara de alta a los asesores y definir su 
  horario laboral en la aplicacion este usuario posee rango (rol) 
  de administrador por lo tanto es el unico que puede eliminar asesores.*/

INSERT INTO asesor(as_Nombre,as_Identificacion,as_TipoIdentificacion,
    as_AñosExperiencia,as_Especialidad,as_HoraInicio,as_HoraFin,
    as_Rol,as_Password,as_Estado) 
    VALUES ('Diego','1013683036','Cedula','1','Administrativo',
            '8:00','15:00','Administrador','Holamundo','Activo');



#procedimientos almacenados para creacion de asesores, clientes y citas

CREATE PROCEDURE ingresar_Asesor(nombre VARCHAR(55),identificacion VARCHAR(15),
    tipoIdentificacion VARCHAR(55),añosExperiencia INT,especialidad VARCHAR(55),
    password VARCHAR(255))
    INSERT INTO asesor(as_Nombre,as_Identificacion,as_TipoIdentificacion,
    as_AñosExperiencia,as_Especialidad,as_Password)
    VALUES(nombre,identificacion,tipoIdentificacion,añosExperiencia,especialidad,
    password);

CREATE PROCEDURE modificar_Asesor(nombre VARCHAR(55),identificacion VARCHAR(15),
    tipoIdentificacion VARCHAR(55),añosExperiencia INT,especialidad VARCHAR(55),
    password VARCHAR(255))
    UPDATE asesor
    SET as_Nombre = nombre,
    as_TipoIdentificacion = tipoIdentificacion,
    as_AñosExperiencia = añosExperiencia,
    as_Especialidad = especialidad,
    as_Password = password
    WHERE as_Identificacion = identificacion;

#procedimiento para la manipulacion del horaRio y estado de los asesores por parte del administrador
CREATE PROCEDURE modificar_AsesorAdm(identificacion VARCHAR(15),horaInicio VARCHAR(55),
    horaFin VARCHAR(55),rol VARCHAR(55),estado VARCHAR(30))
    UPDATE asesor
    SET as_HoraInicio = horaInicio,
    as_HoraFin = horaFin,
    as_Rol =  rol,
    as_Estado =  estado
    WHERE as_Identificacion = identificacion;

CREATE PROCEDURE eliminar_Asesor(identificacion VARCHAR(15))
    DELETE FROM asesor WHERE as_Identificacion = identificacion;



CREATE PROCEDURE ingresar_Cliente(nombres VARCHAR(30),apellidos  VARCHAR(30),
    identificacion VARCHAR(15),tipoidentificacion VARCHAR(55),fechacreacion DATE,
    password VARCHAR(255),ciudad VARCHAR(55),pais VARCHAR(55))
    INSERT INTO cliente(cl_Nombres,cl_Apellidos,cl_Identificacion,cl_Tipoidentificacion,
    cl_Fechacreacion,cl_Password,cl_Ciudad,cl_Pais)
    VALUES (nombres,apellidos,identificacion,tipoidentificacion,fechacreacion,
    password,ciudad,pais);
    
CREATE PROCEDURE modificar_Cliente(nombres VARCHAR(30),apellidos  VARCHAR(30), identificacion VARCHAR(15),
    tipoidentificacion VARCHAR(55),password VARCHAR(255),ciudad VARCHAR(55),pais VARCHAR(55))
    UPDATE cliente
    SET cl_Nombres = nombres,
    cl_Apellidos = apellidos,
    cl_Tipoidentificacion = tipoidentificacion,
    cl_Password = password,
    cl_Ciudad = ciudad,
    Cl_Pais = pais
    WHERE cl_Identificacion = identificacion;

CREATE PROCEDURE eliminar_Cliente(identificacion VARCHAR(15))
    DELETE FROM cliente WHERE cl_Identificacion = identificacion;

CREATE PROCEDURE ingresar_Cita(fecha DATE,horaInicio VARCHAR(55),horaFin VARCHAR(55),asesor VARCHAR(15),cliente VARCHAR(15))
    INSERT INTO citas (cit_fecha,cit_HoraInicio,cit_HoraFin,cit_Asesor,cit_Cliente)
    VALUES (fecha,horaInicio,horaFin,asesor,cliente);

CREATE PROCEDURE eliminar_Cita(id INT)
DELETE FROM citas WHERE cit_Id = id;



#insercion de clientes y asesores (2 activos y 1 inactivo)


CALL ingresar_Asesor('Raul Ramos','102030','Cedula',3,'Asesoria Juridica','raul123');
CALL ingresar_Asesor('Jorge Ramos','402030','Cedula',1,'Asesoria Laboral','jorge423');
CALL ingresar_Asesor('Julian Espino','502030','DNI',5,'Asesoria Financiera','julian523');

CALL modificar_AsesorAdm('102030','9:00','16:00','Asesor','Activo');
CALL modificar_AsesorAdm('502030','10:00','17:00','Asesor','Activo');

CALL ingresar_Cliente('Oscar','Rodrigez','123456','DNI','2021-12-02','oscar123','Lima','peru');
CALL ingresar_Cliente('Juan','Lozano','134679','Cedula','2021-12-03','JuanL','Bogota','Colombia');
CALL ingresar_Cliente('Maria','Bejarano','97531','Cedula','2021-12-03','MariaB','Santiago','Chile');




CALL ingresar_Cita('2021-12-03','13:00','14:00','102030','123456');