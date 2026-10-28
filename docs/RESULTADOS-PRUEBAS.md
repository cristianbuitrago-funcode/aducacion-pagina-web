# Resultados de pruebas (28-oct-2026)

Entorno: Linux, Node.js 22.22.0, Chromium (Playwright), PHP 8.3.6, MariaDB 10.11.

## Plataforma

| Prueba | Comando | Resultado |
|---|---|---|
| Unitarias: motor, contenido de las 10 clases, seguridad | `npm test` | **61 / 61 correctas** |
| Navegador real (Chromium) | `npm run test:e2e` | **13 / 13 correctas** |
| Verificación de secretos contra el proyecto original | `node tools/verificar-secretos.js …` | **0 coincidencias** (110 valores sensibles comprobados) |
| Prueba negativa del verificador (secreto insertado en una copia temporal) | — | Detectado correctamente |

Las pruebas de navegador cubren: las 110 lecciones y todas las secciones sin errores de JavaScript;
navegación inicio → clases → clase → lecciones (siguiente/anterior); completar lección y recargar;
evaluación (retroalimentación, reintento, aprobación al 100 %, mejor resultado guardado); textos y
casillas guardados; resaltado de líneas de código; calendario (60/90 min, posible festivo, cancelar
y recalcular); exportar (archivo y texto para copiar) → cancelar y confirmar el borrado en la página → importar progreso; tema oscuro explícito (`data-theme`); buscador del glosario; modo profesor;
celular de 360 px sin desplazamiento horizontal en 12 vistas y menú desplegable; servidor local.

Revisión visual (capturas): inicio, lección de código con líneas resaltadas, diagramas de carriles
(escritorio y celular), evaluación con retroalimentación en celular, calendario, modo oscuro.

## Contenido verificado contra la web de Marcos (copia local, base de prueba)

| Afirmación de la plataforma | Resultado real |
|---|---|
| Ana (`ana@prueba.test`) empieza con 360 puntos (Clase 6) | ✅ 360 |
| Tras un alquiler de 3 h tiene 900 puntos (Clase 6) | ✅ 900 |
| Con MySQL estricto el registro falla por `spentPayPointUser` y deja el usuario sin fila de puntos (Clase 8) | ✅ HTTP 500, error reproducido, usuario sin fila en `userpoints` |
| `ALTER TABLE … DEFAULT '0'` corrige el registro (Clase 8) | ✅ “Registro Exitoso” y fila creada |
| Consultas del ejercicio de la Clase 7 | ✅ resultados esperados |
| `console.log` en el escuchador de Trasteos aparece 6 veces por clic (Clase 5) | ✅ 6 |
| Quitar el `;` de la línea 8 de `loginUser.php` provoca error de sintaxis (Clase 10) | ✅ Parse error en la línea 9 |
| `recursos/bd-prueba.sql` se importa sin errores | ✅ 3 usuarios, 2 alquileres |
| 30 anclas de línea de los fragmentos de código coinciden con los archivos originales | ✅ 0 diferencias |

La auditoría (`docs/AUDITORIA.md`, sección 8.1) detalla la prueba de ejecución de la web de Marcos.

## Pendiente / no probado

- Navegadores distintos de Chromium (Firefox, Safari) y dispositivos físicos: no probados.
- Comportamiento con `localStorage` bloqueado: cubierto por el código (respaldo en memoria y aviso),
  no por una prueba de navegador.
- Lectores de pantalla: se usaron etiquetas semánticas y atributos ARIA, sin prueba con lector real.
- Instalación con XAMPP en Windows: las instrucciones no se ejecutaron en Windows (sí el equivalente
  con PHP + MariaDB en Linux).
- Servidor real de la web de Marcos: sin acceso; las hipótesis están marcadas con 🔎 en la auditoría.
