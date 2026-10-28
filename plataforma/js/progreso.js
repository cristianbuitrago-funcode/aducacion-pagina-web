/*
 * progreso.js — Guarda el avance de Marcos en el navegador (localStorage).
 *
 * IMPORTANTE: localStorage vive en ESTE navegador de ESTE equipo. Si se borra el historial,
 * se usa otro navegador o el modo incógnito, el progreso no estará. Por eso existe
 * "Exportar progreso" (descarga un .json) e "Importar progreso" (lo restaura).
 */
(function (raiz, fabrica) {
  var modulo = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = modulo;
  else raiz.FA_Progreso = modulo;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CLAVE = 'funcode-academy-progreso';
  var VERSION = 1;
  var APROBACION = 70; // % mínimo en la evaluación para dar la lección por superada

  function estadoVacio() {
    return {
      version: VERSION,
      app: 'funcode-academy',
      lecciones: {},     // "3:explicacion" -> { completada: true, fecha: "..." }
      quizzes: {},       // "3" -> { mejor: 80, intentos: 2, ultimo: 80, fecha: "..." }
      textos: {},        // "3:individual" -> "respuesta escrita"
      checks: {},        // "3:guiado:2" -> true
      calendario: {},    // "2026-11-02" -> "cancelada" | "continuacion"
      preferencias: { modoProfesor: false }
    };
  }

  /* Almacén en memoria para cuando localStorage no existe o está bloqueado. */
  function almacenMemoria() {
    var m = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; },
      setItem: function (k, v) { m[k] = String(v); },
      removeItem: function (k) { delete m[k]; }
    };
  }

  function crear(almacen) {
    var persistente = true;
    if (!almacen) {
      try {
        almacen = window.localStorage;
        almacen.setItem(CLAVE + '-prueba', '1');
        almacen.removeItem(CLAVE + '-prueba');
      } catch (e) {
        almacen = almacenMemoria();
        persistente = false;
      }
    }

    var estado = cargar();
    var oyentes = [];

    function cargar() {
      try {
        var crudo = almacen.getItem(CLAVE);
        if (!crudo) return estadoVacio();
        return normalizar(JSON.parse(crudo));
      } catch (e) {
        return estadoVacio();
      }
    }

    function guardar() {
      try { almacen.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { persistente = false; }
      oyentes.forEach(function (f) { f(estado); });
    }

    function ahora() { return new Date().toISOString(); }

    var api = {
      APROBACION: APROBACION,
      esPersistente: function () { return persistente; },
      alCambiar: function (f) { oyentes.push(f); },
      obtener: function () { return estado; },

      leccionCompletada: function (clase, leccion) {
        var r = estado.lecciones[clase + ':' + leccion];
        return !!(r && r.completada);
      },
      marcarLeccion: function (clase, leccion, completada) {
        var k = clase + ':' + leccion;
        if (completada) estado.lecciones[k] = { completada: true, fecha: ahora() };
        else delete estado.lecciones[k];
        guardar();
      },

      registrarQuiz: function (clase, porcentaje) {
        var q = estado.quizzes[clase] || { mejor: 0, intentos: 0 };
        q.intentos += 1;
        q.ultimo = porcentaje;
        q.mejor = Math.max(q.mejor, porcentaje);
        q.fecha = ahora();
        estado.quizzes[clase] = q;
        if (porcentaje >= APROBACION) estado.lecciones[clase + ':evaluacion'] = { completada: true, fecha: ahora() };
        guardar();
        return q;
      },
      quiz: function (clase) { return estado.quizzes[clase] || null; },

      texto: function (clave) { return estado.textos[clave] || ''; },
      guardarTexto: function (clave, valor) {
        if (valor) estado.textos[clave] = String(valor);
        else delete estado.textos[clave];
        guardar();
      },

      check: function (clave) { return !!estado.checks[clave]; },
      ponerCheck: function (clave, valor) {
        if (valor) estado.checks[clave] = true;
        else delete estado.checks[clave];
        guardar();
      },

      sesion: function (fecha) { return estado.calendario[fecha] || 'normal'; },
      ponerSesion: function (fecha, tipo) {
        if (!tipo || tipo === 'normal') delete estado.calendario[fecha];
        else estado.calendario[fecha] = tipo;
        guardar();
      },

      preferencia: function (k) { return estado.preferencias[k]; },
      ponerPreferencia: function (k, v) { estado.preferencias[k] = v; guardar(); },

      /* Resumen de una clase: lecciones hechas, % y estado legible. */
      resumenClase: function (clase) {
        var ids = clase.lecciones.map(function (l) { return l.id; });
        var hechas = ids.filter(function (id) { return api.leccionCompletada(clase.numero, id); }).length;
        var porcentaje = ids.length ? Math.round(hechas / ids.length * 100) : 0;
        var tocada = hechas > 0 || !!estado.quizzes[clase.numero] ||
          Object.keys(estado.textos).concat(Object.keys(estado.checks))
            .some(function (k) { return k.split(':')[0] === String(clase.numero); });
        var estadoTxt = hechas === ids.length && ids.length ? 'completada' : (tocada ? 'en-curso' : 'pendiente');
        return { hechas: hechas, total: ids.length, porcentaje: porcentaje, estado: estadoTxt };
      },
      resumenGlobal: function (clases) {
        var total = 0, hechas = 0, completas = 0;
        clases.forEach(function (c) {
          var r = api.resumenClase(c);
          total += r.total; hechas += r.hechas;
          if (r.estado === 'completada') completas++;
        });
        return { total: total, hechas: hechas, porcentaje: total ? Math.round(hechas / total * 100) : 0, clasesCompletas: completas };
      },

      exportar: function () { return JSON.stringify(estado, null, 2); },
      importar: function (texto) {
        var obj;
        try { obj = JSON.parse(texto); } catch (e) { throw new Error('El archivo no es un JSON válido.'); }
        if (!obj || obj.app !== 'funcode-academy') throw new Error('El archivo no es un respaldo de Funcode Academy.');
        if (typeof obj.version !== 'number' || obj.version > VERSION) throw new Error('El respaldo es de una versión más nueva de la plataforma.');
        estado = normalizar(obj);
        guardar();
        return estado;
      },
      reiniciar: function () { estado = estadoVacio(); guardar(); }
    };
    return api;
  }

  /* Garantiza que todas las secciones existan y tengan el tipo correcto. */
  function normalizar(obj) {
    var base = estadoVacio();
    Object.keys(base).forEach(function (k) {
      if (k === 'version' || k === 'app') return;
      if (obj && obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k])) base[k] = obj[k];
    });
    return base;
  }

  return { crear: crear, CLAVE: CLAVE, VERSION: VERSION, APROBACION: APROBACION, almacenMemoria: almacenMemoria };
});
