/* Clase 1 — Reconocimiento general de la página */
FA.registrarClase({
  numero: 1,
  titulo: 'Reconocimiento general de la página',
  objetivoCorto: 'Recorrer la web, entender su propósito y dibujar su mapa.',
  objetivo: 'Que Marcos pueda explicar con sus palabras **para qué sirve su web**, qué secciones tiene, qué puede hacer cada tipo de visitante y qué funciones existen de verdad frente a las que son ideas futuras.',
  resultado: 'Mapa inicial de la página y lista de dudas y requerimientos.',
  previos: ['Saber usar un navegador (abrir pestañas, escribir una dirección).', 'No se necesita ningún conocimiento de programación.'],
  plan: {
    sesion60: [
      { actividad: 'Presentación, objetivo del curso y reglas de oro', leccion: 'objetivo', min: 5 },
      { actividad: '¿Qué es una página web? Navegador, servidor y base de datos', leccion: 'explicacion', min: 10 },
      { actividad: 'Recorrido por la web real con el mapa del sitio', leccion: 'diagrama', min: 15 },
      { actividad: 'Construir juntos el mapa de la página', leccion: 'guiado', min: 12 },
      { actividad: 'Evaluación rápida', leccion: 'evaluacion', min: 5 },
      { actividad: 'Resumen y acuerdos para la próxima clase', leccion: 'resumen', min: 5 }
    ],
    flexible: 8,
    ampliacion90: [
      { actividad: 'Conceptos clave con ejemplos de la web', leccion: 'conceptos', min: 8 },
      { actividad: 'Primer vistazo al código: ver el código fuente', leccion: 'codigo', min: 10 },
      { actividad: 'Preguntas de comprobación conversadas', leccion: 'comprobacion', min: 7 },
      { actividad: 'Errores de interpretación frecuentes', leccion: 'errores', min: 5 }
    ],
    posponer: 'Si falta tiempo, la evaluación pasa al inicio de la Clase 2 (5 min) y el ejercicio individual queda como tarea. No recortes el recorrido ni el mapa: son la base del curso.'
  },

  explicacion: [
    { t: 'p', x: 'Antes de tocar una sola línea de código hay que conocer la web **como la conoce un visitante**. Si no sabemos qué hace la página, no sabremos qué estamos cambiando.' },
    { t: 'h', x: '¿Qué pasa cuando alguien abre una página?' },
    { t: 'nota', tipo: 'analogia', titulo: 'Analogía: un restaurante', items: [
      '**El navegador** (Chrome, el celular) es la **mesa del cliente**: allí se ve y se “consume” la página.',
      '**El servidor** es la **cocina**: un computador que está en otro lugar, encendido todo el día, que prepara lo que se pide.',
      '**La base de datos** es la **despensa**: donde se guardan los ingredientes (usuarios, solicitudes, puntos).',
      'El cliente nunca entra a la cocina: solo recibe el plato. Del mismo modo, el visitante solo recibe la página terminada.'
    ] },
    { t: 'p', x: 'Una **página web** es un documento que el navegador muestra. Un **sitio web** es el conjunto de páginas de una misma empresa. La web de Marcos es el sitio de **Gestión Empresarial MF**.' },
    { t: 'h', x: '¿Para qué sirve la web de Marcos?' },
    { t: 'lista', items: [
      'Presentar la empresa (misión y visión).',
      'Ofrecer **servicios de transporte**: pasajeros, trasteos, mensajería, domicilios, alquiler de vehículos y carga.',
      'Ofrecer **espacios publicitarios** (un paquete con tabla de comisiones).',
      'Gestionar un **sistema de referidos con puntos**: cada usuario tiene un código de patrocinador, puede invitar hasta 5 personas y acumula puntos por los servicios.'
    ] },
    { t: 'h', x: 'Tres tipos de visitante' },
    { t: 'tabla', cabecera: ['Quién', 'Qué puede hacer'], filas: [
      ['Visitante sin cuenta', 'Ver portada, nosotros, servicios explicados, publicidad. Registrarse como Usuario o como Arrendatario.'],
      ['Usuario registrado', 'Iniciar sesión, ver su “Back office” (código, puntos, referidos) y pedir servicios.'],
      ['Administrador', 'Lo mismo + ver listados de solicitudes y borrar alquileres.']
    ] },
    { t: 'h', x: 'Lo que existe frente a lo que es una idea' },
    { t: 'p', x: 'Una **funcionalidad** es algo que la web permite hacer. Es muy importante distinguir lo que ya funciona de lo que solo aparece en pantalla o es una idea futura:' },
    { t: 'tabla', cabecera: ['Función', 'Estado real (comprobado)'], filas: [
      ['Iniciar sesión, registrarse, recuperar contraseña', '✅ Existe'],
      ['Página personal con puntos y referidos', '✅ Existe'],
      ['Pedir **alquiler de vehículo**', '✅ Existe: se guarda en la base de datos y se avisa por correo'],
      ['Pedir pasajeros, trasteos, mensajería, domicilios o carga', '⚠️ Solo en apariencia: el formulario lleva a “mantenimiento” y **no se guarda nada**'],
      ['“Otros Servicios”', '⏳ Página de mantenimiento'],
      ['Venta de camisas', '💭 Idea en duda: no existe ni se desarrollará hasta confirmarse'],
      ['Pagos con tarjeta, Nequi o Daviplata', '💭 Idea futura: se estudiará solo como concepto']
    ] },
    { t: 'nota', tipo: 'hecho', x: 'Estos estados se comprobaron leyendo el código y ejecutando una copia de la web en local el 28 de octubre de 2026.' },
    { t: 'pregunta', q: 'Si en la web real un cliente pide un trasteo, ¿le llega la solicitud a la empresa?', a: 'No. El formulario de trasteos lleva a `mantenimiento.html` y no envía nada a PHP ni a la base de datos. Es un buen ejemplo de por qué hay que comprobar, no suponer.' }
  ],

  conceptos: [
    { termino: 'Navegador', def: 'Programa para ver páginas web. Entiende HTML, CSS y JavaScript.', ejemplo: 'Marcos abre su web en Chrome del celular.' },
    { termino: 'Servidor', def: 'Computador remoto que guarda la web y responde a las visitas.', ejemplo: 'El hosting donde está publicada la web.' },
    { termino: 'Base de datos', def: 'Almacén organizado y permanente de datos.', ejemplo: 'Allí quedan los usuarios registrados y los alquileres.' },
    { termino: 'Página pública / privada', def: 'Pública: la ve cualquiera. Privada: solo con sesión iniciada.', ejemplo: '`nosotros.html` es pública; `personalPage.php` es privada.' },
    { termino: 'Funcionalidad', def: 'Algo que la web permite hacer de verdad.', ejemplo: 'Pedir un alquiler sí es una funcionalidad completa; pedir un trasteo, todavía no.' },
    { termino: 'Producción', def: 'La web real que usan los clientes. No se experimenta allí.', ejemplo: 'La web publicada de Gestión Empresarial MF.' }
  ],

  codigo: [
    { t: 'p', x: 'Hoy solo damos un **primer vistazo**. En cualquier página puedes pulsar **Ctrl+U** (o clic derecho → “Ver código fuente”) para ver el HTML que recibió el navegador. Nunca verás el PHP: ese se queda en la “cocina”.' },
    { t: 'p', x: 'Este es el formulario del login tal como está en el archivo `index.php`. No hace falta entender todo: fíjate en que se reconocen los textos que se ven en pantalla.' },
    { t: 'codigo', id: 'index-formulario', cerrado: true },
    { t: 'p', x: 'Y este es el formulario de “Transporte de Pasajeros”. La línea 60 explica por qué la solicitud no llega a ningún lado.' },
    { t: 'codigo', id: 'transporte-pasajeros', cerrado: true }
  ],

  diagrama: [
    { t: 'diagrama', id: 'mapa-sitio' },
    { t: 'diagrama', id: 'recorrido-visitante' }
  ],

  guiado: {
    minutos: 12,
    objetivo: 'Construir entre los dos el mapa de la web recorriéndola como visitante.',
    preparacion: ['Usar la web publicada **solo para mirar** (o la copia local si ya está lista).', 'No registrarse con datos reales: si hace falta, usar la copia local con usuarios de prueba.'],
    pasos: [
      { x: 'Abre la web. ¿Qué aparece primero? Anota el nombre del archivo que se ve en la barra de direcciones (`index.php`).', comprobar: 'Aparece el login con el logo a la izquierda.' },
      { x: 'Haz clic en el logo. Anota la nueva página (`inicio.html`) y los 3 recuadros que tiene.' },
      { x: 'Recorre el menú: Inicio, Nosotros, Registro Usuarios, Registro Arrendatarios, Iniciar Sesión. Para cada página anota: nombre del archivo, ¿pública o privada?, ¿qué se puede hacer?' },
      { x: 'Entra a “Transporte”: abre una ventana de servicio y lee qué pide. No envíes nada en la web real.' },
      { x: 'Entra a “Espacios Publicitarios” y a “Otros Servicios”. ¿Cuál de las dos está en construcción?' },
      { x: 'En una hoja dibuja cajas para cada página y flechas para los enlaces. Separa en tres zonas: pública, privada y administración.', comprobar: 'Compara tu dibujo con el diagrama “Mapa de la página” de esta clase.' },
      { x: 'Marca con un color las funciones que **existen** y con otro las que **solo aparentan** o son ideas futuras.' }
    ],
    cierre: 'Guarda una foto del mapa: lo usaremos en la Clase 2 para ubicar cada página en las carpetas del proyecto.'
  },

  individual: {
    minutos: 20,
    cuando: 'Tarea para antes de la Clase 2',
    consigna: [
      { t: 'p', x: 'Escribe la **ficha de tu web** respondiendo con tus palabras:' },
      { t: 'lista', ordenada: true, items: [
        '¿Para qué sirve la web? (máximo 3 frases).',
        '¿Qué 3 funciones nunca deberían dejar de funcionar? ¿Por qué?',
        '¿Qué cosas viste que no funcionan como esperabas?',
        '¿Qué te gustaría cambiar o agregar? Sepáralo en “cambios pequeños” e “ideas grandes”.',
        '¿Qué dudas tienes?'
      ] }
    ],
    entregable: 'La ficha escrita aquí abajo + la foto del mapa.',
    pistas: ['Piensa en tus clientes: ¿qué es lo primero que hacen al entrar?', 'Las “ideas grandes” (camisas, pagos) se anotan, pero no se desarrollan todavía.'],
    rubrica: ['Explica el propósito de la web sin términos técnicos.', 'Distingue al menos una función que existe y una que solo aparenta.', 'Separa cambios pequeños de ideas grandes.', 'Anota al menos 2 dudas concretas.']
  },

  comprobacion: [
    { q: '¿Qué diferencia hay entre el navegador y el servidor?', a: 'El navegador es el programa del visitante que muestra la página. El servidor es el computador remoto que guarda la web, la prepara y la envía.' },
    { q: '¿Qué puede hacer un visitante sin cuenta en la web de Marcos?', a: 'Ver la portada, nosotros, los servicios explicados y la publicidad, y registrarse como Usuario o Arrendatario.' },
    { q: '¿Por qué decimos que el servicio de trasteos “solo aparenta” funcionar?', a: 'Porque el formulario se ve y se puede llenar, pero envía a `mantenimiento.html` y no guarda la solicitud.' },
    { q: '¿Por qué no se hacen pruebas en la web real?', a: 'Porque la usan clientes reales: un error la dañaría para todos y podría afectar datos reales. Se prueba en una copia local.' }
  ],

  evaluacion: [
    { q: '¿Qué archivo se abre primero al entrar a la web?', opciones: ['`inicio.html`', '`index.php` (el login)', '`nosotros.html`'], correcta: 1, retro: 'El servidor abre `index.php` por defecto; el logo lleva luego a `inicio.html`.' },
    { q: 'En la analogía del restaurante, ¿qué es la base de datos?', opciones: ['La mesa del cliente', 'La cocina', 'La despensa donde se guardan los ingredientes'], correcta: 2, retro: 'La base de datos guarda de forma permanente usuarios, solicitudes y puntos.' },
    { q: '¿Qué servicio de transporte guarda hoy la solicitud de verdad?', opciones: ['Trasteos', 'Alquiler de vehículos', 'Todos'], correcta: 1, retro: 'Solo el alquiler envía a `assets/php/popUp.php`; los otros cinco van a `mantenimiento.html`.' },
    { q: '¿Cuántos referidos puede tener como máximo un patrocinador?', opciones: ['3', '5', 'Ilimitados'], correcta: 1, retro: 'El registro rechaza al sexto referido: “El patrocinador ya cuenta con sus 5 referidos”.' },
    { q: 'La venta de camisas…', opciones: ['ya existe en la web', 'es una idea en duda que no se desarrollará hasta confirmarse', 'está en mantenimiento'], correcta: 1, retro: 'Hay que separar lo que existe de las ideas futuras.' },
    { q: 'Al pulsar Ctrl+U en una página `.php`, ¿se ve el código PHP?', opciones: ['Sí, todo', 'No, solo el HTML que generó el servidor', 'Solo las contraseñas'], correcta: 1, retro: 'PHP se ejecuta en el servidor; al navegador solo llega el resultado.' }
  ],

  errores: [
    { tec: 'general', sintoma: 'Creer que todo lo que aparece en pantalla funciona', causa: 'Los formularios pueden verse completos aunque no estén conectados.', solucion: 'Comprobar en el código a dónde envía cada formulario (`action`).', real: '5 formularios de transporte van a `mantenimiento.html`.' },
    { tec: 'general', sintoma: 'Hacer pruebas en la web real', causa: 'Prisa o no tener copia local.', solucion: 'Montar la copia local (Clase 2) y probar allí.' },
    { tec: 'general', sintoma: 'Confundir `inicio.html` con `inicio.php`', causa: 'Tienen casi el mismo contenido.', solucion: '`inicio.html` es pública; `inicio.php` exige sesión y muestra el nombre del usuario.' }
  ],

  resumen: [
    'La web de Marcos presenta la empresa, ofrece servicios de transporte y publicidad, y gestiona referidos con puntos.',
    'El navegador muestra; el servidor prepara; la base de datos guarda.',
    'Hay una parte pública (`.html`), una privada (`.php`) y una de administración.',
    'Solo el alquiler de vehículos guarda solicitudes; los otros servicios aún no.',
    'Camisas y pagos son ideas futuras, no funciones existentes.'
  ],
  criterios: [
    'Marcos explica el propósito de la web en sus palabras.',
    'Distingue página pública de privada con un ejemplo.',
    'Señala qué servicio funciona y cuáles no.',
    'Tiene un mapa de la página (dibujo o foto).',
    'Obtuvo 70 % o más en la evaluación (o se repasó lo fallado).'
  ],
  tareaCasa: 'Completar la ficha de la web (ejercicio individual).',

  guionIntro: 'Clase de bienvenida: ningún término técnico sin una imagen cotidiana detrás. El objetivo es que Marcos se sienta dueño de su web y entienda que vamos a estudiarla, no a rehacerla.',
  guion: [
    { leccion: 'objetivo', decir: 'Vamos a aprender cómo está hecha tu web para que puedas mantenerla y mejorarla sin depender de nadie. Hoy no tocamos código: hoy la conocemos.', hacer: 'Mostrar la página de inicio de la plataforma y las tres reglas de oro.' },
    { leccion: 'explicacion', decir: 'Imagina un restaurante: tú ves la mesa, pero la comida se prepara en la cocina y los ingredientes están en la despensa. Tu web funciona igual.', preguntar: '¿Qué crees que pasa cuando alguien se registra en tu web? ¿Dónde queda guardado?' },
    { leccion: 'diagrama', hacer: 'Recorrer la web real con el mapa del sitio en otra pestaña, señalando cada caja mientras se visita la página.', preguntar: '¿Esta página la puede ver cualquiera o solo quien tiene cuenta?' },
    { leccion: 'guiado', hacer: 'Dar la hoja a Marcos y que él dibuje. No corregir el dibujo: comparar al final con el diagrama.', decir: 'No importa que quede bonito; importa que esté todo.' },
    { leccion: 'codigo', decir: 'Esto que ves con Ctrl+U es lo que le llega al navegador. El PHP nunca se ve desde fuera, como la receta que se queda en la cocina.' },
    { leccion: 'evaluacion', decir: 'No es un examen: es para saber qué repasar. Si fallas, miramos juntos por qué.' },
    { leccion: 'resumen', hacer: 'Confirmar con Marcos la duración de los lunes (90 o 60 min) y anotar sus dudas en “Notas del profesor”.' }
  ]
});
