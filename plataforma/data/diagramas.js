/*
 * diagramas.js — Diagramas de la web de Marcos y de los conceptos del curso.
 * Tipos: "flujo" (pasos por carriles), "mapa" (grupos y conexiones),
 *        "er" (tablas y relaciones), "arbol" (texto preformateado).
 */
FA.registrarDiagramas([
  {
    id: 'mapa-sitio',
    tipo: 'mapa',
    titulo: 'Mapa de la página de Marcos (Gestión Empresarial MF)',
    descripcion: 'Qué páginas existen, para quién son y qué se puede hacer en cada una.',
    grupos: [
      { titulo: 'Parte pública (cualquier visitante)', tec: 'html', nodos: [
        { n: 'inicio.html', d: 'portada con 3 recuadros: Transporte, Espacios Publicitarios, Otros Servicios' },
        { n: 'nosotros.html', d: 'misión y visión' },
        { n: 'transporteAbierto.html', d: 'explica los 6 servicios (sin formularios)' },
        { n: 'publicidad.html', d: 'paquete de publicidad, tabla de comisiones y 2 PDF' },
        { n: 'mantenimiento.html', d: '“sección en construcción”' }
      ] },
      { titulo: 'Acceso y registro', tec: 'php', nodos: [
        { n: 'index.php', d: 'iniciar sesión (punto de entrada)' },
        { n: 'registerCustomers.php', d: 'registro como Usuario' },
        { n: 'registerDrivers.php', d: 'registro como Arrendatario' },
        { n: 'recoveryPassword.php → confirmPassword.php', d: 'recuperar contraseña por correo' }
      ] },
      { titulo: 'Parte privada (con sesión)', tec: 'php', nodos: [
        { n: 'personalPage.php', d: '“Back office”: código, puntos, referidos' },
        { n: 'inicio.php', d: 'portada con el nombre del usuario' },
        { n: 'transporte.php', d: '6 servicios con ventana emergente (solo Alquiler guarda datos)' },
        { n: 'assets/php/dataReferred.php', d: 'referidos de un referido' }
      ] },
      { titulo: 'Administración', tec: 'php', nodos: [
        { n: 'personalPageAdmin.php', d: 'igual que la personal + 6 botones' },
        { n: 'assets/php/admin/readRegister.php', d: 'lista solicitudes por tipo' },
        { n: 'assets/php/admin/deleteRegister.php', d: 'borra un alquiler' }
      ] },
      { titulo: 'Páginas legales', tec: 'html', nodos: [
        { n: 'termsCondition{Customer,Driver}.html', d: 'términos y condiciones' },
        { n: 'dataTreatmentPolicy{Customer,Driver}.html', d: 'tratamiento de datos' }
      ] }
    ],
    conexiones: [
      { de: 'index.php', a: 'inicio.html', x: 'clic en el logo' },
      { de: 'inicio.html', a: 'registerCustomers.php / registerDrivers.php / index.php', x: 'menú' },
      { de: 'index.php', a: 'personalPage.php o personalPageAdmin.php', x: 'tras iniciar sesión, según el rol' },
      { de: 'personalPage.php', a: 'transporte.php', x: 'botón “Solicite sus servicios”' },
      { de: 'transporte.php', a: 'mantenimiento.html', x: '5 de los 6 formularios' }
    ],
    leyenda: 'Naranja = archivos HTML estáticos. Morado = archivos PHP (necesitan servidor).'
  },
  {
    id: 'recorrido-visitante',
    tipo: 'flujo',
    titulo: 'Lo que puede hacer un visitante, paso a paso',
    carriles: ['persona', 'navegador', 'servidor'],
    pasos: [
      { carril: 'persona', titulo: 'Escribe la dirección de la web', flecha: 'el servidor entrega index.php' },
      { carril: 'navegador', titulo: 'Ve el login', detalle: '`index.php`', flecha: 'clic en el logo' },
      { carril: 'navegador', titulo: 'Conoce la empresa', detalle: '`inicio.html`, `nosotros.html`, `transporteAbierto.html`, `publicidad.html`', flecha: 'menú “Registro Usuarios”' },
      { carril: 'servidor', titulo: 'Se registra', detalle: 'PHP guarda en `users` y `userpoints` y envía un correo', flecha: 'queda con sesión iniciada' },
      { carril: 'navegador', titulo: 'Ve su página personal', detalle: 'código de patrocinador, puntos, referidos', flecha: '“Solicite sus servicios”' },
      { carril: 'servidor', titulo: 'Pide un alquiler de vehículo', detalle: 'se guarda y se avisa por correo a la empresa' }
    ]
  },
  {
    id: 'arbol-carpetas',
    tipo: 'arbol',
    titulo: 'Carpetas y archivos principales',
    descripcion: 'Regla práctica: lo que está en la raíz son páginas; lo que está en assets/ son recursos que esas páginas usan.',
    texto: [
      'Proyecto_GE-master/',
      '├── index.php ............ login (entrada)',
      '├── *.html ............... páginas públicas',
      '├── register*.php ........ registro',
      '├── inicio.php, transporte.php, personalPage*.php ... páginas privadas',
      '├── bd/',
      '│   ├── configuracion.php  datos de conexión  ⚠ credenciales',
      '│   ├── conexion.php ..... crea $conexion (EJE CENTRAL)',
      '│   └── cerrarSesion.php',
      '├── assets/',
      '│   ├── php/ ............. lógica del servidor (login, registro, puntos…)',
      '│   │   ├── admin/ ....... panel de administración',
      '│   │   └── PHPMailer/ ... librería para enviar correos',
      '│   ├── css/ ............. 12 hojas de estilo',
      '│   ├── js/ .............. main.js, validaciones, jquery.js',
      '│   ├── img/ ............. logo, fondos',
      '│   └── docs/ ............ PDF',
      '└── sql/ ................. volcado de la base de datos  ⚠ datos personales'
    ].join('\n')
  },
  {
    id: 'capas',
    tipo: 'mapa',
    titulo: 'Cómo se conectan HTML, CSS, JavaScript, PHP y SQL en esta web',
    descripcion: 'Cada tecnología tiene un trabajo. El navegador entiende HTML, CSS y JS; el servidor ejecuta PHP; MySQL guarda los datos.',
    grupos: [
      { titulo: 'HTML — estructura', tec: 'html', nodos: [{ n: '*.html', d: 'páginas fijas' }, { n: 'HTML dentro de *.php', d: 'PHP lo completa con datos' }] },
      { titulo: 'CSS — apariencia', tec: 'css', nodos: [{ n: 'assets/css/*.css', d: 'se enlazan con <link>' }, { n: 'style="…"', d: 'estilos en línea en algunas tablas' }] },
      { titulo: 'JavaScript — interacción', tec: 'js', nodos: [{ n: 'assets/js/main.js', d: 'menú y ventanas' }, { n: 'validateForm*.js', d: 'avisos del registro' }] },
      { titulo: 'PHP — lógica en el servidor', tec: 'php', nodos: [{ n: 'assets/php/*.php', d: 'login, registro, puntos, solicitudes' }, { n: 'bd/conexion.php', d: 'abre la conexión' }] },
      { titulo: 'SQL — datos', tec: 'sql', nodos: [{ n: 'MySQL: 8 tablas', d: '`users` es la central' }] }
    ],
    conexiones: [
      { de: 'HTML', a: 'CSS', x: '`<link rel="stylesheet" href="assets/css/…">` y atributos `class`/`id`' },
      { de: 'HTML', a: 'JavaScript', x: '`<script src="assets/js/main.js">`; JS busca elementos por `id` o `class`' },
      { de: 'HTML (formulario)', a: 'PHP', x: '`<form action="…" method="POST">`; los `name` llegan a `$_POST`' },
      { de: 'PHP', a: 'PHP', x: '`include(...)` reutiliza archivos' },
      { de: 'PHP', a: 'SQL', x: '`$conexion->query("SELECT …")`' },
      { de: 'PHP', a: 'HTML', x: '`echo` escribe datos dentro de la página antes de enviarla' }
    ]
  },
  {
    id: 'flujo-login',
    tipo: 'flujo',
    titulo: 'Recorrido de una petición: iniciar sesión',
    descripcion: 'Una **petición HTTP** es el mensaje que el navegador envía al servidor pidiendo una página o enviando un formulario.',
    pasos: [
      { carril: 'navegador', titulo: 'Pide `index.php`', detalle: 'petición GET', flecha: 'viaja por internet' },
      { carril: 'servidor', titulo: 'Ejecuta `index.php`', detalle: 'incluye `loginUser.php` → `conexion.php` → `configuracion.php`. No hay POST: solo devuelve el HTML', flecha: 'respuesta: HTML' },
      { carril: 'navegador', titulo: 'Pinta el formulario', detalle: 'aplica `estilosLogin.css`', flecha: 'la persona pulsa “Iniciar Sesión” (POST)' },
      { carril: 'servidor', titulo: '`loginUser.php` recibe `$_POST`', detalle: 'calcula `sha1(contraseña)`', flecha: 'SELECT * FROM users WHERE …' },
      { carril: 'bd', titulo: 'Busca el usuario', detalle: 'devuelve 0 o 1 fila', flecha: 'resultado' },
      { carril: 'servidor', titulo: 'Decide', detalle: 'guarda `$_SESSION[\'id_user\']` y redirige según `rolUser`', flecha: 'respuesta: “ve a personalPage.php”' },
      { carril: 'navegador', titulo: 'Pide `personalPage.php`', detalle: 'con la cookie de sesión' }
    ]
  },
  {
    id: 'flujo-alquiler',
    tipo: 'flujo',
    titulo: 'Recorrido completo: solicitar un alquiler de vehículo',
    carriles: ['navegador', 'servidor', 'bd', 'correo'],
    pasos: [
      { carril: 'navegador', titulo: 'Clic en “Alquiler de Vehículos”', detalle: '`main.js` añade la clase `active` → `popUp.css` muestra la ventana', flecha: 'llena el formulario y pulsa Enviar' },
      { carril: 'servidor', titulo: '`assets/php/popUp.php`', detalle: 'lee `$_POST` y `$_SESSION[\'id_user\']`', flecha: 'INSERT INTO carrentalservice' },
      { carril: 'bd', titulo: 'Guarda la solicitud', detalle: 'nueva fila con `idUser` y horas', flecha: 'ok' },
      { carril: 'correo', titulo: 'PHPMailer avisa a la empresa', detalle: 'si el correo falla, la fila ya quedó guardada', flecha: 'alerta + redirección' },
      { carril: 'navegador', titulo: 'Vuelve a la página personal', flecha: 'al cargarla…' },
      { carril: 'servidor', titulo: '`personalPageUser.php` recalcula puntos', detalle: 'horas × 180', flecha: 'SELECT + UPDATE userpoints' },
      { carril: 'bd', titulo: 'Actualiza `userpoints`' }
    ]
  },
  {
    id: 'flujo-registro',
    tipo: 'flujo',
    titulo: 'Recorrido del registro de un usuario',
    carriles: ['navegador', 'servidor', 'bd', 'correo'],
    pasos: [
      { carril: 'navegador', titulo: 'Llena `registerCustomers.php`', detalle: '`validateFormCustomer.js` avisa si las contraseñas no coinciden (solo aviso)', flecha: 'POST con `registrar`' },
      { carril: 'servidor', titulo: '`registerUserCustomer.php`', detalle: 'incluye `functions.php` (código aleatorio) y `conexion.php`', flecha: '3 consultas SELECT' },
      { carril: 'bd', titulo: '¿Existe el correo/documento? ¿Existe el patrocinador? ¿Cuántos referidos tiene?', flecha: 'respuestas' },
      { carril: 'servidor', titulo: 'Valida', detalle: 'usuario repetido → alerta; patrocinador inexistente → alerta; más de 4 referidos → alerta', flecha: 'INSERT users + INSERT userpoints' },
      { carril: 'bd', titulo: 'Crea las dos filas', detalle: '⚠ el segundo INSERT falla con MySQL estricto', flecha: '' },
      { carril: 'correo', titulo: 'Envía el código de patrocinador', flecha: 'redirige a personalPage.php' },
      { carril: 'navegador', titulo: 'Página personal con sesión iniciada' }
    ]
  },
  {
    id: 'dom-inicio',
    tipo: 'arbol',
    titulo: 'Estructura (árbol) de inicio.html',
    descripcion: 'Las etiquetas HTML se anidan unas dentro de otras como cajas. El navegador convierte este árbol en el **DOM**, que JavaScript puede leer y modificar.',
    texto: [
      'html',
      '├── head ............... (no se ve) título, ícono, hojas de estilo',
      '└── body',
      '    ├── header.menu-header',
      '    │   └── div.contenedor',
      '    │       ├── div.menu-bar → a.bt-menu (☰)',
      '    │       └── nav.menu-nav → ul.menu-ul → 5 × li.menu-li → a.menu-a',
      '    ├── div.main',
      '    │   ├── div.contenedor_main → 2 × div.seccion_1 → div.maintexto_1 → a → p#main_parrafo_2',
      '    │   └── div.contenedor_main_1 → div.seccion_1 → … “Otros Servicios”',
      '    ├── div.footer → redes, contacto, mapa (iframe)',
      '    ├── script jquery.js',
      '    └── script main.js'
    ].join('\n')
  },
  {
    id: 'html-css',
    tipo: 'mapa',
    titulo: 'Cómo encuentra el navegador el estilo de un elemento',
    descripcion: 'El HTML pone nombres (`class`, `id`); el CSS usa esos nombres en sus selectores.',
    grupos: [
      { titulo: 'En el HTML (nosotros.html)', tec: 'html', nodos: [
        { n: '<link href="assets/css/cuadrosNosotros.css">', d: 'carga la hoja' },
        { n: '<h1 class="nosotros_h1">Misión</h1>', d: 'elemento con clase' }] },
      { titulo: 'En el CSS (cuadrosNosotros.css)', tec: 'css', nodos: [
        { n: '.nosotros_h1 { font-size: 45px; }', d: 'regla general' },
        { n: '@media (max-width: 782px) { .nosotros_h1 { font-size: 30px; } }', d: 'regla para celular' }] },
      { titulo: 'Resultado en el navegador', tec: 'general', nodos: [
        { n: 'Computador', d: 'título de 45px' }, { n: 'Celular', d: 'título de 30px' }] }
    ],
    conexiones: [
      { de: 'class="nosotros_h1"', a: '.nosotros_h1', x: 'el punto significa “clase”' },
      { de: 'id="main_parrafo_2"', a: '#main_parrafo_2', x: 'la almohadilla significa “id”' }
    ]
  },
  {
    id: 'flujo-evento',
    tipo: 'flujo',
    titulo: 'Qué pasa cuando alguien toca “Trasteos”',
    carriles: ['persona', 'navegador'],
    pasos: [
      { carril: 'navegador', titulo: 'Al cargar la página, `main.js` se ejecuta', detalle: 'busca `#trasteos`, `#overlay1`, `#popup1` y registra un “escuchador” de clic', flecha: 'espera…' },
      { carril: 'persona', titulo: 'Toca “Trasteos”', flecha: 'evento click' },
      { carril: 'navegador', titulo: 'Se ejecuta la función del escuchador', detalle: '`overlay1.classList.add(\'active\')`', flecha: 'el DOM cambia' },
      { carril: 'navegador', titulo: 'El CSS reacciona', detalle: '`div.overlay.active { visibility: visible }` → aparece la ventana', flecha: 'la persona toca la X' },
      { carril: 'navegador', titulo: 'Se quita `active`', detalle: 'la ventana desaparece' }
    ]
  },
  {
    id: 'includes-php',
    tipo: 'arbol',
    titulo: 'Quién incluye a quién (PHP)',
    descripcion: 'Si `bd/conexion.php` falla, todas las ramas fallan: por eso es el eje central.',
    texto: [
      'index.php ─────────────── include assets/php/loginUser.php ──── include bd/conexion.php ── include configuracion.php',
      'registerCustomers.php ─── include assets/php/registerUserCustomer.php',
      '                              ├── include functions.php  (generate_string, sendMail → PHPMailer)',
      '                              └── include bd/conexion.php',
      'registerDrivers.php ───── include assets/php/registerUserDriver.php   (igual que el anterior)',
      'inicio.php ────────────── include assets/php/inicioUser.php ─── include bd/conexion.php',
      'transporte.php ────────── include assets/php/transportUser.php ─ include bd/conexion.php',
      'personalPage.php ──────── include assets/php/personalPageUser.php ─ include bd/conexion.php',
      'personalPageAdmin.php ─── include assets/php/personalPageUser.php',
      'recoveryPassword.php ──── include assets/php/recoveryUserPassword.php ─ include bd/conexion.php',
      '',
      'Archivos que se abren directamente (formularios o enlaces):',
      'assets/php/popUp.php, assets/php/dataReferred.php, assets/php/admin/*.php ── include ../../bd/conexion.php',
      'confirmPassword.php ── include bd/conexion.php'
    ].join('\n')
  },
  {
    id: 'er-bd',
    tipo: 'er',
    titulo: 'Base de datos `gestione_gestionempresarial`',
    descripcion: '8 tablas. `users` es el centro: las 6 tablas de servicios apuntan a ella con una clave foránea.',
    tablas: [
      { nombre: 'users', central: true, columnas: [['idUser', 'int', 'pk'], ['rolUser', 'varchar(40)'], ['namesUser', 'varchar(40)'], ['lastNameUser', 'varchar(40)'], ['identificationDocumentUser', 'varchar(100)'], ['emailUser', 'varchar(40)'], ['passwordUser', 'varchar(40) · sha1'], ['codeUserSponsor', 'varchar(6)'], ['codeUserFriend', 'varchar(6)'], ['tokenUser', 'varchar(50) · NULL'], ['registerDate', 'date'], ['vipUser', 'varchar(12)']] },
      { nombre: 'carrentalservice', nota: 'Única tabla de servicio que hoy recibe datos.', columnas: [['idCarRentalService', 'int', 'pk'], ['idUser', 'int', 'fk'], ['addressCarRentalExit / Final', 'varchar(100)'], ['dateCarRental', 'date'], ['timeCarRentalExit', 'time'], ['hoursCarRental', 'int'], ['contactCarRental', 'varchar(10)'], ['dateServiceTaken', 'datetime']] },
      { nombre: 'userpoints', nota: 'Unida a users por código, sin clave foránea.', columnas: [['idUser', 'int (autoincremento)', 'pk'], ['idUserPoints', 'int'], ['serviceTaken', 'varchar(6)'], ['hoursTaken', 'varchar(15)'], ['personalPoints', 'varchar(10)'], ['spentPayPointUser', 'varchar(15) · obligatorio'], ['totalAccumulatedPoints', 'varchar(15)'], ['codeUserSponsor', 'varchar(6)'], ['codeUserFriend', 'varchar(6)']] },
      { nombre: 'passengertransportservice', nota: 'Sin formulario conectado.', columnas: [['idPassengerTransportService', 'int', 'pk'], ['idUser', 'int', 'fk'], ['direcciones, fecha, hora, contacto', '']] },
      { nombre: 'moveservice', nota: 'Trasteos. Sin formulario conectado.', columnas: [['idMoveService', 'int', 'pk'], ['idUser', 'int', 'fk'], ['… typeOfTruckMoveService', 'varchar(10)']] },
      { nombre: 'messagingservice', nota: 'Mensajería. Sin formulario conectado.', columnas: [['idMessagingService', 'int', 'pk'], ['idUser', 'int', 'fk'], ['… valueMessaging, descriptionMessaging', '']] },
      { nombre: 'deliveryservice', nota: 'Domicilios. Sin formulario conectado.', columnas: [['idDeliveryService', 'int', 'pk'], ['idUser', 'int', 'fk'], ['direcciones, contacto', '']] },
      { nombre: 'freightservice', nota: 'Carga. Sin formulario conectado.', columnas: [['idFreightService', 'int', 'pk'], ['idUser', 'int', 'fk'], ['… valueFreightService, descriptionFreightService', '']] }
    ],
    relaciones: [
      { de: 'carrentalservice.idUser', a: 'users.idUser', x: 'clave foránea, ON DELETE CASCADE (borrar un usuario borra sus alquileres)' },
      { de: 'passenger…/move…/messaging…/delivery…/freightservice.idUser', a: 'users.idUser', x: 'clave foránea, ON DELETE CASCADE' },
      { de: 'users.codeUserFriend', a: 'users.codeUserSponsor', x: 'quién me refirió (sin clave foránea)' },
      { de: 'userpoints.codeUserSponsor', a: 'users.codeUserSponsor', x: 'vínculo por código (sin clave foránea)' }
    ]
  },
  {
    id: 'diagnostico',
    tipo: 'mapa',
    titulo: '¿Dónde está el problema? Guía rápida por síntoma',
    descripcion: 'Antes de tocar código, identifica en qué capa está el error.',
    grupos: [
      { titulo: 'Se ve mal (colores, tamaños, desordenado)', tec: 'css', nodos: [{ n: 'CSS', d: 'Herramientas de desarrollador (F12) → pestaña Elementos → panel Estilos' }, { n: 'Revisar', d: '¿se cargó el .css? ¿el nombre de la clase coincide?' }] },
      { titulo: 'Falta contenido, enlace roto, imagen no aparece', tec: 'html', nodos: [{ n: 'HTML', d: 'F12 → Consola y Red (error 404 = archivo no encontrado)' }, { n: 'Revisar', d: 'rutas `href`/`src`, mayúsculas/minúsculas, etiquetas sin cerrar' }] },
      { titulo: 'Un botón o menú no responde', tec: 'js', nodos: [{ n: 'JavaScript', d: 'F12 → Consola: mensajes en rojo' }, { n: 'Revisar', d: '¿existe el `id`? ¿se cargó jQuery antes de main.js?' }] },
      { titulo: 'Página en blanco, error 500, “Warning”, “Fatal error”', tec: 'php', nodos: [{ n: 'PHP', d: 'log de errores del servidor o de `php -S`' }, { n: 'Revisar', d: 'punto y coma, llaves, rutas de `include`, variables sin definir' }] },
      { titulo: 'Los datos no se guardan o no aparecen', tec: 'sql', nodos: [{ n: 'SQL', d: 'phpMyAdmin: revisar la tabla y probar la consulta' }, { n: 'Revisar', d: 'nombres de columnas, campos obligatorios, conexión' }] }
    ]
  },
  {
    id: 'cambio-seguro',
    tipo: 'flujo',
    titulo: 'Procedimiento para hacer un cambio sin dañar la web',
    carriles: ['persona', 'archivo'],
    pasos: [
      { carril: 'archivo', titulo: '1. Copia de seguridad', detalle: 'copiar la carpeta completa (y exportar la base si el cambio la toca) con fecha en el nombre', flecha: '' },
      { carril: 'persona', titulo: '2. Ubicar', detalle: '¿qué archivo, qué líneas, quién más los usa?', flecha: '' },
      { carril: 'archivo', titulo: '3. Cambiar en la copia local', detalle: 'un cambio pequeño a la vez', flecha: '' },
      { carril: 'persona', titulo: '4. Probar', detalle: 'computador y celular, consola sin errores, formularios', flecha: '¿funciona?' },
      { carril: 'persona', titulo: '5a. Sí → publicar y volver a probar en la web real', flecha: 'si algo falla en la web real…' },
      { carril: 'archivo', titulo: '5b. Restaurar', detalle: 'volver a subir el archivo de la copia de seguridad' }
    ]
  },
  {
    id: 'plan-seccion',
    tipo: 'flujo',
    titulo: 'Planificar un apartado nuevo',
    carriles: ['persona', 'archivo'],
    pasos: [
      { carril: 'persona', titulo: '¿Para qué sirve?', detalle: 'quién lo usa y qué debe lograr', flecha: '' },
      { carril: 'persona', titulo: '¿Dónde va?', detalle: 'página y posición; ¿enlace en el menú?', flecha: '' },
      { carril: 'archivo', titulo: '¿Qué archivos se tocan?', detalle: 'HTML de la página, CSS, ¿menú copiado en otras páginas?', flecha: '' },
      { carril: 'persona', titulo: '¿Necesita PHP o base de datos?', detalle: 'solo si hay que guardar, leer datos o saber quién es el usuario', flecha: '' },
      { carril: 'archivo', titulo: 'Construir pequeño, reutilizando estilos', flecha: '' },
      { carril: 'persona', titulo: 'Probar y documentar' }
    ]
  },
  {
    id: 'flujo-pago',
    tipo: 'flujo',
    titulo: 'Cómo funciona un pago con un proveedor (pasarela) — conceptual',
    descripcion: 'La tarjeta o la billetera las procesa el proveedor, no la web. La web solo crea el pedido y verifica el resultado.',
    carriles: ['navegador', 'servidor', 'pasarela', 'bd'],
    pasos: [
      { carril: 'navegador', titulo: 'La persona confirma su pedido', flecha: '' },
      { carril: 'servidor', titulo: 'Crea el pedido en estado “pendiente”', detalle: 'calcula el total en el servidor (nunca confía en el precio que manda el navegador)', flecha: 'guarda' },
      { carril: 'bd', titulo: 'pedido #123 · pendiente', flecha: '' },
      { carril: 'navegador', titulo: 'Paga en la página o widget del proveedor', detalle: 'los datos de la tarjeta van al proveedor, no a la web', flecha: '' },
      { carril: 'pasarela', titulo: 'Procesa y notifica al servidor', detalle: 'aviso firmado (webhook) con el resultado', flecha: '' },
      { carril: 'servidor', titulo: 'Verifica la notificación', detalle: 'firma, monto, moneda, referencia, que no se haya procesado antes', flecha: 'actualiza' },
      { carril: 'bd', titulo: 'pedido #123 · pagado', detalle: 'o rechazado / expirado' }
    ]
  }
]);
