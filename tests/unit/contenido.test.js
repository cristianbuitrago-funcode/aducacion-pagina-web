'use strict';
/*
 * Comprueba que las 10 clases están completas y bien enlazadas.
 * Cada clase debe cubrir los 17 elementos obligatorios del encargo.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { cargarTodo } = require('../ayudantes/cargar');

const { FA } = cargarTodo();
const D = FA.datos;
const RUTAS = /^#\/(clases|calendario|arquitectura|glosario|errores(\/\w+)?|pagos|profesor|progreso|clase\/\d+(\/\w+)?)?$/;

function textos(obj, acc = []) {
  if (typeof obj === 'string') acc.push(obj);
  else if (Array.isArray(obj)) obj.forEach((x) => textos(x, acc));
  else if (obj && typeof obj === 'object') Object.values(obj).forEach((x) => textos(x, acc));
  return acc;
}

function bloquesDe(clase) {
  return [].concat(clase.explicacion, clase.codigo, clase.diagrama, clase.individual.consigna, clase.individual.solucion || []);
}

test('hay exactamente 10 clases numeradas del 1 al 10', () => {
  assert.deepEqual([...D.clases.map((c) => c.numero)], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

for (const c of D.clases) {
  test(`clase ${c.numero}: contiene los 17 elementos obligatorios`, () => {
    assert.ok(c.titulo && c.objetivo, '1. nombre y objetivo');
    assert.ok(c.previos.length, '2. conocimientos previos');
    assert.ok(c.explicacion.length >= 5, '3. explicación desde cero');
    assert.ok(c.conceptos.length >= 4 && c.conceptos.every((k) => k.termino && k.def), '4. conceptos con definición');
    const frags = bloquesDe(c).filter((b) => b && b.t === 'codigo');
    assert.ok(frags.length >= 1, '5. ejemplos del código real');
    frags.forEach((b) => {
      const f = D.codigo[b.id];
      assert.ok(f, `fragmento ${b.id} existe`);
      assert.ok(Object.keys(f.lineas).length, `6. explicación línea por línea en ${b.id}`);
    });
    assert.ok(frags.some((b) => D.codigo[b.id].relaciones.length), '7. relación con otros archivos');
    const diags = bloquesDe(c).filter((b) => b && b.t === 'diagrama');
    assert.ok(diags.length >= 1, '8. diagrama');
    diags.forEach((b) => assert.ok(D.diagramas[b.id], `diagrama ${b.id} existe`));
    assert.ok(c.guiado.pasos.length >= 4 && c.guiado.minutos, '9. ejercicio guiado paso a paso');
    assert.ok(c.individual.consigna.length && c.individual.rubrica.length, '10. ejercicio individual con rúbrica');
    assert.ok(c.comprobacion.length >= 3 && c.comprobacion.every((p) => p.q && p.a), '11. preguntas de comprobación');
    assert.ok(c.evaluacion.length >= 5, '12. evaluación');
    c.evaluacion.forEach((p, i) => {
      assert.ok(Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta < p.opciones.length, `pregunta ${i + 1}: respuesta correcta válida`);
      assert.ok(p.retro, `pregunta ${i + 1}: retroalimentación`);
    });
    assert.ok(c.errores.length >= 3 && c.errores.every((e) => e.sintoma && e.causa && e.solucion), '13. errores y soluciones');
    assert.ok(c.resumen.length >= 3, '14. resumen');
    assert.ok(c.guion.length >= 4 && c.guion.every((g) => g.decir || g.hacer || g.preguntar), '15. guion del profesor');
    assert.ok(c.plan && c.plan.sesion60.length, '16. tiempos');
    assert.ok(c.criterios.length >= 4, '17. criterios para avanzar');
  });

  test(`clase ${c.numero}: el plan de 60 min suma 60, con tiempo flexible y ampliación de 90 ≤ 30`, () => {
    const p = c.plan;
    const suma = FA.sumar(p.sesion60, 'min') + p.flexible;
    assert.equal(suma, 60, `plan 60 suma ${suma}`);
    assert.ok(p.flexible >= 5, 'tiempo flexible de al menos 5 min');
    assert.ok(FA.sumar(p.ampliacion90, 'min') <= 30, 'ampliación cabe en 30 min');
    assert.ok(p.posponer, 'indica qué se puede posponer');
    const ids = FA.LECCIONES.map((l) => l.id);
    p.sesion60.concat(p.ampliacion90).forEach((a) => {
      assert.ok(a.min > 0, `minutos positivos en "${a.actividad}"`);
      if (a.leccion) assert.ok(ids.includes(a.leccion), `lección ${a.leccion} válida`);
    });
  });

  test(`clase ${c.numero}: tiene las 11 lecciones y los guiones apuntan a lecciones existentes`, () => {
    assert.equal(c.lecciones.length, 11);
    const ids = c.lecciones.map((l) => l.id);
    c.guion.forEach((g) => assert.ok(ids.includes(g.leccion), `guion → ${g.leccion}`));
  });

  test(`clase ${c.numero}: los enlaces internos llevan a rutas existentes`, () => {
    textos(c).forEach((t) => {
      for (const m of t.matchAll(/\]\((#\/[^)]*)\)/g)) assert.match(m[1], RUTAS, `ruta ${m[1]}`);
    });
  });
}

test('fragmentos: las explicaciones caen dentro de las líneas mostradas', () => {
  for (const f of Object.values(D.codigo)) {
    const total = f.codigo.split('\n').length;
    for (const k of Object.keys(f.lineas)) {
      const r = FA.rangoLineas(k);
      assert.ok(r[0] >= f.desde && r[r.length - 1] < f.desde + total, `${f.id}: ${k}`);
    }
  }
});

test('diagramas de flujo: cada paso está en un carril declarado', () => {
  for (const d of Object.values(D.diagramas).filter((x) => x.tipo === 'flujo')) {
    const carriles = d.carriles || ['navegador', 'servidor', 'bd'];
    d.pasos.forEach((p) => assert.ok(carriles.includes(p.carril), `${d.id}: ${p.carril}`));
  }
});

test('páginas especiales, glosario, errores y pagos están cargados', () => {
  for (const id of ['inicio', 'arquitectura', 'profesor', 'pagos']) assert.ok(D.paginas[id], id);
  assert.ok(D.glosario.length >= 60);
  assert.ok(D.errores.length >= 20);
  const terminos = D.glosario.map((g) => g.termino.toLowerCase());
  for (const t of ['servidor', 'función', 'variable', 'consulta', 'dom', 'petición http', 'arquitectura']) {
    assert.ok(terminos.some((x) => x.startsWith(t)), `el glosario define “${t}”`);
  }
  D.paginas.pagos.evaluacion.forEach((p) => assert.ok(p.correcta < p.opciones.length));
});
