/*
 * cargar.js — Carga el motor y los datos de la plataforma en Node, en el mismo orden que
 * index.html, para poder probar el contenido sin navegador.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PLATAFORMA = path.resolve(__dirname, '..', '..', 'plataforma');

function scriptsDeIndex() {
  const html = fs.readFileSync(path.join(PLATAFORMA, 'index.html'), 'utf8');
  return [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
}

function cargarTodo() {
  const contexto = { console };
  contexto.self = contexto;
  vm.createContext(contexto);
  for (const src of scriptsDeIndex()) {
    if (src === 'js/app.js') continue; // la interfaz necesita un navegador
    vm.runInContext(fs.readFileSync(path.join(PLATAFORMA, src), 'utf8'), contexto, { filename: src });
  }
  return contexto;
}

module.exports = { PLATAFORMA, scriptsDeIndex, cargarTodo };
