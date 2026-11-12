

CREATE SCHEMA seguridad;
CREATE SCHEMA parametros;
CREATE SCHEMA general;
CREATE SCHEMA transaccional;


--   ==== Seguridad ====

CREATE TABLE Seguridad.usuarios(
id_usuario SERIAL PRIMARY KEY,
codigo_usuario VARCHAR(40) NOT NULL UNIQUE,
nombre_usuario VARCHAR(100) NOT NULL,
password_usuario VARCHAR(255) NOT NULL,
is_activo BOOLEAN DEFAULT TRUE,
ultima_conexion TIMESTAMP NULL,
fecha_registro TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificado TIMESTAMP NULL,

id_usuario_registro INT REFERENCES seguridad.usuarios(id_usuario)
);

-- ==== Parámetros (catálogos) ====


CREATE TABLE parametros.tipo_cliente(
id_tipo_cliente SERIAL PRIMARY KEY,
codigo_tipo_cliente VARCHAR(20) NOT NULL UNIQUE,
nombre_tipo_cliente VARCHAR(255) NOT NULL,
fecha_registro TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificado TIMESTAMP NULL,

id_usuario INT NOT NULL REFERENCES seguridad.usuarios(id_usuario)
);

CREATE TABLE parametros.canal_servicio (
id_canal_servicio     SERIAL PRIMARY KEY,
codigo_canal_servicio VARCHAR(20)  NOT NULL UNIQUE,
nombre_canal_servicio VARCHAR(100) NOT NULL,
fecha_registro        TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificado      TIMESTAMP NULL,
	
id_usuario            INT NOT NULL REFERENCES seguridad.usuarios(id_usuario)
);

CREATE TABLE parametros.tipo_transaccion(
id_tipo_transaccion SERIAL PRIMARY KEY,
codigo_tipo_movimiento VARCHAR(20) NULL,
codigo_tipo_transaccion VARCHAR(20) NOT NULL UNIQUE,
nombre_tipo_transaccion VARCHAR(100) NOT NULL, 
fecha_registro TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificado      TIMESTAMP NULL,

id_usuario INT NOT NULL REFERENCES seguridad.usuarios(id_usuario)
);

CREATE TABLE parametros.motivo_transaccion (
id_motivo_transaccion     SERIAL PRIMARY KEY,
codigo_motivo_transaccion VARCHAR(20)  NOT NULL UNIQUE,
nombre_motivo_transaccion VARCHAR(150) NOT NULL,
fecha_registro            TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificado          TIMESTAMP NULL,

id_tipo_transaccion       INT NOT NULL REFERENCES parametros.tipo_transaccion(id_tipo_transaccion),
id_usuario                INT NOT NULL REFERENCES seguridad.usuarios(id_usuario)
);

-- ==== general ====

CREATE TABLE general.agencias (
id_agencia         SERIAL PRIMARY KEY,
codigo_agencia     VARCHAR(6)   NOT NULL UNIQUE,
nombre_agencia     VARCHAR(100) NOT NULL,
direccion_agencia  VARCHAR(200) NULL,
telefono_agencia   VARCHAR(20)  NULL,
fecha_registro     TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificacion TIMESTAMP NULL,

id_canal_servicio  INT NOT NULL REFERENCES parametros.canal_servicio(id_canal_servicio),
id_usuario         INT NOT NULL REFERENCES seguridad.usuarios(id_usuario)
);

CREATE TABLE general.clientes (
id_cliente       SERIAL PRIMARY KEY,
codigo_cliente   VARCHAR(20)  NOT NULL UNIQUE,
numero_identidad VARCHAR(20)  NOT NULL,
nombre_cliente   VARCHAR(150) NOT NULL,
fecha_registro   TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificado TIMESTAMP NULL,

id_tipo_cliente  INT NOT NULL REFERENCES parametros.tipo_cliente(id_tipo_cliente),
id_usuario       INT NOT NULL REFERENCES seguridad.usuarios(id_usuario)
);

-- ==== Transaccional ====

CREATE TABLE transaccional.transacciones (
id_transaccion        SERIAL PRIMARY KEY,
fecha_transaccion     TIMESTAMP     NOT NULL DEFAULT NOW(),
monto_transaccion     NUMERIC(18,2) NOT NULL CHECK (monto_transaccion > 0),
	
id_motivo_transaccion INT NOT NULL REFERENCES parametros.motivo_transaccion(id_motivo_transaccion),
id_agencia            INT NOT NULL REFERENCES general.agencias(id_agencia),
id_cliente            INT NOT NULL REFERENCES general.clientes(id_cliente),
id_usuario            INT NOT NULL REFERENCES seguridad.usuarios(id_usuario)
);

-- filtración por fecha 
CREATE INDEX idx_transacciones_fecha ON transaccional.transacciones(fecha_transaccion);


-- Usuario admin. Contraseña: Admin123  (hash BCrypt real, ya verificable por Spring)
INSERT INTO seguridad.usuarios (codigo_usuario, nombre_usuario, password_usuario, is_activo, id_usuario_registro)
VALUES ('admin', 'Administrador', '$2b$10$opZiIXsAFOcrUcVC9RrF1OrabnzkLweMdRVBktuHI4e9lMLNK2ovy', TRUE, NULL);

-- Tipo de Cliente (ids 1..4)
INSERT INTO parametros.tipo_cliente (codigo_tipo_cliente, nombre_tipo_cliente, id_usuario) VALUES
('NAT','Natural',1), ('JUR','Jurídico',1), ('GUB','Gubernamental',1), ('ONG','ONG',1);

-- Canal de Servicio (ids 1..6)
INSERT INTO parametros.canal_servicio (codigo_canal_servicio, nombre_canal_servicio, id_usuario) VALUES
('CAJ','Caja',1), ('VEN','Ventanilla',1), ('BIN','Banca Internet',1),
('BMO','Banca Móvil',1), ('AGB','Agentes Bancarios',1), ('AUB','Autobancos',1);

-- Tipo Transacción (ids 1..4)
INSERT INTO parametros.tipo_transaccion (codigo_tipo_transaccion, nombre_tipo_transaccion, id_usuario) VALUES
('ND','Nota de Débito',1), ('NC','Nota de Crédito',1), ('TR','Transferencias',1), ('PS','Pago de Servicios',1);

-- Motivo Transacción (ids 1..11), ligados al tipo por id
INSERT INTO parametros.motivo_transaccion (id_tipo_transaccion, codigo_motivo_transaccion, nombre_motivo_transaccion, id_usuario) VALUES
(1,'M01','Retiro de Cuentas',1),        (1,'M02','Compra de dólares',1),
(2,'M03','Depósito de Cuenta',1),        (2,'M04','Recepción de Remesas',1), (2,'M05','Venta de dólares',1),
(3,'M06','Transferencia entre Cuentas',1),(3,'M07','Transferencias ACH',1),
(4,'M08','Energía',1), (4,'M09','Sanaa',1), (4,'M10','Hondutel',1), (4,'M11','Recargas',1);

-- Agencias (ids 1..4)
INSERT INTO general.agencias (id_canal_servicio, codigo_agencia, nombre_agencia, id_usuario) VALUES
(1,'401','Principal Tegucigalpa',1), (1,'402','Mall Multiplaza',1),
(3,'485','Banca Internet',1),        (4,'467','Banca Móvil',1);

-- Clientes (ids 1..2)
INSERT INTO general.clientes (id_tipo_cliente, codigo_cliente, numero_identidad, nombre_cliente, id_usuario) VALUES
(1,'CLI001','0801199012345','Juan Pérez',1),
(2,'CLI002','08019999888777','Comercial XYZ S.A.',1);

-- Transacciones de ejemplo (fecha de hoy) para que el reporte muestre filas
INSERT INTO transaccional.transacciones (id_motivo_transaccion, id_agencia, id_cliente, monto_transaccion, id_usuario) VALUES
(1, 1, 1,  500.00, 1),
(6, 3, 1, 1200.00, 1),
(3, 2, 2, 8000.00, 1);

select * from Seguridad.usuarios;


SELECT id_cliente FROM general.clientes WHERE id_cliente = 1;
SELECT id_agencia FROM general.agencias WHERE id_agencia = 1;
SELECT id_motivo_transaccion FROM parametros.motivo_transaccion WHERE id_motivo_transaccion = 1;