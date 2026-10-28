/* paginas.js — Inicio, Arquitectura real y Guía del profesor. */

FA.registrarPagina('inicio', {
  intro: [
    { t: 'p', x: 'Plataforma para que **Marcos** aprenda a comprender, mantener y ampliar su propia página web, estudiando el **código real** de su proyecto en 10 clases progresivas.' },
    { t: 'p', x: 'No se trata de copiar y pegar: en cada clase se explica qué hace cada archivo, por qué existe, con qué otros se conecta y cómo cambiarlo sin dañar nada.' }
  ],
  cuerpo: [
    { t: 'h', x: 'Cómo está organizada cada clase' },
    { t: 'tabla', cabecera: ['Lección', 'Para qué sirve'], filas: [
      ['Objetivo y plan', 'Qué se aprenderá, qué hay que saber antes y cómo repartir 60 o 90 minutos.'],
      ['Explicación desde cero', 'El tema en lenguaje sencillo, con analogías y ejemplos de la web de Marcos.'],
      ['Conceptos clave', 'Definiciones cortas de cada término nuevo.'],
      ['Código real, línea por línea', 'Fragmentos exactos de los archivos de Marcos, con número de línea y explicación. Toca “Líneas X–Y” para resaltarlas.'],
      ['Diagrama', 'Un esquema del proceso o de la estructura.'],
      ['Ejercicio guiado', 'Pasos para hacer juntos (profesor y Marcos), con casillas para marcar.'],
      ['Ejercicio individual', 'Una tarea para Marcos, con pistas, espacio para responder y rúbrica.'],
      ['Preguntas de comprobación', 'Preguntas abiertas con respuesta modelo.'],
      ['Evaluación', 'Selección múltiple con retroalimentación. Se aprueba con 70 %.'],
      ['Errores frecuentes', 'Qué suele fallar y cómo resolverlo.'],
      ['Resumen y criterios', 'Lo esencial y la lista para decidir si se puede avanzar.']
    ] },
    { t: 'h', x: 'Tres reglas de oro' },
    { t: 'lista', ordenada: true, items: [
      '**Nunca se prueba en la web real (producción).** Siempre en una copia local.',
      '**Antes de cambiar algo, copia de seguridad.** Y un cambio pequeño a la vez.',
      '**Las contraseñas no se comparten ni se escriben en el código.** Si aparecen, se avisa para cambiarlas.'
    ] },
    { t: 'nota', tipo: 'alerta', titulo: 'Sobre la privacidad de esta plataforma', x: 'La plataforma **no tiene usuarios ni contraseñas**. Es “privada” solo porque se usa en tu computador. El progreso se guarda en este navegador; usa [Progreso](#/progreso) para exportar una copia. Si algún día se publica en internet, debe protegerse con autenticación del hosting (ver README).' },
    { t: 'nota', tipo: 'info', titulo: 'Fuera del alcance por ahora', items: [
      'La sección de **venta de camisas** sigue en duda: no se desarrolla hasta que se confirme y se definan sus requisitos.',
      'Los **pagos digitales** se estudian solo de forma conceptual en [Pagos (futuro)](#/pagos). No se implementan pagos reales en esta fase.'
    ] }
  ]
});

FA.registrarPagina('arquitectura', {
  titulo: 'Arquitectura real de la web de Marcos',
  lead: 'Resultado de la auditoría del código (archivo `Proyecto_GE-master.zip`). ✅ = comprobado leyendo o ejecutando el código; 🔎 = hipótesis por verificar en el servidor real. El informe completo está en `docs/AUDITORIA.md`.',
  secciones: [
    { titulo: 'Resumen para principiantes', bloques: [
      { t: 'lista', ordenada: true, items: [
        'La web es de **Gestión Empresarial MF**: servicios de transporte, espacios publicitarios y un sistema de referidos con puntos.',
        'Tiene una **parte pública** (`.html`, la ve cualquiera) y una **parte privada** (`.php`, requiere iniciar sesión).',
        'El **eje central** es la tabla `users` y el archivo `bd/conexion.php`, que casi todo el PHP incluye.',
        'Solo **Alquiler de vehículos** funciona de punta a punta; los otros 5 formularios de servicios envían a “mantenimiento” y no guardan nada.',
        'Patrón repetido: una página `.php` de la raíz incluye un archivo de lógica en `assets/php/`, que incluye la conexión.',
        'Hay riesgos de seguridad importantes que se corregirán en una fase aparte, con copia de seguridad y pruebas.'
      ] }
    ] },
    { titulo: 'Mapa del sitio', bloques: [{ t: 'diagrama', id: 'mapa-sitio' }] },
    { titulo: 'Carpetas', bloques: [{ t: 'diagrama', id: 'arbol-carpetas' }] },
    { titulo: 'Cómo se conectan las tecnologías', bloques: [{ t: 'diagrama', id: 'capas' }] },
    { titulo: 'Recorridos de datos', bloques: [
      { t: 'diagrama', id: 'flujo-login' }, { t: 'diagrama', id: 'flujo-registro' }, { t: 'diagrama', id: 'flujo-alquiler' }, { t: 'diagrama', id: 'includes-php' }
    ] },
    { titulo: 'Base de datos', bloques: [{ t: 'diagrama', id: 'er-bd' }] },
    { titulo: 'Qué funciona hoy (prueba local del 28-oct-2026)', bloques: [
      { t: 'p', x: 'Se ejecutó una copia de la web con PHP 8.3 y MariaDB 10.11, con la base creada **solo con la estructura** (sin datos reales), usuarios inventados y el correo desviado para no contactar el servidor real.' },
      { t: 'tabla', cabecera: ['Funcionalidad', 'Resultado'], filas: [
        ['Login correcto / incorrecto', '✅ Redirige a la página personal / muestra alerta'],
        ['Registro (MySQL en modo no estricto)', '✅ Crea usuario y fila de puntos; el correo falla en local (esperado)'],
        ['Registro (MySQL en modo estricto)', '❌ Se crea el usuario pero falla la fila de `userpoints` (`spentPayPointUser` sin valor)'],
        ['Código de patrocinador inexistente', '✅ Alerta “El codigo de patrocinador no existe”'],
        ['Alquiler de vehículo (3 h)', '✅ Se guarda; la página personal muestra 540 puntos (3 × 180)'],
        ['Pasajeros, Trasteos, Mensajería, Domicilios, Carga', '❌ Envían a `mantenimiento.html`; no se guarda nada'],
        ['Menú móvil y ventanas emergentes', '✅ Funcionan; sin errores de JavaScript'],
        ['Panel admin y referidos sin iniciar sesión', '⚠️ Se pueden abrir (falta control de acceso)']
      ] }
    ] },
    { titulo: 'Riesgos principales (resumen)', bloques: [
      { t: 'nota', tipo: 'seguridad', titulo: 'Se explican para corregirlos, no para explotarlos', x: 'Las correcciones se harán en una fase separada, con autorización del propietario, copia de seguridad y pruebas en local.' },
      { t: 'tabla', cabecera: ['Riesgo', 'Dónde', 'Corrección'], filas: [
        ['Credenciales escritas en el código', '`bd/configuracion.php` y archivos de correo', 'Cambiarlas en el hosting y moverlas fuera de la carpeta pública'],
        ['Consultas SQL armadas pegando datos', 'casi todo el PHP; sin limpiar en `dataReferred.php` y `deleteRegister.php`', 'Consultas preparadas'],
        ['Páginas de administración sin control de acceso', '`assets/php/admin/*`, `personalPageAdmin.php`, `dataReferred.php`', 'Comprobar sesión y rol + `exit`'],
        ['Redirecciones sin `exit`', 'todas', 'Añadir `exit;`'],
        ['Recuperación de contraseña débil', '`confirmPassword.php`', 'Token ligado al correo, aleatorio, con caducidad'],
        ['Contraseñas con `sha1`', 'login y registro', '`password_hash` / `password_verify`'],
        ['Datos impresos sin escapar', 'páginas personales, admin, correos', '`htmlspecialchars()`'],
        ['Volcado SQL con datos personales dentro del proyecto', '`sql/`', 'Sacarlo de la carpeta pública 🔎 y de repositorios']
      ] }
    ] },
    { titulo: 'Dónde se puede tocar con seguridad', bloques: [
      { t: 'tabla', cabecera: ['Nivel', 'Archivos', 'Por qué'], filas: [
        ['🟢 Bajo', 'Textos de `nosotros.html`, `inicio.html`, `publicidad.html`, `mantenimiento.html`; `cuadrosNosotros.css`, `publicidad.css`', 'Estático; afecta a una sola página; se revierte copiando el archivo'],
        ['🟡 Medio', '`header.css`, `footer.css`, `main.js`, menú y pie, HTML de formularios', 'Se usan en varias páginas o deben coincidir con PHP'],
        ['🔴 Alto', '`bd/`, `assets/php/`, tablas', 'Sesiones, datos reales y seguridad']
      ] }
    ] },
    { titulo: 'Lo que falta para completar el diagnóstico', bloques: [
      { t: 'lista', items: [
        'Acceso al servidor real: versión de PHP en producción, si la carpeta `sql/` es accesible desde internet, copias de seguridad existentes.',
        'Historial de cambios (no venía Git en el ZIP): no se sabe si el ZIP es exactamente lo publicado.',
        'Cuenta de correo de pruebas para comprobar los envíos.',
        'Requisitos de funciones futuras (camisas, pagos): no definidos.'
      ] }
    ] }
  ]
});

FA.registrarPagina('profesor', {
  titulo: 'Guía del profesor',
  lead: 'Cómo usar la plataforma para preparar, dar y cerrar cada sesión con Marcos, aunque tú también estés aprendiendo.',
  secciones: [
    { titulo: 'Antes de cada sesión (15–20 min)', bloques: [
      { t: 'lista', ordenada: true, items: [
        'Abre la clase del día y lee su **guion del profesor** (al final de la vista de la clase). Activa “🎓 Modo profesor” arriba para ver las indicaciones dentro de cada lección.',
        'Mira el [Calendario](#/calendario): ¿la sesión es de **60** o de **90** minutos? Si es de 90, revisa la ampliación.',
        'Haz tú mismo el **ejercicio guiado** en tu copia local. Si algo no te sale, anótalo: es una buena pregunta para la clase.',
        'Ten abierta la copia local de la web de Marcos (no la web real) y un editor de código (por ejemplo, Visual Studio Code).',
        'Revisa las notas de la clase anterior (vista de la clase → “Notas del profesor”).'
      ] }
    ] },
    { titulo: 'Durante la sesión', bloques: [
      { t: 'lista', items: [
        '**Muestra antes de nombrar.** Primero enseña lo que se ve en la web; después, el archivo; al final, el término técnico.',
        '**Marcos teclea, tú guías.** Aprende más quien tiene el teclado.',
        '**Pregunta para comprobar**, no “¿entendiste?”, sino “¿qué crees que pasa si cambio esta línea?”.',
        '**Una analogía por concepto.** Cada clase trae analogías sugeridas en el guion.',
        '**Si no sabes algo**, dilo y búsquenlo juntos en el glosario, en el código o en la documentación oficial. Enseña el método, no solo la respuesta.',
        '**Respeta el tiempo flexible.** Está en cada plan para preguntas y dificultades. Si una actividad necesita más tiempo, muévela a la siguiente sesión.'
      ] },
      { t: 'nota', tipo: 'tip', titulo: 'Si se acaba el tiempo', x: 'Cada plan dice qué se puede posponer. Normalmente el ejercicio individual pasa a tarea y la evaluación se hace al inicio de la siguiente sesión (5–10 min).' }
    ] },
    { titulo: 'Después de la sesión (5–10 min)', bloques: [
      { t: 'lista', ordenada: true, items: [
        'Marca las lecciones completadas y revisa la evaluación.',
        'En “Resumen y criterios” marca los **criterios para avanzar** que Marcos cumplió. Si falta alguno importante, la siguiente sesión empieza repasándolo.',
        'Escribe en “Notas del profesor” las dudas y acuerdos.',
        'En [Progreso](#/progreso), **exporta el progreso** y guarda el archivo (por ejemplo, en una carpeta “Formación Marcos/respaldos”).'
      ] }
    ] },
    { titulo: 'Sesiones de 60 y de 90 minutos', bloques: [
      { t: 'p', x: 'El horario informado tiene sesiones de **60 minutos** (miércoles y la primera clase) y de **90 minutos** (lunes). Está pendiente confirmar si los lunes quedan en 90. Mientras tanto, cada clase tiene un plan base de 60 minutos y una **ampliación opcional de 30** que solo se usa los lunes.' },
      { t: 'p', x: 'Una clase **no tiene que terminar en una sesión**. En el [Calendario](#/calendario) puedes marcar una sesión como “continuación” para seguir con la misma clase; las fechas siguientes se recalculan.' }
    ] },
    { titulo: 'Preparar el entorno local (antes de la Clase 2)', bloques: [
      { t: 'p', x: 'Desde la Clase 2 conviene tener la web de Marcos funcionando en el computador. Opción recomendada en Windows: **XAMPP** (incluye Apache, PHP y MySQL/MariaDB).' },
      { t: 'lista', ordenada: true, items: [
        'Instala XAMPP y abre el panel de control. Inicia **Apache** y **MySQL**.',
        'Copia la carpeta del proyecto a `C:\\xampp\\htdocs\\proyecto-ge` (una **copia**, nunca el original).',
        'Abre `http://localhost/phpmyadmin`, crea la base `gestione_gestionempresarial` (cotejamiento `utf8mb4_general_ci`).',
        'Pestaña **Importar** → elige `recursos/bd-prueba.sql` de esta plataforma (estructura real + datos inventados). **No importes el volcado original**: contiene datos personales reales.',
        'Abre `http://localhost/proyecto-ge/` → debe aparecer el login. Usuarios de prueba: `admin@prueba.test`, `ana@prueba.test`, `beto@prueba.test`; contraseña `prueba123`.',
        'Los correos fallarán en local (“SMTP connect() failed”): es normal. Los datos igual se guardan.',
        'Si registras un usuario nuevo y aparece “Field \'spentPayPointUser\' doesn\'t have a default value”, **no es un problema de tu instalación**: es un error real de la web que se estudia en la [Clase 8](#/clase/8/guiado). Hasta entonces, usa los usuarios de prueba.'
      ] },
      { t: 'nota', tipo: 'info', titulo: 'Alternativa sin XAMPP', x: 'Con PHP y MySQL/MariaDB instalados: desde la carpeta de la copia ejecutar `php -S localhost:8000` y abrir `http://localhost:8000`.' },
      { t: 'nota', tipo: 'alerta', titulo: 'Credenciales', x: 'La configuración local usa el usuario `root` sin contraseña (solo vale en tu computador). Las credenciales reales que venían en el código deben **cambiarse en el hosting** y nunca copiarse a la plataforma ni a un repositorio.' }
    ] },
    { titulo: 'Checklist para la primera clase (jueves 29-oct-2026, 8:00–9:00 a. m.)', bloques: [
      { t: 'lista', items: [
        'Acceso a la web publicada para recorrerla (solo mirar; no registrarse con datos reales si no es necesario).',
        'Esta plataforma abierta en la [Clase 1](#/clase/1).',
        'Papel u hoja en blanco para que Marcos dibuje su mapa de la página.',
        'Preguntar a Marcos qué funciones considera más importantes y cuáles nunca deben dejar de funcionar.',
        'Confirmar con Marcos la duración de los lunes (¿90 o 60 minutos?).'
      ] }
    ] },
    { titulo: 'Cómo evaluar sin desanimar', bloques: [
      { t: 'lista', items: [
        'La evaluación de selección múltiple se puede repetir: lo importante es que al final entienda **por qué** cada respuesta es correcta.',
        'Las preguntas abiertas no se califican: sirven para detectar confusiones. Compara con la respuesta modelo y conversa.',
        'Los **criterios para avanzar** pesan más que el porcentaje: si Marcos puede explicar con sus palabras y hacer el ejercicio, puede avanzar.',
        'Celebra los errores encontrados: diagnosticar es la habilidad más valiosa de la Clase 8 en adelante.'
      ] }
    ] }
  ]
});
