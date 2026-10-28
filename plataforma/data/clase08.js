/* Clase 8 — Mantenimiento básico */
FA.registrarClase({
  numero: 8,
  titulo: 'Mantenimiento básico',
  objetivoCorto: 'Copias de seguridad, revisión, diagnóstico y prueba antes de publicar.',
  objetivo: 'Que Marcos sepa **crear y restaurar copias de seguridad**, revisar enlaces, imágenes, formularios y navegación, **distinguir si un problema es de HTML, CSS, JavaScript, PHP o SQL**, probar antes de publicar y seguir una lista de mantenimiento preventivo.',
  resultado: 'Lista de mantenimiento y procedimiento de respaldo y prueba.',
  previos: ['Clases 3 a 7.', 'Copia local con la base de prueba.'],
  plan: {
    sesion60: [
      { actividad: 'Objetivo', leccion: 'objetivo', min: 3 },
      { actividad: 'Copias de seguridad, restauración y cómo publicar con cuidado', leccion: 'explicacion', min: 12 },
      { actividad: 'Diagramas: dónde está el problema y procedimiento de cambio seguro', leccion: 'diagrama', min: 8 },
      { actividad: 'Ejercicio guiado: diagnosticar un error real del registro', leccion: 'guiado', min: 20 },
      { actividad: 'Evaluación', leccion: 'evaluacion', min: 5 },
      { actividad: 'Resumen y lista de mantenimiento', leccion: 'resumen', min: 5 }
    ],
    flexible: 7,
    ampliacion90: [
      { actividad: 'Conceptos clave', leccion: 'conceptos', min: 5 },
      { actividad: 'Código real del error diagnosticado', leccion: 'codigo', min: 8 },
      { actividad: 'Ejercicio individual: revisión completa de la copia local', leccion: 'individual', min: 12 },
      { actividad: 'Errores frecuentes por capa', leccion: 'errores', min: 5 }
    ],
    posponer: 'El diagnóstico guiado no se recorta. Si falta tiempo, la revisión completa (individual) queda como tarea con su lista.'
  },

  explicacion: [
    { t: 'p', x: 'Mantener una web es como mantener un carro: revisiones periódicas, arreglos pequeños a tiempo y **nunca** desarmar el motor en plena carretera.' },
    { t: 'h', x: '1. Copias de seguridad' },
    { t: 'tabla', cabecera: ['Qué', 'Cómo', 'Cuándo'], filas: [
      ['Archivos', 'Copiar la carpeta completa del sitio (o descargarla del hosting desde el administrador de archivos/FTP) y comprimirla como `web-AAAA-MM-DD.zip`', 'Antes de cualquier cambio y una vez al mes'],
      ['Base de datos', 'phpMyAdmin → Exportar → `bd-AAAA-MM-DD.sql`', 'Antes de tocar datos o PHP que escriba datos; una vez al mes'],
      ['Un solo archivo', 'Duplicarlo con fecha: `nosotros.respaldo-AAAA-MM-DD.html`', 'Antes de editarlo']
    ] },
    { t: 'nota', tipo: 'tip', titulo: 'Regla práctica 3-2-1 (simplificada)', x: 'Ten **3** copias de lo importante, en **2** lugares distintos (computador y disco externo o nube privada), y **1** fuera de casa. Y prueba de vez en cuando que la copia **se puede restaurar**.' },
    { t: 'nota', tipo: 'alerta', titulo: 'Las copias de la base real contienen datos personales', x: 'Guárdalas en un lugar privado. Nunca en repositorios públicos ni compartidas por chat.' },
    { t: 'h', x: '2. Restaurar' },
    { t: 'lista', ordenada: true, items: ['Identificar qué archivo o tabla falló.', 'Reemplazar el archivo dañado por el de la copia (o importar el `.sql`).', 'Probar que la web volvió a funcionar.', 'Anotar qué pasó para no repetirlo.'] },
    { t: 'h', x: '3. Revisar la web (checklist)' },
    { t: 'lista', items: [
      '**Enlaces**: recorrer el menú y cada botón. ¿Alguno da “Not Found”?',
      '**Imágenes**: ¿todas cargan? F12 → Red, filtrar por “Img” y buscar errores 404.',
      '**Formularios**: login, registro, recuperación y alquiler (en local). ¿Guardan?',
      '**Navegación en celular**: menú ☰, ventanas, que nada se salga de la pantalla.',
      '**Consola**: sin errores rojos.',
      '**Servidor**: el log de errores del hosting sin errores nuevos.'
    ] },
    { t: 'h', x: '4. ¿Dónde está el problema?' },
    { t: 'p', x: 'Cada capa falla de forma distinta. Identificar la capa ahorra mucho tiempo (ver el diagrama de esta clase).' },
    { t: 'h', x: '5. Probar antes de publicar' },
    { t: 'lista', ordenada: true, items: [
      'Hacer el cambio en la copia local.',
      'Probar en computador y en modo celular; revisar consola.',
      'Si toca formularios o PHP, probar el flujo completo con usuarios de prueba.',
      'Hacer copia de seguridad del archivo en el servidor.',
      'Subir solo los archivos cambiados.',
      'Probar en la web real lo que se cambió (sin crear datos falsos innecesarios).',
      'Si algo falla: volver a subir el archivo de la copia.'
    ] },
    { t: 'nota', tipo: 'hipotesis', titulo: 'Publicación', x: 'No se tuvo acceso al hosting real. Lo habitual es publicar con el administrador de archivos del panel (cPanel u otro) o por FTP/SFTP. Confirmar con quien administra el hosting cuál se usa y quién tiene las credenciales (que nunca se escriben en el código).' }
  ],

  conceptos: [
    { termino: 'Copia de seguridad', def: 'Duplicado guardado aparte para restaurar si algo falla.', ejemplo: '`web-2026-11-25.zip` y `bd-2026-11-25.sql`.' },
    { termino: 'Error 404 / 500', def: '404: archivo no encontrado. 500: el servidor falló al ejecutar (casi siempre PHP).', ejemplo: 'Una imagen con ruta mal escrita da 404.' },
    { termino: 'Log de errores', def: 'Registro donde el servidor anota los fallos.', ejemplo: 'El log de `php -S` mostró el error de `spentPayPointUser`.' },
    { termino: 'Modo estricto de MySQL', def: 'Configuración que rechaza datos incompletos o inválidos en lugar de “arreglarlos” en silencio.', ejemplo: 'Activado por defecto en las versiones recientes de MySQL y MariaDB; por eso el registro falla en la copia local.' },
    { termino: 'Mantenimiento preventivo', def: 'Revisiones periódicas para detectar problemas antes de que los vean los clientes.', ejemplo: 'Checklist mensual.' }
  ],

  codigo: [
    { t: 'p', x: 'El error que diagnosticamos en el ejercicio guiado viene de la combinación de estos dos fragmentos:' },
    { t: 'codigo', id: 'registro-insert' },
    { t: 'codigo', id: 'sql-puntos' },
    { t: 'p', x: 'Otros dos errores pequeños encontrados al revisar el código (ninguno rompe la página, pero conviene corregirlos en una copia):' },
    { t: 'codigo', id: 'header-css-media', cerrado: true },
    { t: 'codigo', id: 'transporte-pasajeros', cerrado: true }
  ],

  diagrama: [
    { t: 'diagrama', id: 'diagnostico' },
    { t: 'diagrama', id: 'cambio-seguro' }
  ],

  guiado: {
    minutos: 20,
    objetivo: 'Reproducir, diagnosticar y corregir (en local) un error real: el registro de un usuario nuevo falla a mitad.',
    preparacion: ['Copia local con XAMPP. Las versiones recientes de MariaDB/MySQL traen el modo estricto activado por defecto; si el error no aparece, actívalo en la base de prueba con `SET GLOBAL sql_mode = \'STRICT_TRANS_TABLES\';` en la pestaña SQL.', 'Exportar la base de prueba antes de empezar.'],
    pasos: [
      { x: '**Reproducir**: en la copia local, registra un usuario nuevo inventado (`carla@prueba.test`) sin código de patrocinador.', comprobar: 'Aparece un error (“Fatal error … Field \'spentPayPointUser\' doesn\'t have a default value”) o la página queda incompleta.' },
      { x: '**Clasificar la capa** con el diagrama: ¿es HTML, CSS, JS, PHP o SQL?', comprobar: 'El mensaje lo lanza PHP, pero la causa es SQL: una columna obligatoria.' },
      { x: '**Ver el efecto en los datos**: phpMyAdmin → `users` y `userpoints`.', comprobar: 'Carla está en `users` pero **no** en `userpoints`: quedó a medio registrar.' },
      { x: '**Leer el código**: `registerUserCustomer.php` líneas 47-50 (el INSERT en `userpoints`) y la estructura de `userpoints`. ¿Qué columna falta?', comprobar: '`spentPayPointUser` es `NOT NULL` y no está en el INSERT.' },
      { x: '**Elegir una corrección** (en la copia local). Opción A: dar valor por defecto a la columna. Opción B: incluirla en los 4 INSERT (2 por archivo de registro). Discute cuál es más sencilla de mantener.', codigo: "ALTER TABLE userpoints\n  MODIFY spentPayPointUser varchar(15) NOT NULL DEFAULT '0';", lang: 'sql', tituloCodigo: 'Opción A (un solo cambio, en la base de prueba)' },
      { x: 'Aplica la opción A en la base de prueba (pestaña SQL). Borra a Carla de `users` (`DELETE … WHERE emailUser = \'carla@prueba.test\'`) y repite el registro.', comprobar: 'Ahora el registro termina (salvo el error de correo, esperado en local) y Carla aparece en ambas tablas.' },
      { x: '**Documentar**: qué fallaba, por qué, qué se cambió y cómo se probó. En producción, este cambio se haría con respaldo de la base y autorización.' }
    ],
    cierre: 'Diagnosticar es: reproducir → ubicar la capa → mirar datos y log → leer el código → corregir en local → probar → documentar.'
  },

  individual: {
    minutos: 12,
    cuando: 'En clase (90 min) o como tarea',
    consigna: [
      { t: 'p', x: 'Haz una **revisión completa** de la copia local usando el checklist de la explicación y completa una lista de mantenimiento propia con: *qué revisar · cada cuánto · cómo · qué hacer si falla*.' },
      { t: 'p', x: 'Incluye al menos: copias (archivos y base), enlaces, imágenes, formularios, celular, consola y log del servidor.' }
    ],
    entregable: 'Resultado de la revisión (qué encontraste) y tu lista de mantenimiento.',
    pistas: ['Revisa también los PDF de `publicidad.html`.', 'En `nosotros.html` los íconos de redes llevan a `#`.'],
    rubrica: ['Revisó todas las páginas públicas y privadas.', 'Encontró al menos 2 problemas reales (ver Errores).', 'La lista tiene frecuencia y acción para cada punto.', 'Incluye probar la restauración de una copia.']
  },

  comprobacion: [
    { q: 'La página de Nosotros se ve sin colores ni tamaños. ¿Qué capa sospechas y qué revisas?', a: 'CSS: revisar en F12 → Red si `cuadrosNosotros.css` cargó (404) y si el `<link>` tiene la ruta correcta.' },
    { q: 'Al iniciar sesión aparece una página en blanco. ¿Qué capa y dónde miras?', a: 'PHP: el log de errores del servidor; luego el último archivo PHP modificado.' },
    { q: '¿Por qué el registro deja usuarios “a medias” con MySQL estricto?', a: 'Porque el primer INSERT (users) funciona y el segundo (userpoints) falla por la columna obligatoria, y el código no revisa ese fallo.' },
    { q: '¿Qué haces si después de publicar un cambio la web real falla?', a: 'Volver a subir el archivo de la copia de seguridad, comprobar que funciona y luego analizar el error en local.' }
  ],

  evaluacion: [
    { q: 'Un botón no responde y la consola muestra un error rojo. La capa es…', opciones: ['JavaScript', 'SQL', 'CSS'], correcta: 0, retro: 'Los errores de la consola son de JavaScript (o de recursos que no cargaron).' },
    { q: 'Una imagen no aparece y en F12 → Red figura con 404. ¿Qué significa?', opciones: ['El archivo no se encontró en esa ruta', 'El servidor de base de datos falló', 'El CSS está mal'], correcta: 0, retro: 'Revisar la ruta del `src` y el nombre exacto.' },
    { q: '¿Qué va primero antes de editar un archivo de la web real?', opciones: ['Copia de seguridad', 'Publicar', 'Borrar la caché'], correcta: 0, retro: 'Siempre respaldo primero.' },
    { q: 'En la copia local el registro dice “Field \'spentPayPointUser\' doesn\'t have a default value”. La causa está en…', opciones: ['la estructura de la tabla `userpoints` y el INSERT que no incluye esa columna', 'el CSS del formulario', 'jQuery'], correcta: 0, retro: 'Es un error de datos (SQL) que PHP muestra.' },
    { q: '¿Con qué frecuencia conviene exportar la base real, como mínimo?', opciones: ['Nunca', 'Antes de cambios y periódicamente (p. ej. cada mes)', 'Solo si se daña'], correcta: 1, retro: 'Una copia que no existe no se puede restaurar.' }
  ],

  errores: [
    { tec: 'general', sintoma: 'Se perdió un cambio que funcionaba', causa: 'Se sobrescribió con una versión vieja.', solucion: 'Nombrar copias con fecha y anotar qué contiene cada una.' },
    { tec: 'html', sintoma: 'Íconos de redes que no llevan a ningún lado', causa: 'Enlaces con `href="#"`.', solucion: 'Poner las direcciones reales.', real: '`nosotros.html` (las otras páginas sí tienen los enlaces).' },
    { tec: 'css', sintoma: 'Algo se ve bien en computador y mal en celular', causa: 'Anchos fijos o falta de media query.', solucion: 'Probar siempre en modo celular antes de publicar.' },
    { tec: 'php', sintoma: 'El error solo aparece en la web real', causa: 'Diferente versión de PHP/MySQL o configuración (modo estricto).', solucion: 'Anotar versiones de ambos entornos; revisar el log del hosting.' },
    { tec: 'sql', sintoma: 'Usuarios sin fila de puntos', causa: 'Registro interrumpido.', solucion: 'Corregir la causa (columna obligatoria) y revisar en la base real con SELECT cuántos usuarios no tienen fila en `userpoints`, con autorización.' }
  ],

  resumen: [
    'Copias de archivos y base antes de cambiar y periódicamente; probar que se pueden restaurar.',
    'Checklist: enlaces, imágenes, formularios, celular, consola, log.',
    'Cada capa falla distinto: identifícala antes de tocar código.',
    'Cambiar en local → probar → respaldar → publicar → probar → restaurar si falla.',
    'Diagnosticar = reproducir, ubicar, leer, corregir en local, probar, documentar.'
  ],
  criterios: [
    'Crea y restaura una copia de archivos y de la base.',
    'Clasifica correctamente 3 síntomas por capa.',
    'Reprodujo y explicó el error del registro.',
    'Tiene su lista de mantenimiento preventivo.',
    'Describe los pasos para publicar un cambio y revertirlo.'
  ],
  tareaCasa: 'Revisión completa y lista de mantenimiento (ejercicio individual).',

  guionIntro: 'Clase de “detective”. El error del registro es real y está en la web: usarlo para mostrar que diagnosticar es un método, no adivinar.',
  guion: [
    { leccion: 'explicacion', decir: 'Mantener la web es como mantener el carro: revisiones, repuestos a tiempo y una llanta de repuesto (la copia de seguridad).' },
    { leccion: 'diagrama', preguntar: 'Si un cliente te dice “no me deja registrarme”, ¿qué capas podrían ser? ¿Cómo lo averiguas?' },
    { leccion: 'guiado', decir: 'Este error no lo inventamos: está en tu web. Vamos a encontrarlo como lo haría un profesional.', hacer: 'No decir la respuesta: guiar con preguntas (¿qué dice el mensaje? ¿qué tabla? ¿qué columna?).' },
    { leccion: 'codigo', decir: 'Fíjate que el INSERT nombra 7 columnas y la tabla tiene 9. Una de las que faltan es obligatoria.' },
    { leccion: 'resumen', hacer: 'Pedir a Marcos que redacte su procedimiento de respaldo con sus palabras y guardarlo en las notas.' }
  ]
});
