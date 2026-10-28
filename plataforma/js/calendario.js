/*
 * calendario.js — Genera las sesiones a partir del horario informado.
 *
 * Horario (Plan de formación):
 *   - Primera clase: jueves 29-oct-2026, 8:00–9:00 a. m. (60 min)
 *   - Lunes: 4:00–5:30 p. m. (90 min)
 *   - Miércoles: 7:00–8:00 a. m. (60 min)
 * SUPUESTO (a confirmar): tras la primera clase, las sesiones siguen cada lunes y miércoles.
 */
(function (raiz, fabrica) {
  var modulo = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = modulo;
  else raiz.FA_Calendario = modulo;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var HORARIO = {
    primera: { fecha: '2026-10-29', inicio: '8:00 a. m.', fin: '9:00 a. m.', minutos: 60 },
    semanal: [
      { dia: 1, nombre: 'Lunes', inicio: '4:00 p. m.', fin: '5:30 p. m.', minutos: 90 },
      { dia: 3, nombre: 'Miércoles', inicio: '7:00 a. m.', fin: '8:00 a. m.', minutos: 60 }
    ]
  };

  /*
   * Festivos de Colombia que caen en días de clase dentro del período previsto.
   * Se marcan como "posible festivo": la plataforma NO cancela la sesión sola; el profesor decide.
   */
  var POSIBLES_FESTIVOS = {
    '2026-11-02': 'Día de Todos los Santos (trasladado a lunes)',
    '2026-11-16': 'Independencia de Cartagena (trasladado a lunes)',
    '2027-01-11': 'Día de los Reyes Magos (trasladado a lunes)'
  };

  var DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
    'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // Trabajamos con fechas UTC "a mediodía" para evitar saltos por zona horaria.
  function aFecha(iso) { var p = iso.split('-').map(Number); return new Date(Date.UTC(p[0], p[1] - 1, p[2], 12)); }
  function aIso(d) { return d.toISOString().slice(0, 10); }
  function sumarDias(d, n) { return new Date(d.getTime() + n * 86400000); }

  function fechaLarga(iso) {
    var d = aFecha(iso);
    return DIAS[d.getUTCDay()] + ' ' + d.getUTCDate() + ' de ' + MESES[d.getUTCMonth()] + ' de ' + d.getUTCFullYear();
  }

  /*
   * totalClases: cuántas clases hay que ubicar (10).
   * marcas: { "2026-11-02": "cancelada" | "continuacion" } — decididas por el profesor.
   *   cancelada    → la sesión no se da y no consume clase.
   *   continuacion → se sigue con la clase anterior (no avanza).
   */
  function generar(totalClases, marcas) {
    marcas = marcas || {};
    var sesiones = [];
    var clase = 1;
    var anterior = null;

    function agregar(iso, franja) {
      var marca = marcas[iso] || 'normal';
      var s = {
        fecha: iso,
        fechaLarga: fechaLarga(iso),
        dia: DIAS[aFecha(iso).getUTCDay()],
        inicio: franja.inicio,
        fin: franja.fin,
        minutos: franja.minutos,
        marca: marca,
        festivo: POSIBLES_FESTIVOS[iso] || null,
        clase: null
      };
      if (marca === 'cancelada') s.clase = null;
      else if (marca === 'continuacion' && anterior !== null) s.clase = anterior;
      else { s.clase = clase; anterior = clase; clase++; }
      sesiones.push(s);
    }

    agregar(HORARIO.primera.fecha, HORARIO.primera);
    var d = sumarDias(aFecha(HORARIO.primera.fecha), 1);
    var limite = 400; // salvaguarda contra bucles infinitos
    while (clase <= totalClases && limite-- > 0) {
      var franja = HORARIO.semanal.filter(function (f) { return f.dia === d.getUTCDay(); })[0];
      if (franja) agregar(aIso(d), franja);
      d = sumarDias(d, 1);
    }
    return sesiones;
  }

  return { generar: generar, HORARIO: HORARIO, POSIBLES_FESTIVOS: POSIBLES_FESTIVOS, fechaLarga: fechaLarga };
});
