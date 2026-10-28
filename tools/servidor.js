#!/usr/bin/env node
/*
 * servidor.js — Servidor local mínimo para abrir la plataforma en http://localhost:8080
 * No es obligatorio: la plataforma también funciona abriendo plataforma/index.html con doble clic.
 * Solo escucha en 127.0.0.1 (no es accesible desde otros equipos).
 *
 * Uso: node tools/servidor.js [puerto]
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', 'plataforma');
const PUERTO = Number(process.argv[2]) || 8080;
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.png': 'image/png'
};

http.createServer((req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const archivo = path.resolve(RAIZ, '.' + (ruta === '/' ? '/index.html' : ruta));
  // Evita salir de la carpeta plataforma/ con rutas como /../../
  if (archivo !== RAIZ && !archivo.startsWith(RAIZ + path.sep)) { res.writeHead(403); return res.end('Prohibido'); }
  fs.readFile(archivo, (err, datos) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('No encontrado'); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(datos);
  });
}).listen(PUERTO, '127.0.0.1', () => {
  console.log(`Funcode Academy en http://localhost:${PUERTO}  (Ctrl+C para detener)`);
});
