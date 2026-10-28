/*
 * codigo.js — Fragmentos REALES de la web de Marcos (Proyecto_GE).
 * Generado a partir de los archivos originales con números de línea exactos.
 * Se ocultaron credenciales, correos y el dominio de producción.
 * Si la web cambia, los números de línea pueden dejar de coincidir: revisar.
 */
FA.registrarCodigo([
 {
  "id": "index-cabecera",
  "archivo": "index.php",
  "desde": 1,
  "lang": "php-html",
  "titulo": "Primeras líneas del punto de entrada: antes del HTML, PHP incluye la lógica del login.",
  "codigo": "<?php\ninclude('./assets/php/loginUser.php');\n?>\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <link rel=\"shortcut icon\" href=\"assets/img/logoindex.png\">\n    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.2/css/all.css\" integrity=\"sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr\" crossorigin=\"anonymous\">\n    <link rel=\"stylesheet\" href=\"assets/css/normalize.css\">\n    <link rel=\"stylesheet\" href=\"assets/css/estilosLogin.css\">\n    <title>GE-Inicio Sesión</title>\n</head>\n<body>",
  "redactado": false,
  "lineas": {
   "1-3": "Bloque PHP. `include` pega aquí el contenido de `assets/php/loginUser.php`. Se ejecuta **en el servidor**, antes de enviar nada al navegador. Por eso el navegador nunca ve este código.",
   "4": "`<!DOCTYPE html>` le dice al navegador: “lo que sigue es HTML moderno”.",
   "5": "Abre el documento. `lang=\"en\"` dice que el idioma es inglés, pero el contenido está en español: debería ser `lang=\"es\"` (mejora de bajo riesgo).",
   "6-14": "La cabecera (`<head>`): información que no se ve en la página. Aquí se cargan el ícono de la pestaña (línea 9), los íconos de Font Awesome desde internet (línea 10) y **dos hojas de estilo** propias: `normalize.css` y `estilosLogin.css` (líneas 11-12).",
   "13": "`<title>`: el texto que aparece en la pestaña del navegador.",
   "15": "Empieza el cuerpo (`<body>`): lo que sí se ve."
  },
  "relaciones": [
   {
    "archivo": "assets/php/loginUser.php",
    "x": "se incluye en la línea 2 y procesa el formulario."
   },
   {
    "archivo": "assets/css/estilosLogin.css",
    "x": "da la apariencia a esta página (línea 12)."
   },
   {
    "archivo": "assets/img/logoindex.png",
    "x": "ícono de la pestaña (línea 9) y logo."
   }
  ]
 },
 {
  "id": "index-formulario",
  "archivo": "index.php",
  "desde": 16,
  "lang": "html",
  "titulo": "El formulario de inicio de sesión: los `name` de cada campo son los que PHP lee después.",
  "codigo": "    <div class=\"container\">\n        <div class=\"container-main\">\n            <div class=\"container-main-logo\">\n                <div class=\"container-main-logo__title\">\n                    <p>CONOCE MÁS DANDO CLICK AQUÍ</p>\n                </div>\n                <div class=\"container-main-logo__img\">\n                    <a href=\"inicio.html\"><img src=\"assets/img/logoindex.png\" alt=\"Logo Gestion Empresarial\" width=\"200px\"></a>\n                </div>\n            </div> \n            <div class=\"container-main-login\">\n                <form action=\"index.php\" method=\"POST\" >\n                    <h3>Gestión Empresarial MF S.A.S</h3>\n                    <label for=\"\">Email:</label>\n                    <input type=\"email\" name=\"emailEverybody\" placeholder=\" Escribir Email\" required>\n                    <label for=\"\">Contraseña:</label>\n                    <input type=\"password\" name=\"passwordEverybody\" placeholder=\"Escribir Contraseña\" required>\n                    <button type=\"submit\" name=\"start\">Iniciar Sesión</button>\n                    <p><a href=\"recoveryPassword.php\">Reestablecer contraseña</a></p>\n                    <p>o</p>\n                    <p>Registrarse como:</p>\n                    <p><a href=\"registerDrivers.php\">Arrendatario</a></p>\n                    <p><a href=\"registerCustomers.php\">Usuario</a></p>\n                </form>\n            </div>\n        </div>\n    </div>\n</body>\n</html>",
  "redactado": false,
  "lineas": {
   "16-17": "Contenedores (`div`) que solo sirven para organizar y dar estilo con las clases `container` y `container-main`.",
   "23": "El logo es un **enlace** (`<a href=\"inicio.html\">`) a la portada pública. Así un visitante sin cuenta llega a conocer la empresa.",
   "27": "`<form action=\"index.php\" method=\"POST\">`: al pulsar el botón, los datos viajan **a esta misma página** usando el método POST (los datos no se ven en la dirección).",
   "30": "Campo de correo. `type=\"email\"` hace que el navegador revise el formato; `required` lo vuelve obligatorio; `name=\"emailEverybody\"` es el **nombre con el que PHP lo recibe** (`$_POST['emailEverybody']`).",
   "32": "Campo de contraseña: `type=\"password\"` oculta lo que se escribe.",
   "33": "El botón tiene `name=\"start\"`. PHP pregunta si existe `start` para saber que se envió **este** formulario.",
   "34-38": "Enlaces a recuperar contraseña y a los dos registros (Arrendatario y Usuario).",
   "29": "Las etiquetas `<label for=\"\">` tienen `for` vacío: no están unidas a su campo. Mejora: `for=\"email\"` + `id=\"email\"` en el input (accesibilidad)."
  },
  "relaciones": [
   {
    "archivo": "assets/php/loginUser.php",
    "x": "lee `emailEverybody`, `passwordEverybody` y `start`."
   },
   {
    "archivo": "inicio.html",
    "x": "destino del logo (línea 23)."
   },
   {
    "archivo": "registerDrivers.php / registerCustomers.php",
    "x": "destinos de los enlaces de registro."
   }
  ]
 },
 {
  "id": "login-php",
  "archivo": "assets/php/loginUser.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Lógica del login: recibe los datos, consulta la base de datos y decide a dónde enviar a la persona.",
  "codigo": "<?php\ninclude('./bd/conexion.php');\n\nif(isset($_POST[\"start\"])){\n    session_start();\n    $emailEverybody = mysqli_real_escape_string($conexion,$_POST['emailEverybody']);\n    $pssEverybody = mysqli_real_escape_string($conexion,$_POST['passwordEverybody']);\n    $pass_encrypted = sha1($pssEverybody);\n    $sql = \"SELECT * FROM users WHERE emailUser = '$emailEverybody' AND passwordUser = '$pass_encrypted' \";\n    $resultado = $conexion->query($sql);\n    $rows = $resultado->num_rows;\n    if($rows > 0){\n        $row = $resultado->fetch_assoc();\n        $_SESSION['id_user'] = $row[\"idUser\"];\n        if($row[\"rolUser\"] == \"admin\"){\n            header(\"location: personalPageAdmin.php\");\n        }else{\n            header(\"location: personalPage.php\");\n        }\n        \n    }else{\n        echo \"<script>\n        alert('Contraseña o Email incorrectos');\n        window.location = 'index.php';\n        </script>\";\n    }\n}",
  "redactado": false,
  "lineas": {
   "2": "Incluye la conexión. Desde aquí existe la variable `$conexion` para hablar con MySQL.",
   "4": "`if(isset($_POST[\"start\"]))`: “¿llegó el formulario con el botón `start`?”. Si alguien solo abre la página (sin enviar), no entra a este bloque.",
   "5": "`session_start()` activa la **sesión**: una memoria del servidor para recordar quién inició sesión mientras navega.",
   "6-7": "Lee el correo y la contraseña enviados. `mysqli_real_escape_string` “limpia” caracteres peligrosos para SQL. Ayuda, pero lo recomendado hoy son las **consultas preparadas**.",
   "8": "`sha1()` convierte la contraseña en un código (hash). Se compara con el hash guardado. `sha1` sin “sal” es débil; lo recomendado es `password_hash`/`password_verify`.",
   "9": "La **consulta SQL**: “trae el usuario cuyo correo y contraseña coincidan”. Las variables se pegan dentro del texto.",
   "10-11": "Ejecuta la consulta y cuenta cuántas filas devolvió (`num_rows`).",
   "12-14": "Si encontró al usuario, toma su fila y guarda su `idUser` en la sesión: `$_SESSION['id_user']`. Ese dato lo usan después las demás páginas privadas.",
   "15-19": "Según el **rol** (`rolUser`) redirige: el admin va a `personalPageAdmin.php`, los demás a `personalPage.php`. `header(\"location: ...\")` le dice al navegador “ve a esta otra página”. Falta `exit;` después.",
   "21-26": "Si no hay coincidencia, PHP imprime un pequeño JavaScript que muestra una alerta y recarga `index.php`."
  },
  "relaciones": [
   {
    "archivo": "bd/conexion.php",
    "x": "crea `$conexion` (línea 2)."
   },
   {
    "archivo": "index.php",
    "x": "es quien incluye este archivo y contiene el formulario."
   },
   {
    "archivo": "tabla users",
    "x": "de donde se leen `emailUser`, `passwordUser`, `idUser` y `rolUser`."
   },
   {
    "archivo": "personalPage.php / personalPageAdmin.php",
    "x": "destinos de la redirección."
   }
  ],
  "nota": {
   "tipo": "seguridad",
   "x": "Este archivo es de **alto riesgo**: un error aquí impide que todos inicien sesión. Solo se modifica en una copia local, con pruebas."
  }
 },
 {
  "id": "conexion",
  "archivo": "bd/conexion.php",
  "desde": 1,
  "lang": "php",
  "titulo": "El eje central: casi todos los archivos PHP incluyen este archivo para hablar con la base de datos.",
  "codigo": "<?php\ninclude(\"configuracion.php\");\n$conexion = new mysqli($server,$user,$password,$bd);\nif (mysqli_connect_errno()){\n    echo \"No Conectado\",mysqli_connect_error();\n    exit();\n}else{\n    // echo \"Conectado\";\n}\n?>",
  "redactado": false,
  "lineas": {
   "2": "Incluye `configuracion.php`, que define las variables `$server`, `$user`, `$password` y `$bd`.",
   "3": "`new mysqli(...)` abre la conexión con MySQL usando esos datos y la guarda en la variable `$conexion`.",
   "4-6": "Si la conexión falla, imprime “No Conectado” más el detalle técnico del error y detiene todo con `exit()`. Mostrar el detalle técnico al público no es recomendable.",
   "7-9": "Si funciona no hace nada (el mensaje “Conectado” está comentado con `//`)."
  },
  "relaciones": [
   {
    "archivo": "bd/configuracion.php",
    "x": "aporta los datos de conexión."
   },
   {
    "archivo": "loginUser.php, registerUser*.php, inicioUser.php, personalPageUser.php, popUp.php, admin/*.php …",
    "x": "todos lo incluyen. Si este archivo falla, falla toda la parte privada."
   }
  ]
 },
 {
  "id": "configuracion",
  "archivo": "bd/configuracion.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Datos de conexión. Las líneas activas son las de un entorno local (XAMPP); las comentadas eran de producción.",
  "codigo": "<?php\n    $server = \"localhost\";\n    $user = \"root\";\n    $password = \"\";\n    $bd = \"gestione_gestionempresarial\";\n    // $server = \"[DATO DE PRODUCCIÓN OCULTO]\";\n    // $user = \"[DATO DE PRODUCCIÓN OCULTO]\";\n    // $password = \"[DATO DE PRODUCCIÓN OCULTO]\";\n    // $bd = \"[DATO DE PRODUCCIÓN OCULTO]\";\n?>",
  "redactado": true,
  "lineas": {
   "2-5": "Datos para el entorno local: servidor `localhost`, usuario `root` sin contraseña (lo típico de XAMPP) y la base `gestione_gestionempresarial`.",
   "6-9": "Líneas comentadas (`//`) con los datos del servidor real. **En esta plataforma se ocultaron.** Que estén en el código es un riesgo: quien tenga el archivo tiene la llave de la base de datos."
  },
  "relaciones": [
   {
    "archivo": "bd/conexion.php",
    "x": "único archivo que lo incluye."
   }
  ],
  "nota": {
   "tipo": "seguridad",
   "x": "Las credenciales reales que aparecían aquí y en los archivos de correo deben **cambiarse (rotarse)** en el hosting, porque el código ha circulado. Después, guardarlas fuera de la carpeta pública y nunca subirlas a un repositorio."
  }
 },
 {
  "id": "inicio-menu",
  "archivo": "inicio.html",
  "desde": 16,
  "lang": "html",
  "titulo": "El menú de la portada pública. Este mismo bloque está copiado en otras 4 páginas.",
  "codigo": "    <!---------------------Inicio Header------------------->\n    <header class=\"menu-header\">\n        <div class=\"contenedor\">\n            <div class=\"menu-bar\">\n                <a href=\"#\" class=\"bt-menu\"><i class=\"fas fa-bars\"></i></a>\n            </div>\n            <nav class=\"menu-nav\">\n                <ul class=\"menu-ul\">\n                    <li class=\"menu-li\"><a href=\"inicio.html\" class=\"menu-a\"><i class=\"fas fa-home\"></i>Inicio</a></li>\n                    <li class=\"menu-li\"><a href=\"nosotros.html\" class=\"menu-a\"><i class=\"fas fa-suitcase\"></i>Nosotros</a></li> \n                    <li class=\"menu-li\"><a href=\"registerCustomers.php\" class=\"menu-a\"><i class=\"fas fa-users\"></i></i>Registro Usuarios</a></li>\n                    <li class=\"menu-li\"><a href=\"registerDrivers.php\" class=\"menu-a\"><i class=\"fas fa-id-card\"></i>Registro Arrendatarios</a></li>\n                    <li class=\"menu-li\"><a href=\"index.php\" class=\"menu-a\"><i class=\"fas fa-sign-in-alt\"></i>Iniciar Sesión</a></li>\n                </ul>\n            </nav>    \n        </div>\n    </header>\n    <!---------------------Fin Header------------------->",
  "redactado": false,
  "lineas": {
   "16": "Un **comentario** HTML: `<!-- ... -->` no se ve en la página; sirve de etiqueta para quien lee el código.",
   "17": "`<header>`: etiqueta semántica para la cabecera. Tiene la clase `menu-header`, que se estiliza en `header.css`.",
   "19-21": "El botón hamburguesa (☰) para celular. Es un enlace con un ícono `<i class=\"fas fa-bars\">` de Font Awesome. `main.js` escucha el clic sobre `.menu-bar`.",
   "22": "`<nav>`: etiqueta semántica para la navegación principal.",
   "23": "`<ul>` es una lista sin numerar; cada opción del menú es un `<li>`.",
   "24-28": "Cada `<li>` contiene un enlace `<a href=\"...\">` con un ícono y un texto. `href` dice a qué archivo lleva.",
   "26": "Aquí hay un `</i>` de más (cierra dos veces el ícono). El navegador lo tolera, pero es un error de HTML."
  },
  "relaciones": [
   {
    "archivo": "assets/css/header.css",
    "x": "estilos de `.menu-header`, `.menu-li`, `.menu-a`, `.menu-bar`."
   },
   {
    "archivo": "assets/js/main.js",
    "x": "abre y cierra el `nav` en pantallas pequeñas."
   },
   {
    "archivo": "nosotros.html, transporteAbierto.html, inicio.php, transporte.php",
    "x": "tienen una copia de este menú (algunas con otras opciones)."
   }
  ]
 },
 {
  "id": "inicio-main",
  "archivo": "inicio.html",
  "desde": 34,
  "lang": "html",
  "titulo": "Los tres recuadros de la portada: Transporte, Espacios Publicitarios y Otros Servicios.",
  "codigo": "    <!---------------------Inicio Main------------------->\n    <div class=\"main\">\n        <div class=\"contenedor_main\">\n            <div class=\"seccion_1\">\n                <div class=\"maintexto_1\">\n                    <a href=\"transporteAbierto.html\">\n                        <p id=\"main_parrafo_2\">Transporte</p>\n                    </a>\n                </div>\n            </div>\n            <div class=\"seccion_1\">\n                    <div class=\"maintexto_1\">\n                        <a href=\"publicidad.html\">\n                            <p id=\"main_parrafo_2\">Espacios Publicitarios</p>\n                        </a>\n                    </div>\n                </div>\n        </div>\n        <div class=\"contenedor_main_1\">\n            <div class=\"seccion_1\">\n                <div class=\"maintexto_1\">\n                    <a href=\"mantenimiento.html\">\n                        <p id=\"main_parrafo_2\">Otros Servicios</p>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!---------------------Fin Main------------------->",
  "redactado": false,
  "lineas": {
   "35": "Contenedor principal con la clase `main`. En `cuadrosTransporte.css` recibe la imagen de fondo `main.png`.",
   "36": "Primera fila con dos recuadros (`contenedor_main`).",
   "37-43": "Un recuadro: `div.seccion_1` > `div.maintexto_1` > enlace a `transporteAbierto.html` > párrafo con el texto “Transporte”.",
   "40": "`id=\"main_parrafo_2\"`: se repite en los tres recuadros. Un `id` debería ser **único** en la página; para repetir un estilo se usa `class`.",
   "52-60": "Segunda fila (`contenedor_main_1`) con un solo recuadro: “Otros Servicios” lleva a `mantenimiento.html` (sección aún no construida)."
  },
  "relaciones": [
   {
    "archivo": "assets/css/cuadrosInicio.css",
    "x": "tamaño, posición y efecto al pasar el mouse de los recuadros."
   },
   {
    "archivo": "assets/css/cuadrosTransporte.css",
    "x": "imagen de fondo de `.main` y estilo de `#main_parrafo_2`."
   },
   {
    "archivo": "transporteAbierto.html, publicidad.html, mantenimiento.html",
    "x": "destinos de los enlaces."
   }
  ]
 },
 {
  "id": "nosotros-html",
  "archivo": "nosotros.html",
  "desde": 35,
  "lang": "html",
  "titulo": "Misión y visión: el contenido más fácil y seguro de modificar en toda la web.",
  "codigo": "    <div class=\"main\">\n       <div class=\"nosotros\">\n           <div class=\"mision\">\n               <div class=\"nosotros_titulo\">\n                   <h1 class=\"nosotros_h1\">Misión</h1>\n               </div>\n               <div class=\"nosotros_contenido\">\n                 <p class=\"nosotros_p\">\n                    Somos una empresa dedica a brindar soluciones para las diferentes necesidades de traslados, \n                    mediante el uso de las nuevas tecnologías, así mismo poder brindar espacios publicitarios de \n                    impacto masivo que propendan por el mejoramiento en la calidad de vida de la población en general.\n                </p>\n               </div>\n           </div>\n           <div class=\"vision\">\n               <div class=\"nosotros_titulo\">\n                <h1 class=\"nosotros_h1\">Visión</h1>\n               </div>\n               <div class=\"nosotros_contenido\">\n                   <p class=\"nosotros_p\">\n                    En los próximos cinco (5) años nos posicionaremos como una de las empresas más reconocidas en el mercado \n                    existente, la cual se destacara por su calidad, efectividad y oportunidad en los servicios brindados desde\n                    una perspectiva humana y cálida\n                   </p>\n               </div>\n           </div>\n       </div>\n    </div>",
  "redactado": false,
  "lineas": {
   "36": "Contenedor de la sección “nosotros”.",
   "37-48": "Bloque **Misión**: un título `<h1>` y un párrafo `<p>` con el texto.",
   "39": "`<h1 class=\"nosotros_h1\">`: título principal. En esta página hay dos `<h1>` (Misión y Visión); lo ideal es un solo `h1` por página y usar `h2` para subsecciones.",
   "42-46": "El párrafo con el texto de la misión. Cambiar estas palabras no afecta a ningún otro archivo.",
   "49-60": "Bloque **Visión**, con la misma estructura."
  },
  "relaciones": [
   {
    "archivo": "assets/css/cuadrosNosotros.css",
    "x": "tamaño de letra, sombra y efecto de los textos (`.nosotros_h1`, `.nosotros_p`)."
   }
  ]
 },
 {
  "id": "registro-form",
  "archivo": "registerCustomers.php",
  "desde": 18,
  "lang": "php-html",
  "titulo": "Formulario de registro de usuarios: cada `name` debe coincidir con lo que lee `registerUserCustomer.php`.",
  "codigo": "    <!---------------------Start Container------------------->\n    <div class=\"container\"> \n        <div class=\"container-header\">\n            <p>A continuación usted digitara los datos de registro como <b>Usuario</b>, por favor lea atentamente los campos.</p>\n        </div>\n        <!---------------------Start Form------------------->\n        <form action=\"registerCustomers.php\" method=\"POST\" id=\"formulario\" class=\"main-form\">\n            <div class=\"main-form__title\">\n                <h3>REGISTRO USUARIOS</h3>\n            </div>\n            <div class=\"main-form__body\">\n                <label>Nombres:</label>\n                <input type=\"text\" class=\"main-form__input\" name=\"namesCustomer\" placeholder=\"Escribir Nombres\" required>\n                <label>Apellidos:</label>\n                <input type=\"text\" class=\"main-form__input\" name=\"lastNameCustomer\" placeholder=\"Escribir Apellidos\" required>\n                <label>Documento de identificación:</label>\n                <input type=\"number\" class=\"main-form__input\" name=\"identificationDocumentCustomer\" placeholder=\" Escribir identificación\" required>\n                <label>Fecha de expedición de CC:</label>\n                <input type=\"date\" class=\"main-form__input\" name=\"expeditionCustomer\" required>\n                <label>Número de contacto:</label>\n                <input type=\"number\" class=\"main-form__input\" name=\"numberCustomer\" placeholder=\" Escribir número\" required>\n                <label>Email:</label>\n                <input type=\"email\" class=\"main-form__input\" id=\"emailCustomer\" name=\"emailCustomer\" placeholder=\"Escriba Correo electrónico\" required> \n                <p class=\"main-form__validationNotMatch\" id=\"emailValidation\">Email NO valido</p>\n                <label>Contraseña:</label>\n                <input type=\"password\" class=\"main-form__input\"  id=\"passwordCustomer\" name=\"passwordCustomer\" placeholder=\" Escriba Contraseña\" required>\n                <p class=\"main-form__validationNotMatch\" id=\"validation\">Contraseña NO coincide</p>\n                <label>Confirmar Contraseña:</label>\n                <input type=\"password\" class=\"main-form__input\" id=\"validatePasswordCustomer\" name=\"validatePasswordCustomer\" placeholder=\" Escriba Contraseña\" required>\n                <p class=\"main-form__validationNotMatch\" id=\"ValidationConfirmation\">Contraseña NO coincide</p>\n                <label>Código Patrocinador:</label>\n                <label>(Si no tiene uno deje el espacio en blanco)</label>\n                <input type=\"text\" class=\"main-form__input\" name=\"codeCustomerFriend\" placeholder=\"Escriba código\">\n                <br>\n            </div>\n            <div class=\"main-form__footer\">\n                <a href=\"termsConditionCustomer.html\" class=\"main-form__footer__terms\">Leer términos y condiciones</a>\n                <a href=\"dataTreatmentPolicyCustomer.html\" class=\"main-form__footer__terms\">Leer politica de tratamiento de datos</a>\n                <input type=\"checkbox\" required><span>Aceptar términos y condiciones</span> \n                <button type=\"submit\" name=\"registrar\" class=\"main-form__footer__register\">Registrarse</button>\n                <div class=\"main-form__footer__a\"><a href=\"index.php\">Iniciar sesión</a></div>\n            </div>\n            <br>\n        </form>\n        <!---------------------End Form------------------->\n        <br>\n    </div>\n    <!---------------------End Container------------------->\n    <script src=\"assets/js/validateFormCustomer.js\"></script>\n</body>\n</html>",
  "redactado": false,
  "lineas": {
   "24": "El formulario se envía a sí mismo (`registerCustomers.php`) por POST. Tiene `id=\"formulario\"`.",
   "30": "`name=\"namesCustomer\"` → en PHP llega como `$_POST['namesCustomer']`. Si cambias este nombre sin cambiar el PHP, el registro se rompe.",
   "34": "`type=\"number\"` para el documento. Ojo: algunos documentos tienen letras o empiezan por cero.",
   "36": "`type=\"date\"` muestra un calendario para elegir la fecha.",
   "40-41": "Campo de correo con `id=\"emailCustomer\"`. El párrafo de la línea 41 (oculto por CSS) lo muestra `validateFormCustomer.js` si el correo no es válido.",
   "43-47": "Contraseña y confirmación, cada una con su mensaje “Contraseña NO coincide” (oculto al inicio).",
   "50": "Código del patrocinador: es opcional (no tiene `required`).",
   "54-56": "Enlaces a términos y política de datos, y una casilla obligatoria para aceptarlos.",
   "57": "Botón con `name=\"registrar\"`: es lo que PHP comprueba para saber que se envió el registro.",
   "66": "Al final se carga el JavaScript que valida en vivo."
  },
  "relaciones": [
   {
    "archivo": "assets/php/registerUserCustomer.php",
    "x": "procesa estos campos (se incluye al inicio del archivo)."
   },
   {
    "archivo": "assets/js/validateFormCustomer.js",
    "x": "usa los `id` `passwordCustomer`, `validatePasswordCustomer`, `emailCustomer`, `validation`, `ValidationConfirmation` y `emailValidation`."
   },
   {
    "archivo": "assets/css/registerUsers.css",
    "x": "estilos `.main-form...`."
   },
   {
    "archivo": "registerDrivers.php",
    "x": "es casi una copia con otros `name` (`namesDriver`, …)."
   }
  ]
 },
 {
  "id": "transporte-pasajeros",
  "archivo": "transporte.php",
  "desde": 43,
  "lang": "html",
  "titulo": "Un servicio con ventana emergente. Fíjate a dónde envía el formulario.",
  "codigo": "        <!-----------------------TRANSPORTE DE PASAJEROS------------------->\n        <div class=\"contenedor_main_2\">\n            <div class=\"seccion_2\">\n                <a href=\"#\" id=\"pasajeros\" class=\"btn_abrir_popup transporte\">\n                    <div class=\"maintexto_2\">\n                        <p class=\"main_parrafo_2\" id=\"main_parrafo_2\">Transporte de Pasajeros</p>\n                    </div>\n                </a>\n            </div>\n            <div class=\"overlay\" id=\"overlay\">\n                <div class=\"popup\" id=\"popup\">\n                    <div class=\"cabecera_popup\">\n                        <a href=\"#\"  class=\"btn_cerrar_popup\"><i class=\"fas fa-times\" id=\"btn_cerrar_poput\"></i></a>\n                        <h3>Realiza tu solicitud</h3>\n                        <h5>En este espacio debes indicarnos la dirección de salida, llegada, día, hora del servicio y número de contacto.</h5>\n                    </div>\n                    <div class=\"cuerpo_popup\">\n                        <form action=\"mantenimiento.html\">\n                            <div class=\"contenedor_inputs\">\n                                <input type=\"text\" class=\"input\" name=\"exitAddress\" placeholder=\"Direccion salida\" required>\n                                <input type=\"text\" class=\"input\" name=\"arrivalAddress\" placeholder=\"Direccion llegada\" required>\n                                <input type=\"date\" class=\"input\" name=\"departureDate\" placeholder=\"Día salida\" required>\n                                <input type=\"time\" class=\"input\" name=\"departureTime\" placeholder=\"Hora salida\" required>\n                                <input type=\"number\" class=\"input\" name=\"contactNumber\" placeholder=\"Número de contacto\" required>\n                                <input type=\"submit\" class=\"btn_submit\" name=\"enviar\" value=\"Enviar\">\n                            </div>                     \n                        </form>\n                    </div>   \n                </div>\n            </div>",
  "redactado": false,
  "lineas": {
   "46": "El recuadro “Transporte de Pasajeros” es un enlace con `id=\"pasajeros\"` y la clase `btn_abrir_popup`. JavaScript lo usa para abrir la ventana.",
   "52-53": "La ventana emergente: un fondo oscuro (`overlay`, id `overlay`) y la caja (`popup`). Están ocultas hasta que JavaScript les añade la clase `active`.",
   "55": "La “X” para cerrar: un enlace con clase `btn_cerrar_popup` que solo contiene un ícono (si Font Awesome no carga, la X no se ve).",
   "60": "**Hecho importante:** `action=\"mantenimiento.html\"`. Este formulario NO envía a PHP: lleva a la página de mantenimiento y **no guarda la solicitud**. Igual pasa con Trasteos, Mensajería, Domicilios y Carga.",
   "62-66": "Campos de dirección, fecha, hora y teléfono, todos con `required`.",
   "67": "El botón de enviar (`type=\"submit\"`)."
  },
  "relaciones": [
   {
    "archivo": "assets/js/main.js",
    "x": "abre y cierra la ventana usando los `id` `pasajeros`, `overlay` y `popup`."
   },
   {
    "archivo": "assets/css/popUp.css",
    "x": "oculta la ventana y la muestra cuando tiene la clase `active`."
   },
   {
    "archivo": "assets/php/passengertransportservice.php",
    "x": "existe para guardar este servicio, pero **ningún formulario lo usa**."
   }
  ]
 },
 {
  "id": "transporte-alquiler",
  "archivo": "transporte.php",
  "desde": 176,
  "lang": "html",
  "titulo": "El único servicio que hoy funciona de punta a punta: Alquiler de Vehículos.",
  "codigo": "            <!-----------------------ALQUILER DE VEHÍCULOS------------------->\n            <div class=\"contenedor_main_2\">\n                <div class=\"seccion_2\">\n                    <a href=\"#\" id=\"alquiler\" class=\"btn_abrir_popup\">\n                        <div class=\"maintexto_2\">\n                            <p class=\"main_parrafo_2\" id=\"main_parrafo_2\">Alquiler de Vehículos</p>\n                        </div>\n                    </a>\n            </div>\n\n            <div class=\"overlay\" id=\"overlay4\">\n                <div class=\"popup\" id=\"popup4\">\n                    <div class=\"cabecera_popup\">\n                        <a href=\"#\" id=\"btn_cerrar_poput_trasteos\" class=\"btn_cerrar_popup\"><i class=\"fas fa-times\"></i></a>\n                        <h3>Realiza tu solicitud</h3>\n            <h5>En este espacio debes indicarnos el día, hora y tiempo del alquiler, la dirección de salida, de llegada y número de contacto</h5>\n                    </div>\n                    <div class=\"cuerpo_popup\">\n                        <form action=\"assets/php/popUp.php\" method=\"POST\">\n                            <div class=\"contenedor_inputs\">\n                                <input type=\"text\" name=\"exitAddress\" class=\"input\" placeholder=\"Dirección de salida del vehículo\" required>\n                                <input type=\"text\" name=\"arrivalAddress\" class=\"input\" placeholder=\"Dirección de llegada del vehículo\" required>\n                                <input type=\"date\" name=\"departureDate\" class=\"input\" placeholder=\"Día de salida\" required>\n                                <label for=\"\">Hora de salida</label>\n                                <input type=\"time\" name=\"departureTime\" class=\"input\" placeholder=\"Hora de salida\" required>\n                                <label for=\"\">Tiempo de alquiler</label>\n                                <input type=\"number\" name=\"rentalTime\" class=\"input\" placeholder=\"Tiempo de alquiler\" required>\n                                <input type=\"number\" name=\"contactNumber\" class=\"input\" placeholder=\"Número de contacto\" required>\n                                <br>\n                                <input type=\"submit\" name=\"enviar\" class=\"btn_submit\" value=\"Enviar\">\n                            </div>                     \n                        </form>\n                    </div>   \n                </div>\n                </div>",
  "redactado": false,
  "lineas": {
   "179": "Enlace que abre la ventana del alquiler (`id=\"alquiler\"`).",
   "186-187": "Ventana emergente número 4 (`overlay4`, `popup4`).",
   "194": "`action=\"assets/php/popUp.php\" method=\"POST\"`: este sí envía los datos al servidor para guardarlos.",
   "196-203": "Los `name` (`exitAddress`, `arrivalAddress`, `departureDate`, `departureTime`, `rentalTime`, `contactNumber`) son exactamente los que lee `popUp.php`.",
   "202": "`rentalTime`: horas de alquiler. Cada hora suma 180 puntos en la página personal.",
   "205": "Botón con `name=\"enviar\"`, que `popUp.php` comprueba con `isset($_POST['enviar'])`."
  },
  "relaciones": [
   {
    "archivo": "assets/php/popUp.php",
    "x": "recibe y guarda la solicitud en `carrentalservice`."
   },
   {
    "archivo": "assets/php/personalPageUser.php",
    "x": "suma las horas de `carrentalservice` para calcular puntos."
   }
  ]
 },
 {
  "id": "header-css",
  "archivo": "assets/css/header.css",
  "desde": 1,
  "lang": "css",
  "titulo": "Estilos del menú. Como `header.css` se carga en 5 páginas, un cambio aquí se ve en todas.",
  "codigo": "/*------------- BARRA DE NAVEGACION HEADER ----------*/\n.menu-header{\n    width: 100%;\n}\n.contenedor,.menu-nav{\n    width: 100%;\n    height: 80px;\n    background:rgba(11,24,44);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.menu-bar{\n    display: none;\n}\n.menu-ul{\n    overflow: hidden;\n    list-style:none;\n    margin: 0;\n}\n\n.menu-li{\n    float: left; \n    padding-right: 60px;\n}\n.menu-a{\n    color: #fff;\n    padding: 20px;\n    display: block;\n    text-decoration: none;\n    font-family: sans-serif;\n}\nheader nav ul li i{\n    margin-right: 10px;\n}\n.menu-a:hover{\n    background: rgb(18, 40, 73);\n}",
  "redactado": false,
  "lineas": {
   "1": "Comentario CSS: `/* ... */`.",
   "2-4": "Selector de **clase** `.menu-header` (con punto). Ocupa todo el ancho (`width: 100%`).",
   "5-12": "Dos selectores a la vez separados por coma: `.contenedor` y `.menu-nav`. Altura de 80px, fondo azul muy oscuro `rgba(11,24,44)` y `display: flex` para alinear el contenido al centro.",
   "13-15": "`.menu-bar` (el botón ☰) está oculto en computador con `display: none`.",
   "22-25": "Cada opción del menú flota a la izquierda (`float: left`) con espacio a la derecha.",
   "26-32": "Los enlaces: letra blanca (`#fff`), relleno (`padding`) de 20px y sin subrayado (`text-decoration: none`).",
   "36-38": "`:hover` = “cuando el mouse está encima”: cambia el fondo a otro azul."
  },
  "relaciones": [
   {
    "archivo": "inicio.html, nosotros.html, transporteAbierto.html, inicio.php, transporte.php",
    "x": "cargan esta hoja con `<link rel=\"stylesheet\" href=\"assets/css/header.css\">`."
   },
   {
    "archivo": "inicio.html (líneas 17-32)",
    "x": "elementos HTML que reciben estos estilos."
   }
  ]
 },
 {
  "id": "header-css-media",
  "archivo": "assets/css/header.css",
  "desde": 39,
  "lang": "css",
  "titulo": "La parte “responsive”: reglas que solo se aplican en pantallas de 1090px o menos (tabletas y celulares).",
  "codigo": "/* -------------- Media queries --------------------*/\n@media screen and (max-width: 1090px){\n    .menu-nav{\n        position: absolute;\n        width: 100%;\n        height: auto;\n        left: -100%;\n        z-index: 100;\n        top: 67px;\n    }\n    .menu-ul{\n        padding: 0;\n        margin: 0;\n    }\n    .menu-li{\n        width: 100%;\n        display: block;\n        border-bottom:2px solid rgba(255,255,255,0.3);\n        font-weight: bold;\n        font-size: 20;\n    }\n    .menu-bar{\n        display: block;\n        width: 100%;\n        background: #CCC;\n    }\n    .menu-bar, .bt-menu{\n        margin: 0;\n        display: block;\n        padding: 10px; \n        background: rgba(11,24,44);\n        color: #FFF;\n        text-decoration: none;\n        font-weight: bold;\n        font-size: 30px;\n    }\n    .menu-bar i{\n        float:right;\n        padding-right: 15px;\n    }\n    .fas fa-bars{\n        padding-bottom: 22px;\n        text-align: center;\n\n    }\n}",
  "redactado": false,
  "lineas": {
   "40": "`@media screen and (max-width: 1090px)`: todo lo que está dentro de estas llaves aplica solo si la pantalla mide 1090px de ancho o menos.",
   "41-48": "El menú pasa a estar **fuera de la pantalla** (`left: -100%`) en posición absoluta. JavaScript lo trae a `left: 0` al tocar ☰.",
   "53-59": "Las opciones ocupan todo el ancho, una debajo de otra, con una línea separadora. `font-size: 20;` no tiene unidad (falta `px`), así que el navegador lo ignora.",
   "60-74": "El botón ☰ ahora sí se muestra (`display: block`).",
   "79-83": "`.fas fa-bars` es un selector mal escrito (significa “un elemento `fa-bars` dentro de `.fas`”): no afecta a nada. Lo correcto sería `.fas.fa-bars`."
  },
  "relaciones": [
   {
    "archivo": "assets/js/main.js",
    "x": "anima la propiedad `left` del `nav` entre `-100%` y `0`."
   }
  ]
 },
 {
  "id": "nosotros-css",
  "archivo": "assets/css/cuadrosNosotros.css",
  "desde": 20,
  "lang": "css",
  "titulo": "Estilos de los textos de Misión y Visión: buen lugar para practicar cambios visuales de bajo riesgo.",
  "codigo": ".nosotros_h1{\n    margin: 0;\n    font-size: 45px;\n    font-family: sans-serif;\n    font-weight: 100;\n    text-decoration: underline;   \n}\n@media screen and (max-width: 1186px){\n    .nosotros_h1{\n        font-size: 40px;\n    }\n}\n@media screen and (max-width: 782px){\n    .nosotros_h1{\n        font-size: 30px;\n    }\n}\ndiv.main div.nosotros div.mision div.nosotros_contenido{\n    width: 100%;\n    height: 20%;\n    margin: 50px 0;\n}\n@media screen and (max-width: 782px){\n    div.main div.nosotros div.mision div.nosotros_contenido{\n        margin: 20px 0;\n    }\n}\n\n.nosotros_p{\n    font-size: 25px;\n    font-family: sans-serif;\n    font-weight: 100;\n    text-shadow: 1px 1px gray;\n}\n@media screen and (max-width: 1186px){\n    .nosotros_p{\n        font-size: 20px;\n    }\n}\n@media screen and (max-width: 782px){\n    .nosotros_p{\n        font-size: 14px;\n    }\n}\n.nosotros_p:hover{\n    transform: scale(1.3,1.3);\n    transition: ease 2s;\n}",
  "redactado": false,
  "lineas": {
   "20-26": "`.nosotros_h1`: títulos de 45px, letra delgada (`font-weight: 100`) y subrayados.",
   "27-36": "Dos `@media`: en pantallas medianas (≤1186px) baja a 40px y en celulares (≤782px) a 30px. Así el título cabe en pantallas pequeñas.",
   "48-53": "`.nosotros_p`: párrafos de 25px con una sombra gris (`text-shadow`).",
   "54-63": "Igual que el título: tamaños más pequeños en pantallas pequeñas.",
   "64-67": "Al pasar el mouse el párrafo crece al 130% (`transform: scale(1.3,1.3)`) en 2 segundos. En celular no hay mouse, así que este efecto no se ve."
  },
  "relaciones": [
   {
    "archivo": "nosotros.html",
    "x": "única página que carga este archivo; por eso es de bajo riesgo."
   }
  ]
 },
 {
  "id": "popup-css",
  "archivo": "assets/css/popUp.css",
  "desde": 1,
  "lang": "css",
  "titulo": "Cómo se esconde y se muestra una ventana emergente: con una clase `active` que pone JavaScript.",
  "codigo": "/***** Estilos popup *****/\ndiv.overlay{\n    width: 100%;\n    height: 100vh;\n    background: rgba(0, 0, 0, 0.4);\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    visibility: hidden;\n    z-index: 100;\n}\ndiv.overlay.active{\n    visibility: visible;\n}\ndiv.overlay .popup{\n    width: 50%;\n    height: auto;\n    background: #ffffff;\n    box-shadow: 2px 0px 5px 0px rgba(0, 0, 0, 0.4);\n    border-radius: 5px;\n    padding: 10px;\n    text-align: center;\n    transition: 0.6s ease all;\n    transform: scale(0.7);\n    opacity: 0;\n    overflow: auto;\n}\ndiv.overlay .popup.active{\n    opacity: 1;\n    transform: scale(1);\n}",
  "redactado": false,
  "lineas": {
   "2-16": "`div.overlay`: fondo negro semitransparente que cubre toda la pantalla (`position: fixed`, `100vh`). Empieza **oculto**: `visibility: hidden`.",
   "17-19": "`div.overlay.active` (las dos clases a la vez): se vuelve visible. JavaScript añade `active` al hacer clic.",
   "20-32": "La caja blanca: empieza pequeña (`scale(0.7)`) y transparente (`opacity: 0`), con una transición de 0.6 s.",
   "33-36": "Con `active` crece a tamaño normal y se vuelve opaca: ese es el efecto de “aparecer”."
  },
  "relaciones": [
   {
    "archivo": "assets/js/main.js",
    "x": "añade y quita la clase `active` con `classList.add/remove`."
   },
   {
    "archivo": "transporte.php, transporteAbierto.html",
    "x": "contienen los `div.overlay` y `div.popup`."
   }
  ]
 },
 {
  "id": "transporte-id-css",
  "archivo": "assets/css/cuadrosTransporte.css",
  "desde": 88,
  "lang": "css",
  "titulo": "Un selector de **id** (`#`) que se aplica a varios elementos con el mismo id.",
  "codigo": "#main_parrafo_2{\n    position: relative;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    margin: 0;\n    color: white;\n    font-size: 20px;\n    font-family: sans-serif;\n    text-shadow: 2px 1px black;\n    overflow: hidden;\n}",
  "redactado": false,
  "lineas": {
   "88": "`#main_parrafo_2`: selector de id (con almohadilla). Debería existir **un solo** elemento con ese id, pero en `transporte.php` hay 6 y en `inicio.html` 3. El navegador aplica el estilo a todos, por eso “funciona”.",
   "90-95": "`display: flex` con `justify-content` y `align-items: center`: centra el texto horizontal y verticalmente dentro del recuadro.",
   "98-101": "Letra blanca de 20px con una sombra negra para que se lea sobre la imagen."
  },
  "relaciones": [
   {
    "archivo": "inicio.html, inicio.php, transporte.php, transporteAbierto.html",
    "x": "usan `id=\"main_parrafo_2\"` varias veces."
   }
  ]
 },
 {
  "id": "mantenimiento-style",
  "archivo": "mantenimiento.html",
  "desde": 10,
  "lang": "html",
  "titulo": "CSS escrito dentro del propio HTML con la etiqueta `<style>` (estilo interno).",
  "codigo": "<body>\n    <div class=\"container\">\n        <h1>Gestión Empresarial aún no tiene esta sección pero estamos mejorando para brindarte un mejor servicio.</h1>\n        <div class=\"container-img\">\n            <img src=\"assets/img/mantenimiento.png\" alt=\"Logo Empresa\">\n        </div>\n        <h1>Disculpa las molestias =).</h1>\n    </div>\n    <style>\n        .container{\n            width: 100%;\n            height: 100vh;\n            background: rgb(91, 97, 148) ;\n        }\n        .container h1{\n            margin: 0;\n            display: block;\n            width: 100%;\n            padding: .5em 0;\n            color: white;\n            font-family: sans-serif;\n            text-align: center;\n            text-shadow: 1px 1px 2px black;\n        }\n        .container-img{\n            width: 100%;\n            text-align: center;\n        }\n        .container-img img{\n            width: 34%;\n            height: 34%;\n        }\n    </style>\n</body>",
  "redactado": false,
  "lineas": {
   "11-17": "La página tiene un contenedor con un título, una imagen y otro título.",
   "18": "`<style>`: en lugar de un archivo `.css` aparte, los estilos están dentro del HTML. Funciona, pero solo sirve para esta página.",
   "19-23": "`.container`: ocupa toda la pantalla con un fondo morado-azulado `rgb(91, 97, 148)`.",
   "24-33": "Títulos blancos, centrados, con sombra.",
   "38-41": "La imagen ocupa el 34% del ancho."
  },
  "relaciones": [
   {
    "archivo": "assets/img/mantenimiento.png",
    "x": "imagen de la línea 14."
   },
   {
    "archivo": "inicio.html, inicio.php, transporte.php",
    "x": "enlazan o envían formularios a esta página."
   }
  ]
 },
 {
  "id": "mainjs-menu",
  "archivo": "assets/js/main.js",
  "desde": 1,
  "lang": "js",
  "titulo": "Menú hamburguesa con jQuery: una variable recuerda si el menú está abierto o cerrado.",
  "codigo": "$(document).ready(main);\nvar contenedor = 1;\nfunction main(){\n    $('.menu-bar').click(function(){\n        if(contenedor == 1){\n            $('nav').animate({\n                left: '0'\n            });\n            contenedor = 0;\n        }else{\n            contenedor = 1;\n            $('nav').animate({\n                left: '-100%'\n            });\n        }\n    });\n};",
  "redactado": false,
  "lineas": {
   "1": "`$(document).ready(main)`: “cuando la página termine de cargar, ejecuta la función `main`”. El `$` es jQuery, una librería incluida en `assets/js/jquery.js`.",
   "2": "Variable `contenedor` con valor `1`. Aquí `1` significa “menú cerrado” y `0` “menú abierto”.",
   "3": "Se declara la **función** `main`: un bloque de instrucciones con nombre que se ejecuta cuando alguien la llama.",
   "4": "`$('.menu-bar').click(function(){ ... })`: un **evento**. “Cuando hagan clic en `.menu-bar`, ejecuta esto”.",
   "5-9": "**Condición** `if`: si está cerrado (`contenedor == 1`), anima el `nav` hasta `left: 0` (entra a la pantalla) y marca que ahora está abierto.",
   "10-15": "Si no (`else`), lo marca cerrado y lo saca de la pantalla (`left: -100%`)."
  },
  "relaciones": [
   {
    "archivo": "assets/js/jquery.js",
    "x": "debe cargarse **antes** que `main.js` (así está en las páginas)."
   },
   {
    "archivo": "assets/css/header.css",
    "x": "define `.menu-bar` y la posición inicial `left: -100%` del menú en pantallas pequeñas."
   }
  ]
 },
 {
  "id": "mainjs-popups",
  "archivo": "assets/js/main.js",
  "desde": 18,
  "lang": "js",
  "titulo": "Ventanas emergentes con JavaScript puro: buscar elementos por id y añadir o quitar la clase `active`.",
  "codigo": "/******popup *************/\nvar overlay = document.getElementById('overlay'),\n    popup = document.getElementById('popup'),\n    overlay1 = document.getElementById('overlay1'),\n    popup1 = document.getElementById('popup1'),\n    cerrar = document.querySelectorAll('.btn_cerrar_popup'),\n    abrir = document.querySelectorAll('.btn_abrir_popup'),\n    trasteos = document.getElementById('trasteos'),\n    mensajeria = document.getElementById('mensajeria'),\n    pasajeros = document.getElementById('pasajeros'),\n    domicilios = document.getElementById('domicilios'),\n    alquiler = document.getElementById('alquiler'),\n    carga = document.getElementById('carga');\n\n    for(var i = 0; i< abrir.length; i++){\n            pasajeros.addEventListener('click',function(){\n                overlay.classList.add('active');\n                popup.classList.add('active');\n            });    \n            trasteos.addEventListener('click',function(){\n                overlay1.classList.add('active');\n                popup1.classList.add('active');\n            });\n            mensajeria.addEventListener('click',function(){\n                overlay2.classList.add('active');\n                popup2.classList.add('active');\n            });\n            domicilios.addEventListener('click',function(){\n                overlay3.classList.add('active');\n                popup3.classList.add('active');\n            });\n            alquiler.addEventListener('click',function(){\n                overlay4.classList.add('active');\n                popup4.classList.add('active');\n            });\n            carga.addEventListener('click',function(){\n                overlay5.classList.add('active');\n                popup5.classList.add('active');\n            });\n    }\n    for(var i = 0; i< cerrar.length; i++){\n        cerrar[i].addEventListener('click', function(){\n            overlay.classList.remove('active');\n            popup.classList.remove('active');\n            overlay1.classList.remove('active');\n            popup1.classList.remove('active');\n            overlay2.classList.remove('active');\n            popup2.classList.remove('active');\n            overlay3.classList.remove('active');\n            popup3.classList.remove('active');\n            overlay4.classList.remove('active');\n            popup4.classList.remove('active');\n            overlay5.classList.remove('active');\n            popup5.classList.remove('active');\n        });\n    }",
  "redactado": false,
  "lineas": {
   "19-30": "Se buscan elementos del HTML con `document.getElementById('...')` y `document.querySelectorAll('...')` y se guardan en variables. Esto es usar el **DOM**: la representación de la página que JavaScript puede leer y cambiar.",
   "23-24": "`querySelectorAll` devuelve **todos** los elementos con esa clase: todas las X de cerrar y todos los botones de abrir.",
   "32": "Un bucle `for` que se repite tantas veces como botones de abrir haya (6 en transporte). Como dentro no se usa `i`, cada botón termina con **6 escuchadores iguales**. Funciona, pero sobra el bucle.",
   "33-36": "`pasajeros.addEventListener('click', ...)`: al hacer clic en Pasajeros, se añade la clase `active` al fondo y a la ventana. El CSS hace el resto.",
   "41-43": "`overlay2` y `popup2` **no se declararon** con `var`. Funcionan porque el navegador crea automáticamente una variable global por cada `id` del HTML. Es frágil: mejor declararlas.",
   "58-72": "Para cada X, al hacer clic se quita `active` de **todas** las ventanas: así se cierra la que esté abierta."
  },
  "relaciones": [
   {
    "archivo": "transporte.php, transporteAbierto.html",
    "x": "contienen los `id` `pasajeros`, `trasteos`, … y `overlay`…`overlay5`."
   },
   {
    "archivo": "assets/css/popUp.css",
    "x": "muestra u oculta según la clase `active`."
   },
   {
    "archivo": "inicio.html, nosotros.html, inicio.php",
    "x": "también cargan `main.js`; como no tienen ventanas, el bucle no se ejecuta y no hay error."
   }
  ]
 },
 {
  "id": "validar-registro",
  "archivo": "assets/js/validateFormCustomer.js",
  "desde": 1,
  "lang": "js",
  "titulo": "Validación en vivo del registro: compara contraseñas y revisa el formato del correo mientras se escribe.",
  "codigo": "// CODE TO VALIDATE PASSWORD AND PASSWORD CONFIRMATION \nconst checkPassword = document.getElementById('passwordCustomer');\nconst checkPasswordConfirmation = document.getElementById('validatePasswordCustomer');\nconst validationProperty = document.getElementById('validation');\nconst validationPropertyConfirmation = document.getElementById('ValidationConfirmation');\ncheckPassword.addEventListener('keyup',(e)=>{\n    if(checkPassword.value != checkPasswordConfirmation.value){\n        validationProperty.style.display = \"block\";\n        validationPropertyConfirmation.style.display = \"block\";\n    }else if(checkPassword.value == checkPasswordConfirmation.value){\n        validationProperty.style.display = \"none\";\n        validationPropertyConfirmation.style.display = \"none\";\n    }\n});\ncheckPasswordConfirmation.addEventListener('keyup',(e)=>{\n    if(checkPassword.value != checkPasswordConfirmation.value){\n        validationProperty.style.display = \"block\";\n        validationPropertyConfirmation.style.display = \"block\";\n    }else if(checkPassword.value == checkPasswordConfirmation.value){\n        validationProperty.style.display = \"none\";\n        validationPropertyConfirmation.style.display = \"none\";\n    }\n});\n// CODE TO VALIDATE EMAIL\nconst emailCustomer = document.getElementById('emailCustomer');\nconst emailValidation = document.getElementById('emailValidation');\nemailRegex = /^[-\\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\\.){1,125}[A-Z]{2,63}$/i;\nemailCustomer.addEventListener('input',()=>{\n    if(emailRegex.test(emailCustomer.value)){\n        emailValidation.style.display = 'none';\n    }else{\n        emailValidation.style.display = 'block';\n    }\n});",
  "redactado": false,
  "lineas": {
   "2-5": "`const`: variables que no cambiarán. Guardan los dos campos de contraseña y los dos mensajes de aviso.",
   "6": "Evento `keyup`: se ejecuta cada vez que se suelta una tecla dentro del campo contraseña.",
   "7-9": "Si las contraseñas son distintas (`!=`), muestra los avisos cambiando su estilo a `display: block`.",
   "10-13": "Si son iguales (`==`), los oculta (`display: none`).",
   "15-23": "Lo mismo para el campo de confirmación (código repetido; podría ser una sola función).",
   "27": "Una **expresión regular**: un patrón que describe cómo es un correo válido (algo@algo.dominio). Le falta `const` delante.",
   "28-34": "Evento `input`: al escribir el correo, `emailRegex.test(...)` devuelve verdadero o falso, y se muestra u oculta el aviso."
  },
  "relaciones": [
   {
    "archivo": "registerCustomers.php",
    "x": "lo carga al final y contiene los `id` que usa."
   },
   {
    "archivo": "assets/css/registerUsers.css",
    "x": "`.main-form__validationNotMatch` empieza con `display: none`."
   }
  ],
  "nota": {
   "tipo": "alerta",
   "x": "Esta validación es solo **visual**: no impide enviar el formulario, y PHP tampoco compara las dos contraseñas. Toda validación importante debe repetirse en el servidor."
  }
 },
 {
  "id": "registro-validaciones",
  "archivo": "assets/php/registerUserCustomer.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Primera parte del registro: recibe los datos y hace comprobaciones en la base de datos.",
  "codigo": "<!-- Start Backend Register Customers -->\n<?php\n    //INCLUIR LIBRERIAS PARA PHPMAILER\n    use PHPMailer\\PHPMailer\\PHPMailer;\n    use PHPMailer\\PHPMailer\\Exception;\n    //FUNCION GENERAR CODIGO ALEATORIO\n    include('functions.php');\n    //LLAMADA A CONEXION BASE DE DATOS\n    include('./bd/conexion.php');\n    //REGISTRAR USUARIO\n    if(isset($_POST['registrar'])){\n        session_start();\n        //Variables BD\n        $names = mysqli_real_escape_string($conexion,$_POST['namesCustomer']);\n        $lastName = mysqli_real_escape_string($conexion,$_POST['lastNameCustomer']);\n        $identificationDocument= mysqli_real_escape_string($conexion,$_POST['identificationDocumentCustomer']);\n        $expedition = mysqli_real_escape_string($conexion, $_POST['expeditionCustomer']);\n        $number = mysqli_real_escape_string($conexion,$_POST['numberCustomer']);\n        $email = mysqli_real_escape_string($conexion,$_POST['emailCustomer']);\n        $pss = mysqli_real_escape_string($conexion,$_POST['passwordCustomer']);\n        $pass_encrypted = sha1($pss);\n        $codeCustomerFriend = mysqli_real_escape_string($conexion,$_POST['codeCustomerFriend']);\n        // code if already exist Email and CodeFriend\n        $sqlEmail = \" SELECT idUser FROM users\n        WHERE emailUser = '$email' OR identificationDocumentUser = '$identificationDocument' \";\n        $resultadoEmail = $conexion->query($sqlEmail);\n        $filas = $resultadoEmail->num_rows;\n        $sqlSponsor = \" SELECT idUser FROM users WHERE codeUserSponsor = '$codeCustomerFriend'\";\n        $resultadoSponsor = $conexion->query($sqlSponsor);\n        $filasSponsor = $resultadoSponsor->num_rows;\n        $resultadoSponsorLimit = $conexion->query(\" SELECT idUser FROM users WHERE codeUserFriend = '$codeCustomerFriend'\");\n        $filasSponsorLimit = $resultadoSponsorLimit->num_rows;\n        if ($filas > 0){\n            echo \"<script>\n                    alert('El usuario ya existe');\n                    window.location = 'registerCustomers.php';\n                </script>\";\n        }else{",
  "redactado": false,
  "lineas": {
   "7": "Incluye `functions.php`, que trae la función para generar el código de patrocinador y la función `sendMail`.",
   "9": "Incluye la conexión: a partir de aquí existe `$conexion`.",
   "11": "Solo actúa si se pulsó el botón `registrar`.",
   "14-22": "Lee cada campo del formulario (`$_POST['...']`) y lo limpia con `mysqli_real_escape_string`. Los nombres coinciden con los `name` del HTML.",
   "21": "La contraseña se guarda como hash `sha1` (débil; ver Clase 6, seguridad).",
   "24-27": "Consulta: “¿ya existe alguien con este correo **o** este documento?”. `num_rows` cuenta cuántos hay.",
   "28-30": "Consulta: “¿existe el código de patrocinador escrito?”.",
   "31-32": "Consulta: “¿cuántos referidos tiene ya ese patrocinador?”.",
   "33-37": "Si el usuario ya existe, muestra una alerta y vuelve al formulario."
  },
  "relaciones": [
   {
    "archivo": "assets/php/functions.php",
    "x": "aporta `$codeUserSponsor` y `sendMail()`."
   },
   {
    "archivo": "bd/conexion.php",
    "x": "aporta `$conexion`."
   },
   {
    "archivo": "registerCustomers.php",
    "x": "incluye este archivo en su primera línea PHP."
   },
   {
    "archivo": "tabla users",
    "x": "se consulta por `emailUser`, `identificationDocumentUser`, `codeUserSponsor` y `codeUserFriend`."
   }
  ]
 },
 {
  "id": "registro-insert",
  "archivo": "assets/php/registerUserCustomer.php",
  "desde": 39,
  "lang": "php",
  "titulo": "Segunda parte: si todo está bien, se crean dos registros (usuario y puntos) y se envía un correo.",
  "codigo": "            if($codeCustomerFriend == \"\"){\n                // code if field is empty\n                $sql = \"INSERT INTO users(rolUser,namesUser,lastNameUser,identificationDocumentUser,\n                expeditionUser,numberUser,emailUser,passwordUser,codeUserSponsor,codeUserFriend,registerDate,vipUser) \n                VALUES ('Cliente','$names','$lastName','$identificationDocument','$expedition','$number',\n                '$email','$pass_encrypted','$codeUserSponsor','$codeCustomerFriend',NOW(),'Not Promoted') \";\n                $resultadoUsuario = $conexion->query($sql);\n                // // code points\n                $sqlPoints = \"INSERT INTO userpoints(idUserPoints, serviceTaken, hoursTaken, personalPoints,\n                totalAccumulatedPoints,codeUserSponsor, codeUserFriend)\n                VALUES (1,'0','0','0','0','$codeUserSponsor','$codeCustomerFriend')\";\n                $resultadoPoints = $conexion->query($sqlPoints);\n                $sqlSession = \"SELECT * FROM users WHERE emailUser = '$email' AND passwordUser = '$pass_encrypted' \";\n                $resultadoSession = $conexion->query($sqlSession);\n                if ($resultadoUsuario > 0){\n                    $bodyMail = '<h2 style=\"color:rgb(9, 61, 139);\">Gestion Empresarial</h2>\n                    <p style=\"color:black;font-family:sans-serif;\">Cordial Saludo, te has registrado exitosamente como Usuario, a continuacion tu codigo de patrocinador es: </p>\n                    <p style=\"background:skyblue;padding:10px;text-align:center;font-weight:bold;\">'.$codeUserSponsor.'</p>';\n                    sendMail($email,$bodyMail);\n                    $rowSession = $resultadoSession->fetch_assoc();\n                    $_SESSION['id_user'] = $rowSession[\"idUser\"];\n                }else{\n                    echo \"<script>\n                    alert('Error al registrarse');\n                    window.location = 'index.php';\n                    </script>\";\n                }",
  "redactado": false,
  "lineas": {
   "39": "Caso: no escribió código de patrocinador.",
   "41-45": "`INSERT INTO users(...) VALUES (...)`: crea el usuario con rol `'Cliente'`, la fecha actual (`NOW()`) y estado `'Not Promoted'`.",
   "47-50": "Crea su fila en `userpoints` con todo en cero. **Hallazgo de la prueba local:** con MySQL en modo estricto esta consulta falla, porque la columna `spentPayPointUser` es obligatoria y no se envía.",
   "51-52": "Vuelve a buscar al usuario recién creado para conocer su `idUser`.",
   "53": "`$resultadoUsuario > 0`: compara el resultado (verdadero/falso) con un número. Funciona, pero lo claro sería `if ($resultadoUsuario)`.",
   "54-57": "Arma el cuerpo del correo con HTML y llama a `sendMail` para enviarlo.",
   "58-59": "Guarda el `idUser` en la sesión: queda con la sesión iniciada.",
   "60-65": "Si el INSERT falló, alerta “Error al registrarse”."
  },
  "relaciones": [
   {
    "archivo": "tabla users y tabla userpoints",
    "x": "reciben los INSERT."
   },
   {
    "archivo": "assets/php/functions.php",
    "x": "`sendMail()` envía el correo y redirige a `personalPage.php`."
   }
  ]
 },
 {
  "id": "functions-codigo",
  "archivo": "assets/php/functions.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Una función propia: genera el código de patrocinador aleatorio de 6 caracteres.",
  "codigo": "<?php\n    //INCLUIR LIBRERIAS PARA PHPMAILER\n    use PHPMailer\\PHPMailer\\PHPMailer;\n    use PHPMailer\\PHPMailer\\Exception;\n    //INICIO FUNCION GENERAR CODIGO ALEATORIO\n    $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';        \n    function generate_string($input, $strength = 16) {\n        $input_length = strlen($input);\n        $random_string = '';\n        for($i = 0; $i < $strength; $i++) {\n            $random_character = $input[mt_rand(0, $input_length - 1)];\n             $random_string .= $random_character;\n        }\n    return $random_string;\n    }\n    $codeUserSponsor= generate_string($permitted_chars, 6);\n    //FIN FUNCION GENERAR CODIGO ALEATORIO",
  "redactado": false,
  "lineas": {
   "3-4": "`use`: anuncia que se usarán las clases `PHPMailer` y `Exception` de la librería PHPMailer.",
   "6": "Variable con los caracteres permitidos: números, minúsculas y mayúsculas.",
   "7": "Se declara la función `generate_string` con dos **parámetros**: los caracteres (`$input`) y la longitud (`$strength`, 16 por defecto).",
   "10-13": "Un bucle `for` que repite `$strength` veces: elige un carácter al azar con `mt_rand` y lo agrega (`.=`) a la cadena.",
   "14": "`return`: devuelve el resultado a quien llamó la función.",
   "16": "Se llama la función pidiendo 6 caracteres. El resultado queda en `$codeUserSponsor`, que usa el registro. No se comprueba que el código no exista ya."
  },
  "relaciones": [
   {
    "archivo": "registerUserCustomer.php / registerUserDriver.php",
    "x": "incluyen este archivo y usan `$codeUserSponsor`."
   }
  ]
 },
 {
  "id": "functions-sendmail",
  "archivo": "assets/php/functions.php",
  "desde": 18,
  "lang": "php",
  "titulo": "Envío de correo con PHPMailer (las credenciales se ocultaron en esta plataforma).",
  "codigo": "    //INICIO FUNCION ENVIAR CORREO A USUARIOS REGISTRADOS\n    function sendMail($email,$bodyMail){\n        echo \"<script>\n        alert('Registro Exitoso');\n        </script>\";\n        require 'PHPMailer/Exception.php';\n        require 'PHPMailer/PHPMailer.php';\n        require 'PHPMailer/SMTP.php';\n        $mail = new PHPMailer(true);\n        try {\n            //Server settings\n            $email_conexion = '[correo-empresa]';\n            $pass = '[CONTRASEÑA OCULTA]';\n            $mail->SMTPDebug = 0;                \n            $mail->isSMTP();                                           \n            $mail->Host       = '[dominio-empresa]';\n             $mail->SMTPAuth   = true;                                 \n            $mail->Username   = $email_conexion; \n             $mail->Password   = $pass; \n            $mail->SMTPSecure = 'ssl' ;\n            $mail->Port       = 465 ;\n            //Recipients\n            $mail->setFrom('[correo-empresa]', 'Empresa GE'); \n            $mail->addAddress(\"{$email}\");\n            // Content Email\n            $mail->isHTML(true);   \n            $mail->CharSet = 'UTF-8';                           \n            $mail->Subject = 'Registroso Exitoso';\n            $mail->Body = $bodyMail;\n            $mail->send();\n            echo \"<script>\n            alert('Email enviado Correctamente');\n            window.location = 'personalPage.php';\n            </script>\"; //https://[dominio-empresa]\n        } catch (Exception $e) {\n             echo \"Hubo un error al enviar el mensaje: {$mail->ErrorInfo}\";\n        }\n    }//FIN FUNCION ENVIAR CORREO A USUARIOS REGISTRADOS\n",
  "redactado": true,
  "lineas": {
   "19": "Función `sendMail` con dos parámetros: el correo de destino y el cuerpo del mensaje.",
   "20-22": "Antes de enviar, imprime una alerta “Registro Exitoso”.",
   "23-25": "`require` carga los archivos de la librería PHPMailer.",
   "26": "Crea un objeto `PHPMailer`. `true` significa “si algo falla, lanza una excepción” (un error que se puede atrapar).",
   "27": "`try { ... }`: intenta hacer lo de adentro; si falla, salta al `catch` de la línea 52.",
   "29-30": "Cuenta y contraseña del servidor de correo (**ocultas aquí**). Escribirlas en el código es un riesgo.",
   "32-38": "Configuración SMTP: el protocolo para enviar correos. Servidor, autenticación, cifrado `ssl` y puerto 465.",
   "40-46": "Remitente, destinatario, formato HTML, asunto y cuerpo.",
   "47": "`send()` envía el correo.",
   "48-51": "Si se envió, alerta y redirige a `personalPage.php`.",
   "52-54": "Si falló, muestra el detalle técnico del error (mejor registrarlo en un log y mostrar un mensaje amable)."
  },
  "relaciones": [
   {
    "archivo": "assets/php/PHPMailer/*.php",
    "x": "librería externa (versión 6.2.0)."
   },
   {
    "archivo": "registerUserCustomer.php / registerUserDriver.php",
    "x": "llaman `sendMail`."
   }
  ]
 },
 {
  "id": "inicio-user",
  "archivo": "assets/php/inicioUser.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Protección de una página privada: si no hay sesión, se envía a la persona al login.",
  "codigo": "<?php\n    include('./bd/conexion.php');\n    session_start();\n    if(!isset($_SESSION['id_user'])){\n        header(\"Location: index.php\");\n    }\n    $idUser = $_SESSION['id_user'];\n\n    $sql = \"SELECT idUser, rolUser, namesUser, lastNameUser, codeUserSponsor FROM users WHERE idUser = '$idUser' \";\n    $resultado = $conexion->query($sql);\n    $row = $resultado->fetch_assoc();\n    if($row[\"rolUser\"]==\"admin\"){\n        $redirection = \"personalPageAdmin.php\";\n    }else{\n        $redirection = \"personalPage.php\";\n    }",
  "redactado": false,
  "lineas": {
   "2": "Incluye la conexión. Ojo: la ruta `./bd/conexion.php` es relativa al archivo que lo incluye (`inicio.php`, en la raíz).",
   "3": "Activa la sesión para poder leer `$_SESSION`.",
   "4-6": "Si no existe `id_user` en la sesión, redirige a `index.php`. **Falta `exit;`**: la prueba local mostró que el resto del archivo sigue ejecutándose.",
   "7": "Toma el id del usuario de la sesión.",
   "9-11": "Consulta su nombre, apellido, rol y código de patrocinador.",
   "12-16": "Calcula a qué página personal debe llevar el menú, según el rol."
  },
  "relaciones": [
   {
    "archivo": "inicio.php",
    "x": "lo incluye en la línea 2 y usa `$row` y `$redirection` en el menú."
   },
   {
    "archivo": "assets/php/transportUser.php",
    "x": "es **idéntico** (código duplicado)."
   }
  ]
 },
 {
  "id": "popup-php",
  "archivo": "assets/php/popUp.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Recorrido completo de una funcionalidad real: guardar una solicitud de alquiler.",
  "codigo": "<?php\n    use PHPMailer\\PHPMailer\\PHPMailer;\n    use PHPMailer\\PHPMailer\\Exception;\n    include('../../bd/conexion.php');\n    session_start();\n    $id_user = $_SESSION['id_user'];\n    if(isset($_POST['enviar'])){\n        $id_user = $_SESSION['id_user'];\n        $exitAddress = mysqli_real_escape_string($conexion,$_POST['exitAddress']);\n        $arrivalAddress = mysqli_real_escape_string($conexion,$_POST['arrivalAddress']);\n        $departureDate = mysqli_real_escape_string($conexion,$_POST['departureDate']);\n        $departureTime = mysqli_real_escape_string($conexion, $_POST['departureTime']);\n        $rentalTime = mysqli_real_escape_string($conexion,$_POST['rentalTime']);\n        $contactNumber = mysqli_real_escape_string($conexion,$_POST['contactNumber']);\n        $sqlRental = \"INSERT INTO carrentalservice (idUser,addressCarRentalExit,addressCarRentalFinal,dateCarRental,timeCarRentalExit,\n        hoursCarRental,contactCarRental,dateServiceTaken) VALUES ($id_user,'$exitAddress','$arrivalAddress','$departureDate',\n        '$departureTime',$rentalTime,'$contactNumber',NOW())\";\n        $resultadoRental = $conexion->query($sqlRental);\n        $sqlSession = $conexion->query(\"SELECT rolUser FROM users WHERE idUser = '$id_user'\");\n        $rowSession = $sqlSession->fetch_assoc();",
  "redactado": false,
  "lineas": {
   "4": "La ruta sube dos carpetas (`../../`) porque este archivo está en `assets/php/` y la conexión en `bd/`.",
   "5-6": "Activa la sesión y lee el id del usuario que pide el servicio. No se comprueba que haya sesión.",
   "7": "Solo actúa si llegó el botón `enviar`.",
   "9-14": "Lee los 6 campos del formulario de alquiler.",
   "15-17": "`INSERT INTO carrentalservice`: guarda la solicitud con la fecha actual. `$id_user` y `$rentalTime` van **sin comillas** dentro del SQL.",
   "18": "Ejecuta la consulta.",
   "19-20": "Consulta el rol del usuario para saber a qué página devolverlo al final."
  },
  "relaciones": [
   {
    "archivo": "transporte.php (líneas 194-206)",
    "x": "formulario que envía aquí."
   },
   {
    "archivo": "tabla carrentalservice",
    "x": "donde se guarda la solicitud."
   },
   {
    "archivo": "assets/php/personalPageUser.php",
    "x": "lee estas filas para calcular servicios y puntos."
   }
  ]
 },
 {
  "id": "popup-php-respuesta",
  "archivo": "assets/php/popUp.php",
  "desde": 51,
  "lang": "php",
  "titulo": "Final del mismo archivo: después de enviar el correo, vuelve a la página personal según el rol.",
  "codigo": "                $mail->send();\n                if($rowSession[\"rolUser\"]==\"admin\"){\n                    echo \"<script>alert('Email enviado Correctamente');\n                    window.location = '../../personalPageAdmin.php';\n                    </script>\";\n                }else{\n                    echo \"<script>alert('Email enviado Correctamente');\n                        window.location = '../../personalPage.php';\n                    </script>\";\n                }\n                \n        } catch (Exception $e) {\n            echo \"Hubo un error al enviar el mensaje: {$mail->ErrorInfo}\";\n        }\n    }else{\n        echo \"No se pudo realizar la solicitud\";\n    }",
  "redactado": false,
  "lineas": {
   "51": "Envía el correo de aviso a la empresa.",
   "52-60": "Si el rol es admin vuelve a `personalPageAdmin.php`; si no, a `personalPage.php`. Se usa una alerta de JavaScript impresa por PHP.",
   "62-64": "Si el correo falla, muestra el error. **Ojo:** la solicitud ya se guardó en la base de datos antes (línea 18).",
   "65-67": "Si alguien abre este archivo directamente sin enviar el formulario, ve “No se pudo realizar la solicitud”."
  },
  "relaciones": [
   {
    "archivo": "personalPage.php / personalPageAdmin.php",
    "x": "destinos de la redirección."
   }
  ]
 },
 {
  "id": "puntos-php",
  "archivo": "assets/php/personalPageUser.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Cálculo de puntos personales: horas de alquiler × 180.",
  "codigo": "<?php\n    include('bd/conexion.php');\n    session_start();\n    if(!isset($_SESSION['id_user'])){\n        echo \"Error, la sesion no existe\";\n    }\n    //code info user\n    $id_user = $_SESSION['id_user']; \n    $resultado = $conexion->query(\"SELECT namesUser,lastNameUser,codeUserSponsor,registerDate,vipUser \n    FROM users WHERE idUser = '$id_user'\")->fetch_assoc();\n    //code of users referred\n    $codeReferred1 = \" \";\n    $codeUserSponsor = $resultado[\"codeUserSponsor\"];\n    $resultadoCode = $conexion->query(\"SELECT idUser,namesUser,lastNameUser,codeUserSponsor,registerDate\n    FROM users WHERE codeUserFriend = '$codeUserSponsor'\");\n    \n    //Number of service taken user\n    $serviceTaken = $conexion->query(\"SELECT hoursCarRental FROM carrentalservice WHERE idUser = '$id_user'\");\n    $numServiceTaken = $serviceTaken->num_rows;\n    //code of personal points user\n    $hoursTaken=0;\n    while($rowHours = $serviceTaken->fetch_assoc()){\n        $hoursTaken = ($hoursTaken + $rowHours[\"hoursCarRental\"]);\n    }\n    $personalPoints = $hoursTaken * 180;\n",
  "redactado": false,
  "lineas": {
   "3-6": "Comprueba la sesión, pero si no existe solo imprime un mensaje y **sigue** ejecutándose.",
   "9-10": "Trae los datos del usuario y los deja en `$resultado` (una fila).",
   "13-15": "Busca a sus **referidos**: usuarios cuyo `codeUserFriend` es el código de este usuario.",
   "18-19": "Cuenta cuántos alquileres tiene el usuario (`num_rows`).",
   "21-24": "Bucle `while`: recorre cada alquiler y suma las horas.",
   "25": "Regla de negocio: **cada hora vale 180 puntos**."
  },
  "relaciones": [
   {
    "archivo": "personalPage.php / personalPageAdmin.php",
    "x": "lo incluyen y muestran `$numServiceTaken`, `$personalPoints` y `$totalPointUser`."
   },
   {
    "archivo": "tablas users, carrentalservice, userpoints",
    "x": "las tres se consultan aquí."
   }
  ]
 },
 {
  "id": "puntos-update",
  "archivo": "assets/php/personalPageUser.php",
  "desde": 59,
  "lang": "php",
  "titulo": "Cada vez que alguien **mira** su página personal, se actualiza la base de datos.",
  "codigo": "    //code for update data base\n    $sqlPointUser =  $conexion->query(\"UPDATE userpoints SET idUserPoints='$id_user',\n    serviceTaken='$numServiceTaken', personalPoints ='$personalPoints', hoursTaken='$hoursTaken',\n    totalAccumulatedPoints='$totalPointUser' WHERE codeUserSponsor ='$codeUserSponsor'\");\n?>",
  "redactado": false,
  "lineas": {
   "60-62": "`UPDATE userpoints SET ... WHERE codeUserSponsor = ...`: guarda los puntos calculados. Escribir en la base de datos solo por abrir una página es poco habitual: si dos personas cargan a la vez, o si el cálculo tiene un error, los datos cambian sin que nadie lo note."
  },
  "relaciones": [
   {
    "archivo": "tabla userpoints",
    "x": "recibe el UPDATE."
   }
  ]
 },
 {
  "id": "cerrar-sesion",
  "archivo": "bd/cerrarSesion.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Cerrar sesión en 3 instrucciones.",
  "codigo": "<?php\n    session_start();\n    session_destroy();\n    header(\"location: ../index.php\");\n?>",
  "redactado": false,
  "lineas": {
   "2": "Activa la sesión actual.",
   "3": "La destruye: el servidor “olvida” quién era.",
   "4": "Envía a la persona al login. Debería ir seguido de `exit;`."
  },
  "relaciones": [
   {
    "archivo": "inicio.php, transporte.php",
    "x": "enlace “Cerrar Sesión” del menú."
   }
  ]
 },
 {
  "id": "admin-leer",
  "archivo": "assets/php/admin/readRegister.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Panel de administración: lista solicitudes según el número `case` que llega en la dirección.",
  "codigo": "<?php\n    include('../../../bd/conexion.php');\n    session_start();\n    $case = $_GET[\"case\"];\n    switch($case){\n        case 1:\n            $sqlCase = $conexion->query(\"SELECT idUser, contactPassengerTransport FROM passengertransportservice\");\n            foreach($sqlCase as $infoService){\n                echo \"Id: \" . $infoService[\"idUser\"] . \" \" . \" N. Contacto\" . $infoService[\"contactPassengerTransport\"];\n            }\n             break;\n        case 2: \n            $sqlCase = $conexion->query(\"SELECT idUser, contactMoveService FROM moveservice\");\n            foreach($sqlCase as $infoService){\n                echo \"Id: \" . $infoService[\"idUser\"] . \" \" . \" N. Contacto\" . $infoService[\"contactMoveService\"];\n            }\n            break;",
  "redactado": false,
  "lineas": {
   "2": "Sube tres carpetas para encontrar la conexión.",
   "3": "Activa la sesión, pero **no comprueba** que haya alguien con sesión ni que sea admin. La prueba local confirmó que se puede abrir sin iniciar sesión.",
   "4": "`$_GET[\"case\"]` lee un valor de la dirección: `readRegister.php?case=1`.",
   "5": "`switch`: elige un bloque según el valor (1 = pasajeros, 2 = trasteos, …).",
   "7-10": "Consulta la tabla correspondiente y la imprime con `echo`."
  },
  "relaciones": [
   {
    "archivo": "personalPageAdmin.php (líneas 122-127)",
    "x": "botones que enlazan aquí con `case=1` a `case=6`."
   },
   {
    "archivo": "assets/php/admin/deleteRegister.php",
    "x": "enlazado desde el `case 5`."
   }
  ],
  "nota": {
   "tipo": "seguridad",
   "x": "Corregir comprobando la sesión y el rol al inicio y terminando con `exit` si no es admin. Es un cambio de alto impacto: probar en local."
  }
 },
 {
  "id": "admin-borrar",
  "archivo": "assets/php/admin/deleteRegister.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Borrado de un alquiler: el ejemplo real de DELETE en el proyecto.",
  "codigo": "<?php\n    include('../../../bd/conexion.php');\n    session_start();\n    $id = $_GET[\"id\"];\n    $sqlDelete = $conexion->query(\"DELETE FROM carrentalservice WHERE idCarRentalService = '$id' \");\n    header(\"location: ../../../personalPageAdmin.php\");\n?>",
  "redactado": false,
  "lineas": {
   "4": "Toma el `id` de la dirección (`?id=…`) **sin limpiarlo**.",
   "5": "`DELETE FROM carrentalservice WHERE idCarRentalService = ...`: borra esa fila. Sin `WHERE` borraría **todas**.",
   "6": "Vuelve al panel de administración."
  },
  "relaciones": [
   {
    "archivo": "assets/php/admin/readRegister.php",
    "x": "botón “Borrar” del `case 5`."
   }
  ],
  "nota": {
   "tipo": "seguridad",
   "x": "Sin control de sesión, sin confirmación y con el dato sin limpiar. En clase solo se estudia; nunca se prueba contra la base real."
  }
 },
 {
  "id": "referidos-get",
  "archivo": "assets/php/dataReferred.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Dato tomado de la dirección y pegado directamente en SQL: el patrón que provoca inyección SQL.",
  "codigo": "<?php\n    include(\"../../bd/conexion.php\");\n    session_start();\n    $prue = $_GET[\"pru\"];\n    $resultado_pru = $conexion->query(\"SELECT * FROM users WHERE codeUserFriend = '$prue'\");\n?>",
  "redactado": false,
  "lineas": {
   "4": "`$_GET[\"pru\"]`: el código llega en la dirección (`dataReferred.php?pru=ABC123`).",
   "5": "Se pega en la consulta sin limpiar ni preparar. La solución es una **consulta preparada** (ver ejemplo en la Clase 7)."
  },
  "relaciones": [
   {
    "archivo": "personalPage.php / personalPageAdmin.php",
    "x": "enlace de cada referido."
   }
  ]
 },
 {
  "id": "token-recuperacion",
  "archivo": "assets/php/recoveryUserPassword.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Recuperar contraseña: se genera un “token” y se guarda en la base de datos.",
  "codigo": "<?php\nuse PHPMailer\\PHPMailer\\PHPMailer;\nuse PHPMailer\\PHPMailer\\Exception;\ninclude('./bd/conexion.php');\n\nif(isset($_POST['recovery'])){\n    $emailRecovery = mysqli_real_escape_string($conexion,$_POST['emailRecovery']);\n    $sqlEmailRecovery = \"SELECT idUser, emailUser, namesUser FROM users WHERE emailUser = '$emailRecovery'\";\n    $resultadoEmailRecovery = $conexion->query($sqlEmailRecovery);\n    $filas = $resultadoEmailRecovery->num_rows;\n    if($filas == 1){\n        $tokenUser = uniqid();\n        $sqlToken = \"UPDATE users SET tokenUser = '$tokenUser' WHERE emailUser = '$emailRecovery'\";\n        $resultadoToken = $conexion->query($sqlToken);",
  "redactado": false,
  "lineas": {
   "6": "Solo actúa si se envió el formulario de recuperación.",
   "8-11": "Busca el correo; si existe exactamente una vez, continúa.",
   "12": "`uniqid()` genera un identificador basado en la hora actual. Es **predecible**; para tokens de seguridad se usa `bin2hex(random_bytes(32))`.",
   "13-14": "Guarda el token en `users.tokenUser`. Después se envía por correo un enlace a `confirmPassword.php` con el token y el correo."
  },
  "relaciones": [
   {
    "archivo": "recoveryPassword.php",
    "x": "formulario que lo incluye."
   },
   {
    "archivo": "confirmPassword.php",
    "x": "recibe el token desde el enlace del correo."
   }
  ]
 },
 {
  "id": "confirmar-password",
  "archivo": "confirmPassword.php",
  "desde": 1,
  "lang": "php",
  "titulo": "Validación del token (conceptual: se estudia la idea, no se prueba contra datos reales).",
  "codigo": "<?php\ninclude('bd/conexion.php');\n$emailUser = mysqli_real_escape_string($conexion,$_GET['emailUser']);\nif (isset($_GET['tokenUser'])){\n    $tokenUser = mysqli_real_escape_string($conexion,$_GET['tokenUser']);\n    $sqlToken = \"SELECT idUser FROM users WHERE tokenUser = '$tokenUser'\";\n    $resultadoToken = $conexion->query($sqlToken);\n    $filas = $resultadoToken->num_rows;\n    if($filas == 1){\n        \n ",
  "redactado": false,
  "lineas": {
   "3": "Toma el correo de la dirección.",
   "4-8": "Busca un usuario **por el token**, sin comprobar que ese token pertenezca al correo de la línea 3.",
   "9": "Si encontró exactamente uno, muestra el formulario de nueva contraseña. Más abajo (línea 57) se actualiza la contraseña **del correo** que venía en la dirección."
  },
  "relaciones": [
   {
    "archivo": "tabla users",
    "x": "columnas `tokenUser`, `emailUser`, `passwordUser`."
   }
  ],
  "nota": {
   "tipo": "seguridad",
   "x": "Riesgo: el token no queda ligado al correo, no caduca y no se borra tras usarse. Corrección: buscar por token **y** correo, generar el token con `random_bytes`, guardar fecha de caducidad y borrarlo al usarlo."
  }
 },
 {
  "id": "sql-cabecera",
  "archivo": "sql/tablas_gestione_gestionempresarial.sql",
  "desde": 1,
  "lang": "sql",
  "titulo": "Cabecera del volcado: dice con qué versiones se exportó la base de datos.",
  "codigo": "-- phpMyAdmin SQL Dump\n-- version 4.9.7\n-- https://www.phpmyadmin.net/\n--\n-- Servidor: localhost:3306\n-- Tiempo de generación: 02-11-2021 a las 12:51:27\n-- Versión del servidor: 5.7.36\n-- Versión de PHP: 7.3.30\n\nSET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\nSET AUTOCOMMIT = 0;\nSTART TRANSACTION;\nSET time_zone = \"+00:00\";\n\n\n/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\n/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\n/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;\n/*!40101 SET NAMES utf8mb4 */;\n\n--\n-- Base de datos: `gestione_gestionempresarial`\n--",
  "redactado": false,
  "lineas": {
   "1-3": "El archivo lo generó **phpMyAdmin** (la herramienta web para administrar MySQL que suelen ofrecer los hostings).",
   "5-8": "Servidor MySQL 5.7.36 y PHP 7.3.30: las versiones del hosting en noviembre de 2021.",
   "10-13": "Instrucciones de preparación para importar el archivo.",
   "22": "Nombre de la base: `gestione_gestionempresarial` (el mismo que en `bd/configuracion.php`)."
  },
  "relaciones": [
   {
    "archivo": "bd/configuracion.php",
    "x": "`$bd` debe coincidir con este nombre."
   }
  ],
  "nota": {
   "tipo": "alerta",
   "x": "El volcado original también contiene **datos personales reales** (nombres, documentos, correos). En esta plataforma solo se muestra la estructura. Para practicar se usa una base de prueba con datos inventados."
  }
 },
 {
  "id": "sql-users",
  "archivo": "sql/tablas_gestione_gestionempresarial.sql",
  "desde": 191,
  "lang": "sql",
  "titulo": "La tabla central: `users`.",
  "codigo": "CREATE TABLE `users` (\n  `idUser` int(11) NOT NULL,\n  `rolUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,\n  `namesUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,\n  `lastNameUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,\n  `identificationDocumentUser` varchar(100) CHARACTER SET utf8mb4 NOT NULL,\n  `expeditionUser` date NOT NULL,\n  `numberUser` varchar(10) CHARACTER SET utf8mb4 NOT NULL,\n  `emailUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,\n  `passwordUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,\n  `codeUserSponsor` varchar(6) CHARACTER SET utf8mb4 NOT NULL,\n  `codeUserFriend` varchar(6) CHARACTER SET utf8mb4 NOT NULL,\n  `tokenUser` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,\n  `registerDate` date NOT NULL,\n  `vipUser` varchar(12) COLLATE utf8_unicode_ci NOT NULL\n) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;",
  "redactado": false,
  "lineas": {
   "191": "`CREATE TABLE users`: crea una tabla llamada `users`.",
   "192": "`idUser int(11) NOT NULL`: columna numérica obligatoria. Será la **clave primaria** (se define más abajo en el archivo).",
   "193": "`rolUser`: texto de hasta 40 caracteres. Valores usados en el código: `Cliente`, `Arrendatario`, `admin`.",
   "196": "`identificationDocumentUser`: documento de identidad (dato personal sensible).",
   "200": "`passwordUser varchar(40)`: 40 caracteres es exactamente el largo de un hash `sha1`.",
   "201-202": "`codeUserSponsor` (mi código) y `codeUserFriend` (el código de quien me refirió): así se arma la red de referidos.",
   "203": "`tokenUser`: puede ser `NULL` (vacío). Se usa en la recuperación de contraseña.",
   "205": "`vipUser`: `Promoted` o `Not Promoted`; la página personal lo muestra en verde o rojo."
  },
  "relaciones": [
   {
    "archivo": "loginUser.php, registerUser*.php, inicioUser.php, personalPageUser.php, recovery*/confirmPassword.php",
    "x": "todos consultan esta tabla."
   }
  ]
 },
 {
  "id": "sql-alquiler",
  "archivo": "sql/tablas_gestione_gestionempresarial.sql",
  "desde": 31,
  "lang": "sql",
  "titulo": "Tabla de solicitudes de alquiler: la única tabla de servicios que hoy recibe datos.",
  "codigo": "CREATE TABLE `carrentalservice` (\n  `idCarRentalService` int(11) NOT NULL,\n  `idUser` int(11) NOT NULL,\n  `addressCarRentalExit` varchar(100) NOT NULL,\n  `addressCarRentalFinal` varchar(100) NOT NULL,\n  `dateCarRental` date NOT NULL,\n  `timeCarRentalExit` time NOT NULL,\n  `hoursCarRental` int(11) NOT NULL,\n  `contactCarRental` varchar(10) NOT NULL,\n  `dateServiceTaken` datetime NOT NULL\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
  "redactado": false,
  "lineas": {
   "32": "`idCarRentalService`: identificador de cada solicitud (clave primaria).",
   "33": "`idUser`: **clave foránea** hacia `users.idUser`: indica qué usuario hizo la solicitud.",
   "36-37": "Tipos de fecha (`date`) y hora (`time`).",
   "38": "`hoursCarRental int`: horas de alquiler; base del cálculo de puntos.",
   "39": "`contactCarRental varchar(10)`: teléfono como texto de 10 caracteres.",
   "40": "`dateServiceTaken datetime`: fecha y hora en que se pidió (se llena con `NOW()`)."
  },
  "relaciones": [
   {
    "archivo": "assets/php/popUp.php",
    "x": "hace el INSERT."
   },
   {
    "archivo": "assets/php/personalPageUser.php",
    "x": "hace el SELECT para sumar horas."
   },
   {
    "archivo": "assets/php/admin/readRegister.php / deleteRegister.php",
    "x": "listan y borran."
   }
  ]
 },
 {
  "id": "sql-puntos",
  "archivo": "sql/tablas_gestione_gestionempresarial.sql",
  "desde": 141,
  "lang": "sql",
  "titulo": "Tabla de puntos: se relaciona con `users` por el código de patrocinador, no por clave foránea.",
  "codigo": "CREATE TABLE `userpoints` (\n  `idUser` int(11) NOT NULL,\n  `idUserPoints` int(11) NOT NULL,\n  `serviceTaken` varchar(6) NOT NULL,\n  `hoursTaken` varchar(15) NOT NULL,\n  `personalPoints` varchar(10) NOT NULL,\n  `spentPayPointUser` varchar(15) NOT NULL,\n  `totalAccumulatedPoints` varchar(15) NOT NULL,\n  `codeUserSponsor` varchar(6) NOT NULL,\n  `codeUserFriend` varchar(6) NOT NULL\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
  "redactado": false,
  "lineas": {
   "142": "`idUser`: clave primaria con AUTO_INCREMENT. A pesar del nombre, **no** es el id del usuario.",
   "143": "`idUserPoints`: este es el que se iguala al id del usuario (el registro lo crea en 1 y la página personal lo corrige).",
   "144-148": "Contadores guardados como **texto** (`varchar`) aunque son números.",
   "147": "`spentPayPointUser NOT NULL` sin valor por defecto: por esta columna falla el registro con MySQL estricto.",
   "149-150": "`codeUserSponsor` y `codeUserFriend`: el vínculo real con `users`."
  },
  "relaciones": [
   {
    "archivo": "registerUser*.php",
    "x": "INSERT inicial."
   },
   {
    "archivo": "personalPageUser.php",
    "x": "SELECT y UPDATE."
   }
  ]
 },
 {
  "id": "sql-claves",
  "archivo": "sql/tablas_gestione_gestionempresarial.sql",
  "desde": 246,
  "lang": "sql",
  "titulo": "Claves de la tabla de alquiler.",
  "codigo": "ALTER TABLE `carrentalservice`\n  ADD PRIMARY KEY (`idCarRentalService`),\n  ADD KEY `carrentalservice_users` (`idUser`);",
  "redactado": false,
  "lineas": {
   "246": "`ALTER TABLE`: modifica una tabla que ya existe.",
   "247": "`ADD PRIMARY KEY`: `idCarRentalService` identifica cada fila de forma única; no puede repetirse.",
   "248": "`ADD KEY`: crea un índice sobre `idUser` para buscar rápido por usuario."
  },
  "relaciones": []
 },
 {
  "id": "sql-foranea",
  "archivo": "sql/tablas_gestione_gestionempresarial.sql",
  "desde": 356,
  "lang": "sql",
  "titulo": "La relación entre alquileres y usuarios.",
  "codigo": "ALTER TABLE `carrentalservice`\n  ADD CONSTRAINT `carrentalservice_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;",
  "redactado": false,
  "lineas": {
   "357": "`FOREIGN KEY (idUser) REFERENCES users (idUser)`: cada alquiler debe pertenecer a un usuario existente. `ON DELETE CASCADE`: **si se borra el usuario, se borran automáticamente sus alquileres**. Muy importante saberlo antes de borrar usuarios."
  },
  "relaciones": []
 },
 {
  "id": "publicidad-paquete",
  "archivo": "publicidad.html",
  "desde": 12,
  "lang": "html",
  "titulo": "La página de publicidad: contenido estático con un paquete y sus beneficios.",
  "codigo": "    <div class=\"contenedor\">\n        <div class=\"titulo_publicidad\">\n            <h2> OFRECEMOS SERVICIOS DE PUBLICIDAD DIGITAL DIRECCIONADA\n                Y SECTORIZADA ACORDE A TUS NECESIDADES\n            </h2>\n        </div>\n        <div class=\"info_paquete\">\n            <h3>Paquete 1 promotor independiente</h3>\n            <p>Valor = $980.000</p>\n            <p>Contiene</p>\n            <p> &nbsp; &nbsp; 1. Supervisión del Back Office con balance de puntaje personal y grupal.</p>\n            <p> &nbsp; &nbsp; 2. 20.000 impactos de paquete + 10.000 impactos de obsequio</p>\n            <p> &nbsp; &nbsp; 3. 1 Flyer Profesional</p>\n            <p> &nbsp; &nbsp; 4. Posibilidad de comisionar hasta un 36% por conformación de grupos de apoyo y crecimiento de mercado.</p>\n        </div>",
  "redactado": false,
  "lineas": {
   "13-17": "Título principal de la página dentro de un `h2`.",
   "18-26": "Bloque del paquete: un `h3` con el nombre, el valor y una lista de beneficios hecha con párrafos `<p>` y espacios `&nbsp;`. Una lista real (`<ol>` / `<li>`) sería más correcta y fácil de mantener."
  },
  "relaciones": [
   {
    "archivo": "assets/css/publicidad.css",
    "x": "estilos `.info_paquete`, `.tabla_comision`."
   },
   {
    "archivo": "inicio.html / inicio.php",
    "x": "enlazan a esta página."
   }
  ]
 },
 {
  "id": "transporte-cabecera",
  "archivo": "transporte.php",
  "desde": 1,
  "lang": "php-html",
  "titulo": "Página privada de transporte: una línea de PHP la protege y cinco hojas de estilo le dan forma.",
  "codigo": "<?php \ninclude('./assets/php/transportUser.php');\n?>\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n    <meta charset=\"UTF-8\">\n    <link rel=\"shortcut icon\" href=\"assets/img/logoindex.png\">\n    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.2/css/all.css\" integrity=\"sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr\" crossorigin=\"anonymous\">\n    <link rel=\"stylesheet\" href=\"assets/css/normalize.css\">\n    <link rel=\"stylesheet\" href=\"assets/css/header.css\">\n    <link rel=\"stylesheet\" href=\"assets/css/cuadrosTransporte.css\">\n    <link rel=\"stylesheet\" href=\"assets/css/popUp.css\">\n    <link rel=\"stylesheet\" href=\"assets/css/footer.css\">\n    <title>GE - Transporte</title>\n</head>",
  "redactado": false,
  "lineas": {
   "1-3": "Incluye `transportUser.php`: comprueba la sesión y prepara los datos del usuario para el menú.",
   "7": "`user-scalable=no` impide hacer zoom con los dedos en el celular: dificulta la lectura a personas con baja visión.",
   "11-15": "Cinco hojas de estilo, cada una para una parte: normalize (base), header (menú), cuadrosTransporte (recuadros), popUp (ventanas) y footer (pie)."
  },
  "relaciones": [
   {
    "archivo": "assets/php/transportUser.php",
    "x": "protección y datos del menú."
   },
   {
    "archivo": "assets/css/*.css",
    "x": "las 5 hojas enlazadas."
   }
  ]
 }
]);
