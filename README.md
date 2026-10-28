# Funcode Academy — Formación Web de Marcos

Plataforma educativa de **Funcode Studio CB** para que Marcos aprenda a comprender, mantener y
ampliar su propia web (Gestión Empresarial MF) estudiando **su código real** en 10 clases.

Es un proyecto **separado** de la web de Marcos: no contiene ni modifica sus archivos originales.
Solo incluye fragmentos de código citados con su número de línea, con credenciales, correos y
dominio ocultos.

---

## 1. Abrir la plataforma (sin instalar nada)

1. Descarga o descomprime esta carpeta.
2. Abre `plataforma/index.html` con doble clic (Chrome, Edge, Firefox o Safari).

Eso es todo: no necesita internet, servidor, base de datos ni librerías externas.

**Opcional — con servidor local** (si prefieres `http://localhost`): con Node.js 18 o superior,

```bash
npm start            # equivale a: node tools/servidor.js
# abre http://localhost:8080
```

El servidor solo escucha en tu propio equipo (`127.0.0.1`).

## 2. Qué contiene

| Sección | Qué hay |
|---|---|
| **Clases** | 10 clases × 11 lecciones: objetivo y plan (60 min + ampliación de 90), explicación, conceptos, código real línea por línea, diagrama, ejercicio guiado, ejercicio individual, preguntas abiertas, evaluación con retroalimentación, errores frecuentes, resumen y criterios para avanzar. Cada clase incluye el **guion del profesor**. |
| **Calendario** | Sesiones desde el jueves 29-oct-2026 (60 min), lunes (90 min) y miércoles (60 min). Señala posibles festivos; cada sesión se puede marcar como cancelada o continuación. |
| **Arquitectura** | Mapa real de la web de Marcos, recorridos de datos, base de datos, riesgos y qué se puede tocar con seguridad. |
| **Glosario** | 81 términos con definiciones sencillas (con buscador). |
| **Errores** | Catálogo síntoma → causa → solución, filtrable por tecnología; 📌 los encontrados en la web real. |
| **Pagos (futuro)** | Módulo **conceptual** sobre pedidos, pasarelas, Nequi/Daviplata, verificación en servidor y riesgos. No implementa pagos. |
| **Profesor** | Guía para preparar, dar y cerrar cada sesión; instalación del entorno local; checklist de la primera clase. |
| **Progreso** | Avance por clase, exportar/importar el progreso y borrarlo. |

Botón **🎓 Modo profesor** (arriba): muestra las indicaciones del guion dentro de cada lección.

## 3. Cómo se guarda el progreso (y su copia de seguridad)

- Se guarda en el **almacenamiento local del navegador** (`localStorage`) del equipo donde se usa.
- No se sincroniza entre equipos ni navegadores. Si se borran los datos de navegación o se usa
  modo incógnito, el progreso no estará.
- **Copia de seguridad:** sección *Progreso* → “Exportar progreso”. Descarga un archivo `.json` y,
  además, muestra el mismo contenido como texto con un botón “Copiar” (útil donde las descargas están
  bloqueadas, como en el visor de artifacts de Claude: se pega en un archivo `.json`). Guárdalo, por
  ejemplo, al final de cada clase. Para restaurarlo o pasarlo a otro equipo: “Importar progreso”.
- “Borrar todo el progreso” pide confirmación dentro de la propia página.

## 4. Privacidad y publicación

- La plataforma **no tiene usuarios ni contraseñas**. Es “privada” solo en el sentido de que se usa
  en tu equipo. No se presenta como protegida.
- Si en algún momento se publica en internet, debe ir detrás de una protección real (por ejemplo,
  la protección por contraseña de directorios del hosting) y conviene revisar antes si se quieren
  exponer los fragmentos de código y la auditoría de seguridad de la web de Marcos.
- `index.html` incluye `noindex, nofollow` para que los buscadores no la indexen, pero eso **no** es
  una protección.

## 4b. Versión publicada como artifact

La plataforma también está publicada como artifact privado de Claude. Es el mismo código de
`plataforma/`; al publicarla solo se quita la envoltura `<!DOCTYPE>`/`<html>`/`<head>`/`<body>` de
`index.html`, porque el visor la añade. En el artifact el progreso se guarda en el navegador de cada
persona y no se comparte con la versión local (se pasa exportando e importando).

## 5. Entorno local para practicar con la web de Marcos

Las clases 2 a 10 usan una **copia local** de la web de Marcos (nunca la web real). Pasos resumidos
(detalle en la plataforma → *Profesor*):

1. Instalar XAMPP (Apache + PHP + MySQL/MariaDB) e iniciar Apache y MySQL.
2. Copiar **una copia** del proyecto de Marcos a `C:\xampp\htdocs\proyecto-ge`.
3. En `http://localhost/phpmyadmin` crear la base `gestione_gestionempresarial` e **importar
   `recursos/bd-prueba.sql`** (estructura real + datos 100 % inventados).
   **No importar el volcado original**: contiene datos personales reales.
4. Abrir `http://localhost/proyecto-ge/`. Usuarios de prueba: `admin@prueba.test`,
   `ana@prueba.test`, `beto@prueba.test` — contraseña `prueba123`.

## 6. Pruebas

```bash
npm test                 # 61 pruebas unitarias (Node 18+, sin dependencias)
npm run test:e2e         # 13 pruebas en navegador real (requiere Playwright)
node tools/verificar-secretos.js <carpeta Proyecto_GE-master>   # comprueba que no se filtró nada
```

Para las pruebas en navegador: `npm install --no-save playwright && npx playwright install chromium`.
Si Playwright no está instalado, esas pruebas se omiten con aviso.

Resultados obtenidos al construir la plataforma: ver [`docs/RESULTADOS-PRUEBAS.md`](docs/RESULTADOS-PRUEBAS.md).

## 7. Estructura de carpetas

```
.
├── plataforma/              ← la aplicación (abrir index.html)
│   ├── index.html
│   ├── css/estilos.css
│   ├── img/icono.svg
│   ├── js/
│   │   ├── nucleo.js        utilidades y registro de contenidos
│   │   ├── resaltador.js    resaltado de sintaxis propio
│   │   ├── progreso.js      guardado del progreso (localStorage + exportar/importar)
│   │   ├── evaluacion.js    calificación de las evaluaciones
│   │   ├── calendario.js    sesiones según el horario
│   │   └── app.js           interfaz y navegación
│   └── data/                ← CONTENIDO (editable)
│       ├── clase01.js … clase10.js
│       ├── codigo.js        fragmentos reales con explicación línea por línea
│       ├── diagramas.js, glosario.js, errores.js, paginas.js, pagos.js
├── recursos/bd-prueba.sql   base de datos de práctica (datos inventados)
├── docs/
│   ├── AUDITORIA.md                 diagnóstico de la web de Marcos
│   ├── ARQUITECTURA-PLATAFORMA.md   decisiones técnicas de la plataforma
│   ├── GUIA-PROFESOR.md             guía de uso para el profesor (versión imprimible)
│   └── RESULTADOS-PRUEBAS.md        qué se probó y qué queda pendiente
├── tests/                   pruebas unitarias y de navegador
├── tools/                   servidor local y verificador de secretos
└── package.json             scripts (no hay dependencias)
```

## 8. Editar o ampliar el contenido

Cada clase es un archivo en `plataforma/data/claseNN.js`. Los textos admiten un formato mínimo:
`` `código` ``, `**negrita**`, `*cursiva*` y enlaces internos `[texto](#/clase/3)`.
Después de editar, ejecuta `npm test`: comprueba que cada clase sigue teniendo sus 17 elementos,
que el plan de 60 minutos suma 60 y que todos los fragmentos y diagramas existen.

Si la web de Marcos cambia, los números de línea de `data/codigo.js` pueden dejar de coincidir.

## 9. Copia de seguridad de la plataforma

- Del **código y contenido**: este repositorio (o un ZIP de la carpeta).
- Del **progreso**: el archivo exportado desde *Progreso* (no se guarda en el repositorio).

## 10. Limitaciones conocidas

- Sin autenticación ni sincronización entre equipos (por diseño, para no depender de servidores).
- No se tuvo acceso al servidor real de la web de Marcos: algunas conclusiones de la auditoría están
  marcadas como hipótesis (🔎).
- Los posibles festivos del calendario son orientativos y deben confirmarse.
- La duración de los lunes (90 o 60 min) está pendiente de confirmar.
- Camisas y pagos digitales: fuera del alcance de esta fase.
