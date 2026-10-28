/* Clase 9 — Planificación y creación de nuevos apartados */
FA.registrarClase({
  numero: 9,
  titulo: 'Planificación y creación de nuevos apartados',
  objetivoCorto: 'Planear una sección, reutilizar lo existente y construirla en pequeño.',
  objetivo: 'Que Marcos aprenda a **planear** una sección nueva (finalidad, ubicación, archivos, ¿necesita PHP o base de datos?) y la **construya en pequeño** reutilizando la estructura y los estilos existentes, probándola antes de pensar en publicarla.',
  resultado: 'Prototipo de un apartado acordado (sin asumir el módulo de camisas).',
  previos: ['Clases 3, 4 y 8 (HTML, CSS y procedimiento de cambio seguro).'],
  ajustes: 'El ejemplo es una sección de **Preguntas frecuentes** en `nosotros.html`: es útil para la web actual, no necesita PHP ni base de datos y reutiliza estilos existentes. La tienda de camisas no se usa como ejemplo porque no está confirmada.',
  plan: {
    sesion60: [
      { actividad: 'Objetivo', leccion: 'objetivo', min: 3 },
      { actividad: 'Cómo planear un apartado y cuándo hace falta PHP o base de datos', leccion: 'explicacion', min: 10 },
      { actividad: 'Diagrama: pasos de planificación', leccion: 'diagrama', min: 5 },
      { actividad: 'Código real a reutilizar', leccion: 'codigo', min: 7 },
      { actividad: 'Ejercicio guiado: construir “Preguntas frecuentes”', leccion: 'guiado', min: 25 },
      { actividad: 'Resumen', leccion: 'resumen', min: 3 }
    ],
    flexible: 7,
    ampliacion90: [
      { actividad: 'Conceptos clave', leccion: 'conceptos', min: 4 },
      { actividad: 'Ejercicio individual: ficha de planificación de una idea propia', leccion: 'individual', min: 16 },
      { actividad: 'Evaluación', leccion: 'evaluacion', min: 5 },
      { actividad: 'Errores frecuentes', leccion: 'errores', min: 5 }
    ],
    posponer: 'Si el ejercicio guiado no termina, se continúa al inicio de la Clase 10 (marcar la sesión como “continuación” si hace falta).'
  },

  explicacion: [
    { t: 'p', x: 'Agregar algo a una web no empieza en el código, empieza con **preguntas**. Una sección bien planeada se construye en una hora; una mal planeada puede romper otras partes.' },
    { t: 'nota', tipo: 'analogia', titulo: 'Analogía: ampliar la casa', x: 'Antes de construir una habitación nueva preguntas: ¿para qué?, ¿dónde?, ¿necesita agua y luz (PHP y base de datos) o solo paredes y pintura (HTML y CSS)? Y reutilizas los mismos materiales para que combine.' },
    { t: 'h', x: 'Las 6 preguntas de planificación' },
    { t: 'lista', ordenada: true, items: [
      '**Finalidad**: ¿qué problema resuelve? ¿para quién?',
      '**Ubicación**: ¿en qué página y en qué parte? ¿necesita enlace en el menú?',
      '**Archivos**: ¿qué HTML, CSS o JS hay que tocar? ¿el menú está copiado en varias páginas?',
      '**Reutilización**: ¿qué estructura y clases existentes sirven?',
      '**¿PHP o base de datos?** Solo si hay que guardar datos, leer datos guardados o saber quién es el usuario.',
      '**Prueba**: ¿cómo sabré que funciona y que no rompí nada?'
    ] },
    { t: 'h', x: '¿Necesita PHP o base de datos?' },
    { t: 'tabla', cabecera: ['Idea', '¿Qué necesita?', 'Por qué'], filas: [
      ['Preguntas frecuentes', 'Solo HTML + CSS', 'Es texto fijo'],
      ['Botón de WhatsApp', 'Solo HTML (+ CSS)', 'Es un enlace'],
      ['Formulario de contacto que guarde mensajes', 'HTML + PHP + una tabla nueva', 'Hay que recibir y guardar datos'],
      ['Conectar el formulario de Trasteos', 'HTML (cambiar `action`) + PHP existente (`moveservice.php`) + revisar su configuración', 'El PHP y la tabla ya existen, pero hay que revisarlos antes'],
      ['Tienda de camisas', 'HTML + CSS + JS + PHP + varias tablas + pagos', 'No confirmada: requiere definir requisitos primero']
    ] },
    { t: 'nota', tipo: 'hecho', x: 'Ejemplo de reutilización: el bloque de Misión/Visión de `nosotros.html` usa las clases `nosotros_titulo`, `nosotros_h1`, `nosotros_contenido` y `nosotros_p`. Una sección nueva con esas clases se verá igual sin escribir CSS nuevo.' },
    { t: 'h', x: 'Construir en pequeño' },
    { t: 'lista', items: ['Primero el contenido (HTML) con clases existentes.', 'Después ajustes de estilo mínimos.', 'Probar en computador y celular.', 'Solo entonces pensar en el menú o en otras páginas.', 'Documentar qué archivos cambiaron.'] }
  ],

  conceptos: [
    { termino: 'Requisito', def: 'Lo que la sección debe lograr, dicho de forma verificable.', ejemplo: '“Que un visitante sepa cómo pedir un alquiler sin llamar”.' },
    { termino: 'Prototipo', def: 'Versión pequeña para probar la idea.', ejemplo: 'Tres preguntas frecuentes en la copia local.' },
    { termino: 'Reutilizar', def: 'Usar estructura y estilos existentes en lugar de crear nuevos.', ejemplo: 'Clases `nosotros_*`.' },
    { termino: 'Ancla (#)', def: 'Enlace a una parte de la misma página mediante su `id`.', ejemplo: '`nosotros.html#preguntas`.' }
  ],

  codigo: [
    { t: 'p', x: 'Lo que vamos a reutilizar: la estructura de Nosotros y sus estilos.' },
    { t: 'codigo', id: 'nosotros-html' },
    { t: 'codigo', id: 'nosotros-css', cerrado: true },
    { t: 'p', x: 'Y una idea que **sí** necesitaría PHP: el formulario de Trasteos hoy envía a mantenimiento, aunque existe `moveservice.php`. Conectarlo es otro tipo de proyecto (requiere revisar ese PHP, que tiene un usuario de correo distinto al resto).' },
    { t: 'codigo', id: 'transporte-pasajeros', cerrado: true }
  ],

  diagrama: [{ t: 'diagrama', id: 'plan-seccion' }],

  guiado: {
    minutos: 25,
    objetivo: 'Planear y construir una sección de Preguntas frecuentes en la copia local de `nosotros.html`.',
    preparacion: ['Respaldo de `nosotros.html` y `assets/css/cuadrosNosotros.css`.', 'Marcos revisa que las respuestas sean correctas para su negocio (las de abajo salen del código actual).'],
    pasos: [
      { x: '**Planear** (5 min): responde las 6 preguntas para esta sección en el ejercicio individual o en un papel.', comprobar: 'Conclusión: solo HTML y CSS; va en `nosotros.html`, debajo de Visión; sin cambios en el menú por ahora.' },
      { x: '**HTML**: debajo del bloque Visión (antes del `</div>` de la línea 61) pega este bloque. Usa `<details>`: una etiqueta que abre y cierra sin JavaScript.', codigo: '           <div class="vision" id="preguntas">\n               <div class="nosotros_titulo">\n                   <h2 class="nosotros_h1">Preguntas frecuentes</h2>\n               </div>\n               <div class="nosotros_contenido preguntas">\n                   <details>\n                       <summary>¿Cómo solicito un alquiler de vehículo?</summary>\n                       <p>Regístrate, inicia sesión y entra a Transporte → Alquiler de Vehículos.</p>\n                   </details>\n                   <details>\n                       <summary>¿Qué es el código de patrocinador?</summary>\n                       <p>Es tu código personal: compártelo para que otras personas se registren como tus referidos (máximo 5).</p>\n                   </details>\n                   <details>\n                       <summary>¿Qué documentos necesito para registrarme como arrendatario?</summary>\n                       <p>Cédula, licencia de conducción, SOAT, revisión técnico-mecánica vigente y tarjeta de propiedad del vehículo.</p>\n                   </details>\n               </div>\n           </div>', tituloCodigo: 'Bloque nuevo (reutiliza las clases de Visión)', comprobar: 'Al recargar aparece el título con el mismo estilo de Misión y Visión, y cada pregunta se abre al tocarla.' },
      { x: '**CSS mínimo**: al final de `cuadrosNosotros.css` agrega estilos solo para `.preguntas`, para no afectar a Misión y Visión.', codigo: '.preguntas details{\n    text-align: left;\n    max-width: 700px;\n    margin: 0 auto 1em;\n    padding: .8em 1em;\n    border-radius: .5em;\n    background: rgba(255, 255, 255, .85);\n    font-family: sans-serif;\n}\n.preguntas summary{\n    cursor: pointer;\n    font-weight: bold;\n}', lang: 'css', tituloCodigo: 'Estilos nuevos', comprobar: 'Las preguntas se ven como tarjetas legibles.' },
      { x: '**Probar en celular** (F12 → modo teléfono).', comprobar: 'Las tarjetas ocupan el ancho y se leen bien.' },
      { x: '**Enlace directo**: abre `nosotros.html#preguntas`.', comprobar: 'La página baja directo a la sección (por el `id="preguntas"`).' },
      { x: '**Decidir el menú**: el menú público está copiado en 3 páginas (`inicio.html`, `nosotros.html`, `transporteAbierto.html`). ¿Vale la pena agregar un enlace? Si sí, habría que cambiar las 3.', comprobar: 'Decisión anotada (no es obligatorio hacerlo hoy).' },
      { x: '**Documentar**: archivos cambiados, qué se agregó, cómo se probó y cómo revertir (restaurar los 2 respaldos).' }
    ],
    cierre: 'No se tocó PHP ni la base de datos: la sección es de bajo riesgo. Antes de publicarla, Marcos valida los textos.'
  },

  individual: {
    minutos: 16,
    consigna: [
      { t: 'p', x: 'Elige **una idea propia** para la web (no la tienda de camisas) y completa su **ficha de planificación** respondiendo las 6 preguntas. Indica si necesita PHP o base de datos y estima su dificultad (baja / media / alta).' },
      { t: 'p', x: 'Ideas posibles: botón de WhatsApp flotante, sección de testimonios, corregir los enlaces de redes en `nosotros.html`, conectar el formulario de Trasteos (alta: requiere PHP).' }
    ],
    entregable: 'La ficha de planificación completa.',
    pistas: ['Si la idea guarda datos, necesita PHP y una tabla.', 'Busca qué páginas tendrías que tocar con la búsqueda en todo el proyecto.'],
    rubrica: ['Responde las 6 preguntas.', 'La decisión sobre PHP/BD está justificada.', 'Lista los archivos a modificar comprobándolo con la búsqueda.', 'Propone cómo probar y cómo revertir.']
  },

  comprobacion: [
    { q: '¿Por qué la sección de preguntas frecuentes no necesita PHP?', a: 'Porque es texto fijo: no guarda ni lee datos ni depende del usuario.' },
    { q: '¿Qué ganamos al reutilizar las clases `nosotros_*`?', a: 'La sección combina con el resto sin escribir CSS nuevo y el riesgo de romper otros estilos es menor.' },
    { q: 'Si quisieras agregar “Preguntas frecuentes” al menú, ¿qué tendrías en cuenta?', a: 'Que el menú está copiado en varias páginas: habría que cambiarlo en todas para que sea coherente.' },
    { q: '¿Qué necesitaría un formulario de contacto que guarde mensajes?', a: 'HTML para el formulario, PHP para recibir y validar, una tabla nueva en la base de datos y consultas preparadas.' }
  ],

  evaluacion: [
    { q: '¿Cuál es el primer paso para crear un apartado nuevo?', opciones: ['Escribir CSS', 'Definir su finalidad y para quién es', 'Crear una tabla'], correcta: 1, retro: 'Planear antes de programar.' },
    { q: '¿Qué idea necesita base de datos?', opciones: ['Botón de WhatsApp', 'Formulario de contacto que guarde mensajes', 'Preguntas frecuentes'], correcta: 1, retro: 'Guardar datos requiere PHP y una tabla.' },
    { q: '¿Para qué sirve `id="preguntas"` en la nueva sección?', opciones: ['Para enlazar directo con `nosotros.html#preguntas`', 'Para la base de datos', 'No sirve'], correcta: 0, retro: 'Es un ancla.' },
    { q: '¿Por qué se agregan los estilos nuevos con el selector `.preguntas`?', opciones: ['Para no afectar a Misión y Visión', 'Porque es obligatorio', 'Para que funcione PHP'], correcta: 0, retro: 'Un selector específico limita el alcance del cambio.' },
    { q: 'La tienda de camisas…', opciones: ['se desarrolla en esta clase', 'no se desarrolla hasta confirmarse y definir requisitos', 'ya existe'], correcta: 1, retro: 'Se respeta el alcance acordado.' }
  ],

  errores: [
    { tec: 'html', sintoma: 'La sección nueva quedó fuera del fondo o desalineada', causa: 'Se pegó fuera del contenedor correcto.', solucion: 'Pegarla antes del `</div>` que cierra `div.nosotros`.' },
    { tec: 'css', sintoma: 'Los estilos nuevos cambiaron también Misión y Visión', causa: 'Se usó un selector general (por ejemplo, `p`).', solucion: 'Limitar con una clase propia (`.preguntas p`).' },
    { tec: 'general', sintoma: 'El enlace del menú está en una página y no en las otras', causa: 'El menú está duplicado.', solucion: 'Buscar el menú en todo el proyecto y cambiar todas las copias.' },
    { tec: 'general', sintoma: 'El apartado creció y se volvió complicado', causa: 'Se intentó todo de una vez.', solucion: 'Volver al prototipo mínimo y avanzar por pasos.' }
  ],

  resumen: [
    'Planear con 6 preguntas: finalidad, ubicación, archivos, reutilización, ¿PHP/BD?, prueba.',
    'HTML + CSS para contenido fijo; PHP + BD solo si hay que guardar o leer datos.',
    'Reutilizar clases existentes y limitar los estilos nuevos con un selector propio.',
    'Construir en pequeño, probar en celular y documentar cómo revertir.'
  ],
  criterios: [
    'Completó la ficha de planificación de una idea propia.',
    'Construyó la sección de preguntas frecuentes en local.',
    'Explica cuándo una idea necesita PHP o base de datos.',
    'Sabe qué páginas habría que tocar para cambiar el menú.',
    'Documentó el cambio y cómo revertirlo.'
  ],
  tareaCasa: 'Ficha de planificación de una idea propia.',

  guionIntro: 'Clase de autonomía creativa. Que Marcos sienta que puede agregar cosas, pero con método.',
  guion: [
    { leccion: 'explicacion', decir: 'Antes de construir una habitación nueva te preguntas para qué es y si necesita agua y luz. En la web, “agua y luz” son PHP y la base de datos.' },
    { leccion: 'guiado', hacer: 'Pedir a Marcos que corrija los textos de las respuestas: él conoce su negocio.', preguntar: '¿Esta respuesta es verdad hoy en tu web?' },
    { leccion: 'codigo', decir: 'No vamos a inventar estilos: copiamos la ropa que ya usa Misión.' },
    { leccion: 'individual', decir: 'Elige algo que de verdad te sirva. Si es grande, lo dejamos planeado para después.' },
    { leccion: 'resumen', decir: 'Planear, reutilizar, construir pequeño, probar, documentar.' }
  ]
});
