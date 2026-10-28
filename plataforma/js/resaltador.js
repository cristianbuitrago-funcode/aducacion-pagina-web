/*
 * resaltador.js — Resaltado de sintaxis propio, sin librerías externas.
 *
 * Idea: recorremos el texto de izquierda a derecha. En cada posición probamos una lista
 * de reglas (expresiones regulares). La primera que coincide "se come" ese trozo y lo
 * envolvemos en <span class="tk-...">. Si ninguna coincide, copiamos un carácter.
 * El resultado, sin las etiquetas <span>, es exactamente el texto original.
 */
(function (raiz, fabrica) {
  var modulo = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = modulo;
  else raiz.FA_Resaltador = modulo;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function escapar(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function palabras(lista, insensible) {
    return new RegExp('\\b(?:' + lista.join('|') + ')\\b', 'y' + (insensible ? 'i' : ''));
  }

  var KW_PHP = ['if', 'else', 'elseif', 'while', 'for', 'foreach', 'as', 'switch', 'case', 'break',
    'default', 'function', 'return', 'include', 'require', 'include_once', 'require_once', 'echo',
    'new', 'use', 'try', 'catch', 'isset', 'exit', 'true', 'false', 'null', 'endforeach', 'global'];
  var KW_JS = ['var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'new',
    'true', 'false', 'null', 'undefined', 'document', 'window', 'this', 'typeof'];
  var KW_SQL = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
    'DELETE', 'CREATE', 'TABLE', 'ALTER', 'ADD', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'ON',
    'CASCADE', 'NOT', 'NULL', 'DEFAULT', 'INT', 'VARCHAR', 'DATE', 'DATETIME', 'TIME', 'CONSTRAINT',
    'MODIFY', 'AUTO_INCREMENT', 'ENGINE', 'CHARSET', 'JOIN', 'ORDER', 'BY', 'LIMIT', 'COUNT', 'AS',
    'NOW', 'IN', 'IS', 'LIKE', 'DATABASE', 'USE', 'SHOW', 'TABLES', 'DESCRIBE', 'GROUP'];

  var REGLAS = {
    php: [
      ['tk-com', /\/\*[\s\S]*?(?:\*\/|$)/y],
      ['tk-com', /(?:\/\/|#)[^\n]*/y],
      ['tk-tag', /<\?php|\?>/y],
      ['tk-str', /'(?:[^'\\]|\\[\s\S])*'?/y],
      ['tk-str', /"(?:[^"\\]|\\[\s\S])*"?/y],
      ['tk-var', /\$[A-Za-z_]\w*/y],
      ['tk-kw', palabras(KW_PHP, true)],
      ['tk-fn', /[A-Za-z_]\w*(?=\s*\()/y],
      ['tk-num', /\b\d+(?:\.\d+)?\b/y]
    ],
    js: [
      ['tk-com', /\/\*[\s\S]*?(?:\*\/|$)/y],
      ['tk-com', /\/\/[^\n]*/y],
      ['tk-str', /'(?:[^'\\\n]|\\.)*'?/y],
      ['tk-str', /"(?:[^"\\\n]|\\.)*"?/y],
      ['tk-str', /`(?:[^`\\]|\\[\s\S])*`?/y],
      ['tk-kw', palabras(KW_JS)],
      ['tk-fn', /[A-Za-z_$][\w$]*(?=\s*\()/y],
      ['tk-num', /\b\d+(?:\.\d+)?\b/y]
    ],
    sql: [
      ['tk-com', /--[^\n]*/y],
      ['tk-str', /'(?:[^'\\]|\\.)*'?/y],
      ['tk-var', /`[^`]*`?/y],
      ['tk-kw', palabras(KW_SQL, true)],
      ['tk-num', /\b\d+\b/y]
    ],
    css: [
      ['tk-com', /\/\*[\s\S]*?(?:\*\/|$)/y],
      ['tk-str', /'[^'\n]*'?|"[^"\n]*"?/y],
      ['tk-kw', /@[\w-]+/y],
      ['tk-num', /#[0-9a-fA-F]{3,8}\b/y],
      ['tk-num', /-?\b\d+(?:\.\d+)?(?:px|em|rem|vh|vw|%|s|ms)?/y],
      // Dentro de llaves { } lo que va antes de ":" es una propiedad; fuera, un selector.
      ['tk-prop', /[\w-]+(?=\s*:)/y, function (e) { return e.llaves > 0; }],
      ['tk-sel', /[.#]?[A-Za-z][\w-]*/y, function (e) { return e.llaves === 0; }],
      ['', /\{/y, null, function (e) { e.llaves++; }],
      ['', /\}/y, null, function (e) { e.llaves = Math.max(0, e.llaves - 1); }]
    ]
  };

  function tokenizar(codigo, lenguaje) {
    var reglas = REGLAS[lenguaje];
    if (!reglas) return escapar(codigo);
    var salida = '', i = 0, estado = { llaves: 0 }, texto = '';
    function volcarTexto() { if (texto) { salida += escapar(texto); texto = ''; } }
    while (i < codigo.length) {
      var hecho = false;
      for (var r = 0; r < reglas.length; r++) {
        var regla = reglas[r];
        if (regla[2] && !regla[2](estado)) continue;
        regla[1].lastIndex = i;
        var m = regla[1].exec(codigo);
        if (m && m[0].length > 0) {
          volcarTexto();
          salida += regla[0] ? '<span class="' + regla[0] + '">' + escapar(m[0]) + '</span>' : escapar(m[0]);
          if (regla[3]) regla[3](estado);
          i += m[0].length;
          hecho = true;
          break;
        }
      }
      if (!hecho) {
        // Avanzamos una "palabra" completa para que \b funcione bien en la siguiente vuelta.
        var resto = /[A-Za-z0-9_]+|[\s\S]/y;
        resto.lastIndex = i;
        var p = resto.exec(codigo)[0];
        texto += p;
        i += p.length;
      }
    }
    volcarTexto();
    return salida;
  }

  /* HTML puede llevar bloques <?php ... ?> dentro (archivos .php de Marcos). */
  function resaltarHtml(codigo) {
    var salida = '', i = 0;
    var reglas = [
      ['php', /<\?php[\s\S]*?(?:\?>|$)/y],
      ['tk-com', /<!--[\s\S]*?(?:-->|$)/y],
      ['tk-tag', /<\/?[A-Za-z][\w-]*|\/?>/y],
      ['tk-attr', /[\w-:]+(?==)/y],
      ['tk-str', /"[^"]*"?|'[^']*'?/y]
    ];
    var texto = '';
    while (i < codigo.length) {
      var hecho = false;
      for (var r = 0; r < reglas.length; r++) {
        reglas[r][1].lastIndex = i;
        var m = reglas[r][1].exec(codigo);
        if (m && m[0].length) {
          salida += escapar(texto); texto = '';
          salida += reglas[r][0] === 'php'
            ? tokenizar(m[0], 'php')
            : '<span class="' + reglas[r][0] + '">' + escapar(m[0]) + '</span>';
          i += m[0].length; hecho = true; break;
        }
      }
      if (!hecho) { texto += codigo[i]; i++; }
    }
    return salida + escapar(texto);
  }

  function resaltar(codigo, lenguaje) {
    lenguaje = (lenguaje || '').toLowerCase();
    if (lenguaje === 'html' || lenguaje === 'php-html') return resaltarHtml(codigo);
    if (lenguaje === 'javascript') lenguaje = 'js';
    return tokenizar(codigo, lenguaje);
  }

  return { resaltar: resaltar, lenguajes: ['php', 'php-html', 'html', 'js', 'css', 'sql'] };
});
