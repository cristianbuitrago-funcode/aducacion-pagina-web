/* Clase 4 — CSS: diseño y apariencia */
FA.registrarClase({
  numero: 4,
  titulo: 'CSS: diseño y apariencia',
  objetivoCorto: 'Selectores, colores, tamaños y cambios visuales controlados.',
  objetivo: 'Que Marcos entienda cómo el CSS da apariencia al HTML, encuentre **qué estilos afectan a una sección** con las herramientas del navegador y haga un cambio visual controlado, probado en computador y celular.',
  resultado: 'Ajuste visual pequeño con antes y después.',
  previos: ['Clase 3: etiquetas, `class` e `id`.', 'Copia local y navegador Chrome, Edge o Firefox.'],
  plan: {
    sesion60: [
      { actividad: 'Objetivo', leccion: 'objetivo', min: 3 },
      { actividad: 'Reglas, selectores, colores, unidades, caja y media queries', leccion: 'explicacion', min: 15 },
      { actividad: 'Código real: menú, Nosotros, ventanas emergentes', leccion: 'codigo', min: 12 },
      { actividad: 'Diagrama: de la clase HTML a la regla CSS', leccion: 'diagrama', min: 5 },
      { actividad: 'Ejercicio guiado: inspeccionar y cambiar el título de Nosotros', leccion: 'guiado', min: 15 },
      { actividad: 'Resumen', leccion: 'resumen', min: 3 }
    ],
    flexible: 7,
    ampliacion90: [
      { actividad: 'Conceptos clave', leccion: 'conceptos', min: 5 },
      { actividad: 'Ejercicio individual (página de mantenimiento)', leccion: 'individual', min: 15 },
      { actividad: 'Evaluación', leccion: 'evaluacion', min: 5 },
      { actividad: 'Errores frecuentes', leccion: 'errores', min: 5 }
    ],
    posponer: 'Si falta tiempo, la evaluación y el ejercicio individual pasan a la siguiente sesión. Prioriza que Marcos sepa inspeccionar con F12.'
  },

  explicacion: [
    { t: 'p', x: '**CSS** decide **cómo se ve** lo que el HTML define: colores, tipografía, tamaños, espacios, posición y cómo se adapta al celular.' },
    { t: 'nota', tipo: 'analogia', titulo: 'Analogía: la ropa', x: 'El HTML es el cuerpo; el CSS es la ropa. Puedes cambiar la ropa sin cambiar la persona. Y una misma prenda (una clase) se la pueden poner varios.' },
    { t: 'h', x: 'Anatomía de una regla' },
    { t: 'ejemplo', lang: 'css', codigo: '.nosotros_h1 {          /* selector: a quién se aplica   */\n    font-size: 45px;     /* propiedad: valor;             */\n    font-weight: 100;\n}' },
    { t: 'h', x: 'Selectores' },
    { t: 'tabla', cabecera: ['Selector', 'Significa', 'Ejemplo real'], filas: [
      ['`p`', 'todas las etiquetas `<p>`', '—'],
      ['`.clase`', 'elementos con esa clase', '`.menu-a` (enlaces del menú)'],
      ['`#id`', 'el elemento con ese id', '`#main_parrafo_2`'],
      ['`a b`', '`b` que está dentro de `a`', '`div.main div.nosotros`'],
      ['`a:hover`', '`a` cuando el mouse está encima', '`.menu-a:hover`'],
      ['`.a.b`', 'elemento que tiene ambas clases', '`div.overlay.active`']
    ] },
    { t: 'h', x: 'Colores y unidades' },
    { t: 'lista', items: [
      'Colores: por nombre (`white`), hexadecimal (`#fff`), `rgb(11, 24, 44)` o `rgba(…, 0.5)` con transparencia.',
      '`px`: píxeles fijos. `%`: porcentaje del contenedor. `em`: relativo al tamaño de letra. `vh`: porcentaje de la altura de la pantalla.'
    ] },
    { t: 'h', x: 'El modelo de caja' },
    { t: 'p', x: 'Cada elemento es una caja con: **contenido**, **`padding`** (relleno interno), **`border`** (borde) y **`margin`** (espacio exterior). Casi todos los problemas de “se ve muy pegado” o “muy separado” son de `margin` o `padding`.' },
    { t: 'h', x: 'Adaptarse al celular: media queries' },
    { t: 'ejemplo', lang: 'css', codigo: '@media screen and (max-width: 782px) {\n    .nosotros_h1 { font-size: 30px; }   /* solo en pantallas de 782px o menos */\n}' },
    { t: 'h', x: 'Si dos reglas chocan, ¿cuál gana?' },
    { t: 'lista', items: ['Gana la **más específica**: id > clase > etiqueta.', 'Si empatan, gana la que está **más abajo** (o en el archivo cargado después).', 'Un `style="…"` escrito en la etiqueta gana sobre los archivos.'] },
    { t: 'h', x: 'De dónde viene el estilo en la web de Marcos' },
    { t: 'lista', items: [
      'Archivos en `assets/css/` enlazados con `<link>` (lo más común).',
      'Un bloque `<style>` dentro de la página (`mantenimiento.html`).',
      'Atributos `style="…"` en algunas tablas y en `readRegister.php`.'
    ] },
    { t: 'nota', tipo: 'tip', titulo: 'Herramienta clave: Inspeccionar', x: 'Clic derecho sobre cualquier elemento → **Inspeccionar**. A la derecha verás todas las reglas que lo afectan, con el archivo y la línea. Puedes cambiar valores allí para **probar** sin tocar el archivo (se pierde al recargar).' }
  ],

  conceptos: [
    { termino: 'Selector', def: 'Indica a qué elementos se aplica una regla.', ejemplo: '`.menu-a`.' },
    { termino: 'Propiedad y valor', def: 'Qué se cambia y cómo: `color: white;`.', ejemplo: '`background: rgba(11,24,44)` en el menú.' },
    { termino: 'Media query', def: 'Reglas que solo aplican en ciertos tamaños de pantalla.', ejemplo: '`@media (max-width: 1090px)` en `header.css`.' },
    { termino: 'Especificidad', def: 'Prioridad entre reglas que chocan.', ejemplo: '`#main_parrafo_2` gana sobre una regla por etiqueta `p`.' },
    { termino: 'Transición', def: 'Cambio animado entre dos estados.', ejemplo: 'Los recuadros crecen en 0,5 s al pasar el mouse.' }
  ],

  codigo: [
    { t: 'codigo', id: 'nosotros-css' },
    { t: 'codigo', id: 'header-css' },
    { t: 'codigo', id: 'header-css-media', cerrado: true },
    { t: 'codigo', id: 'popup-css', cerrado: true },
    { t: 'codigo', id: 'transporte-id-css', cerrado: true },
    { t: 'codigo', id: 'mantenimiento-style', cerrado: true }
  ],

  diagrama: [{ t: 'diagrama', id: 'html-css' }],

  guiado: {
    minutos: 15,
    objetivo: 'Encontrar con F12 la regla del título “Misión”, probar un cambio en el navegador y aplicarlo en el archivo de la copia local.',
    preparacion: ['Copia de seguridad de `assets/css/cuadrosNosotros.css`.'],
    pasos: [
      { x: 'Abre `nosotros.html`. Clic derecho sobre “Misión” → **Inspeccionar**.', comprobar: 'A la derecha aparece `.nosotros_h1` con el archivo `cuadrosNosotros.css:20`.' },
      { x: 'En el panel de estilos, cambia `font-size: 45px` por `50px` y `font-weight: 100` por `600`. Observa.', comprobar: 'El título cambia, pero al recargar vuelve a ser como antes (era solo una prueba).' },
      { x: 'Agrega en el panel `color: rgb(11, 24, 44);` (el azul del menú). ¿Te gusta?' },
      { x: 'Ahora sí, en el editor, abre `cuadrosNosotros.css` y en la regla de la línea 20 cambia `font-weight: 100;` por `font-weight: 600;` y añade `color: rgb(11, 24, 44);`. Guarda.', codigo: '.nosotros_h1{\n    margin: 0;\n    font-size: 45px;\n    font-family: sans-serif;\n    font-weight: 600;\n    color: rgb(11, 24, 44);\n    text-decoration: underline;\n}', lang: 'css', tituloCodigo: 'Así queda la regla' },
      { x: 'Recarga con **Ctrl+F5** (para evitar la copia guardada del navegador).', comprobar: 'Misión y Visión se ven con el nuevo estilo.' },
      { x: 'Activa el modo celular (F12 → ícono de teléfono, 390px de ancho).', comprobar: 'El título mide 30px (se aplica la media query de la línea 32) y conserva el color.' },
      { x: 'Toma captura de **antes** (con el respaldo) y **después**. Si no convence, restaura el respaldo.' }
    ],
    cierre: 'Como `cuadrosNosotros.css` solo lo usa `nosotros.html`, este cambio no afecta a ninguna otra página. ¿Qué pasaría si el cambio se hiciera en `header.css`?'
  },

  individual: {
    minutos: 15,
    consigna: [
      { t: 'p', x: 'En la copia local de `mantenimiento.html` (estilos en su bloque `<style>`):' },
      { t: 'lista', ordenada: true, items: [
        'Cambia el color de fondo de `.container` por uno de la marca (por ejemplo, el azul del menú `rgb(11, 24, 44)`).',
        'En celular la imagen se ve muy pequeña (34 %). Agrega una media query para que en pantallas de hasta 600px ocupe el 80 %.',
        'Prueba en computador y en modo celular. Guarda capturas de antes y después.'
      ] }
    ],
    entregable: 'Las reglas que agregaste o cambiaste, y una frase de cómo lo probaste.',
    pistas: ['Las media queries pueden ir dentro del mismo `<style>`.', 'El selector de la imagen es `.container-img img`.'],
    rubrica: ['Hizo respaldo antes.', 'El color cambió sin afectar otras páginas.', 'La media query funciona solo en pantallas pequeñas.', 'Mostró antes/después.'],
    solucion: [{ t: 'ejemplo', lang: 'css', titulo: 'Solución de referencia', codigo: '.container{\n    width: 100%;\n    height: 100vh;\n    background: rgb(11, 24, 44);\n}\n@media screen and (max-width: 600px){\n    .container-img img{\n        width: 80%;\n        height: auto;\n    }\n}' }]
  },

  comprobacion: [
    { q: '¿Cómo averiguas qué archivo CSS da estilo a un elemento?', a: 'Clic derecho → Inspeccionar; el panel de estilos muestra cada regla con su archivo y número de línea.' },
    { q: '¿Por qué un cambio en `header.css` se ve en varias páginas?', a: 'Porque 5 páginas cargan ese mismo archivo con `<link>`.' },
    { q: '¿Qué hace `@media screen and (max-width: 782px)`?', a: 'Aplica las reglas de su interior solo cuando la pantalla mide 782px de ancho o menos.' },
    { q: '¿Qué diferencia hay entre `margin` y `padding`?', a: '`margin` es espacio por fuera del borde; `padding`, espacio por dentro, entre el borde y el contenido.' }
  ],

  evaluacion: [
    { q: '¿Qué selector apunta a los elementos con `class="menu-a"`?', opciones: ['`#menu-a`', '`.menu-a`', '`menu-a`'], correcta: 1, retro: 'Punto = clase; almohadilla = id.' },
    { q: 'En `header.css`, `font-size: 20;` no funciona porque…', opciones: ['falta la unidad (`20px`)', 'el 20 es muy grande', 'falta un `#`'], correcta: 0, retro: 'Sin unidad el navegador ignora la propiedad.' },
    { q: '¿Qué hace que aparezca una ventana emergente en `transporte.php`?', opciones: ['Que JavaScript le añade la clase `active` y el CSS `div.overlay.active` la hace visible', 'Un archivo PHP', 'La base de datos'], correcta: 0, retro: 'JS cambia la clase; CSS reacciona.' },
    { q: 'Cambiaste el CSS y no ves el cambio. ¿Qué pruebas primero?', opciones: ['Recargar con Ctrl+F5 e inspeccionar si la regla aplica', 'Borrar el archivo', 'Cambiarlo en la web real'], correcta: 0, retro: 'Suele ser caché o un selector que no coincide.' },
    { q: '¿Cuál es el archivo de menor riesgo para practicar cambios visuales?', opciones: ['`header.css`', '`cuadrosNosotros.css`', '`footer.css`'], correcta: 1, retro: 'Solo lo carga `nosotros.html`.' }
  ],

  errores: [
    { tec: 'css', sintoma: 'No veo mi cambio', causa: 'Caché del navegador o archivo equivocado.', solucion: 'Ctrl+F5 e Inspeccionar para ver qué archivo y línea aplican.' },
    { tec: 'css', sintoma: 'Una propiedad aparece tachada en F12', causa: 'Otra regla más específica o posterior la sobreescribe, o el valor es inválido.', solucion: 'Buscar qué regla gana (aparece sin tachar arriba) y ajustar allí.' },
    { tec: 'css', sintoma: 'El cambio en celular no se ve', causa: 'Una media query sobreescribe el valor en pantallas pequeñas.', solucion: 'Revisar las reglas `@media` del mismo selector.', real: '`.nosotros_h1` tiene tamaños distintos para ≤1186px y ≤782px.' },
    { tec: 'css', sintoma: 'Selector que no afecta a nada', causa: 'Está mal escrito.', solucion: 'Revisar puntos y espacios.', real: '`.fas fa-bars` en `header.css` (debería ser `.fas.fa-bars`).' }
  ],

  resumen: [
    'Una regla CSS = selector + propiedades.',
    '`.clase`, `#id`, `padre hijo`, `:hover`; la más específica gana.',
    '`margin` (fuera) y `padding` (dentro) controlan los espacios.',
    'Las media queries adaptan la web al celular.',
    'F12 → Inspeccionar dice qué regla, de qué archivo y de qué línea afecta a cada elemento.'
  ],
  criterios: [
    'Encuentra con F12 la regla y el archivo de un elemento.',
    'Diferencia selector de clase e id.',
    'Hace un cambio visual en el archivo correcto y lo prueba en celular.',
    'Sabe qué páginas afecta un archivo CSS antes de cambiarlo.',
    'Restaura un CSS desde el respaldo.'
  ],
  tareaCasa: 'Ejercicio de `mantenimiento.html` si no se hizo en clase.',

  guionIntro: 'La herramienta Inspeccionar es el protagonista. Marcos debe salir sabiendo encontrar “de dónde sale este color”.',
  guion: [
    { leccion: 'explicacion', decir: 'El HTML dice qué hay; el CSS dice cómo se viste. La clase es como el nombre de un uniforme: todos los que lo llevan se visten igual.' },
    { leccion: 'codigo', preguntar: 'Si en `cuadrosNosotros.css` cambio 45px por 60px, ¿se verá más grande en el celular? (No: en celular manda la media query.)' },
    { leccion: 'guiado', hacer: 'Primero probar en F12 (sin riesgo), luego en el archivo. Insistir en Ctrl+F5.' },
    { leccion: 'diagrama', decir: 'El HTML pone el nombre (`class`), el CSS lo usa con un punto delante.' },
    { leccion: 'resumen', decir: 'Ya sabes encontrar de dónde sale cualquier estilo. Eso te ahorra horas.' }
  ]
});
