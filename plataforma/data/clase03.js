/* Clase 3 — HTML: estructura y contenido */
FA.registrarClase({
  numero: 3,
  titulo: 'HTML: estructura y contenido',
  objetivoCorto: 'Etiquetas y atributos; editar contenido real con seguridad.',
  objetivo: 'Que Marcos reconozca las etiquetas y atributos básicos de HTML en sus propias páginas, encuentre un contenido en el código y lo **agregue, edite, quite y restaure** comprobando que nada se rompe.',
  resultado: 'Un cambio pequeño de contenido documentado y probado.',
  previos: ['Clase 2: estructura de carpetas y búsqueda en el proyecto.', 'Copia local del proyecto abierta en el editor.'],
  plan: {
    sesion60: [
      { actividad: 'Objetivo', leccion: 'objetivo', min: 3 },
      { actividad: 'Etiquetas, atributos y estructura de un documento', leccion: 'explicacion', min: 15 },
      { actividad: 'Código real: menú, recuadros, Nosotros y un formulario', leccion: 'codigo', min: 12 },
      { actividad: 'Ejercicio guiado: editar, agregar, quitar y restaurar en `nosotros.html`', leccion: 'guiado', min: 15 },
      { actividad: 'Evaluación', leccion: 'evaluacion', min: 5 },
      { actividad: 'Resumen', leccion: 'resumen', min: 3 }
    ],
    flexible: 7,
    ampliacion90: [
      { actividad: 'Conceptos y árbol del documento', leccion: 'conceptos', min: 5 },
      { actividad: 'Ejercicio individual en clase (`publicidad.html`)', leccion: 'individual', min: 15 },
      { actividad: 'Preguntas de comprobación', leccion: 'comprobacion', min: 5 },
      { actividad: 'Errores frecuentes', leccion: 'errores', min: 5 }
    ],
    posponer: 'El ejercicio guiado no se recorta: es el corazón de la clase. Si falta tiempo, la evaluación pasa a la próxima sesión.'
  },

  explicacion: [
    { t: 'p', x: '**HTML** es el lenguaje que define **qué hay** en una página: títulos, textos, imágenes, enlaces, listas, formularios. No define colores ni comportamientos: eso es CSS y JavaScript.' },
    { t: 'nota', tipo: 'analogia', titulo: 'Analogía: cajas con etiqueta', x: 'Cada elemento HTML es una caja con una etiqueta que dice qué contiene: “esto es un título”, “esto es un párrafo”. Las cajas pueden ir dentro de otras cajas.' },
    { t: 'h', x: 'Anatomía de un elemento' },
    { t: 'ejemplo', lang: 'html', codigo: '<a href="nosotros.html" class="menu-a">Nosotros</a>\n<!-- │   └─ atributo ─┘  └ atributo ┘  └contenido┘ │ -->\n<!-- etiqueta de apertura                 etiqueta de cierre -->' },
    { t: 'lista', items: [
      '**Etiqueta de apertura** `<a …>` y **de cierre** `</a>` (con barra).',
      '**Atributos**: datos extra dentro de la apertura, con la forma `nombre="valor"`.',
      '**Contenido**: lo que va entre apertura y cierre.',
      'Algunas etiquetas no tienen cierre: `<img>`, `<input>`, `<br>`, `<meta>`, `<link>`.'
    ] },
    { t: 'h', x: 'Las etiquetas que más usa la web de Marcos' },
    { t: 'tabla', cabecera: ['Etiqueta', 'Para qué', 'Ejemplo real'], filas: [
      ['`<h1>` … `<h6>`', 'Títulos (h1 el más importante)', '`<h1 class="nosotros_h1">Misión</h1>`'],
      ['`<p>`', 'Párrafo', 'el texto de la misión'],
      ['`<a href="…">`', 'Enlace', '`<a href="publicidad.html">`'],
      ['`<img src="…" alt="…">`', 'Imagen; `alt` describe la imagen', 'logo en `index.php`'],
      ['`<ul>` / `<ol>` + `<li>`', 'Lista sin / con números', 'el menú'],
      ['`<div>`', 'Caja genérica para agrupar', '`<div class="seccion_1">`'],
      ['`<header>`, `<nav>`, `<footer>`', 'Cajas con significado (semánticas)', 'menú de `inicio.html`'],
      ['`<form>`, `<input>`, `<label>`, `<button>`, `<textarea>`', 'Formularios', 'login y registro'],
      ['`<table>`, `<tr>`, `<th>`, `<td>`', 'Tablas', 'comisiones en `publicidad.html`'],
      ['`<!-- … -->`', 'Comentario (no se ve)', '`<!-- Inicio Header -->`']
    ] },
    { t: 'h', x: 'Atributos que importan mucho' },
    { t: 'lista', items: [
      '`class`: nombre para el estilo (CSS) o para JavaScript. Se puede repetir.',
      '`id`: nombre **único**. JavaScript lo usa para encontrar el elemento.',
      '`href` (enlaces) y `src` (imágenes, scripts): rutas a otros archivos.',
      '`name` (en formularios): el nombre con el que **PHP recibe** el dato. Cambiarlo rompe el formulario.',
      '`required`: campo obligatorio. `type`: tipo de campo (`email`, `password`, `date`, `number`).'
    ] },
    { t: 'h', x: 'Estructura de cualquier página' },
    { t: 'ejemplo', lang: 'html', titulo: 'Esqueleto mínimo (comparar con `nosotros.html`)', codigo: '<!DOCTYPE html>\n<html lang="es">\n<head>\n    <meta charset="UTF-8">\n    <title>Título de la pestaña</title>\n    <link rel="stylesheet" href="assets/css/estilos.css">\n</head>\n<body>\n    <h1>Lo que se ve</h1>\n    <p>Un párrafo.</p>\n</body>\n</html>' },
    { t: 'nota', tipo: 'tip', titulo: 'Regla para editar sin miedo', x: 'Cambia **solo el texto** entre etiquetas. No borres `<`, `>`, comillas ni atributos hasta entenderlos. Y siempre con copia de seguridad.' },
    { t: 'pregunta', q: '¿Por qué en las páginas de Marcos se ve bien aunque `lang="en"`?', a: 'Porque `lang` no cambia lo que se ve: indica el idioma a lectores de pantalla, traductores y buscadores. Lo correcto es `lang="es"`.' }
  ],

  conceptos: [
    { termino: 'Etiqueta', def: 'Instrucción entre `< >` que marca qué es cada parte.', ejemplo: '`<p>`, `<h1>`, `<a>`.' },
    { termino: 'Atributo', def: 'Dato extra dentro de la etiqueta de apertura.', ejemplo: '`href="inicio.html"`.' },
    { termino: 'Anidar', def: 'Poner elementos dentro de otros. Se cierran en orden inverso.', ejemplo: '`<a><p>Transporte</p></a>`.' },
    { termino: 'Semántica', def: 'Usar la etiqueta que describe el significado.', ejemplo: '`<nav>` para el menú en vez de un `<div>` cualquiera.' },
    { termino: 'DOM (primer encuentro)', def: 'El árbol que arma el navegador con el HTML. Lo usaremos con JavaScript.', ejemplo: 'Diagrama “Estructura de inicio.html”.' }
  ],

  codigo: [
    { t: 'codigo', id: 'nosotros-html' },
    { t: 'codigo', id: 'inicio-menu' },
    { t: 'codigo', id: 'inicio-main', cerrado: true },
    { t: 'codigo', id: 'registro-form', cerrado: true },
    { t: 'codigo', id: 'publicidad-paquete', cerrado: true }
  ],

  diagrama: [{ t: 'diagrama', id: 'dom-inicio' }],

  guiado: {
    minutos: 15,
    objetivo: 'Editar, agregar, quitar y restaurar contenido en `nosotros.html` de la copia local.',
    preparacion: ['Trabajar en la **copia local**.', 'Tener abierta la página en el navegador (`http://localhost/proyecto-ge/nosotros.html` o con doble clic, porque es `.html`).'],
    pasos: [
      { x: '**Copia de seguridad**: duplica `nosotros.html` y nómbrala `nosotros.respaldo-AAAA-MM-DD.html`.', comprobar: 'Ves los dos archivos en la carpeta.' },
      { x: '**Editar**: en la línea 43 cambia una palabra del texto de la misión. Guarda (Ctrl+S) y recarga el navegador (F5).', comprobar: 'El cambio se ve y el resto de la página sigue igual.' },
      { x: '**Agregar**: debajo del bloque Visión (después de la línea 60, antes de `</div>` de la línea 61) pega el bloque de abajo, que reutiliza las mismas clases.', codigo: '           <div class="vision">\n               <div class="nosotros_titulo">\n                <h2 class="nosotros_h1">Valores</h2>\n               </div>\n               <div class="nosotros_contenido">\n                   <p class="nosotros_p">Puntualidad, seguridad y buen trato.</p>\n               </div>\n           </div>', tituloCodigo: 'Bloque nuevo (texto de ejemplo; Marcos decide el real)', comprobar: 'Aparece “Valores” con el mismo estilo que Misión y Visión.' },
      { x: 'Prueba en **modo celular**: F12 → ícono de teléfono → elige un celular.', comprobar: 'El bloque nuevo se lee bien en pantalla pequeña.' },
      { x: '**Quitar**: borra el bloque que agregaste. Guarda y recarga.', comprobar: 'La página vuelve a tener Misión y Visión.' },
      { x: '**Restaurar**: borra `nosotros.html`, duplica el respaldo y renómbralo a `nosotros.html`.', comprobar: 'La palabra que cambiaste en el paso 2 volvió a su valor original.' },
      { x: 'Anota en el ejercicio individual qué cambiaste y cómo lo comprobaste: eso es **documentar** un cambio.' }
    ],
    cierre: 'Este ciclo (respaldo → cambio → prueba → restaurar si hace falta) es el mismo para cualquier archivo, aunque sea PHP.'
  },

  individual: {
    minutos: 15,
    consigna: [
      { t: 'p', x: 'En la copia local de `publicidad.html` (líneas 21-25), los beneficios del paquete están hechos con párrafos y espacios `&nbsp;`. Conviértelos en una **lista numerada** de verdad:' },
      { t: 'ejemplo', lang: 'html', titulo: 'Pista de estructura', codigo: '<ol>\n    <li>Primer beneficio</li>\n    <li>Segundo beneficio</li>\n</ol>' },
      { t: 'p', x: 'Después, en la misma página, cambia `lang="en"` por `lang="es"`. Haz copia antes, prueba en computador y celular y documenta el cambio.' }
    ],
    entregable: 'Descripción del cambio (archivo, líneas, antes/después) y cómo lo probaste.',
    pistas: ['El texto de cada beneficio no cambia; solo cambian las etiquetas.', 'Borra los `&nbsp;` y la numeración escrita a mano (“1.”), porque `<ol>` numera solo.'],
    rubrica: ['Hizo copia antes de empezar.', 'La lista usa `<ol>` y `<li>` bien cerrados.', 'La página se ve correctamente en computador y celular.', 'Documentó antes/después.'],
    solucion: [{ t: 'ejemplo', lang: 'html', titulo: 'Solución de referencia (líneas 21-25 de publicidad.html)', codigo: '<p>Contiene</p>\n<ol>\n    <li>Supervisión del Back Office con balance de puntaje personal y grupal.</li>\n    <li>20.000 impactos de paquete + 10.000 impactos de obsequio</li>\n    <li>1 Flyer Profesional</li>\n    <li>Posibilidad de comisionar hasta un 36% por conformación de grupos de apoyo y crecimiento de mercado.</li>\n</ol>' }]
  },

  comprobacion: [
    { q: '¿Qué diferencia hay entre `class` e `id`?', a: '`class` se puede repetir y sirve para dar el mismo estilo a varios elementos; `id` debe ser único y sirve para encontrar un elemento concreto.' },
    { q: '¿Por qué no se debe cambiar el `name` de un campo del registro sin más?', a: 'Porque PHP lee el dato por ese nombre (`$_POST[\'namesCustomer\']`); si cambia en el HTML y no en el PHP, el dato no llega.' },
    { q: '¿Qué hace el atributo `alt` de una imagen?', a: 'Describe la imagen para personas que usan lectores de pantalla y se muestra si la imagen no carga.' },
    { q: 'Si después de editar media página se desordena, ¿qué sospechas?', a: 'Una etiqueta sin cerrar o un cierre borrado de más. Se compara con el respaldo o se restaura.' }
  ],

  evaluacion: [
    { q: '¿Qué etiqueta crea un enlace?', opciones: ['`<link>`', '`<a href="…">`', '`<p>`'], correcta: 1, retro: '`<link>` carga hojas de estilo en el `<head>`; `<a>` es el enlace que se hace clic.' },
    { q: 'En `<input type="email" name="emailEverybody" required>`, ¿qué atributo usa PHP para recibir el dato?', opciones: ['`type`', '`name`', '`required`'], correcta: 1, retro: 'PHP lee `$_POST[\'emailEverybody\']`.' },
    { q: '¿Cuál de estas etiquetas NO necesita cierre?', opciones: ['`<p>`', '`<img>`', '`<h1>`'], correcta: 1, retro: '`<img>`, `<input>`, `<br>` son etiquetas vacías.' },
    { q: 'En `transporte.php` hay 6 elementos con `id="main_parrafo_2"`. ¿Qué problema es?', opciones: ['Ninguno', 'Un `id` debe ser único; para repetir se usa `class`', 'Hace la página más rápida'], correcta: 1, retro: 'Funciona por tolerancia del navegador, pero es HTML inválido y confunde a JavaScript.' },
    { q: 'Antes de editar `nosotros.html` lo primero es…', opciones: ['Hacer una copia de seguridad', 'Subirlo a la web real', 'Borrar el CSS'], correcta: 0, retro: 'Respaldo → cambio → prueba → (restaurar).' },
    { q: '¿Qué atributo de `<html>` debería corregirse en las páginas de Marcos?', opciones: ['`lang="en"` → `lang="es"`', '`charset`', 'Ninguno'], correcta: 0, retro: 'El contenido está en español.' }
  ],

  errores: [
    { tec: 'html', sintoma: 'La página se ve desordenada después de editar', causa: 'Etiqueta sin cerrar o cierre borrado.', solucion: 'Restaurar el respaldo o revisar que cada `<div>` tenga su `</div>` (el editor resalta la pareja).' },
    { tec: 'html', sintoma: 'Un enlace nuevo da “Not Found”', causa: 'Ruta mal escrita en `href`.', solucion: 'Copiar el nombre exacto del archivo; respetar mayúsculas.' },
    { tec: 'html', sintoma: 'Aparecen símbolos raros en lugar de tildes', causa: 'El archivo se guardó con otra codificación.', solucion: 'Guardar como UTF-8 (en VS Code, abajo a la derecha).' },
    { tec: 'html', sintoma: 'Un ícono de más o una etiqueta duplicada', causa: 'Copiar y pegar fragmentos.', solucion: 'Revisar con cuidado.', real: '`inicio.html` línea 26 tiene `</i></i>`.' }
  ],

  resumen: [
    'HTML define la estructura y el contenido con etiquetas anidadas.',
    'Atributos clave: `class`, `id`, `href`, `src`, `name`, `required`, `type`.',
    'Editar texto entre etiquetas es de bajo riesgo; cambiar `name` o `action` afecta a PHP.',
    'Ciclo seguro: respaldo → cambio pequeño → prueba en computador y celular → restaurar si falla.'
  ],
  criterios: [
    'Reconoce en código real: título, párrafo, enlace, imagen, lista y formulario.',
    'Edita un texto y lo verifica en el navegador.',
    'Agrega un bloque reutilizando clases existentes y lo quita.',
    'Restaura un archivo desde su respaldo.',
    'Explica por qué no se cambia un `name` sin revisar el PHP.'
  ],
  tareaCasa: 'Ejercicio de la lista en `publicidad.html` si no se hizo en clase.',

  guionIntro: 'Clase muy práctica. Que Marcos vea primero el resultado en pantalla y después la etiqueta que lo produce.',
  guion: [
    { leccion: 'explicacion', decir: 'HTML es como poner etiquetas a cajas: “esto es un título”, “esto es un párrafo”. El navegador lee las etiquetas y arma la página.', hacer: 'Abrir `nosotros.html` en el navegador y en el editor lado a lado.' },
    { leccion: 'codigo', preguntar: 'En la línea 39, ¿qué parte es la etiqueta, cuál el atributo y cuál el contenido?' },
    { leccion: 'guiado', decir: 'Lo primero siempre es la copia. Así podemos equivocarnos sin miedo.', hacer: 'Dejar que Marcos rompa algo a propósito (borrar un `</div>`) para ver el efecto y luego restaurar.' },
    { leccion: 'individual', hacer: 'Si hay tiempo (90 min), hacerlo en clase; si no, tarea. Revisar juntos al inicio de la Clase 4.' },
    { leccion: 'resumen', decir: 'Si sabes encontrar un texto, cambiarlo, probarlo y volver atrás, ya puedes mantener el contenido de tu web.' }
  ]
});
