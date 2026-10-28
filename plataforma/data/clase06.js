/* Clase 6 — PHP: lógica del servidor */
FA.registrarClase({
  numero: 6,
  titulo: 'PHP: lógica del servidor',
  objetivoCorto: 'Cómo PHP recibe formularios, reutiliza archivos y habla con la base.',
  objetivo: 'Que Marcos entienda qué es PHP y dónde se ejecuta, cómo se incluyen archivos, cómo se procesa un formulario, cómo se relaciona con la base de datos y por qué hay que validar en el servidor; y que pueda **explicar el recorrido completo de una funcionalidad real**.',
  resultado: 'Recorrido explicado de una operación PHP existente (la solicitud de alquiler).',
  previos: ['Clase 2: `include` y recorrido del login.', 'Clase 3: atributo `name` de los formularios.', 'Copia local funcionando con `recursos/bd-prueba.sql`.'],
  plan: {
    sesion60: [
      { actividad: 'Objetivo', leccion: 'objetivo', min: 3 },
      { actividad: 'Qué es PHP; variables, include, $_POST, sesión, redirección, validación', leccion: 'explicacion', min: 15 },
      { actividad: 'Código real: login, registro y alquiler', leccion: 'codigo', min: 15 },
      { actividad: 'Diagramas: registro, alquiler, includes', leccion: 'diagrama', min: 7 },
      { actividad: 'Ejercicio guiado: seguir una solicitud de alquiler de punta a punta', leccion: 'guiado', min: 12 },
      { actividad: 'Resumen', leccion: 'resumen', min: 3 }
    ],
    flexible: 5,
    ampliacion90: [
      { actividad: 'Conceptos clave', leccion: 'conceptos', min: 5 },
      { actividad: 'Ejercicio individual: añadir `exit` y validar contraseñas en el servidor (copia local)', leccion: 'individual', min: 12 },
      { actividad: 'Evaluación', leccion: 'evaluacion', min: 6 },
      { actividad: 'Errores habituales de PHP', leccion: 'errores', min: 7 }
    ],
    posponer: 'Es una clase densa. Si falta tiempo, el diagrama de includes y la evaluación pasan a la siguiente sesión (puede marcarse como “continuación” en el calendario).'
  },

  explicacion: [
    { t: 'p', x: '**PHP** es un lenguaje que se ejecuta **en el servidor**. Cuando alguien pide una página `.php`, el servidor ejecuta el código, arma el HTML (con datos de la base, el nombre del usuario, etc.) y envía **solo el resultado** al navegador.' },
    { t: 'nota', tipo: 'analogia', titulo: 'Analogía: el cocinero', x: 'PHP es el cocinero: recibe el pedido (formulario), busca ingredientes en la despensa (base de datos), prepara el plato (HTML) y lo envía a la mesa. El cliente nunca ve la receta.' },
    { t: 'h', x: 'Sintaxis básica' },
    { t: 'ejemplo', lang: 'php', codigo: "<?php                       // empieza el código PHP\n$nombre = 'Ana';            // variable: siempre con $\n$horas = 3;\n$puntos = $horas * 180;     // operación\nif ($puntos > 500) {        // condición\n    echo 'Muchos puntos';   // echo escribe en la página\n}\n?>                          <!-- termina el código PHP -->" },
    { t: 'h', x: 'Reutilizar archivos: include' },
    { t: 'p', x: '`include(\'bd/conexion.php\');` pega el contenido de otro archivo en ese punto. Así la conexión se escribe una vez y se usa en todas partes. `require` es igual, pero detiene todo si el archivo no existe.' },
    { t: 'h', x: 'Recibir un formulario' },
    { t: 'lista', ordenada: true, items: [
      'El HTML tiene `<form action="destino.php" method="POST">` y campos con `name`.',
      'PHP comprueba que llegó el formulario: `if (isset($_POST[\'registrar\']))`.',
      'Lee cada dato: `$_POST[\'namesCustomer\']`.',
      '**Valida** (¿vacío?, ¿formato correcto?, ¿ya existe?).',
      'Guarda o consulta en la base de datos.',
      'Responde: muestra un mensaje o **redirige** a otra página.'
    ] },
    { t: 'h', x: 'Sesión: recordar quién es' },
    { t: 'p', x: 'HTTP no recuerda nada entre una petición y otra. La **sesión** soluciona eso: tras el login, PHP guarda `$_SESSION[\'id_user\']`. Cada página privada llama `session_start()` y comprueba si existe ese dato. El navegador guarda una cookie con un identificador para que el servidor sepa qué sesión es suya.' },
    { t: 'h', x: 'Redirigir correctamente' },
    { t: 'ejemplo', lang: 'php', codigo: "if (!isset($_SESSION['id_user'])) {\n    header('Location: index.php');\n    exit;   // ← imprescindible: sin esto el resto del archivo se sigue ejecutando\n}" },
    { t: 'nota', tipo: 'hecho', x: 'Ningún archivo de la web de Marcos tiene `exit` después de `header("Location…")`. En la prueba local, al abrir `inicio.php` sin sesión, el servidor redirigió pero siguió ejecutando el código (y registró avisos).' },
    { t: 'h', x: 'Validar en el servidor (siempre)' },
    { t: 'lista', items: [
      'La validación del navegador (JavaScript, `required`) es una ayuda: se puede saltar.',
      'PHP debe comprobar todo lo importante: campos obligatorios, formatos, que las contraseñas coincidan, permisos (¿es admin?).',
      'Al mostrar datos del usuario en la página, se escapan con `htmlspecialchars()` para que nadie pueda inyectar HTML o JavaScript.'
    ] },
    { t: 'nota', tipo: 'seguridad', titulo: 'Riesgos que veremos en el código real', items: [
      'Contraseñas de correo escritas en el código (ocultas en esta plataforma).',
      'Páginas de administración que no comprueban sesión ni rol.',
      'Consultas SQL armadas pegando datos (se verá en la Clase 7).'
    ] }
  ],

  conceptos: [
    { termino: 'Servidor / PHP', def: 'PHP corre en el servidor y envía solo HTML al navegador.', ejemplo: 'Ctrl+U en `personalPage.php` no muestra el PHP.' },
    { termino: '$_POST', def: 'Datos enviados por un formulario con método POST.', ejemplo: '`$_POST[\'emailEverybody\']`.' },
    { termino: '$_SESSION', def: 'Datos que el servidor recuerda del visitante.', ejemplo: '`$_SESSION[\'id_user\']`.' },
    { termino: 'isset()', def: 'Pregunta si una variable existe.', ejemplo: '`isset($_POST[\'start\'])`.' },
    { termino: 'header("Location: …")', def: 'Redirige al navegador. Debe ir seguido de `exit;`.', ejemplo: 'Login → página personal.' },
    { termino: 'Validación del servidor', def: 'Comprobaciones que hace PHP antes de guardar o mostrar.', ejemplo: 'Usuario repetido, patrocinador inexistente, más de 5 referidos.' }
  ],

  codigo: [
    { t: 'p', x: 'Funcionalidad real 1 — **Iniciar sesión**:' },
    { t: 'codigo', id: 'login-php' },
    { t: 'p', x: 'Funcionalidad real 2 — **Solicitar un alquiler** (de principio a fin):' },
    { t: 'codigo', id: 'transporte-alquiler', cerrado: true },
    { t: 'codigo', id: 'popup-php' },
    { t: 'codigo', id: 'popup-php-respuesta', cerrado: true },
    { t: 'codigo', id: 'puntos-php', cerrado: true },
    { t: 'p', x: 'Funcionalidad real 3 — **Registro** (validaciones e inserción) y la función que genera el código:' },
    { t: 'codigo', id: 'registro-validaciones', cerrado: true },
    { t: 'codigo', id: 'registro-insert', cerrado: true },
    { t: 'codigo', id: 'functions-codigo', cerrado: true },
    { t: 'codigo', id: 'functions-sendmail', cerrado: true },
    { t: 'p', x: 'Protección de páginas y cierre de sesión:' },
    { t: 'codigo', id: 'inicio-user', cerrado: true },
    { t: 'codigo', id: 'cerrar-sesion', cerrado: true },
    { t: 'codigo', id: 'admin-leer', cerrado: true }
  ],

  diagrama: [
    { t: 'diagrama', id: 'flujo-alquiler' },
    { t: 'diagrama', id: 'flujo-registro' },
    { t: 'diagrama', id: 'includes-php' }
  ],

  guiado: {
    minutos: 12,
    objetivo: 'Seguir una solicitud de alquiler desde el formulario hasta la base de datos y los puntos, en la copia local.',
    preparacion: ['XAMPP con Apache y MySQL iniciados; base importada desde `recursos/bd-prueba.sql`.', 'Usar los usuarios de prueba (no registrar usuarios nuevos todavía: el registro tiene un fallo que estudiaremos en la Clase 8).'],
    pasos: [
      { x: 'Entra a la copia local con `ana@prueba.test` / `prueba123`. Anota los **puntos personales** que muestra la página.', comprobar: 'Ana tiene 1 servicio de 2 horas → 360 puntos.' },
      { x: 'Abre `transporte.php` en el editor, línea 194. ¿A qué archivo envía el formulario de alquiler y con qué método?', comprobar: '`assets/php/popUp.php`, POST.' },
      { x: 'Abre `popUp.php`. Señala: dónde lee la sesión (línea 6), dónde lee el formulario (9-14) y dónde guarda (15-18).' },
      { x: 'En el navegador, pide un alquiler de **3 horas**. Lee el mensaje que aparece.', comprobar: 'Aparece un error de correo (normal en local: no hay servidor SMTP). Pregunta: ¿se habrá guardado igual?' },
      { x: 'Abre phpMyAdmin → tabla `carrentalservice` → Examinar.', comprobar: 'Hay una fila nueva con `idUser = 2` y `hoursCarRental = 3`: se guardó antes de intentar el correo.' },
      { x: 'Vuelve a la página personal de Ana.', comprobar: 'Ahora 2 servicios y 900 puntos (5 horas × 180). El cálculo lo hizo `personalPageUser.php` al cargar la página.' },
      { x: 'Explica en voz alta el recorrido completo usando el diagrama “Recorrido completo: solicitar un alquiler”.' }
    ],
    cierre: 'Esto es exactamente el “recorrido de una funcionalidad real”: HTML (formulario) → PHP (popUp.php) → SQL (INSERT) → correo → PHP (cálculo) → HTML (página personal).'
  },

  individual: {
    minutos: 12,
    cuando: 'En la copia local',
    consigna: [
      { t: 'p', x: 'Dos mejoras pequeñas de PHP, con respaldo de cada archivo antes de tocarlo:' },
      { t: 'lista', ordenada: true, items: [
        'En `assets/php/inicioUser.php`, añade `exit;` después del `header("Location: index.php");` de la línea 5. Prueba abriendo `inicio.php` sin sesión (ventana de incógnito).',
        'Escribe con tus palabras el recorrido del **login** (qué archivo hace qué), como hicimos con el alquiler.'
      ] },
      { t: 'p', x: 'Reto opcional (con el profesor): en `registerUserCustomer.php`, comprobar en el servidor que `passwordCustomer` y `validatePasswordCustomer` coinciden antes de registrar.' }
    ],
    entregable: 'El cambio realizado, el resultado de la prueba y el recorrido del login escrito.',
    pistas: ['`exit;` va dentro de las llaves del `if`, justo después de `header(...)`.', 'Para el reto: `$_POST[\'validatePasswordCustomer\']` llega porque ese campo tiene `name` en el formulario.'],
    rubrica: ['Hizo respaldo.', 'El `exit` quedó dentro del `if` y la página sigue funcionando con sesión.', 'Sin sesión, redirige al login.', 'El recorrido del login menciona `index.php`, `loginUser.php`, `conexion.php`, la tabla `users` y la redirección por rol.'],
    solucion: [
      { t: 'ejemplo', lang: 'php', titulo: 'inicioUser.php corregido (líneas 3-7)', codigo: "session_start();\nif(!isset($_SESSION['id_user'])){\n    header(\"Location: index.php\");\n    exit;\n}" },
      { t: 'ejemplo', lang: 'php', titulo: 'Reto: validar contraseñas en el servidor (insertar antes de la línea 24 de registerUserCustomer.php)', codigo: "if ($_POST['passwordCustomer'] !== $_POST['validatePasswordCustomer']) {\n    echo \"<script>alert('Las contraseñas no coinciden'); window.location = 'registerCustomers.php';</script>\";\n    exit;\n}" }
    ]
  },

  comprobacion: [
    { q: '¿Por qué el visitante no puede ver el código PHP con Ctrl+U?', a: 'Porque PHP se ejecuta en el servidor; al navegador solo llega el HTML que generó.' },
    { q: '¿Para qué sirve `$_SESSION[\'id_user\']`?', a: 'Para que el servidor recuerde qué usuario inició sesión mientras navega por las páginas privadas.' },
    { q: 'En la prueba local el correo falló. ¿Se perdió la solicitud de alquiler? ¿Por qué?', a: 'No: `popUp.php` hace el INSERT (línea 18) antes de intentar enviar el correo.' },
    { q: '¿Por qué hay que validar en PHP aunque ya exista validación en JavaScript?', a: 'Porque la de JavaScript se puede saltar o modificar; el servidor es el único lugar que el visitante no controla.' }
  ],

  evaluacion: [
    { q: '¿Qué hace `include(\'./bd/conexion.php\');`?', opciones: ['Descarga el archivo al navegador', 'Inserta y ejecuta el contenido de ese archivo en ese punto', 'Borra la conexión'], correcta: 1, retro: 'Así se reutiliza la conexión en muchos archivos.' },
    { q: 'En el login, ¿cómo sabe PHP que se envió el formulario?', opciones: ['Con `isset($_POST["start"])`', 'Con JavaScript', 'Con `exit`'], correcta: 0, retro: '`start` es el `name` del botón.' },
    { q: 'Después de `header("Location: index.php");` debe ir…', opciones: ['`echo`', '`exit;`', '`include`'], correcta: 1, retro: 'Sin `exit` el script sigue ejecutándose.' },
    { q: '¿Qué tabla recibe la solicitud de alquiler?', opciones: ['`users`', '`carrentalservice`', '`moveservice`'], correcta: 1, retro: '`popUp.php` hace `INSERT INTO carrentalservice`.' },
    { q: '¿Qué problema tiene `assets/php/admin/readRegister.php`?', opciones: ['No comprueba que haya sesión ni que el usuario sea admin', 'Está en inglés', 'Usa CSS'], correcta: 0, retro: 'La prueba local confirmó que se puede abrir sin iniciar sesión.' },
    { q: 'Cada hora de alquiler suma…', opciones: ['100 puntos', '180 puntos', '500 puntos'], correcta: 1, retro: '`$personalPoints = $hoursTaken * 180;`' }
  ],

  errores: [
    { tec: 'php', sintoma: 'Página en blanco o error 500 tras editar un PHP', causa: 'Falta un `;`, una llave o una comilla.', solucion: 'Restaurar el respaldo o revisar la última línea editada; `php -l archivo.php` indica la línea.' },
    { tec: 'php', sintoma: '“Undefined array key …”', causa: 'Se lee un dato que no llegó.', solucion: 'Comprobar con `isset()`; revisar el `name` en el HTML.' },
    { tec: 'php', sintoma: 'Redirige pero sigue haciendo cosas', causa: 'Falta `exit;`.', solucion: '`header(...); exit;`.' },
    { tec: 'php', sintoma: '“SMTP connect() failed” en local', causa: 'No hay servidor de correo configurado.', solucion: 'Es esperado en la copia local; los datos se guardan igual.' },
    { tec: 'php', sintoma: '“Failed to open stream” en un include', causa: 'Ruta relativa incorrecta.', solucion: 'Contar carpetas: desde `assets/php/` hay que subir dos (`../../`).' }
  ],

  resumen: [
    'PHP se ejecuta en el servidor y devuelve HTML.',
    '`include` reutiliza archivos; `$_POST` trae los formularios; `$_SESSION` recuerda al usuario.',
    'Redirigir siempre con `header(...); exit;`.',
    'La validación importante va en el servidor.',
    'Recorrido del alquiler: formulario → `popUp.php` → INSERT → correo → cálculo de puntos.'
  ],
  criterios: [
    'Explica dónde se ejecuta PHP y qué recibe el navegador.',
    'Narra el recorrido completo del alquiler sin mirar el diagrama.',
    'Identifica en `loginUser.php` dónde se lee el formulario, dónde se consulta y dónde se redirige.',
    'Hizo un cambio pequeño en PHP en la copia local con respaldo y prueba.',
    'Nombra al menos dos riesgos de seguridad del código PHP actual.'
  ],
  tareaCasa: 'Escribir el recorrido del login (ejercicio individual).',

  guionIntro: 'Clase clave. Mantener la analogía del cocinero y volver siempre al diagrama del alquiler. No profundizar aún en SQL: eso es la Clase 7.',
  guion: [
    { leccion: 'explicacion', decir: 'Hasta ahora todo pasaba en tu celular o computador. PHP pasa en la cocina, en el servidor. Tú solo ves el plato terminado.', preguntar: '¿Cómo sabe la página personal que eres tú y no otra persona?' },
    { leccion: 'codigo', hacer: 'Leer `loginUser.php` por bloques: recibir → consultar → decidir. No detenerse en cada función.', decir: 'Las contraseñas de correo que estaban aquí las ocultamos: nunca deben estar en el código.' },
    { leccion: 'guiado', decir: 'Vamos a ser detectives: seguimos una solicitud desde que la escribes hasta que aparece en la base de datos.', hacer: 'Tener phpMyAdmin abierto en otra pestaña.' },
    { leccion: 'individual', hacer: 'Hacer juntos el `exit;` si es la primera vez que Marcos edita PHP.' },
    { leccion: 'errores', decir: 'Si la página queda en blanco, no pasa nada: tenemos respaldo y el error nos dice la línea.' },
    { leccion: 'resumen', preguntar: '¿Qué pasaría si `conexion.php` fallara? ¿Qué páginas dejarían de funcionar?' }
  ]
});
