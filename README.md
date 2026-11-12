# Núcleo Bancario — Registro transaccional multicanal

Sistema para registrar las transacciones de una institución financiera a través de sus distintos canales (caja, ventanilla, banca por internet, banca móvil, agentes y autobancos) y generar un **reporte diario consolidado**.

API REST en Spring Boot con autenticación JWT, aplicación web en React y base de datos PostgreSQL organizada por esquemas.

| | |
|---|---|
| **Backend** | Java 21 · Spring Boot 4 · Spring Security · Spring Data JPA |
| **Frontend** | React 18 · Vite · React Router |
| **Base de datos** | PostgreSQL |
| **Seguridad** | JWT (HS256) · contraseñas con BCrypt · sesiones sin estado |

---

## Funcionalidades

| Módulo | Descripción |
|---|---|
| **Inicio de sesión** | Autenticación por código de usuario y contraseña; la API devuelve un token JWT con una hora de vigencia. |
| **Nueva transacción** | Registro de una transacción eligiendo cliente, agencia y motivo desde catálogos cargados de la API. |
| **Reporte diario** | Consolidado por fecha con 12 columnas (cliente, agencia, canal, tipo, motivo, monto) y total al pie. |
| **Mantenimientos** | Alta, edición y baja de usuarios, clientes, agencias, canales de servicio, tipos y motivos de transacción. |

---

## Arquitectura

```text
 React (SPA)  ──HTTP/JSON + JWT──►  API Spring Boot  ──JPA──►  PostgreSQL
                                    controller
                                    service
                                    repository
                                    entity
```

El backend sigue la separación clásica por capas:

| Capa | Paquete | Responsabilidad |
|---|---|---|
| Controladores | `controller` | Exponen los recursos REST bajo `/api`. |
| Servicios | `service` | Reglas de negocio y validaciones. |
| Repositorios | `repository` | Acceso a datos con Spring Data JPA. |
| Entidades y DTO | `entity`, `dto` | Modelo persistente y contratos de entrada y salida. |
| Seguridad | `security` | Filtro JWT, emisión de tokens y configuración de Spring Security. |
| Errores | `exception` | Manejo global de excepciones con respuestas uniformes. |

### Modelo de datos

La base separa las tablas por responsabilidad usando esquemas de PostgreSQL:

| Esquema | Tablas |
|---|---|
| `seguridad` | `usuarios` |
| `parametros` | `tipo_cliente`, `canal_servicio`, `tipo_transaccion`, `motivo_transaccion` |
| `general` | `agencias`, `clientes` |
| `transaccional` | `transacciones` |

Cada registro guarda el usuario que lo creó, para dejar trazabilidad.

---

## Decisiones técnicas

- **El reporte se resuelve en una sola consulta.** `TransaccionRepository` usa una consulta nativa con las uniones necesarias y la devuelve en una *proyección por interfaz* (`ReporteTransaccion`). Se evita cargar entidades completas y el problema de N+1 consultas que aparecería al recorrer las relaciones desde Java.
- **`ddl-auto=validate`.** Hibernate no crea ni altera tablas: solo comprueba que las entidades coincidan con el esquema. La estructura la define el script SQL, que es lo que se revisa y se versiona.
- **Montos en `BigDecimal`.** Nunca `double` para dinero, por los errores de redondeo en coma flotante.
- **API sin estado.** No hay sesión en el servidor; cada petición lleva su token y un filtro lo valida antes de llegar al controlador. Todo `/api/**` exige autenticación salvo `/api/auth/**`.
- **El token vive en memoria en el navegador.** El frontend no lo guarda en `localStorage` ni en cookies, lo que reduce la exposición ante un ataque XSS. La contrapartida es que la sesión se pierde al recargar la página.
- **Cliente HTTP centralizado.** Un único módulo agrega la cabecera `Authorization`, traduce los errores de la API y cierra la sesión ante cualquier respuesta 401.
- **Secretos fuera del código.** La contraseña de la base de datos y la clave de firma del JWT se leen de variables de entorno.

---

## API

Todos los recursos de catálogo exponen el CRUD completo (`GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}`).

| Recurso | Ruta |
|---|---|
| Autenticación | `POST /api/auth/login` |
| Usuarios | `/api/usuarios` |
| Clientes | `/api/clientes` |
| Tipos de cliente | `/api/tipos-cliente` |
| Agencias | `/api/agencias` |
| Canales de servicio | `/api/canal-servicio` |
| Tipos de transacción | `/api/tipos-transacciones` |
| Motivos de transacción | `/api/motivo-transaccion` |
| Transacciones | `/api/transacciones` |
| Reporte diario | `GET /api/transacciones/reporte?fecha=AAAA-MM-DD` |

---

## Puesta en marcha

**Requisitos:** Java 21, Node.js 20+, PostgreSQL.

### 1. Base de datos

```bash
psql -U postgres -d postgres -f database/schema.sql
```

El script crea los esquemas, las tablas y datos de ejemplo, incluido un usuario `admin` de demostración cuya contraseña figura en el propio script.

### 2. API

Define las variables de entorno y arranca:

| Variable | Descripción | Por defecto |
|---|---|---|
| `DB_URL` | URL JDBC | `jdbc:postgresql://localhost:5432/postgres` |
| `DB_USER` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | — |
| `JWT_SECRET` | Clave de firma, mínimo 32 caracteres | — |

```bash
cd backend
./mvnw spring-boot:run
```

La API queda en `http://localhost:8080`.

### 3. Aplicación web

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`. Para apuntar a otra API, crea `frontend/.env.local` con `VITE_API_BASE=http://host:8080`.

---

## Estructura del repositorio

```text
backend/     API Spring Boot (Maven)
frontend/    Aplicación React + Vite
database/    Script de esquema y datos de ejemplo
```

---

## Pendiente

- Pruebas automatizadas de servicios y controladores.
- Roles y permisos por usuario; hoy todo usuario autenticado accede a todos los módulos.
- Migraciones versionadas (Flyway) en lugar de un script único.

---

## Autor

**Jeferson Herrera** — [@Ary409](https://github.com/Ary409)

Los datos incluidos son ficticios.
