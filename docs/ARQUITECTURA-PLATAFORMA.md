# Arquitectura de la plataforma Funcode Academy

## Decisión tecnológica

| Opción | Ventajas | Inconvenientes | Decisión |
|---|---|---|---|
| PHP + MySQL (como la web de Marcos) | Progreso en servidor, multi-equipo | Requiere servidor y BD solo para guardar progreso; más superficie de seguridad; necesitaría autenticación real | Descartada para esta fase |
| Framework (React/Vue) con compilación | Componentes, ecosistema | Node, dependencias y paso de compilación que hay que mantener | Descartada |
| **HTML + CSS + JavaScript sin dependencias** | Se abre con doble clic; sin instalación; mismo trío que Marcos aprende; fácil de respaldar | Progreso solo en el navegador | **Elegida** |

Criterios: lo más sencillo de ejecutar y mantener; sin bases de datos ni servicios externos
innecesarios; separada por completo de la web de Marcos.

## Cómo funciona

```
index.html
 ├─ js/nucleo.js       FA: registro de contenidos + utilidades (escapar, formato en línea, LECCIONES)
 ├─ js/resaltador.js   resaltado de sintaxis propio (php, php-html, html, css, js, sql)
 ├─ js/progreso.js     estado en localStorage (respaldo en memoria si está bloqueado) + exportar/importar
 ├─ js/evaluacion.js   calificación pura de selección múltiple (aprobación 70 %)
 ├─ js/calendario.js   generación de sesiones desde el horario (cancelar / continuación)
 ├─ data/*.js          contenido: cada archivo llama FA.registrar…()
 └─ js/app.js          enrutador por #hash + vistas + eventos (delegación)
```

- **Sin `fetch` ni módulos ES**: los datos se cargan como scripts clásicos para que funcione con
  `file://` (doble clic).
- **Rutas**: `#/`, `#/clases`, `#/clase/N`, `#/clase/N/<lección>`, `#/calendario`, `#/arquitectura`,
  `#/glosario`, `#/errores[/tec]`, `#/pagos`, `#/profesor`, `#/progreso`.
- **Lecciones estándar** (definidas en `nucleo.js`): objetivo, explicacion, conceptos, codigo,
  diagrama, guiado, individual, comprobacion, evaluacion, errores, resumen. Los minutos de cada
  lección se calculan a partir del plan de la clase.
- **Seguridad del contenido**: todo texto se escapa antes de insertarse; el formato en línea solo
  admite código, negrita, cursiva y enlaces `#/…` o `https://…`.

## Datos guardados (localStorage, clave `funcode-academy-progreso`)

```json
{
  "version": 1, "app": "funcode-academy",
  "lecciones":  { "3:explicacion": { "completada": true, "fecha": "…" } },
  "quizzes":    { "3": { "mejor": 80, "intentos": 2, "ultimo": 80, "fecha": "…" } },
  "textos":     { "3:individual": "…", "3:notas-profesor": "…" },
  "checks":     { "3:guiado:2": true, "3:criterio:0": true },
  "calendario": { "2026-11-02": "cancelada" },
  "preferencias": { "modoProfesor": false }
}
```

Estado de una clase: *pendiente* (sin actividad), *en curso* (alguna actividad), *completada*
(todas las lecciones completadas; la de evaluación exige ≥ 70 %).

## Si en el futuro se necesita progreso en servidor

Una opción mínima: un endpoint PHP con autenticación del hosting que reciba y devuelva el mismo
JSON (`exportar()`/`importar()` ya existen), guardado en una tabla `progreso(id, datos JSON,
actualizado)` con consultas preparadas. Hasta tener autenticación real no conviene hacerlo.

## Pruebas

- `tests/unit`: motor (escape, resaltador sin pérdida en los 43 fragmentos, evaluación, progreso,
  calendario), contenido (17 elementos por clase, plan de 60 = 60, referencias válidas) y seguridad.
- `tests/e2e`: Chromium real: todas las rutas, navegación, guardado, evaluación, calendario,
  exportar/importar, glosario, modo profesor, móvil 360 px y servidor local.
- `tools/verificar-secretos.js`: compara contra los valores sensibles del proyecto original.
