# Auditoría técnica de la web de Marcos (Proyecto_GE)

> **Alcance.** Se analizó el archivo `Proyecto_GE-master.zip` (66 archivos) y el documento
> `Plan_Formacion_Marcos_Funcode_Studio_CB_actualizado.docx`. Se leyó el contenido de todos los
> archivos PHP, HTML, CSS y JavaScript propios del proyecto; de las librerías de terceros
> (jQuery 3.5.1, PHPMailer 6.2.0, normalize.css) solo se identificó la versión.
> Del archivo SQL se leyó **solo la estructura** (tablas, claves, relaciones): contiene datos
> personales reales que no se copiaron a ninguna parte.
>
> **Convención.** ✅ = hecho comprobado leyendo el código. 🔎 = hipótesis que debe verificarse
> (normalmente en el servidor real, al que no hubo acceso).
>
> **No se modificó ningún archivo de la web de Marcos.** Todo el análisis se hizo sobre una copia.

---

## 0. Resumen en 6 frases (para explicarlo a Marcos)

1. La web es de **Gestión Empresarial MF**: ofrece servicios de transporte (pasajeros, trasteos,
   mensajería, domicilios, alquiler de vehículos, carga), espacios publicitarios y un **sistema de
   referidos con puntos**.
2. Tiene dos "mundos": una **parte pública** hecha con archivos `.html` (cualquiera la ve) y una
   **parte privada** hecha con archivos `.php` (solo para usuarios que iniciaron sesión).
3. El **eje central** es la tabla `users` de la base de datos y el archivo `bd/conexion.php`,
   que casi todos los archivos PHP incluyen.
4. Hoy **solo un servicio funciona de punta a punta**: *Alquiler de vehículos*. Los otros cinco
   formularios de servicios envían a una página de "en mantenimiento" y no guardan nada.
5. El patrón que se repite: una página `.php` en la raíz incluye un archivo "de lógica" en
   `assets/php/`, que a su vez incluye la conexión a la base de datos.
6. Hay **problemas de seguridad importantes** (contraseñas escritas en el código, consultas SQL
   armadas a mano, páginas de administración sin control de acceso) que conviene corregir en una
   fase separada, con copia de seguridad y pruebas.

---

## 1. Estructura de carpetas y archivos relevantes ✅

```
Proyecto_GE-master/
├── index.php                  ← Inicio de sesión (punto de entrada del servidor)
├── inicio.html                ← Portada pública
├── nosotros.html              ← Misión y visión (pública)
├── transporteAbierto.html     ← Servicios explicados (pública, sin formularios)
├── publicidad.html            ← Paquete de publicidad + PDFs (pública)
├── mantenimiento.html         ← "Sección en construcción"
├── termsCondition{Customer,Driver}.html       ← Términos (duplicados)
├── dataTreatmentPolicy{Customer,Driver}.html  ← Política de datos (duplicados)
├── registerCustomers.php      ← Registro de "Usuario" (cliente)
├── registerDrivers.php        ← Registro de "Arrendatario" (conductor)
├── recoveryPassword.php       ← Pedir correo para restablecer contraseña
├── confirmPassword.php        ← Escribir nueva contraseña (llega por enlace del correo)
├── inicio.php                 ← Portada privada (con sesión)
├── transporte.php             ← Servicios con formularios emergentes (con sesión)
├── personalPage.php           ← "Back office" del usuario: puntos y referidos
├── personalPageAdmin.php      ← Igual + botones de administración
├── bd/
│   ├── configuracion.php      ← Datos de conexión (¡contiene credenciales!)
│   ├── conexion.php           ← Abre la conexión MySQL ($conexion)
│   └── cerrarSesion.php       ← Destruye la sesión
├── assets/
│   ├── php/                   ← Lógica del servidor
│   │   ├── loginUser.php, inicioUser.php, transportUser.php, personalPageUser.php
│   │   ├── registerUserCustomer.php, registerUserDriver.php, functions.php
│   │   ├── recoveryUserPassword.php, dataReferred.php
│   │   ├── popUp.php                       ← Guarda solicitud de alquiler (EN USO)
│   │   ├── deliveryservice.php, freightservice.php, messagingservice.php,
│   │   │   moveservice.php, passengertransportservice.php  ← SIN USO (huérfanos)
│   │   ├── admin/readRegister.php, admin/deleteRegister.php
│   │   └── PHPMailer/ (librería v6.2.0)
│   ├── css/  (12 hojas: header, footer, popUp, registerUsers, estilosLogin, …)
│   ├── js/   main.js, validateFormCustomer.js, validateFormDriver.js,
│   │         validateForm.js (SIN USO), jquery.js (v3.5.1)
│   ├── img/  logoindex.png, main.png, fondo1.jpg, mantenimiento.png
│   └── docs/ 3 PDF (uno de ellos, PoliticaTratamiento…, no está enlazado)
└── sql/tablas_gestione_gestionempresarial.sql   ← Volcado de la BD (¡con datos personales!)
```

## 2. Puntos de entrada ✅ / 🔎

| Archivo | Para quién | Cómo se llega |
|---|---|---|
| `index.php` | Todos | 🔎 Es el documento por defecto del servidor (Apache/cPanel suelen abrir `index.php` primero). Muestra el **login**. |
| `inicio.html` | Visitante sin cuenta | Clic en el logo de `index.php` ("Conoce más dando clic aquí"). |
| `inicio.php` | Usuario con sesión | Clic en el logo de `personalPage.php`. |
| `personalPage.php` / `personalPageAdmin.php` | Usuario / admin | Redirección tras iniciar sesión según `rolUser`. |
| `confirmPassword.php` | Quien pidió recuperar contraseña | Enlace enviado por correo. |

## 3. Recorrido de una petición (ejemplo real: iniciar sesión) ✅

```
[Navegador] index.php  ──(1) GET──▶ [Servidor PHP]
     index.php línea 2: include('./assets/php/loginUser.php')
        loginUser.php línea 2: include('./bd/conexion.php')
            conexion.php: include("configuracion.php") → new mysqli(...) → $conexion
        ¿Existe $_POST["start"]? No (es GET) → no hace nada
     index.php devuelve el HTML del formulario ──▶ [Navegador] pinta la página con estilosLogin.css

[Navegador] Usuario escribe email+contraseña y pulsa "Iniciar Sesión"
     <form action="index.php" method="POST"> ──(2) POST──▶ [Servidor PHP] index.php (otra vez)
        loginUser.php: ahora $_POST["start"] SÍ existe
            sha1(contraseña) → SELECT * FROM users WHERE emailUser=... AND passwordUser=...  ──▶ [MySQL]
            ¿Hay fila? → $_SESSION['id_user'] = idUser
                rolUser == "admin" → header location: personalPageAdmin.php
                si no             → header location: personalPage.php
            ¿No hay fila? → <script>alert('Contraseña o Email incorrectos')</script>
```

Otros recorridos comprobados:

- **Registro**: `registerCustomers.php` → incluye `assets/php/registerUserCustomer.php` → incluye
  `functions.php` (genera código de patrocinador de 6 caracteres y define `sendMail()`) y
  `bd/conexion.php` → valida duplicados y código de patrocinador → `INSERT INTO users` +
  `INSERT INTO userpoints` → envía correo con PHPMailer.
- **Alquiler de vehículo**: `transporte.php` (formulario emergente, `action="assets/php/popUp.php"`,
  POST) → `popUp.php` → `INSERT INTO carrentalservice` → correo a la empresa → vuelve a la página
  personal.
- **Recuperar contraseña**: `recoveryPassword.php` → `recoveryUserPassword.php` (guarda `tokenUser`
  con `uniqid()` y envía enlace) → `confirmPassword.php?tokenUser=…&emailUser=…` → `UPDATE users`.
- **Panel admin**: `personalPageAdmin.php` → botones a `assets/php/admin/readRegister.php?case=1..6`
  → lista solicitudes; en `case=5` cada fila tiene un botón a `deleteRegister.php?id=…` que borra.

## 4. Cómo se conectan HTML, CSS, JavaScript, PHP y SQL ✅

```
            ┌──────────── NAVEGADOR (computador o celular de la persona) ────────────┐
            │  HTML = estructura   CSS = apariencia    JavaScript = interacción       │
            │  <link href="assets/css/…">   <script src="assets/js/main.js">          │
            └───────────────▲──────────────────────────────┬──────────────────────────┘
                            │ HTML ya armado               │ formularios (POST) / enlaces (GET)
            ┌───────────────┴──────────────────────────────▼──────────────────────────┐
            │  SERVIDOR: página .php de la raíz  ─include─▶ assets/php/xxxUser.php     │
            │                                     ─include─▶ bd/conexion.php           │
            │                                     ─include─▶ bd/configuracion.php      │
            │  PHPMailer (assets/php/PHPMailer) ─SMTP─▶ servidor de correo             │
            └───────────────────────────────┬──────────────────────────────────────────┘
                                            │ consultas SQL con $conexion->query()
            ┌───────────────────────────────▼──────────────────────────────────────────┐
            │  MySQL: base gestione_gestionempresarial (8 tablas)                       │
            └──────────────────────────────────────────────────────────────────────────┘
```

- Los `.html` **nunca** hablan con PHP ni con la base de datos; son estáticos.
- Los `.php` generan HTML mezclando texto fijo con `<?php echo … ?>`.
- JavaScript solo controla cosas visuales: menú en celular, ventanas emergentes y avisos del
  formulario de registro. **No envía datos al servidor** (no hay `fetch`/AJAX).

## 5. Función de cada archivo importante ✅

| Archivo | Función | Depende de | Lo usan |
|---|---|---|---|
| `bd/configuracion.php` | Variables `$server`, `$user`, `$password`, `$bd` | — | `conexion.php` |
| `bd/conexion.php` | Crea `$conexion` (mysqli); si falla imprime el error y corta | `configuracion.php` | Todo PHP con BD |
| `bd/cerrarSesion.php` | `session_destroy()` y vuelve a `index.php` | — | menú de `inicio.php`, `transporte.php` |
| `assets/php/loginUser.php` | Valida login y redirige por rol | `conexion.php` | `index.php` |
| `assets/php/functions.php` | `generate_string()` y `sendMail()` | PHPMailer | Registro (2) |
| `assets/php/registerUser{Customer,Driver}.php` | Registro (casi idénticos) | `functions.php`, `conexion.php` | `register{Customers,Drivers}.php` |
| `assets/php/inicioUser.php` / `transportUser.php` | Exigen sesión, leen nombre/código del usuario, calculan `$redirection` | `conexion.php` | `inicio.php` / `transporte.php` (**idénticos**) |
| `assets/php/personalPageUser.php` | Datos del usuario, referidos, cálculo de puntos (4 niveles) y `UPDATE userpoints` | `conexion.php` | `personalPage.php`, `personalPageAdmin.php` |
| `assets/php/dataReferred.php` | Tabla de referidos de un código (`?pru=`) | `conexion.php` | enlaces en páginas personales |
| `assets/php/popUp.php` | Guarda alquiler y avisa por correo | `conexion.php`, PHPMailer | `transporte.php` |
| `assets/php/admin/readRegister.php` | Lista solicitudes por tipo (`?case=`) | `conexion.php` | `personalPageAdmin.php` |
| `assets/php/admin/deleteRegister.php` | Borra un alquiler (`?id=`) | `conexion.php` | `readRegister.php` |
| `assets/js/main.js` | Menú hamburguesa (jQuery) y ventanas emergentes | jQuery | 5 páginas |
| `assets/js/validateForm{Customer,Driver}.js` | Aviso si contraseñas no coinciden / email inválido | — | Registro |
| `assets/css/header.css`, `footer.css` | Menú y pie compartidos | — | 5 páginas |

## 6. Funciones existentes y dónde están ✅

| Función | Archivo | Qué hace |
|---|---|---|
| `generate_string($input, $strength)` | `assets/php/functions.php:7` | Cadena aleatoria (código de patrocinador, 6 caracteres) |
| `sendMail($email, $bodyMail)` | `assets/php/functions.php:19` | Envía correo de bienvenida con PHPMailer |
| `main()` | `assets/js/main.js:3` | Abre/cierra el menú en pantallas pequeñas |
| *(anónimas)* | `assets/js/main.js:33-72` | Abren/cierran las 6 ventanas emergentes |
| *(anónimas)* | `assets/js/validateFormCustomer.js` | Comparan contraseñas en `keyup`; validan email con regex en `input` |

Reglas de negocio encontradas en el código:
- Cada hora de alquiler = **180 puntos** (`personalPageUser.php:25`).
- Un patrocinador admite **máximo 5 referidos** (`registerUserCustomer.php:72`, `> 4`).
- Puntos de equipo en 4 niveles con descuentos de 20 %, 30 % y 50 % (`personalPageUser.php:28-53`).
- Roles en `rolUser`: `Cliente`, `Arrendatario`, `admin`.

## 7. Formularios, consultas, tablas y relaciones ✅

**Formularios**

| Página | Envía a | Método | ¿Guarda en BD? |
|---|---|---|---|
| `index.php` (login) | `index.php` | POST | Lee `users` |
| `registerCustomers.php` / `registerDrivers.php` | sí mismos | POST | `users`, `userpoints` |
| `recoveryPassword.php` | sí mismo | POST | `UPDATE users.tokenUser` |
| `confirmPassword.php` | sí mismo | POST | `UPDATE users.passwordUser` |
| `transporte.php` → Alquiler | `assets/php/popUp.php` | POST | `carrentalservice` |
| `transporte.php` → Pasajeros, Trasteos, Mensajería, Domicilios, Carga | `mantenimiento.html` | GET | **No** (los datos quedan en la URL y se pierden) |

**Tablas** (8): `users` (eje), `userpoints`, `carrentalservice`, `passengertransportservice`,
`moveservice`, `messagingservice`, `deliveryservice`, `freightservice`.

```
users (idUser PK, rolUser, namesUser, lastNameUser, identificationDocumentUser, expeditionUser,
       numberUser, emailUser, passwordUser[sha1], codeUserSponsor, codeUserFriend, tokenUser,
       registerDate, vipUser)
   │ 1
   ├──< carrentalservice.idUser            (FOREIGN KEY, ON DELETE CASCADE)
   ├──< passengertransportservice.idUser   (FOREIGN KEY, ON DELETE CASCADE)
   ├──< moveservice.idUser                 (FOREIGN KEY, ON DELETE CASCADE)
   ├──< messagingservice.idUser            (FOREIGN KEY, ON DELETE CASCADE)
   ├──< deliveryservice.idUser             (FOREIGN KEY, ON DELETE CASCADE)
   └──< freightservice.idUser              (FOREIGN KEY, ON DELETE CASCADE)

users.codeUserSponsor ◀── users.codeUserFriend      (relación de referidos, SIN clave foránea)
userpoints.codeUserSponsor ≈ users.codeUserSponsor   (vínculo por código, SIN clave foránea)
```

## 8. Requisitos para ejecutar la web localmente

| Requisito | Detalle |
|---|---|
| PHP | El volcado indica PHP 7.3.30 ✅. Con PHP 8.2+ aparecen avisos porque `utf8_decode()` está obsoleta (22 usos) ✅. Extensión `mysqli` obligatoria. |
| MySQL/MariaDB | El volcado indica MySQL 5.7.36 ✅. |
| Servidor web | Apache (XAMPP/Laragon) o `php -S localhost:8000` desde la carpeta del proyecto. |
| Base de datos de prueba | Crear `gestione_gestionempresarial` e importar **solo la estructura** (no los datos reales). |
| Internet | Font Awesome se carga desde CDN; el mapa es un iframe de Google. |
| Correo | PHPMailer necesita un servidor SMTP. En local los envíos fallarán salvo que se configure una cuenta de pruebas (p. ej. Mailpit). Registro, alquiler y recuperación muestran error al enviar el correo, pero **la inserción en BD ocurre antes**. |

### 8.1 Prueba de ejecución local realizada (28-oct-2026) ✅

Entorno: copia de prueba del proyecto, PHP 8.3.6 (`php -S`), MariaDB 10.11, base creada **solo
con la estructura** del volcado (ningún dato real), SMTP redirigido a `127.0.0.1` para que nunca
contactara el servidor de correo real. Usuarios ficticios (`ana@ejemplo.test`, `beto@ejemplo.test`).

| Prueba | Resultado |
|---|---|
| `php -l` en los 33 archivos PHP propios | Sin errores de sintaxis |
| `GET index.php` | 200, muestra el login |
| Registro con MySQL en **modo estricto** (`STRICT_TRANS_TABLES`, valor por defecto en MySQL 5.7+) | ❌ **Falla a mitad**: se crea la fila en `users` pero el `INSERT` en `userpoints` se rechaza porque `spentPayPointUser` no tiene valor por defecto. Con PHP 8 se ve un error 500; con PHP 7.3 (producción) 🔎 probablemente falla en silencio y deja usuarios sin fila de puntos. |
| Registro en modo no estricto | Inserta en `users` y `userpoints`; el correo falla (esperado en local) pero los datos ya quedaron guardados |
| Registro con código de patrocinador válido / inexistente | "Registro Exitoso" / "El codigo de patrocinador no existe" |
| Login con contraseña incorrecta / correcta | alerta de error / redirección 302 a `personalPage.php` |
| Alquiler de 3 horas desde `popUp.php` | Fila en `carrentalservice`; la página personal muestra 1 servicio y **540 puntos** (3 × 180) |
| Formularios de `transporte.php` | 1 apunta a `assets/php/popUp.php`, **5 apuntan a `mantenimiento.html`** |
| `assets/php/admin/readRegister.php?case=5` **sin sesión** | Devuelve la tabla de alquileres (confirma S3) |
| `personalPageAdmin.php` con usuario de rol `Cliente` | 200, se muestra el panel (confirma S3) |
| `assets/php/dataReferred.php?pru=…` **sin sesión** | Muestra nombres de referidos (confirma S3) |
| `inicio.php` sin sesión | Redirige a `index.php`, pero el log muestra que el script **siguió ejecutándose** (avisos "Undefined array key id_user") — confirma S4 |
| JavaScript en navegador (Chromium, 390 px): menú móvil y ventana "Trasteos" | Funcionan; 0 errores de JavaScript en `inicio.html`, `nosotros.html`, `transporteAbierto.html` |
| Botón "X" de las ventanas cuando Font Awesome (CDN) no carga | Queda **invisible** (es solo un ícono sin texto) — riesgo menor de usabilidad |

## 9. Problemas, duplicaciones, riesgos y posibles errores

### 9.1 Seguridad (prioridad alta)

> Se describen a nivel conceptual para que puedan corregirse; no se incluyen instrucciones de explotación.

| # | Riesgo | Dónde ✅ | Corrección recomendada |
|---|---|---|---|
| S1 | **Credenciales escritas en el código**: contraseñas SMTP en varios archivos y credenciales de BD de producción comentadas. | `bd/configuracion.php`, `assets/php/functions.php`, `recoveryUserPassword.php`, `popUp.php` y los 5 archivos de servicios | **Cambiar (rotar) esas contraseñas ya**, porque el código ha circulado. Moverlas a un archivo fuera de la carpeta pública o a variables de entorno; no subirlas a repositorios. |
| S2 | **Inyección SQL**: consultas armadas pegando variables. Muchas usan `mysqli_real_escape_string`, pero `dataReferred.php` (`$_GET["pru"]`) y `deleteRegister.php` (`$_GET["id"]`) usan el dato sin escapar. | ver columna | Consultas preparadas (`$stmt = $conexion->prepare(...); $stmt->bind_param(...)`). |
| S3 | **Control de acceso ausente**: `readRegister.php` y `deleteRegister.php` no comprueban sesión ni rol; `personalPageAdmin.php` no comprueba que el rol sea admin; `dataReferred.php` no exige sesión. | `assets/php/admin/*`, `personalPageAdmin.php`, `dataReferred.php` | Comprobar `$_SESSION` y `rolUser == 'admin'` al inicio y terminar con `exit` si no cumple. |
| S4 | **Redirecciones sin `exit`**: tras `header("Location: …")` el script sigue ejecutándose. | `inicioUser.php:5`, `transportUser.php:5`, `loginUser.php`, `cerrarSesion.php` | Añadir `exit;` después de cada `header("Location…")`. |
| S5 | **Recuperación de contraseña débil**: el token se valida por separado del correo; no caduca ni se borra tras usarse; `uniqid()` es predecible; no se compara la confirmación en el servidor. | `confirmPassword.php`, `recoveryUserPassword.php` | Buscar por token **y** correo, token con `random_bytes`, caducidad, borrar tras usar, comparar ambas contraseñas. |
| S6 | **Contraseñas con `sha1()` sin sal** | login, registro, confirmación | `password_hash()` / `password_verify()` (requiere plan de migración). |
| S7 | **Datos sin escapar al mostrarlos (XSS)**: nombres y textos del usuario se imprimen tal cual en páginas y correos. | páginas personales, `readRegister.php`, cuerpos de correo | `htmlspecialchars()` al imprimir. |
| S8 | **Borrado por enlace GET** sin confirmación ni token CSRF. | `readRegister.php` → `deleteRegister.php` | Formulario POST + token + confirmación. |
| S9 | **Volcado SQL con datos personales** dentro del proyecto. | `sql/` | Sacarlo de la carpeta pública del hosting 🔎 (verificar si es accesible desde internet) y de cualquier repositorio. |
| S10 | **Mensajes de error técnicos visibles** (`mysqli_connect_error`, `$mail->ErrorInfo`). | `conexion.php`, archivos de correo | Registrar en log; mostrar mensaje genérico. |

### 9.2 Errores funcionales y de calidad

| # | Hallazgo ✅ | Impacto |
|---|---|---|
| F1 | 5 formularios de `transporte.php` envían a `mantenimiento.html`; sus PHP existen pero están **desconectados**. | El usuario cree que pidió el servicio y no se guarda nada. El panel admin muestra esas tablas (vacías). |
| F2 | En `moveservice.php`, `freightservice.php`, etc. el usuario SMTP usa un dominio distinto (sin "mf") al de los demás archivos. 🔎 Probablemente fallaría la autenticación si se conectaran. | Revisar antes de reactivarlos. |
| F3 | En Mensajería, fecha y hora usan `require` en vez de `required` (`transporte.php:132-133`). | Esos campos no son obligatorios. |
| F4 | IDs repetidos: `id="main_parrafo_2"` (6 veces en `transporte.php`), `id="btn_cerrar_poput_trasteos"` (4 veces). | HTML inválido; un `id` debe ser único. |
| F5 | `main.js` registra los clics de las ventanas dentro de un `for` → cada botón queda con 6 escuchadores iguales; usa `overlay2…5` sin declararlas (funciona por una característica del navegador que convierte los `id` en variables globales). | Funciona, pero frágil y confuso. |
| F6 | `userpoints` se inserta siempre con `idUserPoints = 1` y se corrige en cada visita a la página personal (que hace un `UPDATE` cada vez que se abre). | Datos inconsistentes; escritura en BD al solo mirar. |
| F7 | El código de patrocinador se genera con `mt_rand` y **no se comprueba que sea único**. | Posibles códigos repetidos. |
| F8 | `lang="en"` en páginas en español; `user-scalable=no` impide hacer zoom en celular. | Accesibilidad. |
| F9 | `nosotros.html` tiene los enlaces de redes como `#`; las otras páginas tienen los reales. | Inconsistencia. |
| F10 | `publicidad.html` no tiene menú ni pie, y sus PDF usan `width="50%"`. | Navegación y celular. |
| F12 | Registro falla con MySQL en modo estricto (`userpoints.spentPayPointUser` sin valor por defecto) — ver 8.1. | Usuarios a medio registrar. |
| F11 | `$resultadoUsuario > 0` compara un booleano con un número; `echo $resultadoPassword` imprime "1". | Funciona por casualidad / salida extraña. |

### 9.3 Código duplicado ✅

- Menú y pie copiados en `inicio.html`, `inicio.php`, `nosotros.html`, `transporteAbierto.html`, `transporte.php`.
- `inicioUser.php` y `transportUser.php`: **idénticos**.
- `registerCustomers.php` ≈ `registerDrivers.php`; `registerUserCustomer.php` ≈ `registerUserDriver.php`
  (y dentro de cada uno, el bloque de INSERT está repetido dos veces).
- Cálculo de puntos de 4 niveles repetido en **4 archivos** (`personalPageUser.php`, `personalPage.php`,
  `personalPageAdmin.php`, `dataReferred.php`).
- Configuración SMTP repetida en 8 archivos.
- `termsCondition*.html` y `dataTreatmentPolicy*.html`: solo cambia el enlace "Volver".

## 10. ¿Qué se puede tocar con bajo riesgo y qué requiere cuidado?

| Riesgo | Qué | Por qué |
|---|---|---|
| 🟢 Bajo | Textos de `nosotros.html`, `inicio.html`, `publicidad.html`, `mantenimiento.html`; colores y tamaños en CSS de una sola página (`cuadrosNosotros.css`, `publicidad.css`). | Estático, no afecta datos. Se revierte copiando el archivo anterior. |
| 🟡 Medio | `header.css`, `footer.css`, `main.js`, menú/pie (están en 5 páginas); HTML de `transporte.php` y formularios de registro (los `name` deben coincidir con lo que lee PHP). | Un cambio se propaga a varias páginas o rompe el envío del formulario. |
| 🔴 Alto | Todo `bd/`, `assets/php/` (login, registro, puntos, recuperación, admin), estructura de tablas. | Afecta sesiones, datos reales y seguridad. Solo en local, con copia de la BD y pruebas. |

---

### Información que faltó o no se pudo comprobar

- Acceso al **servidor real** (configuración de Apache, versión de PHP en producción, si `sql/` es público, cron, copias de seguridad existentes).
- **Historial de cambios** (no hay `.git` en el ZIP), por lo que no se sabe qué versión está publicada.
- **Cuenta SMTP de pruebas** para comprobar los envíos de correo.
- Requisitos del **módulo de camisas** (no confirmado; no se desarrolló).
