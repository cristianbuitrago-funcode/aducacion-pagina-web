'use strict';
/*
 * Pruebas de extremo a extremo en un navegador real (Chromium + Playwright).
 * Si Playwright no está instalado, las pruebas se omiten con un aviso.
 * Instalar: npm install --no-save playwright && npx playwright install chromium
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn } = require('child_process');

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { chromium = null; }
const omitir = chromium ? false : 'Playwright no está instalado';

const INDEX = 'file://' + path.resolve(__dirname, '..', '..', 'plataforma', 'index.html');
let navegador;

test.before(async () => { if (chromium) navegador = await chromium.launch(); });
test.after(async () => { if (navegador) await navegador.close(); });

async function pagina(opciones) {
  const contexto = await navegador.newContext(Object.assign({ acceptDownloads: true }, opciones));
  const p = await contexto.newPage();
  p.errores = [];
  p.on('pageerror', (e) => p.errores.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') p.errores.push(m.text()); });
  return p;
}
async function ir(p, ruta) { await p.goto(INDEX + ruta); await p.waitForSelector('main h1'); }
async function titulo(p, texto) { await p.waitForFunction((t) => document.querySelector('main h1').textContent === t, texto); }

test('todas las rutas y las 110 lecciones cargan sin errores de JavaScript', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '');
  const rutas = await p.evaluate(() => FA.datos.clases.flatMap((c) =>
    ['#/clase/' + c.numero].concat(c.lecciones.map((l) => '#/clase/' + c.numero + '/' + l.id))));
  rutas.push('#/', '#/clases', '#/calendario', '#/arquitectura', '#/glosario', '#/errores', '#/errores/sql', '#/pagos', '#/profesor', '#/progreso');
  assert.equal(rutas.filter((r) => /\/clase\/\d+\/\w+/.test(r)).length, 110);
  for (const r of rutas) {
    await p.evaluate((h) => { location.hash = h; }, r);
    const h1 = await p.textContent('main h1');
    assert.ok(h1 && h1 !== 'Página no encontrada', `ruta ${r}`);
  }
  await ir(p, '#/no-existe');
  assert.equal(await p.textContent('main h1'), 'Página no encontrada');
  assert.deepEqual(p.errores, []);
  await p.context().close();
});

test('navegación: inicio → clases → clase → lecciones con siguiente/anterior', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '');
  await p.click('.menu a[href="#/clases"]');
  await p.waitForSelector('.grid-clases');
  assert.equal(await p.locator('.tarjeta-clase').count(), 10);
  await p.click('.tarjeta-clase[href="#/clase/3"]');
  await p.waitForSelector('.clase-cabecera');
  assert.match(await p.textContent('main h1'), /HTML/);
  await p.click('text=Empezar la clase');
  await titulo(p, 'Objetivo y plan de la sesión');
  await p.click('.nav-lecciones .boton.primario');
  await titulo(p, 'Explicación desde cero');
  await p.click('.nav-lecciones .boton >> nth=0');
  await titulo(p, 'Objetivo y plan de la sesión');
  await p.context().close();
});

test('completar una lección se guarda y sobrevive a la recarga', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '#/clase/1/explicacion');
  await p.click('[data-accion="completar"]');
  assert.match(await p.textContent('[data-accion="completar"]'), /completada/);
  await p.reload(); await p.waitForSelector('article.leccion');
  assert.match(await p.textContent('[data-accion="completar"]'), /completada/);
  assert.equal(await p.textContent('.indice-leccion li.actual .check'), '✔');
  await ir(p, '#/clases');
  assert.match(await p.textContent('.tarjeta-clase[href="#/clase/1"]'), /En curso/);
  await p.context().close();
});

test('evaluación: retroalimentación por pregunta; aprobar completa la lección', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '#/clase/2/evaluacion');
  const correctas = await p.evaluate(() => FA.datos.clases[1].evaluacion.map((q) => q.correcta));
  // Primer intento: todo mal
  for (let i = 0; i < correctas.length; i++) {
    const incorrecta = correctas[i] === 0 ? 1 : 0;
    await p.check(`input[name="clase-2-${i}"][value="${incorrecta}"]`);
  }
  await p.click('text=Comprobar respuestas');
  assert.ok(await p.locator('.quiz-pregunta.mal').count() > 0);
  assert.match(await p.textContent('.quiz-resultado'), /Se necesita 70%/);
  assert.match(await p.textContent('#zona-completar'), /se completa al obtener/);
  // Segundo intento: todo bien
  await p.click('text=Volver a intentar');
  for (let i = 0; i < correctas.length; i++) await p.check(`input[name="clase-2-${i}"][value="${correctas[i]}"]`);
  await p.click('text=Comprobar respuestas');
  assert.equal(await p.locator('.quiz-pregunta.bien').count(), correctas.length);
  assert.match(await p.textContent('.resultado-cifra'), /100%/);
  assert.match(await p.textContent('#zona-completar'), /Evaluación superada/);
  await p.reload(); await p.waitForSelector('.quiz');
  assert.match(await p.textContent('.quiz-previo'), /Mejor resultado: 100%/);
  await p.context().close();
});

test('respuestas escritas y casillas se guardan solas', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '#/clase/1/individual');
  await p.fill('textarea[data-clave="1:individual"]', 'Mi web sirve para pedir transporte.');
  await p.waitForFunction(() => document.querySelector('.guardado').textContent.includes('Guardado'));
  await p.check('input[data-clave="1:rubrica:0"]');
  await p.reload(); await p.waitForSelector('textarea');
  assert.equal(await p.inputValue('textarea[data-clave="1:individual"]'), 'Mi web sirve para pedir transporte.');
  assert.equal(await p.isChecked('input[data-clave="1:rubrica:0"]'), true);
  await p.context().close();
});

test('código real: el botón “Líneas X–Y” resalta esas líneas', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '#/clase/2/codigo');
  const boton = p.locator('#frag-conexion .ver-lineas[data-lineas="4-6"]');
  await boton.click();
  assert.equal(await p.locator('#frag-conexion .linea.resaltada').count(), 3);
  await boton.click();
  assert.equal(await p.locator('#frag-conexion .linea.resaltada').count(), 0);
  await p.context().close();
});

test('calendario: 60/90 min, posible festivo y cancelar una sesión recalcula', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '#/calendario');
  const primera = p.locator('.sesion').first();
  assert.match(await primera.textContent(), /Jueves 29 de octubre de 2026/);
  assert.match(await primera.textContent(), /60 min/);
  const segunda = p.locator('.sesion').nth(1);
  assert.match(await segunda.textContent(), /90 min/);
  assert.match(await segunda.textContent(), /Posible festivo/);
  await segunda.locator('select').selectOption('cancelada');
  await p.waitForSelector('.sesion-cancelada');
  assert.match(await p.locator('.sesion').nth(2).textContent(), /Clase 2\./);
  await p.reload(); await p.waitForSelector('.sesion');
  assert.equal(await p.locator('.sesion-cancelada').count(), 1);
  await p.context().close();
});

test('progreso: exportar, borrar e importar restaura todo', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '#/clase/4/conceptos');
  await p.click('[data-accion="completar"]');
  await ir(p, '#/progreso');
  const [descarga] = await Promise.all([p.waitForEvent('download'), p.click('[data-accion="exportar"]')]);
  const destino = path.join(os.tmpdir(), 'fa-progreso-' + process.pid + '.json');
  await descarga.saveAs(destino);
  const json = JSON.parse(fs.readFileSync(destino, 'utf8'));
  assert.equal(json.app, 'funcode-academy');
  assert.ok(json.lecciones['4:conceptos'].completada);
  assert.equal(JSON.parse(await p.inputValue('#export-json')).app, 'funcode-academy', 'también muestra el texto para copiar');
  await p.click('[data-accion="reiniciar"]');
  await p.click('[data-accion="reiniciar-no"]');
  assert.equal(await p.isVisible('#confirmar-borrado'), false, 'cancelar no borra');
  assert.match(await p.textContent('.progreso-global'), /1 de 110/);
  await p.click('[data-accion="reiniciar"]');
  await p.click('[data-accion="reiniciar-si"]');
  await p.waitForFunction(() => document.querySelector('#mensaje-progreso') && document.querySelector('#mensaje-progreso').textContent.includes('borrado'));
  assert.match(await p.textContent('.progreso-global'), /0 de 110/);
  await p.setInputFiles('input[data-accion="importar"]', destino);
  await p.waitForFunction(() => document.querySelector('#mensaje-progreso').textContent.includes('importado'));
  assert.match(await p.textContent('.progreso-global'), /1 de 110/);
  fs.unlinkSync(destino);
  await p.context().close();
});

test('glosario: el buscador filtra (sin importar tildes)', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '#/glosario');
  const total = await p.locator('#lista-glosario .concepto').count();
  await p.fill('[data-accion="buscar-glosario"]', 'peticion');
  const filtrados = await p.locator('#lista-glosario .concepto').count();
  assert.ok(total >= 60 && filtrados >= 1 && filtrados < total);
  assert.match(await p.textContent('#lista-glosario'), /Petición HTTP/);
  await p.context().close();
});

test('modo profesor muestra los guiones dentro de las lecciones y se recuerda', { skip: omitir }, async () => {
  const p = await pagina();
  await ir(p, '#/clase/1/explicacion');
  assert.equal(await p.isVisible('.guion-profesor'), false);
  await p.click('#boton-profesor');
  assert.equal(await p.isVisible('.guion-profesor'), true);
  await p.reload(); await p.waitForSelector('article.leccion');
  assert.equal(await p.isVisible('.guion-profesor'), true);
  await p.context().close();
});

test('tema: respeta data-theme="dark" explícito aunque el sistema esté en claro', { skip: omitir }, async () => {
  const p = await pagina({ colorScheme: 'light' });
  await ir(p, '');
  const claro = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await p.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  const oscuro = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  assert.notEqual(claro, oscuro);
  assert.equal(oscuro, 'rgb(11, 18, 32)');
  await p.context().close();
});

test('celular (360 px): sin desplazamiento horizontal y menú desplegable', { skip: omitir }, async () => {
  const p = await pagina({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });
  for (const r of ['', '#/clases', '#/clase/6', '#/clase/6/codigo', '#/clase/6/diagrama', '#/clase/7/diagrama', '#/clase/4/guiado', '#/calendario', '#/arquitectura', '#/pagos', '#/progreso', '#/errores']) {
    await ir(p, r);
    const desborde = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(desborde <= 0, `ruta ${r || '#/'} se desborda ${desborde}px`);
  }
  assert.equal(await p.isVisible('.menu a[href="#/glosario"]'), false);
  await p.click('#boton-menu');
  assert.equal(await p.isVisible('.menu a[href="#/glosario"]'), true);
  await p.click('.menu a[href="#/glosario"]');
  await p.waitForSelector('#lista-glosario');
  assert.equal(await p.isVisible('.menu a[href="#/glosario"]'), false, 'el menú se cierra al navegar');
  assert.deepEqual(p.errores, []);
  await p.context().close();
});

test('servidor local opcional (node tools/servidor.js) entrega la plataforma', { skip: omitir }, async () => {
  const puerto = 18000 + (process.pid % 1000);
  const srv = spawn(process.execPath, [path.resolve(__dirname, '..', '..', 'tools', 'servidor.js'), String(puerto)]);
  try {
    await new Promise((ok, mal) => { srv.stdout.once('data', ok); srv.once('error', mal); });
    const p = await pagina();
    await p.goto(`http://localhost:${puerto}/#/clase/5`);
    await p.waitForSelector('main h1');
    assert.match(await p.textContent('main h1'), /JavaScript/);
    const r = await p.request.get(`http://localhost:${puerto}/../package.json`);
    assert.notEqual(r.status(), 200, 'no debe servir archivos fuera de plataforma/');
    await p.context().close();
  } finally { srv.kill(); }
});
