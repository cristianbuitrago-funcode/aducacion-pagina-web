'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { cargarTodo } = require('../ayudantes/cargar');

const ctx = cargarTodo();
const { FA, FA_Resaltador: R, FA_Progreso: P, FA_Evaluacion: E, FA_Calendario: C } = ctx;

function sinEtiquetas(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

test('nucleo: escapar impide inyectar HTML', () => {
  assert.equal(FA.escapar('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
});

test('nucleo: enLinea da formato sin permitir HTML crudo', () => {
  assert.equal(FA.enLinea('`<b>` **negrita**'), '<code>&lt;b&gt;</code> <strong>negrita</strong>');
  assert.match(FA.enLinea('[Clases](#/clases)'), /<a href="#\/clases">Clases<\/a>/);
  assert.doesNotMatch(FA.enLinea('[x](javascript:alert(1))'), /<a /, 'no debe crear enlaces javascript:');
});

test('nucleo: rangoLineas', () => {
  assert.deepEqual([...FA.rangoLineas('3-5')], [3, 4, 5]);
  assert.deepEqual([...FA.rangoLineas('7')], [7]);
});

test('resaltador: no pierde ni cambia ningún carácter (todos los fragmentos reales)', () => {
  for (const f of Object.values(FA.datos.codigo)) {
    assert.equal(sinEtiquetas(R.resaltar(f.codigo, f.lang)), f.codigo, `fragmento ${f.id}`);
  }
});

test('resaltador: reconoce elementos de cada lenguaje', () => {
  assert.match(R.resaltar("$x = 'a'; // c", 'php'), /tk-var">\$x<.*tk-str">'a'<.*tk-com">\/\/ c</);
  assert.match(R.resaltar('<a href="x">t</a>', 'html'), /tk-tag">&lt;a<.*tk-attr">href</);
  assert.match(R.resaltar('<p><?php echo $n; ?></p>', 'php-html'), /tk-var">\$n</);
  assert.match(R.resaltar('.a{ color: red; }', 'css'), /tk-sel">\.a<.*tk-prop">color</);
  assert.match(R.resaltar('SELECT * FROM users', 'sql'), /tk-kw">SELECT</);
  assert.match(R.resaltar('const a = 1;', 'js'), /tk-kw">const</);
});

test('evaluacion: calcula aciertos, porcentaje y aprobación', () => {
  const preguntas = [{ opciones: ['a', 'b'], correcta: 0 }, { opciones: ['a', 'b'], correcta: 1 }, { opciones: ['a', 'b'], correcta: 1 }];
  const r = E.calificar(preguntas, [0, 1, null], 70);
  assert.equal(r.correctas, 2);
  assert.equal(r.porcentaje, 67);
  assert.equal(r.aprobado, false);
  assert.equal(r.sinResponder, 1);
  assert.equal(E.calificar(preguntas, [0, 1, 1]).aprobado, true);
});

test('progreso: lecciones, evaluación, textos y resumen de clase', () => {
  const pr = P.crear(P.almacenMemoria());
  const clase = FA.datos.clases[0];
  assert.equal(pr.resumenClase(clase).estado, 'pendiente');
  pr.marcarLeccion(1, 'explicacion', true);
  assert.equal(pr.leccionCompletada(1, 'explicacion'), true);
  assert.equal(pr.resumenClase(clase).estado, 'en-curso');
  pr.registrarQuiz(1, 50);
  assert.equal(pr.leccionCompletada(1, 'evaluacion'), false, '50% no supera la evaluación');
  pr.registrarQuiz(1, 80);
  assert.equal(pr.leccionCompletada(1, 'evaluacion'), true);
  assert.deepEqual([pr.quiz(1).mejor, pr.quiz(1).intentos], [80, 2]);
  clase.lecciones.forEach((l) => pr.marcarLeccion(1, l.id, true));
  assert.equal(pr.resumenClase(clase).estado, 'completada');
  pr.guardarTexto('1:individual', 'hola');
  assert.equal(pr.texto('1:individual'), 'hola');
});

test('progreso: persiste en el almacén y sobrevive a una "recarga"', () => {
  const almacen = P.almacenMemoria();
  P.crear(almacen).marcarLeccion(3, 'codigo', true);
  assert.equal(P.crear(almacen).leccionCompletada(3, 'codigo'), true);
});

test('progreso: exportar e importar; rechaza archivos inválidos', () => {
  const a = P.crear(P.almacenMemoria());
  a.marcarLeccion(2, 'guiado', true);
  a.ponerSesion('2026-11-02', 'cancelada');
  const json = a.exportar();
  const b = P.crear(P.almacenMemoria());
  b.importar(json);
  assert.equal(b.leccionCompletada(2, 'guiado'), true);
  assert.equal(b.sesion('2026-11-02'), 'cancelada');
  assert.throws(() => b.importar('no es json'), /JSON/);
  assert.throws(() => b.importar('{"app":"otra"}'), /respaldo/);
  assert.throws(() => b.importar(JSON.stringify({ app: 'funcode-academy', version: 99 })), /versión/);
  assert.equal(b.leccionCompletada(2, 'guiado'), true, 'un import fallido no borra el progreso');
});

test('progreso: almacén dañado no rompe la plataforma', () => {
  const almacen = P.almacenMemoria();
  almacen.setItem(P.CLAVE, '{roto');
  const pr = P.crear(almacen);
  assert.equal(pr.resumenGlobal(FA.datos.clases).hechas, 0);
});

test('calendario: primera clase el jueves 29-oct-2026 de 60 min y luego lunes (90) y miércoles (60)', () => {
  const s = C.generar(10, {});
  assert.equal(s[0].fecha, '2026-10-29');
  assert.equal(s[0].dia, 'Jueves');
  assert.equal(s[0].minutos, 60);
  assert.equal(s[1].fecha, '2026-11-02');
  assert.equal(s[1].minutos, 90);
  assert.equal(s[2].fecha, '2026-11-04');
  assert.equal(s[2].minutos, 60);
  assert.equal(s.filter((x) => x.clase).length, 10);
  assert.equal(s[s.length - 1].clase, 10);
  assert.ok(s[1].festivo, '2-nov-2026 se marca como posible festivo');
});

test('calendario: cancelar y continuar recalculan las fechas', () => {
  const base = C.generar(10, {});
  const conCancel = C.generar(10, { '2026-11-02': 'cancelada' });
  assert.equal(conCancel[1].clase, null);
  assert.equal(conCancel[2].clase, 2);
  assert.equal(conCancel.length, base.length + 1);
  const conCont = C.generar(10, { '2026-11-02': 'continuacion' });
  assert.equal(conCont[1].clase, 1);
  assert.equal(conCont[2].clase, 2);
});
