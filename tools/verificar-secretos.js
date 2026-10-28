#!/usr/bin/env node
/*
 * verificar-secretos.js — Comprueba que ningún secreto ni dato personal de la web de Marcos
 * se copió a esta plataforma.
 *
 * Uso: node tools/verificar-secretos.js <carpeta del proyecto de Marcos (Proyecto_GE-master)>
 *
 * Lee del proyecto original (sin modificarlo):
 *   - valores asignados a contraseñas en PHP ($pass, ->Password, $password),
 *   - textos de comentarios que contienen contraseñas antiguas,
 *   - correos, documentos y hashes del volcado SQL.
 * y busca cada valor en los archivos de esta plataforma. No imprime los secretos: solo
 * dónde aparecen (si aparecen).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const origen = process.argv[2];
if (!origen || !fs.existsSync(origen)) {
  console.error('Uso: node tools/verificar-secretos.js <carpeta Proyecto_GE-master>');
  process.exit(2);
}

function recorrer(dir, filtro) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 'node_modules' || e.name === '.git' ? [] : recorrer(p, filtro);
    return filtro(p) ? [p] : [];
  });
}

const secretos = new Set();
for (const f of recorrer(origen, (p) => p.endsWith('.php') && !p.includes('PHPMailer'))) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/(?:\$pass|Password|\$password)\s*=\s*['"]([^'"]{4,})['"]/g)) secretos.add(m[1]);
  for (const m of t.matchAll(/\/\/[^\n]*?(\S{8,})\s+(\S{8,})\s*\/\/\s*SMTP password/g)) { secretos.add(m[1]); secretos.add(m[2]); }
  for (const m of t.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)) secretos.add(m[0]);               // correos en código y comentarios
}
for (const f of recorrer(origen, (p) => p.endsWith('.sql'))) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/'([^'\s]+@[^'\s]+\.[a-z]{2,})'/gi)) secretos.add(m[1]);  // correos
  for (const m of t.matchAll(/'([0-9a-f]{40})'/g)) secretos.add(m[1]);                  // hashes sha1
  for (const m of t.matchAll(/'(\d{7,11})'/g)) secretos.add(m[1]);                      // documentos / teléfonos
}
secretos.delete('root');

const destino = path.resolve(__dirname, '..');
const archivos = recorrer(destino, (p) => /\.(js|html|css|md|sql|json|txt)$/.test(p) && !p.includes(`${path.sep}tools${path.sep}verificar-secretos.js`));
let encontrados = 0;
for (const f of archivos) {
  const t = fs.readFileSync(f, 'utf8');
  let i = 0;
  for (const s of secretos) {
    i++;
    if (t.includes(s)) { encontrados++; console.log(`✘ ${path.relative(destino, f)} contiene el valor sensible n.º ${i} (${s.length} caracteres)`); }
  }
}
console.log(`${secretos.size} valores sensibles extraídos del proyecto original; ${archivos.length} archivos revisados.`);
if (encontrados) { console.log(`✘ ${encontrados} coincidencias. Revisar antes de compartir o publicar.`); process.exit(1); }
console.log('✔ Ningún secreto ni dato personal del proyecto original aparece en la plataforma.');
