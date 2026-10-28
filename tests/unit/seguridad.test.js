'use strict';
/*
 * Comprueba que la plataforma no contiene credenciales, el dominio de producción ni
 * datos personales del volcado de la web de Marcos.
 * Para comparar contra los valores reales use: node tools/verificar-secretos.js <carpeta del proyecto de Marcos>
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const CARPETAS = ['plataforma', 'docs', 'recursos', 'README.md'];

function archivos(ruta) {
  const abs = path.join(RAIZ, ruta);
  if (!fs.existsSync(abs)) return [];
  if (fs.statSync(abs).isFile()) return [abs];
  return fs.readdirSync(abs).flatMap((n) => archivos(path.join(ruta, n)));
}

const lista = CARPETAS.flatMap(archivos).filter((f) => /\.(js|html|css|md|sql|json|svg)$/.test(f));

test('hay archivos que revisar', () => assert.ok(lista.length > 20));

test('no aparece el dominio de producción ni correos de la empresa', () => {
  for (const f of lista) {
    const t = fs.readFileSync(f, 'utf8');
    assert.doesNotMatch(t, /gestionempresarial(mf)?\.com/i, path.relative(RAIZ, f));
  }
});

test('las contraseñas asignadas en código están ocultas', () => {
  const patrones = [
    /Password\s*=\s*'(?!\[)[^']+'/,          // $mail->Password = '...'
    /\$pass\s*=\s*'(?!\[)[^']+'/,            // $pass = '...'
    /\/\/\s*\$password\s*=\s*"(?!\[)[^"]+"/   // // $password = "..."
  ];
  for (const f of lista) {
    const t = fs.readFileSync(f, 'utf8');
    for (const p of patrones) assert.doesNotMatch(t, p, `${path.relative(RAIZ, f)} ${p}`);
  }
});

test('la base de prueba solo contiene usuarios inventados (@prueba.test)', () => {
  const sql = fs.readFileSync(path.join(RAIZ, 'recursos', 'bd-prueba.sql'), 'utf8');
  const correos = [...sql.matchAll(/'([^'\s]+@[^'\s]+)'/g)].map((m) => m[1]);
  assert.ok(correos.length >= 3);
  correos.forEach((c) => assert.match(c, /@prueba\.test$/));
});

test('ningún archivo de la plataforma contiene el carácter de reemplazo U+FFFD (el publicador de artifacts lo rechaza)', () => {
  for (const f of lista) assert.ok(!fs.readFileSync(f, 'utf8').includes('\uFFFD'), path.relative(RAIZ, f));
});
