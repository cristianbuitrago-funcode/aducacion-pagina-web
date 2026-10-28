/* Clase 7 — SQL y base de datos */
FA.registrarClase({
  numero: 7,
  titulo: 'SQL y base de datos',
  objetivoCorto: 'Tablas, claves y las 4 consultas básicas, solo en local.',
  objetivo: 'Que Marcos entienda tablas, columnas, registros y claves; escriba consultas `SELECT`, `INSERT`, `UPDATE` y `DELETE` **en la base de prueba**; sepa cómo PHP se conecta y qué tablas usa cada función; y que haga **copia de seguridad antes de cambiar datos**.',
  resultado: 'Diagrama básico de datos y una consulta de prueba segura.',
  previos: ['Clase 6: recorrido del alquiler.', 'phpMyAdmin con la base de prueba (`recursos/bd-prueba.sql`).'],
  plan: {
    sesion60: [
      { actividad: 'Objetivo y regla: solo en la base de prueba', leccion: 'objetivo', min: 3 },
      { actividad: 'Tablas, columnas, claves y las 4 consultas', leccion: 'explicacion', min: 15 },
      { actividad: 'Código real: estructura de `users`, alquileres y claves', leccion: 'codigo', min: 10 },
      { actividad: 'Diagrama de la base de datos', leccion: 'diagrama', min: 7 },
      { actividad: 'Ejercicio guiado en phpMyAdmin (respaldo → consultas → restaurar)', leccion: 'guiado', min: 17 },
      { actividad: 'Resumen', leccion: 'resumen', min: 3 }
    ],
    flexible: 5,
    ampliacion90: [
      { actividad: 'Conceptos clave', leccion: 'conceptos', min: 5 },
      { actividad: 'Ejercicio individual: consultas propias', leccion: 'individual', min: 12 },
      { actividad: 'Evaluación', leccion: 'evaluacion', min: 6 },
      { actividad: 'Errores frecuentes e inyección SQL', leccion: 'errores', min: 7 }
    ],
    posponer: 'Si falta tiempo, el `DELETE` y la restauración del ejercicio guiado se hacen al inicio de la Clase 8 (es buena introducción al mantenimiento).'
  },

  explicacion: [
    { t: 'nota', tipo: 'alerta', titulo: 'Regla de esta clase', x: 'Todo se practica en la **base de prueba local**. Nunca se ejecutan consultas de cambio (`INSERT`, `UPDATE`, `DELETE`) en la base real. Y antes de cambiar datos, **exportar una copia**.' },
    { t: 'p', x: 'Una **base de datos** guarda información de forma organizada y permanente. MySQL organiza los datos en **tablas**, parecidas a hojas de cálculo.' },
    { t: 'nota', tipo: 'analogia', titulo: 'Analogía: un archivador', items: [
      'La **base de datos** es el archivador.',
      'Cada **tabla** es un cajón: `users`, `carrentalservice`…',
      'Cada **registro (fila)** es una ficha: un usuario.',
      'Cada **columna** es un dato de la ficha: nombre, correo.',
      'La **clave primaria** es el número único de cada ficha (`idUser`).',
      'La **clave foránea** es una nota en una ficha que dice “ver ficha n.º X del otro cajón” (`carrentalservice.idUser`).'
    ] },
    { t: 'h', x: 'Las cuatro consultas básicas' },
    { t: 'ejemplo', lang: 'sql', titulo: 'Leer — SELECT', codigo: "SELECT namesUser, emailUser FROM users WHERE rolUser = 'Cliente';\nSELECT * FROM carrentalservice ORDER BY dateServiceTaken DESC;\nSELECT COUNT(*) FROM users;" },
    { t: 'ejemplo', lang: 'sql', titulo: 'Crear — INSERT', codigo: "INSERT INTO carrentalservice\n  (idUser, addressCarRentalExit, addressCarRentalFinal, dateCarRental, timeCarRentalExit, hoursCarRental, contactCarRental, dateServiceTaken)\nVALUES (2, 'Calle 1', 'Calle 2', '2026-11-10', '09:00', 1, '3000000002', NOW());" },
    { t: 'ejemplo', lang: 'sql', titulo: 'Cambiar — UPDATE (¡siempre con WHERE!)', codigo: "UPDATE carrentalservice SET hoursCarRental = 4 WHERE idCarRentalService = 1;" },
    { t: 'ejemplo', lang: 'sql', titulo: 'Borrar — DELETE (¡siempre con WHERE!)', codigo: "-- Primero mira qué vas a borrar:\nSELECT * FROM carrentalservice WHERE idCarRentalService = 3;\n-- Solo si es lo que esperabas:\nDELETE FROM carrentalservice WHERE idCarRentalService = 3;" },
    { t: 'nota', tipo: 'seguridad', titulo: 'Sin WHERE, se cambia TODO', x: '`UPDATE carrentalservice SET hoursCarRental = 4;` cambia **todas** las filas. `DELETE FROM users;` borra **todos** los usuarios, y por `ON DELETE CASCADE` también **todos** sus servicios.' },
    { t: 'h', x: 'Unir tablas: JOIN' },
    { t: 'ejemplo', lang: 'sql', titulo: 'Alquileres con el nombre de quien los pidió', codigo: "SELECT u.namesUser, c.hoursCarRental, c.dateCarRental\nFROM carrentalservice c\nJOIN users u ON u.idUser = c.idUser;" },
    { t: 'h', x: 'Cómo PHP habla con MySQL' },
    { t: 'lista', ordenada: true, items: [
      '`bd/conexion.php` crea `$conexion = new mysqli(servidor, usuario, contraseña, base)`.',
      'Los archivos arman el texto de la consulta y la ejecutan: `$conexion->query("SELECT …")`.',
      'Leen los resultados con `fetch_assoc()` (una fila) o recorriéndolos con `while`/`foreach`.'
    ] },
    { t: 'h', x: '¿Qué tablas usa una función?' },
    { t: 'p', x: 'Busca en el archivo PHP las palabras `FROM`, `INTO`, `UPDATE` y `DELETE FROM`. Lo que va después es el nombre de la tabla. Ejemplo: en `popUp.php` aparece `INSERT INTO carrentalservice` y `FROM users`.' },
    { t: 'h', x: 'Consultas preparadas: la forma segura' },
    { t: 'p', x: 'Hoy la web pega los datos dentro del texto SQL. Si un dato no se limpia, alguien podría escribir algo que **cambie el sentido de la consulta** (inyección SQL). La solución son las **consultas preparadas**: la consulta lleva `?` y los datos viajan aparte.' },
    { t: 'ejemplo', lang: 'php', titulo: 'Así se reescribiría la consulta de dataReferred.php', codigo: "// Antes (inseguro):\n// $resultado_pru = $conexion->query(\"SELECT * FROM users WHERE codeUserFriend = '$prue'\");\n\n// Después (consulta preparada):\n$stmt = $conexion->prepare('SELECT * FROM users WHERE codeUserFriend = ?');\n$stmt->bind_param('s', $prue);   // 's' = el dato es texto\n$stmt->execute();\n$resultado_pru = $stmt->get_result();" },
    { t: 'h', x: 'Copias de seguridad de la base' },
    { t: 'lista', items: [
      'phpMyAdmin → seleccionar la base → **Exportar** → método rápido, formato SQL → Continuar. Guarda el `.sql` con la fecha en el nombre.',
      'Restaurar: crear la base vacía (o vaciarla) → **Importar** → elegir el archivo.',
      'Las exportaciones de la base real contienen datos personales: guardarlas en un lugar privado y nunca subirlas a repositorios.'
    ] }
  ],

  conceptos: [
    { termino: 'Tabla / columna / registro', def: 'Cajón / dato de la ficha / ficha.', ejemplo: '`users` / `emailUser` / un usuario.' },
    { termino: 'Clave primaria', def: 'Identificador único de cada fila.', ejemplo: '`idUser`, `idCarRentalService`.' },
    { termino: 'Clave foránea', def: 'Columna que apunta a la clave primaria de otra tabla.', ejemplo: '`carrentalservice.idUser → users.idUser`.' },
    { termino: 'ON DELETE CASCADE', def: 'Al borrar la fila “padre”, se borran sus filas “hijas”.', ejemplo: 'Borrar un usuario borra sus alquileres.' },
    { termino: 'Consulta preparada', def: 'Consulta con `?` y datos enviados aparte. Evita la inyección SQL.', ejemplo: 'Reescritura de `dataReferred.php`.' },
    { termino: 'Exportar / importar', def: 'Sacar una copia `.sql` de la base / cargarla.', ejemplo: 'phpMyAdmin → Exportar.' }
  ],

  codigo: [
    { t: 'codigo', id: 'sql-users' },
    { t: 'codigo', id: 'sql-alquiler' },
    { t: 'codigo', id: 'sql-puntos', cerrado: true },
    { t: 'codigo', id: 'sql-claves', cerrado: true },
    { t: 'codigo', id: 'sql-foranea' },
    { t: 'codigo', id: 'sql-cabecera', cerrado: true },
    { t: 'p', x: 'Consultas reales dentro del PHP:' },
    { t: 'codigo', id: 'referidos-get' },
    { t: 'codigo', id: 'admin-borrar', cerrado: true }
  ],

  diagrama: [{ t: 'diagrama', id: 'er-bd' }],

  guiado: {
    minutos: 17,
    objetivo: 'Practicar las 4 consultas en la base de prueba, con copia antes y restauración al final.',
    preparacion: ['phpMyAdmin abierto en `http://localhost/phpmyadmin`, base `gestione_gestionempresarial` (la de prueba).', 'Confirmar que es la base **local**: la dirección empieza por `localhost`.'],
    pasos: [
      { x: '**Copia**: Exportar la base → guardar como `bd-prueba-AAAA-MM-DD.sql`.', comprobar: 'El archivo está en Descargas.' },
      { x: 'Pestaña **SQL**: `SELECT * FROM users;`', comprobar: '3 usuarios de prueba (Admin, Ana, Beto).' },
      { x: '`SELECT namesUser, codeUserSponsor, codeUserFriend FROM users;` — ¿quién refirió a quién?', comprobar: 'Ana fue referida por ADM001 (Admin); Beto por ANA002 (Ana).' },
      { x: 'Ejecuta el JOIN de la explicación (alquileres con nombre).', comprobar: 'Se ve el nombre de cada usuario junto a sus horas.' },
      { x: '**INSERT**: agrega un alquiler de 1 hora para Ana (ejemplo de la explicación). Abre su página personal en la web local.', comprobar: 'Los puntos de Ana subieron 180.' },
      { x: '**UPDATE**: cambia a 4 las horas del alquiler que acabas de crear (`WHERE idCarRentalService = …` con su id).', comprobar: 'Solo cambió esa fila.' },
      { x: '**DELETE**: primero `SELECT … WHERE idCarRentalService = …`, luego el `DELETE` con el mismo `WHERE`.', comprobar: 'La fila desapareció y los puntos bajaron.' },
      { x: '**Restaurar**: Importar el archivo del paso 1 (si phpMyAdmin avisa que las tablas existen, primero vaciar la base desde Operaciones o eliminar las tablas).', comprobar: 'La base vuelve a tener solo los datos iniciales.' }
    ],
    cierre: 'Este es el protocolo para cualquier cambio de datos: copia → mirar con SELECT → cambiar con WHERE → comprobar → restaurar si algo sale mal.'
  },

  individual: {
    minutos: 12,
    consigna: [
      { t: 'p', x: 'Escribe y ejecuta en la base de prueba las consultas que respondan:' },
      { t: 'lista', ordenada: true, items: [
        '¿Cuántos usuarios hay de cada rol? (pista: `GROUP BY`).',
        '¿Cuántas horas de alquiler en total ha pedido Beto?',
        '¿Qué usuarios no tienen ningún alquiler?',
        'Busca en el código PHP: ¿qué tablas usa `personalPageUser.php`?'
      ] }
    ],
    entregable: 'Las consultas, sus resultados y la lista de tablas.',
    pistas: ['`SELECT rolUser, COUNT(*) FROM users GROUP BY rolUser;`', 'Para la 2: `SUM(hoursCarRental)` con `WHERE idUser = 3`.', 'Para la 3: `LEFT JOIN` y `WHERE c.idUser IS NULL`.'],
    rubrica: ['Solo usó SELECT (no modificó datos).', 'Las consultas devuelven resultados correctos.', 'Identificó `users`, `carrentalservice` y `userpoints` en `personalPageUser.php`.'],
    solucion: [{ t: 'ejemplo', lang: 'sql', titulo: 'Soluciones de referencia', codigo: "SELECT rolUser, COUNT(*) FROM users GROUP BY rolUser;\nSELECT SUM(hoursCarRental) FROM carrentalservice WHERE idUser = 3;\nSELECT u.namesUser FROM users u\nLEFT JOIN carrentalservice c ON c.idUser = u.idUser\nWHERE c.idUser IS NULL;" }]
  },

  comprobacion: [
    { q: '¿Qué pasa si ejecutas `UPDATE carrentalservice SET hoursCarRental = 4;` sin WHERE?', a: 'Cambia las horas de TODAS las filas de la tabla.' },
    { q: '¿Qué significa `ON DELETE CASCADE` en las tablas de servicios?', a: 'Que al borrar un usuario se borran automáticamente todas sus solicitudes.' },
    { q: '¿Cómo sabes qué tablas usa un archivo PHP?', a: 'Buscando `FROM`, `INTO`, `UPDATE` y `DELETE FROM` en el archivo.' },
    { q: '¿Por qué son más seguras las consultas preparadas?', a: 'Porque los datos viajan separados de la consulta y no pueden cambiar su sentido.' }
  ],

  evaluacion: [
    { q: '¿Qué consulta lee datos sin modificarlos?', opciones: ['`SELECT`', '`UPDATE`', '`DELETE`'], correcta: 0, retro: 'SELECT es la única de las cuatro que no cambia nada.' },
    { q: '¿Cuál es la clave primaria de `users`?', opciones: ['`emailUser`', '`idUser`', '`codeUserSponsor`'], correcta: 1, retro: 'Se define con `ADD PRIMARY KEY (idUser)`.' },
    { q: '`carrentalservice.idUser` es…', opciones: ['una clave foránea hacia `users.idUser`', 'la clave primaria de alquileres', 'un texto libre'], correcta: 0, retro: 'Relaciona cada alquiler con un usuario.' },
    { q: 'Antes de un `DELETE` en una base con datos importantes hay que…', opciones: ['exportar una copia y revisar con `SELECT` las filas afectadas', 'nada', 'borrar el WHERE'], correcta: 0, retro: 'Protocolo: copia → SELECT → DELETE con WHERE → comprobar.' },
    { q: '¿Por qué falla el registro con MySQL estricto?', opciones: ['Porque `userpoints.spentPayPointUser` es obligatoria y el INSERT no la incluye', 'Porque falta internet', 'Porque `users` no existe'], correcta: 0, retro: 'Se reproducirá y diagnosticará en la Clase 8.' },
    { q: '¿Qué técnica evita la inyección SQL?', opciones: ['Consultas preparadas con `?` y `bind_param`', 'Usar mayúsculas', 'Poner la consulta en JavaScript'], correcta: 0, retro: 'Es la corrección recomendada para todo el PHP de la web.' }
  ],

  errores: [
    { tec: 'sql', sintoma: 'Se modificaron muchas filas', causa: 'UPDATE/DELETE sin WHERE.', solucion: 'Restaurar la copia. Escribir siempre primero el SELECT.' },
    { tec: 'sql', sintoma: '“Cannot add or update a child row: a foreign key constraint fails”', causa: 'Se intenta guardar un `idUser` que no existe en `users`.', solucion: 'Usar un id de usuario existente.' },
    { tec: 'sql', sintoma: '“Field … doesn\'t have a default value”', causa: 'Falta una columna obligatoria en el INSERT.', solucion: 'Incluirla o darle valor por defecto.', real: '`userpoints.spentPayPointUser` en el registro.' },
    { tec: 'sql', sintoma: 'Al importar: “Table already exists”', causa: 'La base ya tiene esas tablas.', solucion: 'Vaciar la base (eliminar tablas) antes de importar la copia.' },
    { tec: 'sql', sintoma: 'Consulta con un dato que contiene comilla (O\'Brien) falla', causa: 'El dato se pegó dentro del SQL.', solucion: 'Consultas preparadas.' }
  ],

  resumen: [
    'Tablas = cajones; filas = fichas; columnas = datos; clave primaria = número único; clave foránea = referencia a otra tabla.',
    'SELECT lee; INSERT crea; UPDATE cambia; DELETE borra. UPDATE y DELETE siempre con WHERE.',
    'PHP usa `$conexion->query(...)`; lo seguro es usar consultas preparadas.',
    'Antes de cambiar datos: exportar copia. Practicar solo en la base de prueba.'
  ],
  criterios: [
    'Lee el diagrama de la base e identifica la tabla central y una clave foránea.',
    'Escribe un SELECT con WHERE y un JOIN sencillo.',
    'Hizo copia, cambió datos de prueba y restauró.',
    'Explica el peligro de UPDATE/DELETE sin WHERE.',
    'Explica con sus palabras qué es la inyección SQL y cómo se evita.'
  ],
  tareaCasa: 'Consultas del ejercicio individual.',

  guionIntro: 'La base de datos asusta porque “se pueden perder datos”. Por eso la clase empieza y termina con la copia de seguridad: demuestra que equivocarse en local no cuesta nada.',
  guion: [
    { leccion: 'objetivo', decir: 'Hoy vamos a la despensa. Regla: solo en la de práctica, y siempre con copia.' },
    { leccion: 'explicacion', decir: 'Una tabla es como un cajón de fichas. El `WHERE` es decir “solo esta ficha”; sin él, la orden se aplica a todo el cajón.', preguntar: '¿Qué pasaría si borro un usuario que tiene alquileres?' },
    { leccion: 'diagrama', hacer: 'Pedir a Marcos que señale en el diagrama de dónde salen los puntos de su página personal.' },
    { leccion: 'guiado', hacer: 'Dejar que Marcos escriba cada consulta. Si comete un error de sintaxis, leer juntos el mensaje de MySQL.' },
    { leccion: 'errores', decir: 'La inyección SQL es como si alguien escribiera en la ficha de pedido “y además dame toda la caja”. Las consultas preparadas separan la orden de los datos.' },
    { leccion: 'resumen', decir: 'Copia, SELECT, cambio con WHERE, comprobar. Con eso, los datos están a salvo.' }
  ]
});
