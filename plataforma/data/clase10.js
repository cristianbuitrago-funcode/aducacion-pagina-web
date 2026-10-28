/* Clase 10 — Repaso, práctica y autonomía */
FA.registrarClase({
  numero: 10,
  titulo: 'Repaso, práctica y autonomía',
  objetivoCorto: 'Ejercicio integrador, diagnóstico, cambio y guía para seguir.',
  objetivo: 'Que Marcos demuestre que puede **explicar la arquitectura** de su web, **diagnosticar** un error sencillo, **hacer y probar un cambio**, explicar **cómo volver atrás** si algo falla, y que salga con una **guía personal** y una lista priorizada de mejoras para seguir aprendiendo.',
  resultado: 'Guía personalizada de la web y lista priorizada de mejoras.',
  previos: ['Clases 1 a 9.'],
  plan: {
    sesion60: [
      { actividad: 'Objetivo y reglas del ejercicio integrador', leccion: 'objetivo', min: 3 },
      { actividad: 'Repaso rápido: Marcos explica la arquitectura', leccion: 'explicacion', min: 7 },
      { actividad: 'Diagrama de capas sin mirar (y luego comparar)', leccion: 'diagrama', min: 5 },
      { actividad: 'Ejercicio integrador: diagnosticar, cambiar, probar y revertir', leccion: 'guiado', min: 27 },
      { actividad: 'Evaluación final', leccion: 'evaluacion', min: 8 },
      { actividad: 'Cierre y próximos pasos', leccion: 'resumen', min: 4 }
    ],
    flexible: 6,
    ampliacion90: [
      { actividad: 'Guía personal y lista priorizada de mejoras', leccion: 'individual', min: 15 },
      { actividad: 'Preguntas de comprobación (explicar con sus palabras)', leccion: 'comprobacion', min: 10 },
      { actividad: 'Repaso de errores frecuentes', leccion: 'errores', min: 5 }
    ],
    posponer: 'Si falta tiempo, la guía personal (individual) se termina como tarea y se revisa en una sesión de seguimiento.'
  },

  explicacion: [
    { t: 'p', x: 'Esta clase es de Marcos: él explica, diagnostica y cambia; el profesor observa y pregunta. Usa este repaso como guion para la explicación inicial.' },
    { t: 'h', x: 'Repaso en 10 frases' },
    { t: 'lista', ordenada: true, items: [
      'La web tiene una parte pública (`.html`), una privada (`.php`) y una de administración.',
      'El punto de entrada es `index.php`; el eje central, `bd/conexion.php` y la tabla `users`.',
      'HTML = estructura; CSS = apariencia; JavaScript = interacción; PHP = lógica en el servidor; SQL = datos.',
      'Las piezas se conectan con `<link>`, `<script>`, `<form action>`, `include` y consultas.',
      'Antes de modificar: buscar dónde está y quién más lo usa.',
      'Ciclo seguro: respaldo → cambio pequeño en local → prueba → publicar → probar → restaurar si falla.',
      'F12: Elementos (HTML/CSS), Consola (JS), Red (archivos que no cargan).',
      'Para PHP y SQL: log de errores y phpMyAdmin.',
      'Validar siempre en el servidor; nunca secretos en el código ni en JavaScript.',
      'Funciones nuevas: planear primero, reutilizar, construir pequeño.'
    ] },
    { t: 'h', x: 'Cómo volver al estado anterior' },
    { t: 'tabla', cabecera: ['Situación', 'Cómo se revierte'], filas: [
      ['Cambié un archivo HTML/CSS/JS', 'Restaurar el respaldo con fecha (o volver a subirlo al servidor).'],
      ['Cambié un PHP y la página da error 500', 'Restaurar el respaldo del PHP; revisar el log en local.'],
      ['Cambié datos y salió mal', 'Importar la exportación `.sql` hecha antes del cambio.'],
      ['No sé qué cambié', 'Comparar con la copia completa del sitio (en VS Code: clic derecho → “Comparar con seleccionado”).']
    ] },
    { t: 'nota', tipo: 'tip', titulo: 'Siguiente nivel: Git', x: '**Git** es un sistema de control de versiones: guarda el historial de cada cambio y permite volver a cualquier versión anterior. Es el siguiente paso natural después de las copias manuales. Ojo: un repositorio con la web nunca debe incluir credenciales ni el volcado de la base con datos personales.' }
  ],

  conceptos: [
    { termino: 'Diagnóstico', def: 'Encontrar la causa de un problema con método.', ejemplo: 'Reproducir → capa → pistas → código → corregir → probar.' },
    { termino: 'Revertir', def: 'Volver al estado anterior a un cambio.', ejemplo: 'Restaurar `nosotros.respaldo-….html`.' },
    { termino: 'Control de versiones (Git)', def: 'Historial de cambios que permite volver atrás.', ejemplo: 'Próximo paso de aprendizaje.' },
    { termino: 'Deuda técnica', def: 'Problemas conocidos del código que conviene corregir con el tiempo.', ejemplo: 'Credenciales en el código, SQL sin preparar, código duplicado.' }
  ],

  codigo: [
    { t: 'p', x: 'Repaso exprés: Marcos explica cada fragmento en una frase, sin abrir la explicación.' },
    { t: 'codigo', id: 'conexion', cerrado: true },
    { t: 'codigo', id: 'login-php', cerrado: true },
    { t: 'codigo', id: 'mainjs-popups', cerrado: true },
    { t: 'codigo', id: 'popup-css', cerrado: true },
    { t: 'codigo', id: 'sql-foranea', cerrado: true }
  ],

  diagrama: [
    { t: 'p', x: 'Primero Marcos dibuja en papel cómo se conectan las capas; después lo compara con estos diagramas.' },
    { t: 'diagrama', id: 'capas' },
    { t: 'diagrama', id: 'cambio-seguro' }
  ],

  guiado: {
    minutos: 27,
    objetivo: 'Ejercicio integrador en la copia local: diagnosticar un error “sembrado” por el profesor, hacer un cambio pedido, probarlo y revertirlo.',
    preparacion: [
      'El profesor, **antes de la clase y solo en la copia local**, siembra UNO de estos errores (sin decir cuál):',
      'A) En `nosotros.html`, cambiar `href="assets/css/cuadrosNosotros.css"` por `href="assets/css/cuadroNosotros.css"`.',
      'B) En `assets/js/main.js`, cambiar `getElementById(\'trasteos\')` por `getElementById(\'trasteo\')`.',
      'C) En `assets/php/loginUser.php`, borrar el `;` al final de la línea 8.',
      'Guardar un respaldo de la copia local completa antes de sembrar el error.'
    ],
    pasos: [
      { x: '**Diagnóstico** (10 min): el profesor describe el síntoma como lo diría un cliente (“Nosotros se ve feo”, “Trasteos no abre”, “no puedo iniciar sesión”). Marcos reproduce el problema.' },
      { x: 'Marcos clasifica la capa con el diagrama “¿Dónde está el problema?” y usa la herramienta adecuada (F12 Red/Consola o log de PHP).', comprobar: 'Encuentra archivo y línea.' },
      { x: 'Corrige el error y prueba que la función volvió a funcionar.' },
      { x: '**Cambio pedido** (10 min): agregar `lang="es"` y corregir el `</i>` duplicado en `inicio.html` (línea 26), o el cambio que acuerden. Antes: respaldo.', comprobar: 'La página se ve igual y la consola no muestra errores.' },
      { x: 'Probar en computador y en modo celular.' },
      { x: '**Revertir** (5 min): restaurar el respaldo del archivo cambiado y comprobar que volvió al estado anterior.' },
      { x: 'Marcos explica en voz alta qué haría si el cambio hubiera fallado en la web real.', comprobar: 'Menciona respaldo, volver a subir el archivo y probar.' }
    ],
    cierre: 'Si Marcos resolvió el diagnóstico y explicó cómo revertir, tiene las bases para mantener su web con autonomía.'
  },

  individual: {
    minutos: 15,
    consigna: [
      { t: 'p', x: 'Escribe tu **guía personal** de la web con:' },
      { t: 'lista', ordenada: true, items: [
        'Mapa de archivos principales con una frase cada uno (de memoria, luego revisa).',
        'Tu procedimiento de cambio seguro y de copia de seguridad.',
        'Tu checklist de mantenimiento mensual.',
        'La **lista priorizada de mejoras** (abajo), marcando cuáles puedes hacer solo, cuáles con ayuda y cuáles requieren un profesional.',
        'Qué quieres aprender después y cómo (rutina semanal).'
      ] },
      { t: 'tabla', cabecera: ['Prioridad', 'Mejora (de la auditoría)', 'Dificultad', 'Riesgo de tocar'], filas: [
        ['1', 'Cambiar (rotar) las contraseñas de correo y base de datos que estaban en el código y sacarlas de los archivos', 'Media', 'Alto (con quien administre el hosting)'],
        ['2', 'Proteger `assets/php/admin/*`, `personalPageAdmin.php` y `dataReferred.php` (sesión + rol + `exit`)', 'Media', 'Alto'],
        ['3', 'Añadir `exit;` después de cada redirección', 'Baja', 'Medio'],
        ['4', 'Corregir el registro con MySQL estricto (`spentPayPointUser`)', 'Baja', 'Medio'],
        ['5', 'Consultas preparadas en todo el PHP', 'Media/alta', 'Alto'],
        ['6', 'Decidir qué hacer con los 5 servicios que envían a mantenimiento (conectarlos u ocultarlos)', 'Media', 'Medio'],
        ['7', 'Sacar `sql/` del servidor público y de cualquier repositorio', 'Baja', 'Medio'],
        ['8', 'Detalles de HTML/CSS: `lang="es"`, ids repetidos, `required`, enlaces de redes, `font-size: 20;`', 'Baja', 'Bajo'],
        ['9', 'Migrar contraseñas a `password_hash`', 'Alta', 'Alto'],
        ['10', 'Unificar código duplicado (menú, pie, registro, puntos)', 'Alta', 'Medio']
      ] }
    ],
    entregable: 'La guía personal completa (puede escribirse aquí y luego pasarse a un documento propio).',
    pistas: ['Las prioridades 1 y 2 son de seguridad: van primero aunque no se vean.', 'La sección Arquitectura de esta plataforma resume la auditoría.'],
    rubrica: ['El mapa de archivos es correcto.', 'El procedimiento incluye respaldo, prueba y reversión.', 'La lista de mejoras está clasificada con criterio.', 'Tiene un plan de aprendizaje concreto (qué, cuándo, con qué recurso).']
  },

  comprobacion: [
    { q: 'Explica con tus palabras qué pasa desde que alguien pulsa “Iniciar Sesión” hasta que ve su página personal.', a: 'El formulario envía por POST a `index.php`; `loginUser.php` usa la conexión, busca el usuario en `users` con el correo y el hash de la contraseña; si existe guarda su id en la sesión y redirige según el rol a la página personal, que vuelve a consultar sus datos y puntos.' },
    { q: '¿Qué archivos tocarías para cambiar el color del menú y qué páginas se afectarían?', a: '`assets/css/header.css`; se afectarían las 5 páginas que lo cargan.' },
    { q: 'Un cliente dice que no puede pedir un trasteo. ¿Qué le responderías y qué harías?', a: 'Que ese servicio todavía no registra solicitudes (envía a mantenimiento). Opciones: ocultarlo o conectarlo con `moveservice.php` tras revisarlo, como proyecto planeado.' },
    { q: '¿Cuáles son los tres riesgos de seguridad que atenderías primero y por qué?', a: 'Credenciales en el código (rotarlas), páginas de administración sin control de acceso y consultas SQL sin preparar, porque pueden exponer o dañar datos reales.' },
    { q: '¿Cómo seguirás aprendiendo?', a: 'Respuesta personal: idealmente una rutina semanal, practicando en la copia local, con recursos como MDN (HTML/CSS/JS) y el manual de PHP, y aprendiendo Git.' }
  ],

  evaluacion: [
    { q: '¿Qué archivo es el punto de entrada de la web?', opciones: ['`index.php`', '`inicio.php`', '`main.js`'], correcta: 0, retro: 'Login; desde ahí el logo lleva a la portada pública.' },
    { q: 'Un estilo no se aplica y en F12 → Red el CSS aparece con 404. ¿Qué haces?', opciones: ['Corregir la ruta del `<link>`', 'Reiniciar MySQL', 'Cambiar el PHP'], correcta: 0, retro: 'El archivo no se encontró: es la ruta.' },
    { q: '“Cannot read properties of null” al abrir Trasteos indica…', opciones: ['que JavaScript busca un id que no existe', 'un error de SQL', 'que falta una imagen'], correcta: 0, retro: 'Revisar el `getElementById`.' },
    { q: 'Tras editar `loginUser.php` la página queda en blanco. Lo primero es…', opciones: ['revisar el log de errores y la última línea editada (o restaurar el respaldo)', 'borrar la base', 'cambiar el CSS'], correcta: 0, retro: 'Error de PHP: log + respaldo.' },
    { q: '¿Qué tabla es el centro de la base de datos?', opciones: ['`users`', '`moveservice`', '`userpoints`'], correcta: 0, retro: 'Las tablas de servicios apuntan a `users`.' },
    { q: '¿Qué orden es el correcto para un cambio?', opciones: ['Publicar → probar → respaldar', 'Respaldar → cambiar en local → probar → publicar → probar', 'Cambiar en la web real directamente'], correcta: 1, retro: 'Es el procedimiento de cambio seguro.' },
    { q: '¿Dónde debe estar la validación que protege los datos?', opciones: ['En el servidor (PHP)', 'Solo en JavaScript', 'En el CSS'], correcta: 0, retro: 'El navegador lo controla el visitante.' },
    { q: 'La venta de camisas y los pagos digitales…', opciones: ['ya están implementados', 'son ideas futuras que requieren requisitos, autorización y una fase aparte', 'se hacen solo con HTML'], correcta: 1, retro: 'Se respeta el alcance acordado.' }
  ],

  errores: [
    { tec: 'general', sintoma: 'Querer arreglar todo a la vez', causa: 'La lista de mejoras es larga.', solucion: 'Seguir la prioridad: primero seguridad, luego errores, luego estética.' },
    { tec: 'general', sintoma: 'Dejar de practicar después del curso', causa: 'Falta de rutina.', solucion: 'Una sesión corta semanal en la copia local con una mejora de la lista.' },
    { tec: 'general', sintoma: 'Publicar sin probar en celular', causa: 'Prisa.', solucion: 'El modo celular de F12 toma un minuto.' },
    { tec: 'general', sintoma: 'Compartir la carpeta del proyecto con credenciales', causa: 'No revisar antes de enviar.', solucion: 'Sacar credenciales y volcados con datos personales antes de compartir.' }
  ],

  resumen: [
    'Marcos puede explicar la arquitectura, diagnosticar por capas, cambiar con seguridad y revertir.',
    'La guía personal y la lista priorizada son el mapa para seguir.',
    'Prioridad: seguridad primero (credenciales, control de acceso, SQL), después errores funcionales, después mejoras visuales.',
    'Siguientes aprendizajes sugeridos: Git, consultas preparadas, `password_hash`, estructura para no duplicar menú y pie.',
    'Funciones nuevas (camisas, pagos): solo con requisitos definidos, autorización y fase propia.'
  ],
  criterios: [
    'Explica la arquitectura completa con sus palabras.',
    'Diagnosticó el error sembrado y lo corrigió.',
    'Hizo un cambio, lo probó en computador y celular y lo revirtió.',
    'Explica cómo recuperar el estado anterior en la web real.',
    'Tiene su guía personal y la lista priorizada de mejoras.'
  ],
  tareaCasa: 'Terminar la guía personal y elegir la primera mejora de la lista para practicar en la copia local.',

  guionIntro: 'El profesor habla poco: pregunta, observa y anota. Reconocer el progreso de Marcos desde la Clase 1.',
  guion: [
    { leccion: 'explicacion', decir: 'Hoy tú eres el profesor: explícame cómo funciona tu web como si yo no supiera nada.', hacer: 'Anotar qué partes explica bien y cuáles no, para la guía personal.' },
    { leccion: 'guiado', hacer: 'Sembrar UN error en la copia local antes de la clase. Describir el síntoma como lo diría un cliente, sin pistas técnicas.', decir: 'Imagina que te escribe un cliente: “no me deja entrar”. ¿Por dónde empiezas?' },
    { leccion: 'evaluacion', decir: 'Esta evaluación repasa todo el curso. Lo importante es que puedas explicar cada respuesta.' },
    { leccion: 'individual', decir: 'Esta guía es tuya: escríbela con tus palabras para que te sirva dentro de seis meses.' },
    { leccion: 'resumen', hacer: 'Exportar el progreso final, revisar juntos la lista de mejoras y acordar una sesión de seguimiento.' }
  ]
});
