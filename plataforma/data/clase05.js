/* Clase 5 — JavaScript: interactividad */
FA.registrarClase({
  numero: 5,
  titulo: 'JavaScript: interactividad',
  objetivoCorto: 'Variables, funciones, eventos y el DOM en el código real.',
  objetivo: 'Que Marcos entienda cómo JavaScript hace que la página responda (menú, ventanas, avisos del registro), identifique las funciones que ya usa el proyecto, **modifique una interacción existente** y use la consola para encontrar errores.',
  resultado: 'Una interacción sencilla entendida y probada.',
  previos: ['Clases 3 y 4: `id`, `class` y la clase `active` de las ventanas.', 'Saber abrir F12.'],
  plan: {
    sesion60: [
      { actividad: 'Objetivo', leccion: 'objetivo', min: 3 },
      { actividad: 'Dónde corre JS; variables, funciones, condiciones, eventos y DOM', leccion: 'explicacion', min: 15 },
      { actividad: 'Código real: menú, ventanas y validación del registro', leccion: 'codigo', min: 15 },
      { actividad: 'Diagrama: qué pasa al tocar “Trasteos”', leccion: 'diagrama', min: 5 },
      { actividad: 'Ejercicio guiado: manejar la página desde la consola', leccion: 'guiado', min: 12 },
      { actividad: 'Resumen', leccion: 'resumen', min: 3 }
    ],
    flexible: 7,
    ampliacion90: [
      { actividad: 'Conceptos clave', leccion: 'conceptos', min: 5 },
      { actividad: 'Ejercicio individual: impedir el envío si las contraseñas no coinciden', leccion: 'individual', min: 15 },
      { actividad: 'Evaluación', leccion: 'evaluacion', min: 5 },
      { actividad: 'Errores frecuentes', leccion: 'errores', min: 5 }
    ],
    posponer: 'El ejercicio individual puede hacerse al inicio de la Clase 6 junto con el profesor (es el puente hacia la validación en PHP).'
  },

  explicacion: [
    { t: 'p', x: '**JavaScript** es un lenguaje de programación que se ejecuta **en el navegador**. Sirve para que la página **reaccione**: abrir un menú, mostrar una ventana, avisar que las contraseñas no coinciden.' },
    { t: 'nota', tipo: 'analogia', titulo: 'Analogía: los interruptores de la casa', x: 'HTML son las paredes y las lámparas; CSS, la pintura y el tipo de luz; JavaScript, los **interruptores**: cuando alguien los toca, algo cambia.' },
    { t: 'h', x: 'Cómo llega a la página' },
    { t: 'p', x: 'Con `<script src="assets/js/main.js"></script>` al final del `<body>`. Al final, para que cuando se ejecute ya existan los elementos HTML que busca. El orden importa: `jquery.js` va antes que `main.js` porque `main.js` lo usa.' },
    { t: 'h', x: 'Los ladrillos del lenguaje' },
    { t: 'tabla', cabecera: ['Concepto', 'Qué es', 'En `main.js` o validaciones'], filas: [
      ['**Variable**', 'Un nombre que guarda un valor', '`var contenedor = 1;` (1 = menú cerrado)'],
      ['**Función**', 'Bloque de instrucciones con nombre', '`function main(){ … }`'],
      ['**Condición**', 'Decide entre dos caminos', '`if(contenedor == 1){ … }else{ … }`'],
      ['**Evento**', 'Algo que pasa: clic, tecla, escribir', '`click`, `keyup`, `input`'],
      ['**Escuchador**', 'Función que espera un evento', '`pasajeros.addEventListener(\'click\', …)`'],
      ['**Bucle**', 'Repite instrucciones', '`for(var i = 0; i < cerrar.length; i++)`']
    ] },
    { t: 'h', x: 'El DOM: la página que JavaScript puede tocar' },
    { t: 'p', x: 'El navegador convierte el HTML en un árbol de objetos llamado **DOM**. JavaScript lo usa así:' },
    { t: 'ejemplo', lang: 'js', codigo: "var popup1 = document.getElementById('popup1');     // buscar por id\nvar cerrar = document.querySelectorAll('.btn_cerrar_popup'); // todos los de una clase\npopup1.classList.add('active');      // añadir una clase (el CSS la muestra)\npopup1.classList.remove('active');   // quitarla\naviso.style.display = 'block';       // cambiar un estilo directamente\nconsole.log('hola');                 // escribir un mensaje en la consola" },
    { t: 'h', x: '¿Y jQuery?' },
    { t: 'p', x: 'jQuery es una **librería**: código hecho por otros que simplifica tareas. `$(\'.menu-bar\').click(…)` es la forma jQuery de `document.querySelector(\'.menu-bar\').addEventListener(\'click\', …)`. La web la usa solo para el menú.' },
    { t: 'h', x: 'La consola: tu linterna' },
    { t: 'p', x: 'F12 → pestaña **Consola**. Allí aparecen los errores en rojo con el archivo y la línea, y puedes escribir instrucciones de JavaScript para probarlas en vivo.' },
    { t: 'nota', tipo: 'alerta', titulo: 'JavaScript no protege nada', x: 'Todo lo que corre en el navegador lo puede ver y cambiar el visitante. Por eso la validación del registro es solo una ayuda: la protección real debe estar en PHP. Y nunca se ponen contraseñas o claves en JavaScript.' }
  ],

  conceptos: [
    { termino: 'Variable', def: 'Nombre que guarda un valor. `var`, `let` (puede cambiar) o `const` (no cambia).', ejemplo: '`const checkPassword = document.getElementById(\'passwordCustomer\');`' },
    { termino: 'Función', def: 'Instrucciones con nombre que se ejecutan al llamarlas.', ejemplo: '`main()` se ejecuta cuando la página termina de cargar.' },
    { termino: 'Evento', def: 'Algo que ocurre en la página.', ejemplo: '`keyup` en el campo contraseña.' },
    { termino: 'DOM', def: 'Representación de la página que JavaScript lee y modifica.', ejemplo: '`classList.add(\'active\')`.' },
    { termino: 'Consola', def: 'Panel de F12 para ver errores y probar código.', ejemplo: 'Escribir `overlay1.classList.add(\'active\')` abre la ventana de Trasteos.' }
  ],

  codigo: [
    { t: 'codigo', id: 'mainjs-menu' },
    { t: 'codigo', id: 'mainjs-popups' },
    { t: 'codigo', id: 'validar-registro', cerrado: true }
  ],

  diagrama: [{ t: 'diagrama', id: 'flujo-evento' }],

  guiado: {
    minutos: 12,
    objetivo: 'Usar la consola para controlar una ventana emergente y observar un evento.',
    preparacion: ['Abrir `transporteAbierto.html` de la copia local (es `.html`, funciona incluso con doble clic).', 'Respaldo de `assets/js/main.js`.'],
    pasos: [
      { x: 'Abre F12 → Consola. Escribe `document.getElementById(\'trasteos\')` y pulsa Enter.', comprobar: 'Aparece el elemento; al pasar el mouse se resalta en la página.' },
      { x: 'Escribe `overlay1.classList.add(\'active\'); popup1.classList.add(\'active\');`', comprobar: '¡Se abre la ventana de Trasteos sin hacer clic! JavaScript solo cambió una clase.' },
      { x: 'Ciérrala desde la consola con `classList.remove(\'active\')` en ambos.' },
      { x: 'En el editor, en `main.js`, dentro de la función de `trasteos` (línea 38), agrega como primera línea: `console.log(\'Clic en trasteos\');`. Guarda y recarga.', codigo: "trasteos.addEventListener('click',function(){\n    console.log('Clic en trasteos');\n    overlay1.classList.add('active');\n    popup1.classList.add('active');\n});", lang: 'js', tituloCodigo: 'Así queda' },
      { x: 'Haz clic en Trasteos y mira la consola.', comprobar: 'El mensaje aparece **6 veces** por cada clic: confirma que el bucle `for` registró el mismo escuchador 6 veces.' },
      { x: 'Escribe en la consola `document.getElementById(\'noexiste\').classList` y observa el error en rojo.', comprobar: '“Cannot read properties of null”: así se ve cuando se busca un id que no existe.' },
      { x: 'Restaura `main.js` desde el respaldo.' }
    ],
    cierre: 'Acabas de depurar: usaste mensajes en la consola para confirmar una sospecha sobre el código.'
  },

  individual: {
    minutos: 15,
    consigna: [
      { t: 'p', x: 'Hoy el registro **avisa** si las contraseñas no coinciden, pero deja enviar el formulario. Modifica la interacción existente en la copia local de `assets/js/validateFormCustomer.js` para que **impida el envío** cuando no coinciden.' },
      { t: 'lista', ordenada: true, items: [
        'Respaldo del archivo.',
        'Al final, busca el formulario por su id (`formulario`, en `registerCustomers.php` línea 24).',
        'Escucha el evento `submit`. Si las contraseñas son distintas, llama `evento.preventDefault()` y muestra el aviso.',
        'Prueba: con contraseñas distintas no se envía; con iguales, sí.'
      ] }
    ],
    entregable: 'El código agregado y el resultado de las dos pruebas.',
    pistas: ['Las variables `checkPassword` y `checkPasswordConfirmation` ya existen al inicio del archivo.', '`preventDefault()` cancela el comportamiento normal del evento (enviar).'],
    rubrica: ['Usa el id correcto del formulario.', 'Cancela el envío solo cuando no coinciden.', 'Probó ambos casos.', 'Explica por qué igual hace falta validar en PHP.'],
    solucion: [
      { t: 'ejemplo', lang: 'js', titulo: 'Solución de referencia (agregar al final de validateFormCustomer.js)', codigo: "const formulario = document.getElementById('formulario');\nformulario.addEventListener('submit', (evento) => {\n    if (checkPassword.value !== checkPasswordConfirmation.value) {\n        evento.preventDefault();                       // no enviar\n        validationPropertyConfirmation.style.display = 'block';\n        checkPasswordConfirmation.focus();\n    }\n});" },
      { t: 'p', x: 'Para el registro de arrendatarios sería igual en `validateFormDriver.js` con el id `formularioDriver`. Recordar: esto mejora la experiencia, pero **no reemplaza** la validación en el servidor (Clase 6).' }
    ]
  },

  comprobacion: [
    { q: '¿Por qué `main.js` se carga después de `jquery.js`?', a: 'Porque `main.js` usa `$` (jQuery); si jQuery no se cargó antes, aparece el error “$ is not defined”.' },
    { q: '¿Cómo abre JavaScript una ventana emergente en esta web?', a: 'Añade la clase `active` al fondo y a la ventana con `classList.add`; el CSS de `popUp.css` hace visible lo que tiene esa clase.' },
    { q: '¿Por qué la validación de contraseñas en JavaScript no es suficiente?', a: 'Porque corre en el navegador del visitante, que puede desactivarla o modificarla; la validación real debe hacerse en PHP.' },
    { q: '¿Qué te dice un error rojo en la consola?', a: 'Qué falló, en qué archivo y en qué línea; es la primera pista para depurar.' }
  ],

  evaluacion: [
    { q: '¿Dónde se ejecuta JavaScript en esta web?', opciones: ['En el servidor', 'En el navegador', 'En MySQL'], correcta: 1, retro: 'Por eso el visitante puede verlo y cambiarlo.' },
    { q: 'En `main.js`, ¿qué significa `contenedor = 0`?', opciones: ['Que el menú está abierto', 'Que hay 0 usuarios', 'Un error'], correcta: 0, retro: 'La variable recuerda el estado del menú: 1 cerrado, 0 abierto.' },
    { q: '¿Qué evento usa la validación de contraseñas?', opciones: ['`click`', '`keyup`', '`load`'], correcta: 1, retro: 'Se revisa cada vez que se suelta una tecla.' },
    { q: '`document.getElementById(\'x\')` devuelve `null`. ¿Qué significa?', opciones: ['Que no existe ningún elemento con `id="x"` en esa página', 'Que el CSS falló', 'Que PHP no corrió'], correcta: 0, retro: 'Usar ese `null` provoca “Cannot read properties of null”.' },
    { q: '¿Por qué cada clic en Trasteos ejecuta la función 6 veces?', opciones: ['Porque hay 6 ventanas', 'Porque el escuchador se registró dentro de un `for` que se repite 6 veces', 'Porque jQuery lo exige'], correcta: 1, retro: 'El bucle sobra: bastaría con registrar cada escuchador una vez.' },
    { q: '¿Dónde NUNCA se debe escribir una contraseña o clave secreta?', opciones: ['En JavaScript del navegador', 'En un gestor de contraseñas', 'En variables de entorno del servidor'], correcta: 0, retro: 'Cualquiera puede leer el JavaScript con F12.' }
  ],

  errores: [
    { tec: 'js', sintoma: '“$ is not defined”', causa: 'jQuery no cargó o se cargó después.', solucion: 'Revisar el orden de los `<script>` y la ruta de `jquery.js`.' },
    { tec: 'js', sintoma: '“Cannot read properties of null (reading \'addEventListener\')”', causa: 'El elemento buscado no existe en esa página.', solucion: 'Verificar el `id`; envolver con `if (elemento) { … }`.' },
    { tec: 'js', sintoma: 'Cambié el JS y no pasa nada', causa: 'Caché o error previo que detiene el script.', solucion: 'Ctrl+F5 y revisar la consola: un error arriba impide que corra lo de abajo.' },
    { tec: 'js', sintoma: 'Variable usada sin declarar', causa: 'Falta `var`/`let`/`const`.', solucion: 'Declararla.', real: '`emailRegex` en las validaciones y `overlay2…5` en `main.js`.' }
  ],

  resumen: [
    'JavaScript corre en el navegador y hace que la página reaccione.',
    'Variables guardan valores; funciones agrupan instrucciones; condiciones deciden; eventos disparan.',
    'El DOM es la página que JS puede tocar: `getElementById`, `classList`, `style`.',
    'La consola muestra errores y permite probar código.',
    'La validación en JS ayuda, pero la protección real va en el servidor.'
  ],
  criterios: [
    'Explica qué hace `main.js` con el menú y con las ventanas.',
    'Abre y cierra una ventana desde la consola.',
    'Lee un error de la consola e indica archivo y línea.',
    'Modifica una interacción (por ejemplo, impedir el envío) y la prueba.',
    'Sabe por qué no se ponen secretos en JavaScript.'
  ],
  tareaCasa: 'Ejercicio de impedir el envío del registro, si no se terminó.',

  guionIntro: 'Mostrar que JavaScript no es magia: casi todo lo que hace esta web es “añadir o quitar una clase”.',
  guion: [
    { leccion: 'explicacion', decir: 'JavaScript son los interruptores: esperan a que alguien los toque y entonces cambian algo de la página.', preguntar: '¿Qué cosas de tu web reaccionan cuando las tocas?' },
    { leccion: 'codigo', hacer: 'Leer `main.js` en voz alta como si fuera una receta: “cuando hagan clic en el menú, si está cerrado, ábrelo…”.' },
    { leccion: 'guiado', decir: 'Mira: abrimos la ventana sin hacer clic. Solo cambiamos una clase. Eso es todo lo que hace el botón.' },
    { leccion: 'individual', decir: 'Ahora vas a cambiar una interacción que ya existe. Con respaldo, nada se puede perder.' },
    { leccion: 'resumen', decir: 'La consola es tu linterna: cuando algo no funcione, es lo primero que abres.' }
  ]
});
