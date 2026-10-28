/* Clase 2 — Arquitectura y conexión de archivos */
FA.registrarClase({
  numero: 2,
  titulo: 'Arquitectura y conexión de archivos',
  objetivoCorto: 'Carpetas, puntos de entrada y el recorrido de los datos.',
  objetivo: 'Que Marcos sepa **dónde está cada cosa** en el proyecto, cuál es el punto de entrada, cómo se conectan HTML, CSS, JavaScript, PHP y SQL, y un método para **buscar antes de modificar**.',
  resultado: 'Diagrama sencillo de arquitectura y guía de archivos.',
  previos: ['Clase 1: mapa de la página.', 'Tener la carpeta del proyecto en el computador (una copia) y un editor de código instalado (por ejemplo, Visual Studio Code).'],
  ajustes: 'La instalación de la copia local (XAMPP) se incluye aquí como ampliación de 90 minutos porque es necesaria desde la Clase 6. Si la sesión es de 60, el profesor la prepara antes con la guía de la sección Profesor.',
  plan: {
    sesion60: [
      { actividad: 'Objetivo y conexión con el mapa de la Clase 1', leccion: 'objetivo', min: 5 },
      { actividad: 'Carpetas, extensiones, punto de entrada y petición HTTP', leccion: 'explicacion', min: 12 },
      { actividad: 'Diagramas: carpetas, capas y recorrido del login', leccion: 'diagrama', min: 10 },
      { actividad: 'Código real: el eje central (`conexion.php`)', leccion: 'codigo', min: 13 },
      { actividad: 'Ejercicio guiado: buscar en el proyecto y seguir el login', leccion: 'guiado', min: 10 },
      { actividad: 'Resumen', leccion: 'resumen', min: 3 }
    ],
    flexible: 7,
    ampliacion90: [
      { actividad: 'Conceptos clave', leccion: 'conceptos', min: 5 },
      { actividad: 'Abrir la copia local en el navegador (XAMPP) y comprobar el login de prueba (ver guía del profesor)', min: 13 },
      { actividad: 'Evaluación', leccion: 'evaluacion', min: 6 },
      { actividad: 'Preguntas de comprobación', leccion: 'comprobacion', min: 6 }
    ],
    posponer: 'Si falta tiempo: evaluación y preguntas al inicio de la Clase 3; la tabla de archivos (individual) como tarea. La instalación local la puede dejar lista el profesor.'
  },

  explicacion: [
    { t: 'p', x: '**Arquitectura** es la forma en que está organizado un proyecto: qué partes tiene, qué hace cada una y cómo se comunican. Conocerla evita el error más común: cambiar algo en un lugar y romper otra cosa sin darse cuenta.' },
    { t: 'nota', tipo: 'analogia', titulo: 'Analogía: una casa', items: [
      'Los archivos de la **raíz** (`index.php`, `inicio.html`, `nosotros.html`…) son las **habitaciones**: lo que el visitante recorre.',
      'La carpeta **`assets/`** es la **bodega de materiales**: pintura (CSS), interruptores (JavaScript), cuadros (imágenes), instalaciones eléctricas (PHP de lógica).',
      'La carpeta **`bd/`** es el **contador de la luz**: conecta la casa con la red (la base de datos). Si falla, se apaga todo lo que depende de él.'
    ] },
    { t: 'h', x: 'Las extensiones dicen qué hay dentro' },
    { t: 'tabla', cabecera: ['Extensión', 'Qué contiene', 'Dónde se ejecuta', 'En la web de Marcos'], filas: [
      ['`.html`', 'Estructura y contenido', 'Navegador', '9 páginas públicas y legales'],
      ['`.css`', 'Apariencia', 'Navegador', '12 hojas en `assets/css/`'],
      ['`.js`', 'Interactividad', 'Navegador', '`main.js` y validaciones en `assets/js/`'],
      ['`.php`', 'Lógica + HTML generado', '**Servidor**', 'páginas privadas, registro, `assets/php/`, `bd/`'],
      ['`.sql`', 'Estructura y datos de la base', 'MySQL', '`sql/` (volcado; contiene datos personales)']
    ] },
    { t: 'h', x: 'Punto de entrada' },
    { t: 'p', x: 'Es el archivo que se abre primero. Cuando alguien escribe solo el dominio, el servidor busca un archivo llamado `index` (primero `index.php` o `index.html`, según su configuración). En esta web es **`index.php`: el login**. Desde ahí el logo lleva a la portada pública `inicio.html`.' },
    { t: 'h', x: 'Petición y respuesta' },
    { t: 'p', x: 'Cada vez que se abre una página o se envía un formulario, el navegador manda una **petición HTTP** al servidor y espera una **respuesta**. Hay dos tipos que veremos todo el curso:' },
    { t: 'lista', items: [
      '**GET**: pedir algo. Los datos van visibles en la dirección: `readRegister.php?case=5`.',
      '**POST**: enviar datos de un formulario sin mostrarlos en la dirección: el login usa `method="POST"`.'
    ] },
    { t: 'h', x: 'Cómo se conectan las piezas' },
    { t: 'lista', items: [
      'Un HTML **carga** CSS con `<link href="…">` y JavaScript con `<script src="…">`.',
      'Un formulario **envía** datos a PHP con `<form action="…">`; los `name` de los campos llegan a PHP.',
      'Un PHP **incluye** otro con `include(\'…\')` para reutilizar código.',
      'PHP **consulta** la base de datos con `$conexion->query("SELECT …")`.',
      'PHP **escribe** HTML con `echo` antes de enviarlo.'
    ] },
    { t: 'nota', tipo: 'hecho', titulo: 'El eje central', x: '`bd/conexion.php` lo incluyen casi todos los archivos PHP, y la tabla `users` aparece en login, registro, página personal, menú y recuperación de contraseña. Un error en cualquiera de los dos afecta a toda la parte privada.' },
    { t: 'h', x: 'Método: dónde buscar antes de modificar' },
    { t: 'lista', ordenada: true, items: [
      '**¿Qué veo?** Describe el elemento: “el título Misión”.',
      '**¿En qué página?** Mira la barra de direcciones: `nosotros.html`.',
      '**Abre ese archivo** y busca el texto con Ctrl+F.',
      '**Si no está**, busca en todo el proyecto (en VS Code: Ctrl+Shift+F). Puede venir de un `include`, de PHP o de la base de datos.',
      '**¿Qué conecta?** Mira sus `<link>`, `<script>`, `include` y `action`.',
      '**¿Quién más lo usa?** Busca el nombre del archivo en todo el proyecto. Si aparece en 5 páginas, un cambio afecta a las 5.'
    ] },
    { t: 'pregunta', q: 'Quieres cambiar el teléfono del pie de página. ¿En cuántos archivos tendrías que hacerlo?', a: 'En 5: `inicio.html`, `inicio.php`, `nosotros.html`, `transporteAbierto.html` y `transporte.php`, porque el pie está copiado en cada uno. Buscar el número en todo el proyecto lo confirma.' }
  ],

  conceptos: [
    { termino: 'Arquitectura', def: 'Organización de las partes de un proyecto y su comunicación.', ejemplo: 'Páginas en la raíz, recursos en `assets/`, conexión en `bd/`.' },
    { termino: 'Punto de entrada', def: 'El primer archivo que se ejecuta.', ejemplo: '`index.php`.' },
    { termino: 'Ruta relativa', def: 'Dirección de un archivo contada desde el archivo actual. `..` sube una carpeta.', ejemplo: '`popUp.php` usa `../../bd/conexion.php` porque está dos carpetas más adentro.' },
    { termino: 'Petición HTTP (GET / POST)', def: 'Mensaje del navegador al servidor para pedir una página o enviar datos.', ejemplo: 'El login se envía por POST.' },
    { termino: 'include', def: 'Instrucción PHP que inserta otro archivo.', ejemplo: '`index.php` incluye `loginUser.php`.' },
    { termino: 'Frontend / Backend', def: 'Lo que corre en el navegador / lo que corre en el servidor.', ejemplo: 'CSS es frontend; `loginUser.php` es backend.' }
  ],

  codigo: [
    { t: 'p', x: 'Tres archivos cortos explican toda la arquitectura del lado del servidor: el punto de entrada, la conexión y la configuración.' },
    { t: 'codigo', id: 'index-cabecera' },
    { t: 'codigo', id: 'conexion' },
    { t: 'codigo', id: 'configuracion' },
    { t: 'p', x: 'Y una página privada típica: primero una línea de PHP que la protege, después las hojas de estilo que le dan forma.' },
    { t: 'codigo', id: 'transporte-cabecera', cerrado: true }
  ],

  diagrama: [
    { t: 'diagrama', id: 'arbol-carpetas' },
    { t: 'diagrama', id: 'capas' },
    { t: 'diagrama', id: 'flujo-login' },
    { t: 'diagrama', id: 'includes-php' }
  ],

  guiado: {
    minutos: 10,
    objetivo: 'Usar el buscador del editor para encontrar dónde vive cada cosa y seguir el recorrido del login por los archivos.',
    preparacion: ['Abrir **la copia** del proyecto en Visual Studio Code (Archivo → Abrir carpeta).'],
    pasos: [
      { x: 'Busca en todo el proyecto (Ctrl+Shift+F) la palabra `Misión`.', comprobar: 'Aparece en `nosotros.html`, línea 39.' },
      { x: 'Busca `header.css`. Anota qué páginas lo cargan.', comprobar: '5 páginas: `inicio.html`, `inicio.php`, `nosotros.html`, `transporteAbierto.html`, `transporte.php`.' },
      { x: 'Abre `index.php`. En la línea 2, ¿qué archivo incluye? Ábrelo (Ctrl+clic sobre la ruta).', comprobar: '`assets/php/loginUser.php`.' },
      { x: 'En `loginUser.php`, ¿qué incluye la línea 2? Ábrelo. ¿Y ese, qué incluye?', comprobar: '`bd/conexion.php` → `configuracion.php`.' },
      { x: 'Busca `conexion.php` en todo el proyecto y cuenta los resultados.', comprobar: 'Más de 15 archivos: por eso es el eje central.' },
      { x: 'Busca `rolUser`. ¿En qué archivos se decide a dónde va el admin?', comprobar: 'Aparece en 6 archivos. Deciden la redirección `loginUser.php`, `inicioUser.php`, `transportUser.php` y `popUp.php`; en los dos `registerUser*.php` solo es el nombre de la columna del INSERT.' }
    ],
    cierre: 'Dibuja con flechas el camino `index.php → loginUser.php → conexion.php → configuracion.php → MySQL` y añádelo a tu mapa de la Clase 1.'
  },

  individual: {
    minutos: 20,
    cuando: 'Tarea',
    consigna: [
      { t: 'p', x: 'Completa una **guía de archivos** con estas columnas: *archivo · para qué sirve · quién lo usa · riesgo de tocarlo (bajo/medio/alto)*, para:' },
      { t: 'lista', items: ['`index.php`', '`nosotros.html`', '`assets/css/header.css`', '`assets/js/main.js`', '`bd/conexion.php`', '`assets/php/loginUser.php`', '`assets/php/popUp.php`', '`assets/css/cuadrosNosotros.css`'] },
      { t: 'p', x: 'Después responde: si mañana quisieras cambiar el **color del menú**, ¿qué archivo tocarías y en cuántas páginas se notaría?' }
    ],
    entregable: 'La tabla y la respuesta, escritas aquí.',
    pistas: ['Usa la búsqueda en todo el proyecto para saber “quién lo usa”.', 'Mira la tabla de riesgos de la sección Arquitectura.'],
    rubrica: ['Los 8 archivos tienen función correcta.', '“Quién lo usa” se comprobó con la búsqueda.', 'El nivel de riesgo es razonable y justificado.', 'Identifica que el color del menú está en `header.css` y afecta 5 páginas.'],
    solucion: [{ t: 'tabla', cabecera: ['Archivo', 'Función', 'Lo usan', 'Riesgo'], filas: [
      ['`index.php`', 'Login, punto de entrada', 'El servidor (entrada)', 'Medio/alto'],
      ['`nosotros.html`', 'Misión y visión', 'Menú público', 'Bajo'],
      ['`header.css`', 'Estilos del menú', '5 páginas', 'Medio'],
      ['`main.js`', 'Menú móvil y ventanas', '5 páginas', 'Medio'],
      ['`bd/conexion.php`', 'Conexión a MySQL', '+15 archivos PHP', 'Alto'],
      ['`loginUser.php`', 'Validar login', '`index.php`', 'Alto'],
      ['`popUp.php`', 'Guardar alquiler', 'formulario de `transporte.php`', 'Alto'],
      ['`cuadrosNosotros.css`', 'Estilos de Nosotros', '`nosotros.html`', 'Bajo']
    ] }]
  },

  comprobacion: [
    { q: '¿Por qué decimos que `bd/conexion.php` es el eje central?', a: 'Porque casi todos los archivos PHP lo incluyen para hablar con la base de datos; si falla, falla toda la parte privada.' },
    { q: '¿Qué diferencia hay entre GET y POST?', a: 'GET pide algo y lleva los datos visibles en la dirección; POST envía datos de un formulario sin mostrarlos en la dirección.' },
    { q: '¿Qué significa `../../` en `include(\'../../bd/conexion.php\')`?', a: 'Subir dos carpetas desde donde está el archivo (de `assets/php/` a la raíz) y entrar a `bd/`.' },
    { q: 'Antes de cambiar un archivo CSS, ¿qué deberías averiguar?', a: 'Qué páginas lo cargan, buscando su nombre en todo el proyecto, para saber hasta dónde llega el cambio.' }
  ],

  evaluacion: [
    { q: '¿Cuál es el punto de entrada de la web?', opciones: ['`inicio.html`', '`index.php`', '`bd/conexion.php`'], correcta: 1, retro: 'El servidor abre `index.php` (login) por defecto.' },
    { q: '¿Dónde se ejecuta el código PHP?', opciones: ['En el navegador', 'En el servidor', 'En la base de datos'], correcta: 1, retro: 'El navegador solo recibe el HTML resultante.' },
    { q: '¿Qué instrucción usa un HTML para cargar una hoja de estilos?', opciones: ['`<script src="…">`', '`<link rel="stylesheet" href="…">`', '`include(\'…\')`'], correcta: 1, retro: '`<script>` es para JavaScript e `include` es de PHP.' },
    { q: 'El login envía los datos con…', opciones: ['GET', 'POST', 'SQL'], correcta: 1, retro: '`<form action="index.php" method="POST">`.' },
    { q: '¿Qué archivo contiene los datos para conectarse a la base de datos?', opciones: ['`bd/configuracion.php`', '`assets/js/main.js`', '`index.php`'], correcta: 0, retro: '`conexion.php` lo incluye y crea `$conexion`.' },
    { q: 'Para saber qué páginas se afectan al cambiar `footer.css`, lo mejor es…', opciones: ['Adivinar', 'Buscar `footer.css` en todo el proyecto', 'Cambiarlo y ver qué pasa en la web real'], correcta: 1, retro: 'Buscar antes de modificar es el método de esta clase.' }
  ],

  errores: [
    { tec: 'general', sintoma: 'Al abrir `index.php` con doble clic se ve el código o se descarga el archivo', causa: 'Los `.php` necesitan un servidor que los ejecute; el doble clic solo abre el archivo.', solucion: 'Abrirlo a través de XAMPP (`http://localhost/proyecto-ge/`) o de `php -S`.' },
    { tec: 'php', sintoma: '“No Conectado” al abrir la copia local', causa: 'MySQL no está iniciado o la base `gestione_gestionempresarial` no existe.', solucion: 'Iniciar MySQL en XAMPP e importar `recursos/bd-prueba.sql` (ver guía del profesor).' },
    { tec: 'general', sintoma: 'Cambié un archivo y no pasó nada', causa: 'Se editó otra copia del proyecto (por ejemplo, el ZIP original en lugar de la carpeta de `htdocs`).', solucion: 'Confirmar en el editor la ruta completa del archivo que se está editando.' },
    { tec: 'general', sintoma: 'Busqué un texto y no aparece en ningún HTML', causa: 'Lo genera PHP o viene de la base de datos (por ejemplo, el nombre del usuario en el menú).', solucion: 'Buscar en los `.php` y, si es un dato, en la tabla correspondiente.' }
  ],

  resumen: [
    'Raíz = páginas; `assets/` = recursos; `bd/` = conexión; `sql/` = volcado de la base.',
    'HTML, CSS y JS corren en el navegador; PHP en el servidor; SQL en MySQL.',
    'El punto de entrada es `index.php`; `bd/conexion.php` y la tabla `users` son el eje central.',
    'Las piezas se conectan con `<link>`, `<script>`, `<form action>`, `include` y consultas SQL.',
    'Antes de modificar: buscar dónde está y quién más lo usa.'
  ],
  criterios: [
    'Explica qué hay en `assets/`, `bd/` y la raíz.',
    'Sigue el camino del login por los 4 archivos sin ayuda.',
    'Usa la búsqueda en todo el proyecto para encontrar un texto y un archivo.',
    'Sabe qué páginas se ven afectadas al cambiar `header.css`.',
    'La copia local abre el login (o queda agendado prepararla antes de la Clase 6).'
  ],
  tareaCasa: 'Guía de archivos (ejercicio individual).',

  guionIntro: 'La idea clave: “todo está conectado; antes de tocar, averiguo con qué”. Usa el mapa de la Clase 1 como punto de partida.',
  guion: [
    { leccion: 'explicacion', decir: 'Tu web es como una casa: las habitaciones son las páginas que ve la gente; la bodega es `assets/`; y el contador de luz es `bd/conexion.php`. Si se daña el contador, se apaga media casa.', preguntar: '¿Qué crees que pasa si se borra `header.css`?' },
    { leccion: 'diagrama', hacer: 'Con el diagrama del login, pedir a Marcos que señale en qué “carril” está cada paso: navegador, servidor o base de datos.' },
    { leccion: 'codigo', decir: 'No necesitas entender cada símbolo. Fíjate en la palabra `include`: es PHP diciendo “trae este otro archivo y pégalo aquí”.', hacer: 'Mostrar que las credenciales reales están ocultas y explicar por qué no deben estar en el código.' },
    { leccion: 'guiado', hacer: 'Marcos maneja el teclado y la búsqueda. Si se pierde, volver a preguntar: ¿en qué archivo estás y qué incluye?' },
    { leccion: 'errores', hacer: 'Si la sesión es de 90: abrir XAMPP con Marcos, iniciar Apache y MySQL y entrar con `ana@prueba.test` / `prueba123`.' },
    { leccion: 'resumen', decir: 'La regla de hoy: antes de cambiar algo, busco dónde está y quién más lo usa.' }
  ]
});
