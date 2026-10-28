/*
 * evaluacion.js — Califica las preguntas de selección múltiple.
 * Es una función pura: recibe preguntas y respuestas y devuelve el resultado.
 */
(function (raiz, fabrica) {
  var modulo = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = modulo;
  else raiz.FA_Evaluacion = modulo;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /*
   * preguntas: [{ q, opciones: [...], correcta: índice, retro: "explicación" }]
   * respuestas: [índice elegido | null, ...] (misma posición que la pregunta)
   */
  function calificar(preguntas, respuestas, aprobacion) {
    aprobacion = aprobacion == null ? 70 : aprobacion;
    var detalle = preguntas.map(function (p, i) {
      var elegida = respuestas[i];
      var respondida = elegida !== null && elegida !== undefined;
      return {
        indice: i,
        respondida: respondida,
        correcta: respondida && elegida === p.correcta,
        elegida: respondida ? elegida : null,
        correctaEs: p.correcta,
        retro: p.retro || ''
      };
    });
    var correctas = detalle.filter(function (d) { return d.correcta; }).length;
    var porcentaje = preguntas.length ? Math.round(correctas / preguntas.length * 100) : 0;
    return {
      correctas: correctas,
      total: preguntas.length,
      sinResponder: detalle.filter(function (d) { return !d.respondida; }).length,
      porcentaje: porcentaje,
      aprobado: porcentaje >= aprobacion,
      detalle: detalle,
      mensaje: mensaje(porcentaje, aprobacion)
    };
  }

  function mensaje(p, aprobacion) {
    if (p === 100) return '¡Excelente! Dominas este tema. Puedes avanzar.';
    if (p >= aprobacion) return 'Bien. Superaste la evaluación; repasa las preguntas falladas antes de seguir.';
    if (p >= 40) return 'Vas en camino. Vuelve a la explicación y al código real, y repite la evaluación.';
    return 'Conviene repasar la clase con el profesor antes de repetir la evaluación.';
  }

  return { calificar: calificar };
});
