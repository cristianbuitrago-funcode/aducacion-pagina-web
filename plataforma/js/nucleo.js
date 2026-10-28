/*
 * nucleo.js — Utilidades compartidas y registro de contenidos.
 *
 * Los archivos de /data llaman a FA.registrar...() para cargar clases, fragmentos de
 * código, diagramas, glosario, etc. Así cada archivo de contenido es independiente y se
 * puede abrir la plataforma con doble clic (sin servidor), porque no usamos fetch().
 */
(function (raiz, fabrica) {
  var modulo = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = modulo;
  else raiz.FA = modulo;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var datos = {
    clases: [],        // las 10 clases
    codigo: {},        // fragmentos reales del proyecto de Marcos, por id
    diagramas: {},     // diagramas por id
    glosario: [],      // términos técnicos
    errores: [],       // catálogo de errores frecuentes
    paginas: {}        // páginas especiales: pagos, profesor, arquitectura, inicio
  };

  /*
   * Cada clase se recorre con las mismas lecciones, en este orden. Juntas cubren los
   * 17 elementos obligatorios (el guion del profesor, los tiempos y los criterios
   * aparecen dentro de estas lecciones y en la vista general de la clase).
   */
  var LECCIONES = [
    { id: 'objetivo', titulo: 'Objetivo y plan de la sesión', campo: 'plan' },
    { id: 'explicacion', titulo: 'Explicación desde cero', campo: 'explicacion' },
    { id: 'conceptos', titulo: 'Conceptos clave', campo: 'conceptos' },
    { id: 'codigo', titulo: 'Código real, línea por línea', campo: 'codigo' },
    { id: 'diagrama', titulo: 'Diagrama', campo: 'diagrama' },
    { id: 'guiado', titulo: 'Ejercicio guiado', campo: 'guiado' },
    { id: 'individual', titulo: 'Ejercicio individual', campo: 'individual' },
    { id: 'comprobacion', titulo: 'Preguntas de comprobación', campo: 'comprobacion' },
    { id: 'evaluacion', titulo: 'Evaluación', campo: 'evaluacion' },
    { id: 'errores', titulo: 'Errores frecuentes', campo: 'errores' },
    { id: 'resumen', titulo: 'Resumen y criterios para avanzar', campo: 'resumen' }
  ];

  /* Calcula la lista de lecciones de una clase y los minutos de cada una según su plan. */
  function prepararClase(clase) {
    var plan = clase.plan || { sesion60: [], ampliacion90: [] };
    clase.lecciones = LECCIONES.filter(function (l) { return clase[l.campo] != null; }).map(function (l) {
      var en60 = (plan.sesion60 || []).filter(function (a) { return a.leccion === l.id; });
      var en90 = (plan.ampliacion90 || []).filter(function (a) { return a.leccion === l.id; });
      return {
        id: l.id,
        titulo: l.titulo,
        minutos: sumar(en60, 'min') + sumar(en90, 'min'),
        momento: en60.length ? 'sesion60' : (en90.length ? 'ampliacion90' : 'tarea')
      };
    });
    return clase;
  }

  function registrarClase(clase) {
    datos.clases.push(prepararClase(clase));
    datos.clases.sort(function (a, b) { return a.numero - b.numero; });
  }
  function registrarCodigo(lista) { lista.forEach(function (f) { datos.codigo[f.id] = f; }); }
  function registrarDiagramas(lista) { lista.forEach(function (d) { datos.diagramas[d.id] = d; }); }
  function registrarGlosario(lista) { datos.glosario = datos.glosario.concat(lista); }
  function registrarErrores(lista) { datos.errores = datos.errores.concat(lista); }
  function registrarPagina(id, pagina) { datos.paginas[id] = pagina; }

  /* Escapa texto para insertarlo como HTML sin que el navegador lo interprete. */
  function escapar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /*
   * Formato en línea muy pequeño para los textos del curso:
   *   `código`   **negrita**   *cursiva*   [texto](#/ruta)
   * Primero se escapa todo, así ningún contenido puede inyectar HTML.
   */
  function enLinea(texto) {
    var codigos = [];
    var s = escapar(texto).replace(/`([^`]+)`/g, function (_, c) {
      codigos.push(c);
      return '\u0000' + (codigos.length - 1) + '\u0000';
    });
    s = s
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\((#\/[^)\s]*|https:\/\/[^)\s]+)\)/g, function (_, t, href) {
        var externo = href.indexOf('https://') === 0;
        return '<a href="' + href + '"' + (externo ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>';
      });
    return s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return '<code>' + codigos[+i] + '</code>'; });
  }

  /* "3-5" -> [3,4,5]; "7" -> [7] */
  function rangoLineas(clave) {
    var partes = String(clave).split('-').map(Number);
    var desde = partes[0], hasta = partes.length > 1 ? partes[1] : partes[0];
    var r = [];
    for (var i = desde; i <= hasta; i++) r.push(i);
    return r;
  }

  function sumar(lista, campo) {
    return lista.reduce(function (t, x) { return t + (campo ? (x[campo] || 0) : x); }, 0);
  }

  return {
    datos: datos,
    LECCIONES: LECCIONES,
    prepararClase: prepararClase,
    registrarClase: registrarClase,
    registrarCodigo: registrarCodigo,
    registrarDiagramas: registrarDiagramas,
    registrarGlosario: registrarGlosario,
    registrarErrores: registrarErrores,
    registrarPagina: registrarPagina,
    escapar: escapar,
    enLinea: enLinea,
    rangoLineas: rangoLineas,
    sumar: sumar
  };
});
