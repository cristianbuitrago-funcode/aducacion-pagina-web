/*
 * app.js — Interfaz de Funcode Academy.
 *
 * Funciona como una "aplicación de una sola página": index.html se carga una vez y, según
 * lo que haya después del # en la dirección (por ejemplo #/clase/3/codigo), esta función
 * dibuja la vista correspondiente dentro de <main id="app">.
 */
(function () {
  'use strict';

  var FA = window.FA;
  var D = FA.datos;
  var esc = FA.escapar;
  var md = FA.enLinea;
  var Progreso = window.FA_Progreso.crear();
  var Evaluacion = window.FA_Evaluacion;
  var Calendario = window.FA_Calendario;
  var Resaltador = window.FA_Resaltador;

  var app = document.getElementById('app');
  var respuestasQuiz = {}; // respuestas en curso, por id de evaluación

  /* ---------------------------------------------------------------- utilidades */

  function claseNum(n) { return D.clases.filter(function (c) { return c.numero === +n; })[0]; }

  function etiquetaEstado(estado) {
    var txt = { pendiente: 'Pendiente', 'en-curso': 'En curso', completada: 'Completada' }[estado];
    return '<span class="estado estado-' + estado + '">' + txt + '</span>';
  }

  function barra(porcentaje, etiqueta) {
    return '<div class="barra" role="progressbar" aria-valuenow="' + porcentaje + '" aria-valuemin="0" aria-valuemax="100" aria-label="' +
      esc(etiqueta || 'Progreso') + '"><span style="width:' + porcentaje + '%"></span></div>';
  }

  function anillo(porcentaje) {
    var r = 42, c = 2 * Math.PI * r, lleno = c * porcentaje / 100;
    return '<svg class="anillo" viewBox="0 0 100 100" role="img" aria-label="' + porcentaje + '% completado">' +
      '<circle cx="50" cy="50" r="' + r + '" class="anillo-fondo"/>' +
      (porcentaje > 0 ? '<circle cx="50" cy="50" r="' + r + '" class="anillo-valor" stroke-dasharray="' + lleno + ' ' + c + '"/>' : '') +
      '<text x="50" y="56" text-anchor="middle">' + porcentaje + '%</text></svg>';
  }

  function minutos(m) { return m ? m + ' min' : '—'; }

  function lista(items, ordenada) {
    var tag = ordenada ? 'ol' : 'ul';
    return '<' + tag + '>' + items.map(function (i) { return '<li>' + md(i) + '</li>'; }).join('') + '</' + tag + '>';
  }

  /* ---------------------------------------------------------------- bloques de contenido */

  function bloques(lista_) {
    return (lista_ || []).map(bloque).join('');
  }

  function bloque(b) {
    switch (b.t) {
      case 'p': return '<p>' + md(b.x) + '</p>';
      case 'h': return '<h3>' + md(b.x) + '</h3>';
      case 'lista': return lista(b.items, b.ordenada);
      case 'nota':
        return '<aside class="nota nota-' + (b.tipo || 'info') + '">' +
          '<strong class="nota-titulo">' + esc(b.titulo || tituloNota(b.tipo)) + '</strong>' +
          (b.x ? '<p>' + md(b.x) + '</p>' : '') + (b.items ? lista(b.items) : '') + '</aside>';
      case 'codigo': return fragmento(D.codigo[b.id], b);
      case 'ejemplo': return ejemplo(b);
      case 'diagrama': return diagrama(D.diagramas[b.id]);
      case 'tabla':
        return '<div class="tabla-scroll"><table><thead><tr>' +
          b.cabecera.map(function (c) { return '<th scope="col">' + md(c) + '</th>'; }).join('') +
          '</tr></thead><tbody>' + b.filas.map(function (f) {
            return '<tr>' + f.map(function (c) { return '<td>' + md(c) + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      case 'pregunta':
        return '<details class="pregunta-rapida"><summary>🤔 ' + md(b.q) + '</summary><p>' + md(b.a) + '</p></details>';
      default: return '';
    }
  }

  function tituloNota(tipo) {
    return {
      info: 'Para tener en cuenta', alerta: 'Cuidado', hecho: 'Hecho comprobado en el código',
      hipotesis: 'Hipótesis por verificar', analogia: 'Analogía', seguridad: 'Seguridad', tip: 'Consejo'
    }[tipo || 'info'];
  }

  /* Pequeño ejemplo genérico (no es código de Marcos) */
  function ejemplo(b) {
    return '<figure class="codigo codigo-ejemplo"><figcaption><span class="lang lang-' + esc(b.lang) + '">' + esc(b.lang) +
      '</span> ' + md(b.titulo || 'Ejemplo de práctica (no es código de la web de Marcos)') + '</figcaption>' +
      '<pre><code>' + Resaltador.resaltar(b.codigo, b.lang) + '</code></pre></figure>';
  }

  /* Fragmento real con números de línea, explicación línea por línea y relaciones. */
  function fragmento(f, opciones) {
    if (!f) return '<p class="error">Fragmento no encontrado.</p>';
    var lineasHtml = Resaltador.resaltar(f.codigo, f.lang).split('\n');
    var desde = f.desde || 1;
    var codigo = lineasHtml.map(function (l, i) {
      return '<span class="linea" data-n="' + (desde + i) + '"><span class="num" aria-hidden="true">' + (desde + i) + '</span>' + (l || ' ') + '</span>';
    }).join('');
    var hasta = desde + lineasHtml.length - 1;
    // Ordenamos por la primera línea: JS pone antes las claves numéricas ("23") que las de rango ("16-17").
    var claves = Object.keys(f.lineas || {}).sort(function (a, b) { return FA.rangoLineas(a)[0] - FA.rangoLineas(b)[0]; });
    var expl = claves.map(function (k) {
      var r = FA.rangoLineas(k);
      var etiqueta = r.length > 1 ? 'Líneas ' + r[0] + '–' + r[r.length - 1] : 'Línea ' + r[0];
      return '<li><button type="button" class="ver-lineas" data-accion="resaltar-lineas" data-lineas="' + esc(k) + '">' +
        etiqueta + '</button> ' + md(f.lineas[k]) + '</li>';
    }).join('');
    return '<figure class="codigo" id="frag-' + esc(f.id) + '">' +
      '<figcaption><span class="lang lang-' + esc(f.lang) + '">' + esc(f.lang === 'php-html' ? 'php + html' : f.lang) + '</span> ' +
      '<span class="archivo">' + esc(f.archivo) + '</span> <span class="rango">líneas ' + desde + '–' + hasta + '</span>' +
      (f.redactado ? ' <span class="redactado" title="Se ocultaron credenciales o datos personales">datos ocultos</span>' : '') +
      '</figcaption>' +
      (f.titulo ? '<p class="frag-titulo">' + md(f.titulo) + '</p>' : '') +
      '<pre tabindex="0"><code>' + codigo + '</code></pre>' +
      (expl ? '<details class="explicacion-lineas"' + (opciones && opciones.cerrado ? '' : ' open') +
        '><summary>Explicación línea por línea</summary><ol class="lista-lineas">' + expl + '</ol></details>' : '') +
      (f.relaciones && f.relaciones.length ? '<div class="relaciones"><strong>Se conecta con:</strong><ul>' +
        f.relaciones.map(function (r) { return '<li><code>' + esc(r.archivo) + '</code> — ' + md(r.x) + '</li>'; }).join('') +
        '</ul></div>' : '') +
      (f.nota ? '<aside class="nota nota-' + (f.nota.tipo || 'info') + '"><strong class="nota-titulo">' +
        esc(f.nota.titulo || tituloNota(f.nota.tipo)) + '</strong><p>' + md(f.nota.x) + '</p></aside>' : '') +
      '</figure>';
  }

  /* ---------------------------------------------------------------- diagramas */

  var NOMBRE_CARRIL = {
    navegador: '🖥️ Navegador', servidor: '⚙️ Servidor (PHP)', bd: '🗄️ Base de datos (MySQL)',
    correo: '✉️ Correo (SMTP)', persona: '🙋 Persona', archivo: '📁 Archivos', pasarela: '💳 Proveedor de pagos'
  };

  function diagrama(d) {
    if (!d) return '<p class="error">Diagrama no encontrado.</p>';
    var cuerpo = '';
    if (d.tipo === 'flujo') {
      var carriles = d.carriles || ['navegador', 'servidor', 'bd'];
      cuerpo = '<div class="flujo" style="--carriles:' + carriles.length + '">' +
        carriles.map(function (c, i) {
          return '<div class="carril-cabecera carril-' + c + '" style="grid-column:' + (i + 1) + '">' + esc(NOMBRE_CARRIL[c] || c) + '</div>';
        }).join('') +
        d.pasos.map(function (p, i) {
          var col = carriles.indexOf(p.carril) + 1;
          return '<div class="paso carril-' + esc(p.carril) + '" style="grid-column:' + col + '">' +
            '<span class="paso-num">' + (i + 1) + '</span><span class="paso-carril">' + esc(NOMBRE_CARRIL[p.carril] || p.carril) + '</span>' +
            '<strong>' + md(p.titulo) + '</strong>' + (p.detalle ? '<span>' + md(p.detalle) + '</span>' : '') + '</div>' +
            (i < d.pasos.length - 1 ? '<div class="flecha" style="grid-column:1 / -1" aria-hidden="true">' +
              (p.flecha ? '<span>' + md(p.flecha) + '</span>' : '') + '</div>' : '');
        }).join('') + '</div>';
    } else if (d.tipo === 'mapa') {
      cuerpo = '<div class="mapa">' + d.grupos.map(function (g) {
        return '<section class="mapa-grupo tec-' + esc(g.tec || 'general') + '"><h4>' + md(g.titulo) + '</h4><ul>' +
          g.nodos.map(function (n) { return '<li><code>' + esc(n.n) + '</code>' + (n.d ? ' — ' + md(n.d) : '') + '</li>'; }).join('') +
          '</ul></section>';
      }).join('') + '</div>' +
        (d.conexiones ? '<h4 class="conexiones-titulo">Conexiones</h4><ul class="conexiones">' + d.conexiones.map(function (c) {
          return '<li><code>' + esc(c.de) + '</code> <span class="flecha-txt" aria-label="se conecta con">→</span> <code>' + esc(c.a) + '</code>' +
            (c.x ? ' <span class="conexion-x">' + md(c.x) + '</span>' : '') + '</li>';
        }).join('') + '</ul>' : '');
    } else if (d.tipo === 'er') {
      cuerpo = '<div class="er">' + d.tablas.map(function (t) {
        return '<section class="er-tabla' + (t.central ? ' er-central' : '') + '"><h4>' + esc(t.nombre) + '</h4>' +
          (t.nota ? '<p>' + md(t.nota) + '</p>' : '') + '<ul>' + t.columnas.map(function (c) {
            return '<li class="' + (c[2] || '') + '"><code>' + esc(c[0]) + '</code> <small>' + esc(c[1]) + '</small>' +
              (c[2] === 'pk' ? ' <span class="clave">PK</span>' : c[2] === 'fk' ? ' <span class="clave fk">FK</span>' : '') + '</li>';
          }).join('') + '</ul></section>';
      }).join('') + '</div>' +
        '<h4 class="conexiones-titulo">Relaciones</h4><ul class="conexiones">' + d.relaciones.map(function (r) {
          return '<li><code>' + esc(r.de) + '</code> <span class="flecha-txt">→</span> <code>' + esc(r.a) + '</code> ' + md(r.x) + '</li>';
        }).join('') + '</ul>';
    } else if (d.tipo === 'arbol') {
      cuerpo = '<pre class="arbol" tabindex="0">' + esc(d.texto) + '</pre>';
    }
    return '<figure class="diagrama" id="diag-' + esc(d.id) + '"><figcaption><strong>' + md(d.titulo) + '</strong>' +
      (d.descripcion ? '<span>' + md(d.descripcion) + '</span>' : '') + '</figcaption>' + cuerpo +
      (d.leyenda ? '<p class="leyenda">' + md(d.leyenda) + '</p>' : '') + '</figure>';
  }

  /* ---------------------------------------------------------------- evaluación (quiz) */

  function quiz(id, preguntas, claseNumero) {
    var r = respuestasQuiz[id] || (respuestasQuiz[id] = preguntas.map(function () { return null; }));
    var previo = claseNumero != null ? Progreso.quiz(claseNumero) : Progreso.quiz(id);
    return '<form class="quiz" data-quiz="' + esc(id) + '" data-clase="' + (claseNumero == null ? '' : claseNumero) + '">' +
      (previo ? '<p class="quiz-previo">Mejor resultado: <strong>' + previo.mejor + '%</strong> · intentos: ' + previo.intentos + '</p>' : '') +
      preguntas.map(function (p, i) {
        return '<fieldset class="quiz-pregunta" data-indice="' + i + '"><legend><span class="q-num">' + (i + 1) + '.</span> ' + md(p.q) + '</legend>' +
          p.opciones.map(function (o, j) {
            var nombre = id + '-' + i;
            return '<label class="opcion"><input type="radio" name="' + esc(nombre) + '" value="' + j + '"' +
              (r[i] === j ? ' checked' : '') + ' data-accion="responder" data-quiz="' + esc(id) + '" data-i="' + i + '"> <span>' + md(o) + '</span></label>';
          }).join('') + '<div class="retro" aria-live="polite"></div></fieldset>';
      }).join('') +
      '<div class="quiz-acciones"><button type="submit" class="boton primario">Comprobar respuestas</button>' +
      '<button type="button" class="boton" data-accion="reiniciar-quiz" data-quiz="' + esc(id) + '">Volver a intentar</button></div>' +
      '<div class="quiz-resultado" aria-live="polite"></div></form>';
  }

  function corregirQuiz(form) {
    var id = form.getAttribute('data-quiz');
    var claseAttr = form.getAttribute('data-clase');
    var preguntas = preguntasDe(id);
    var res = Evaluacion.calificar(preguntas, respuestasQuiz[id] || [], Progreso.APROBACION);
    res.detalle.forEach(function (d) {
      var fs = form.querySelector('.quiz-pregunta[data-indice="' + d.indice + '"]');
      fs.classList.remove('bien', 'mal', 'vacia');
      fs.classList.add(d.correcta ? 'bien' : (d.respondida ? 'mal' : 'vacia'));
      var correctaTxt = preguntas[d.indice].opciones[d.correctaEs];
      fs.querySelector('.retro').innerHTML = d.correcta
        ? '<p><strong>✔ Correcto.</strong> ' + md(d.retro) + '</p>'
        : '<p><strong>' + (d.respondida ? '✘ No es correcto.' : '○ Sin responder.') + '</strong> La respuesta correcta es: <em>' +
          md(correctaTxt) + '</em>. ' + md(d.retro) + '</p>';
    });
    var guardado = Progreso.registrarQuiz(claseAttr !== '' ? +claseAttr : id, res.porcentaje);
    form.querySelector('.quiz-resultado').innerHTML =
      '<div class="resultado ' + (res.aprobado ? 'aprobado' : 'repasar') + '"><p class="resultado-cifra">' + res.correctas + ' de ' + res.total +
      ' (' + res.porcentaje + '%)</p><p>' + esc(res.mensaje) + '</p>' +
      (res.sinResponder ? '<p>Quedaron ' + res.sinResponder + ' sin responder.</p>' : '') +
      '<p class="quiz-previo">Mejor resultado guardado: ' + guardado.mejor + '% · Se necesita ' + Progreso.APROBACION + '% para superar la evaluación.</p></div>';
    actualizarBotonCompletar();
  }

  function preguntasDe(id) {
    if (id === 'pagos') return D.paginas.pagos.evaluacion;
    return claseNum(id.replace('clase-', '')).evaluacion;
  }

  /* ---------------------------------------------------------------- textos guardados */

  function areaTexto(clave, etiqueta, ayuda) {
    return '<label class="area-texto"><span>' + esc(etiqueta) + '</span>' + (ayuda ? '<small>' + md(ayuda) + '</small>' : '') +
      '<textarea rows="5" data-accion="texto" data-clave="' + esc(clave) + '">' + esc(Progreso.texto(clave)) + '</textarea>' +
      '<small class="guardado" aria-live="polite"></small></label>';
  }

  function casilla(clave, html) {
    return '<label class="casilla"><input type="checkbox" data-accion="check" data-clave="' + esc(clave) + '"' +
      (Progreso.check(clave) ? ' checked' : '') + '> <span>' + html + '</span></label>';
  }

  /* ---------------------------------------------------------------- lecciones de una clase */

  var RENDER_LECCION = {
    objetivo: function (c) {
      return '<div class="objetivo-caja"><h3>Objetivo de aprendizaje</h3><p>' + md(c.objetivo) + '</p>' +
        (c.resultado ? '<p><strong>Resultado esperado:</strong> ' + md(c.resultado) + '</p>' : '') + '</div>' +
        '<h3>Conocimientos previos necesarios</h3>' + lista(c.previos) +
        (c.ajustes ? '<aside class="nota nota-info"><strong class="nota-titulo">Ajuste respecto a la ruta inicial</strong><p>' + md(c.ajustes) + '</p></aside>' : '') +
        planTiempos(c);
    },
    explicacion: function (c) { return bloques(c.explicacion); },
    conceptos: function (c) {
      return '<dl class="conceptos">' + c.conceptos.map(function (k) {
        return '<div class="concepto"><dt>' + esc(k.termino) + '</dt><dd>' + md(k.def) +
          (k.ejemplo ? '<p class="concepto-ejemplo"><strong>En la web de Marcos:</strong> ' + md(k.ejemplo) + '</p>' : '') + '</dd></div>';
      }).join('') + '</dl><p class="mas"><a href="#/glosario">Ver el glosario completo →</a></p>';
    },
    codigo: function (c) { return bloques(c.codigo); },
    diagrama: function (c) { return bloques(c.diagrama); },
    guiado: function (c) {
      var g = c.guiado;
      return '<p class="ejercicio-meta">⏱️ ' + minutos(g.minutos) + ' · <strong>Objetivo:</strong> ' + md(g.objetivo) + '</p>' +
        (g.preparacion ? '<aside class="nota nota-alerta"><strong class="nota-titulo">Antes de empezar</strong>' + lista(g.preparacion) + '</aside>' : '') +
        '<ol class="pasos">' + g.pasos.map(function (p, i) {
          return '<li>' + casilla(c.numero + ':guiado:' + i, md(p.x)) +
            (p.codigo ? ejemplo({ lang: p.lang || 'html', codigo: p.codigo, titulo: p.tituloCodigo || 'Escribe o busca esto' }) : '') +
            (p.comprobar ? '<p class="comprobar">✅ <strong>Comprueba:</strong> ' + md(p.comprobar) + '</p>' : '') + '</li>';
        }).join('') + '</ol>' +
        (g.cierre ? '<aside class="nota nota-tip"><strong class="nota-titulo">Para cerrar</strong><p>' + md(g.cierre) + '</p></aside>' : '');
    },
    individual: function (c) {
      var e = c.individual;
      return '<p class="ejercicio-meta">⏱️ ' + minutos(e.minutos) + (e.cuando ? ' · ' + md(e.cuando) : '') + '</p>' +
        '<div class="consigna"><h3>Consigna para Marcos</h3>' + bloques(e.consigna) + '</div>' +
        '<p><strong>Qué debe entregar:</strong> ' + md(e.entregable) + '</p>' +
        (e.pistas ? '<details class="pistas"><summary>💡 Ver pistas</summary>' + lista(e.pistas) + '</details>' : '') +
        areaTexto(c.numero + ':individual', 'Respuesta o notas de Marcos', 'Se guarda automáticamente en este navegador.') +
        '<h3>Rúbrica (autoevaluación o revisión del profesor)</h3>' +
        e.rubrica.map(function (r, i) { return casilla(c.numero + ':rubrica:' + i, md(r)); }).join('') +
        (e.solucion ? '<details class="solucion"><summary>Solución de referencia (para el profesor)</summary>' + bloques(e.solucion) + '</details>' : '');
    },
    comprobacion: function (c) {
      return '<p>Responde con tus palabras. Después abre la respuesta modelo y compara. No se califican: sirven para detectar dudas.</p>' +
        c.comprobacion.map(function (p, i) {
          return '<div class="abierta"><h3>' + (i + 1) + '. ' + md(p.q) + '</h3>' +
            areaTexto(c.numero + ':comprobacion:' + i, 'Tu respuesta') +
            '<details><summary>Ver respuesta modelo</summary><p>' + md(p.a) + '</p></details>' +
            casilla(c.numero + ':comprobacion-ok:' + i, 'Mi respuesta coincide en lo esencial') + '</div>';
        }).join('');
    },
    evaluacion: function (c) {
      return '<p>Selección múltiple con retroalimentación. Se necesita <strong>' + Progreso.APROBACION +
        '%</strong> para superar la lección. Puedes repetirla las veces que quieras; se guarda el mejor resultado.</p>' +
        quiz('clase-' + c.numero, c.evaluacion, c.numero);
    },
    errores: function (c) {
      return '<div class="errores-lista">' + c.errores.map(tarjetaError).join('') + '</div>' +
        '<p class="mas"><a href="#/errores">Ver el catálogo completo de errores →</a></p>';
    },
    resumen: function (c) {
      return '<h3>Resumen</h3>' + lista(c.resumen) +
        '<h3>Criterios para saber si Marcos puede avanzar</h3><p>Los marca el profesor después de la sesión.</p>' +
        c.criterios.map(function (k, i) { return casilla(c.numero + ':criterio:' + i, md(k)); }).join('') +
        (c.tareaCasa ? '<h3>Tarea opcional</h3><p>' + md(c.tareaCasa) + '</p>' : '');
    }
  };

  function tarjetaError(e) {
    return '<article class="error-tarjeta"><header><span class="tec tec-' + esc(e.tec || 'general') + '">' + esc((e.tec || 'general').toUpperCase()) +
      '</span><h3>' + md(e.sintoma) + '</h3></header><p><strong>Causa probable:</strong> ' + md(e.causa) + '</p>' +
      '<p><strong>Cómo resolverlo:</strong> ' + md(e.solucion) + '</p>' +
      (e.real ? '<p class="error-real">📌 <strong>En la web de Marcos:</strong> ' + md(e.real) + '</p>' : '') + '</article>';
  }

  function planTiempos(c) {
    var p = c.plan;
    var total60 = FA.sumar(p.sesion60, 'min') + p.flexible;
    var filas = p.sesion60.map(function (a) {
      return '<tr><td>' + md(a.actividad) + '</td><td>' + (a.leccion ? '<a href="#/clase/' + c.numero + '/' + a.leccion + '">' + esc(nombreLeccion(a.leccion)) + '</a>' : '—') + '</td><td class="num">' + a.min + '</td></tr>';
    }).join('');
    return '<h3>Plan de la sesión de 60 minutos</h3><div class="tabla-scroll"><table class="plan"><thead><tr><th>Actividad</th><th>Lección</th><th class="num">Min</th></tr></thead><tbody>' +
      filas + '<tr class="flexible"><td>Tiempo flexible para preguntas y dificultades</td><td>—</td><td class="num">' + p.flexible + '</td></tr>' +
      '</tbody><tfoot><tr><th colspan="2">Total</th><th class="num">' + total60 + '</th></tr></tfoot></table></div>' +
      (p.ampliacion90 && p.ampliacion90.length ? '<h3>Ampliación opcional para sesiones de 90 minutos (+' + FA.sumar(p.ampliacion90, 'min') + ' min)</h3>' +
        '<div class="tabla-scroll"><table class="plan"><tbody>' + p.ampliacion90.map(function (a) {
          return '<tr><td>' + md(a.actividad) + '</td><td>' + (a.leccion ? '<a href="#/clase/' + c.numero + '/' + a.leccion + '">' + esc(nombreLeccion(a.leccion)) + '</a>' : '—') + '</td><td class="num">' + a.min + '</td></tr>';
        }).join('') + '</tbody></table></div>' : '') +
      '<aside class="nota nota-tip"><strong class="nota-titulo">Si se acaba el tiempo</strong><p>' + md(p.posponer) + '</p></aside>' +
      '<p class="aviso-tiempos">Las duraciones son estimaciones, no límites. Si una actividad necesita más tiempo, es mejor terminarla bien en la siguiente sesión.</p>';
  }

  function nombreLeccion(id) {
    var l = FA.LECCIONES.filter(function (x) { return x.id === id; })[0];
    return l ? l.titulo : id;
  }

  function guionPara(c, leccionId) {
    var items = (c.guion || []).filter(function (g) { return g.leccion === leccionId; });
    if (!items.length) return '';
    return '<aside class="guion-profesor solo-profesor"><strong class="nota-titulo">🎓 Guion del profesor</strong>' +
      items.map(function (g) {
        return '<div class="guion-item">' + (g.decir ? '<p><strong>Decir:</strong> “' + md(g.decir) + '”</p>' : '') +
          (g.hacer ? '<p><strong>Hacer:</strong> ' + md(g.hacer) + '</p>' : '') +
          (g.preguntar ? '<p><strong>Preguntar:</strong> ' + md(g.preguntar) + '</p>' : '') + '</div>';
      }).join('') + '</aside>';
  }

  /* ---------------------------------------------------------------- vistas */

  var Vistas = {};

  Vistas.inicio = function () {
    var p = D.paginas.inicio;
    var g = Progreso.resumenGlobal(D.clases);
    var siguiente = D.clases.filter(function (c) { return Progreso.resumenClase(c).estado !== 'completada'; })[0];
    var hoy = new Date().toISOString().slice(0, 10);
    var sesiones = Calendario.generar(D.clases.length, Progreso.obtener().calendario);
    var proxima = sesiones.filter(function (s) { return s.fecha >= hoy && s.clase; })[0];
    return '<section class="hero"><div><p class="sobretitulo">Funcode Studio CB</p><h1 tabindex="-1">Funcode Academy</h1>' +
      '<p class="subtitulo">Formación Web de Marcos</p>' + bloques(p.intro) + '</div>' +
      '<div class="hero-progreso">' + anillo(g.porcentaje) + '<p>' + g.hechas + ' de ' + g.total + ' lecciones · ' + g.clasesCompletas + ' de ' + D.clases.length + ' clases</p></div></section>' +
      '<div class="tarjetas-inicio">' +
      (siguiente ? '<a class="tarjeta destacada" href="#/clase/' + siguiente.numero + '"><span class="sobretitulo">Continuar</span><strong>Clase ' + siguiente.numero + '. ' + esc(siguiente.titulo) + '</strong><span>' + esc(siguiente.objetivoCorto || '') + '</span></a>' : '<div class="tarjeta destacada"><strong>¡Las 10 clases están completas!</strong></div>') +
      (proxima ? '<a class="tarjeta" href="#/calendario"><span class="sobretitulo">Próxima sesión</span><strong>' + esc(proxima.fechaLarga) + '</strong><span>' + esc(proxima.inicio) + ' – ' + esc(proxima.fin) + ' · ' + proxima.minutos + ' min · Clase ' + proxima.clase + '</span></a>' : '') +
      '<a class="tarjeta" href="#/arquitectura"><span class="sobretitulo">Mapa</span><strong>Arquitectura real de la web</strong><span>Cómo se conectan HTML, CSS, JS, PHP y SQL</span></a>' +
      '<a class="tarjeta" href="#/profesor"><span class="sobretitulo">Para el profesor</span><strong>Guía de enseñanza</strong><span>Cómo usar la plataforma en cada sesión</span></a>' +
      '</div>' + bloques(p.cuerpo);
  };

  Vistas.clases = function () {
    return '<h1 tabindex="-1">Las 10 clases</h1><p class="lead">Cada clase tiene las mismas lecciones: objetivo, explicación, conceptos, código real, diagrama, ejercicios, preguntas, evaluación, errores y resumen.</p>' +
      '<div class="grid-clases">' + D.clases.map(function (c) {
        var r = Progreso.resumenClase(c);
        return '<a class="tarjeta-clase estado-borde-' + r.estado + '" href="#/clase/' + c.numero + '">' +
          '<span class="clase-num">' + c.numero + '</span><div><h2>' + esc(c.titulo) + '</h2><p>' + esc(c.objetivoCorto || '') + '</p>' +
          barra(r.porcentaje, 'Progreso clase ' + c.numero) + '<p class="meta">' + etiquetaEstado(r.estado) + ' · ' + r.hechas + '/' + r.total + ' lecciones</p></div></a>';
      }).join('') + '</div>';
  };

  Vistas.clase = function (n) {
    var c = claseNum(n);
    if (!c) return noEncontrado();
    var r = Progreso.resumenClase(c);
    var q = Progreso.quiz(c.numero);
    return migas([['#/clases', 'Clases'], [null, 'Clase ' + c.numero]]) +
      '<header class="clase-cabecera"><span class="clase-num grande">' + c.numero + '</span><div><h1 tabindex="-1">' + esc(c.titulo) + '</h1>' +
      '<p class="lead">' + md(c.objetivo) + '</p><p class="meta">' + etiquetaEstado(r.estado) + ' · ' + r.hechas + '/' + r.total + ' lecciones' +
      (q ? ' · evaluación: mejor ' + q.mejor + '%' : '') + '</p>' + barra(r.porcentaje) + '</div></header>' +
      '<div class="clase-layout"><section><h2>Lecciones</h2><ol class="lista-lecciones">' + c.lecciones.map(function (l) {
        var hecha = Progreso.leccionCompletada(c.numero, l.id);
        return '<li class="' + (hecha ? 'hecha' : '') + '"><a href="#/clase/' + c.numero + '/' + l.id + '"><span class="check" aria-hidden="true">' + (hecha ? '✔' : '') + '</span>' +
          '<span class="titulo-leccion">' + esc(l.titulo) + '</span><span class="min">' + (l.momento === 'tarea' ? 'tarea' : (l.minutos ? l.minutos + ' min' : '')) +
          (l.momento === 'ampliacion90' ? ' · 90' : '') + '</span>' + (hecha ? '<span class="sr-only">(completada)</span>' : '') + '</a></li>';
      }).join('') + '</ol><a class="boton primario" href="#/clase/' + c.numero + '/' + primeraPendiente(c) + '">' + (r.hechas ? 'Continuar' : 'Empezar') + ' la clase</a></section>' +
      '<section>' + planTiempos(c) + '</section></div>' +
      '<section class="guion-completo"><h2>🎓 Guion del profesor</h2><p>Cómo explicar esta clase sin dar por hecho que Marcos sabe programar.</p>' +
      (c.guionIntro ? '<p>' + md(c.guionIntro) + '</p>' : '') +
      '<ol class="guion-lista">' + (c.guion || []).map(function (g) {
        return '<li><span class="guion-leccion">' + esc(nombreLeccion(g.leccion)) + '</span>' + (g.decir ? '<p><strong>Decir:</strong> “' + md(g.decir) + '”</p>' : '') +
          (g.hacer ? '<p><strong>Hacer:</strong> ' + md(g.hacer) + '</p>' : '') + (g.preguntar ? '<p><strong>Preguntar:</strong> ' + md(g.preguntar) + '</p>' : '') + '</li>';
      }).join('') + '</ol>' + areaTexto(c.numero + ':notas-profesor', 'Notas del profesor sobre esta clase', 'Dudas de Marcos, temas para repasar, acuerdos.') + '</section>';
  };

  function primeraPendiente(c) {
    var l = c.lecciones.filter(function (x) { return !Progreso.leccionCompletada(c.numero, x.id); })[0];
    return (l || c.lecciones[0]).id;
  }

  Vistas.leccion = function (n, id) {
    var c = claseNum(n);
    if (!c) return noEncontrado();
    var idx = c.lecciones.map(function (l) { return l.id; }).indexOf(id);
    if (idx < 0) return noEncontrado();
    var l = c.lecciones[idx];
    var ant = c.lecciones[idx - 1], sig = c.lecciones[idx + 1];
    return migas([['#/clases', 'Clases'], ['#/clase/' + c.numero, 'Clase ' + c.numero], [null, l.titulo]]) +
      '<div class="leccion-layout"><nav class="indice-leccion" aria-label="Lecciones de la clase"><p class="indice-titulo">Clase ' + c.numero + '</p><ol>' +
      c.lecciones.map(function (x) {
        var hecha = Progreso.leccionCompletada(c.numero, x.id);
        return '<li class="' + (hecha ? 'hecha' : '') + (x.id === id ? ' actual' : '') + '"><a href="#/clase/' + c.numero + '/' + x.id + '"' +
          (x.id === id ? ' aria-current="page"' : '') + '><span class="check" aria-hidden="true">' + (hecha ? '✔' : '') + '</span>' + esc(x.titulo) + '</a></li>';
      }).join('') + '</ol></nav>' +
      '<article class="leccion" data-clase="' + c.numero + '" data-leccion="' + esc(id) + '"><header><p class="sobretitulo">Clase ' + c.numero + ' · ' + esc(c.titulo) +
      '</p><h1 tabindex="-1">' + esc(l.titulo) + '</h1><p class="meta">⏱️ ' + (l.momento === 'tarea' ? 'Actividad fuera de la sesión o tarea' :
        (l.minutos ? l.minutos + ' min estimados' : '') + (l.momento === 'ampliacion90' ? ' · solo en sesiones de 90 min' : '')) + '</p></header>' +
      guionPara(c, id) + RENDER_LECCION[id](c) +
      '<footer class="leccion-pie"><div id="zona-completar">' + botonCompletar(c, id) + '</div><div class="nav-lecciones">' +
      (ant ? '<a class="boton" href="#/clase/' + c.numero + '/' + ant.id + '">← ' + esc(ant.titulo) + '</a>' : '<span></span>') +
      (sig ? '<a class="boton primario" href="#/clase/' + c.numero + '/' + sig.id + '">' + esc(sig.titulo) + ' →</a>' :
        (claseNum(c.numero + 1) ? '<a class="boton primario" href="#/clase/' + (c.numero + 1) + '">Ir a la clase ' + (c.numero + 1) + ' →</a>' : '<a class="boton primario" href="#/progreso">Ver mi progreso →</a>')) +
      '</div></footer></article></div>';
  };

  function botonCompletar(c, id) {
    var hecha = Progreso.leccionCompletada(c.numero, id);
    if (id === 'evaluacion') {
      return hecha ? '<p class="completada-txt">✔ Evaluación superada</p>'
        : '<p class="pendiente-txt">Esta lección se completa al obtener ' + Progreso.APROBACION + '% o más en la evaluación.</p>';
    }
    return '<button type="button" class="boton ' + (hecha ? 'hecho' : 'exito') + '" data-accion="completar" data-clase="' + c.numero + '" data-leccion="' + esc(id) + '" aria-pressed="' + hecha + '">' +
      (hecha ? '✔ Lección completada (clic para desmarcar)' : 'Marcar lección como completada') + '</button>';
  }

  function actualizarBotonCompletar() {
    var art = app.querySelector('article.leccion');
    var zona = document.getElementById('zona-completar');
    if (art && zona) zona.innerHTML = botonCompletar(claseNum(art.getAttribute('data-clase')), art.getAttribute('data-leccion'));
    actualizarIndice();
  }

  function actualizarIndice() {
    var art = app.querySelector('article.leccion');
    if (!art) return;
    var c = claseNum(art.getAttribute('data-clase'));
    app.querySelectorAll('.indice-leccion li').forEach(function (li, i) {
      var hecha = Progreso.leccionCompletada(c.numero, c.lecciones[i].id);
      li.classList.toggle('hecha', hecha);
      li.querySelector('.check').textContent = hecha ? '✔' : '';
    });
  }

  Vistas.calendario = function () {
    var sesiones = Calendario.generar(D.clases.length, Progreso.obtener().calendario);
    var H = Calendario.HORARIO;
    return '<h1 tabindex="-1">Calendario de sesiones</h1>' +
      '<div class="horario"><div><strong>Primera clase</strong><span>' + esc(Calendario.fechaLarga(H.primera.fecha)) + ' · ' + H.primera.inicio + '–' + H.primera.fin + ' · 60 min</span></div>' +
      H.semanal.map(function (f) { return '<div><strong>' + f.nombre + 's</strong><span>' + f.inicio + '–' + f.fin + ' · ' + f.minutos + ' min</span></div>'; }).join('') + '</div>' +
      '<aside class="nota nota-alerta"><strong class="nota-titulo">Diferencia de duración (sin resolver)</strong><p>Los lunes duran <strong>90 minutos</strong> y los miércoles y la primera clase <strong>60 minutos</strong>. ' +
      'En el plan se había mencionado que las clases serían de una hora; está pendiente confirmar si el lunes queda en 90 o se ajusta a 60. ' +
      'Por eso cada clase tiene un plan de 60 min y una ampliación opcional para 90.</p></aside>' +
      '<aside class="nota nota-hipotesis"><strong class="nota-titulo">Supuesto</strong><p>Después de la primera clase, las sesiones continúan cada lunes y miércoles. Los posibles festivos se señalan pero <strong>no</strong> se cancelan solos: marca la sesión como “cancelada” si no se da, o como “continuación” si se usa para terminar la clase anterior. Las fechas siguientes se recalculan.</p></aside>' +
      '<ol class="sesiones">' + sesiones.map(function (s) {
        var c = s.clase ? claseNum(s.clase) : null;
        return '<li class="sesion sesion-' + s.marca + '"><div class="sesion-fecha"><strong>' + esc(s.fechaLarga) + '</strong><span>' + esc(s.inicio) + ' – ' + esc(s.fin) + '</span>' +
          '<span class="duracion d' + s.minutos + '">' + s.minutos + ' min</span></div>' +
          '<div class="sesion-clase">' + (s.marca === 'cancelada' ? '<em>Sesión cancelada</em>' : (c ? '<a href="#/clase/' + c.numero + '">Clase ' + c.numero + '. ' + esc(c.titulo) + '</a>' +
            (s.marca === 'continuacion' ? ' <span class="chip">continuación</span>' : '') +
            '<small>' + (s.minutos === 90 ? 'Usa el plan de 60 + la ampliación de 90.' : 'Usa el plan de 60 minutos.') + '</small>' : '')) +
          (s.festivo ? '<p class="festivo">⚠️ Posible festivo en Colombia: ' + esc(s.festivo) + '. Confirmar.</p>' : '') + '</div>' +
          '<label class="sesion-marca"><span class="sr-only">Estado de la sesión del ' + esc(s.fechaLarga) + '</span><select data-accion="sesion" data-fecha="' + s.fecha + '">' +
          [['normal', 'Normal'], ['cancelada', 'Cancelada'], ['continuacion', 'Continuación de la clase anterior']].map(function (o) {
            return '<option value="' + o[0] + '"' + (s.marca === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
          }).join('') + '</select></label></li>';
      }).join('') + '</ol>';
  };

  Vistas.pagina = function (id) {
    var p = D.paginas[id];
    if (!p) return noEncontrado();
    var extra = '';
    if (id === 'pagos' && p.evaluacion) extra = '<section class="seccion"><h2>Comprueba lo aprendido</h2>' + quiz('pagos', p.evaluacion, null) + '</section>';
    if (id === 'profesor') extra = '<section class="seccion"><h2>Guiones por clase</h2><ul class="lista-guiones">' + D.clases.map(function (c) {
      return '<li><a href="#/clase/' + c.numero + '">Clase ' + c.numero + '. ' + esc(c.titulo) + '</a> <small>' + (c.guion || []).length + ' indicaciones</small></li>';
    }).join('') + '</ul></section>';
    return '<h1 tabindex="-1">' + esc(p.titulo) + '</h1>' + (p.lead ? '<p class="lead">' + md(p.lead) + '</p>' : '') +
      (p.secciones || []).map(function (s) {
        return '<section class="seccion" id="' + esc(s.id || '') + '"><h2>' + md(s.titulo) + '</h2>' + bloques(s.bloques) + '</section>';
      }).join('') + extra;
  };

  Vistas.glosario = function () {
    return '<h1 tabindex="-1">Glosario</h1><p class="lead">Definiciones sencillas de los términos técnicos que aparecen en el curso.</p>' +
      '<label class="buscador"><span>Buscar término</span><input type="search" data-accion="buscar-glosario" placeholder="Ej.: servidor, variable, DOM…"></label>' +
      '<dl class="glosario" id="lista-glosario">' + itemsGlosario('') + '</dl>';
  };

  function normalizarTexto(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function itemsGlosario(filtro) {
    var f = normalizarTexto(filtro);
    var items = D.glosario.slice().sort(function (a, b) { return a.termino.localeCompare(b.termino, 'es'); })
      .filter(function (g) { return !f || normalizarTexto(g.termino + ' ' + g.def).indexOf(f) >= 0; });
    if (!items.length) return '<p>No hay términos que coincidan.</p>';
    return items.map(function (g) {
      return '<div class="concepto"><dt>' + esc(g.termino) + (g.clase ? ' <a class="chip" href="#/clase/' + g.clase + '">Clase ' + g.clase + '</a>' : '') + '</dt><dd>' + md(g.def) + '</dd></div>';
    }).join('');
  }

  Vistas.errores = function (filtro) {
    var tecs = ['todas', 'html', 'css', 'js', 'php', 'sql', 'general'];
    filtro = filtro || 'todas';
    var items = D.errores.filter(function (e) { return filtro === 'todas' || e.tec === filtro; });
    return '<h1 tabindex="-1">Errores comunes y soluciones</h1><p class="lead">Síntoma → causa probable → solución. Los marcados con 📌 se encontraron en la web real de Marcos.</p>' +
      '<div class="filtros" role="group" aria-label="Filtrar por tecnología">' + tecs.map(function (t) {
        return '<a class="chip' + (t === filtro ? ' activo' : '') + '" href="#/errores/' + t + '"' + (t === filtro ? ' aria-current="true"' : '') + '>' + t.toUpperCase() + '</a>';
      }).join('') + '</div><div class="errores-lista">' + items.map(tarjetaError).join('') + '</div>';
  };

  Vistas.progreso = function () {
    var g = Progreso.resumenGlobal(D.clases);
    return '<h1 tabindex="-1">Progreso y copias de seguridad</h1>' +
      '<div class="progreso-global">' + anillo(g.porcentaje) + '<p>' + g.hechas + ' de ' + g.total + ' lecciones completadas · ' + g.clasesCompletas + ' clases completas</p></div>' +
      (Progreso.esPersistente() ? '' : '<aside class="nota nota-alerta"><strong class="nota-titulo">El progreso no se está guardando</strong><p>Este navegador bloquea el almacenamiento local (modo privado o configuración). Lo que hagas se perderá al cerrar la pestaña. Exporta el progreso antes de salir.</p></aside>') +
      '<div class="tabla-scroll"><table><thead><tr><th>Clase</th><th>Estado</th><th class="num">Lecciones</th><th class="num">Evaluación</th></tr></thead><tbody>' +
      D.clases.map(function (c) {
        var r = Progreso.resumenClase(c), q = Progreso.quiz(c.numero);
        return '<tr><td><a href="#/clase/' + c.numero + '">' + c.numero + '. ' + esc(c.titulo) + '</a></td><td>' + etiquetaEstado(r.estado) + '</td><td class="num">' + r.hechas + '/' + r.total +
          '</td><td class="num">' + (q ? q.mejor + '% (' + q.intentos + ')' : '—') + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<section class="seccion"><h2>Copia de seguridad del progreso</h2><p>El progreso se guarda <strong>solo en este navegador</strong>. Exporta un archivo de vez en cuando (por ejemplo, al final de cada clase) y guárdalo en una carpeta segura. Para pasar el progreso a otro equipo, impórtalo allí.</p>' +
      '<div class="acciones"><button type="button" class="boton primario" data-accion="exportar">⬇️ Exportar progreso</button>' +
      '<label class="boton">⬆️ Importar progreso<input type="file" accept="application/json,.json" data-accion="importar" class="sr-only"></label>' +
      '<button type="button" class="boton peligro" data-accion="reiniciar">Borrar todo el progreso</button></div>' +
      '<div id="confirmar-borrado" class="nota nota-alerta" hidden><p>¿Borrar TODO el progreso de este navegador? No se puede deshacer. Exporta antes una copia si la necesitas.</p>' +
      '<div class="acciones"><button type="button" class="boton peligro" data-accion="reiniciar-si">Sí, borrar todo</button><button type="button" class="boton" data-accion="reiniciar-no">Cancelar</button></div></div>' +
      '<div id="zona-export" hidden><label for="export-json">Progreso exportado (cópialo y guárdalo como .json)</label><textarea id="export-json" class="export-json" readonly></textarea>' +
      '<button type="button" class="boton" data-accion="copiar-export">Copiar</button></div>' +
      '<p id="mensaje-progreso" aria-live="polite"></p></section>';
  };

  function migas(items) {
    return '<nav class="migas" aria-label="Ruta"><a href="#/">Inicio</a>' + items.map(function (i) {
      return ' <span aria-hidden="true">›</span> ' + (i[0] ? '<a href="' + i[0] + '">' + esc(i[1]) + '</a>' : '<span aria-current="page">' + esc(i[1]) + '</span>');
    }).join('') + '</nav>';
  }

  function noEncontrado() {
    return '<h1 tabindex="-1">Página no encontrada</h1><p>La dirección no corresponde a ninguna sección. <a href="#/">Volver al inicio</a>.</p>';
  }

  /* ---------------------------------------------------------------- enrutador */

  function ruta() {
    var partes = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
    var html, seccion = partes[0] || 'inicio';
    if (!partes.length) html = Vistas.inicio();
    else if (partes[0] === 'clases') html = Vistas.clases();
    else if (partes[0] === 'clase' && partes.length === 2) { html = Vistas.clase(partes[1]); seccion = 'clases'; }
    else if (partes[0] === 'clase' && partes.length === 3) { html = Vistas.leccion(partes[1], partes[2]); seccion = 'clases'; }
    else if (partes[0] === 'calendario') html = Vistas.calendario();
    else if (partes[0] === 'glosario') html = Vistas.glosario();
    else if (partes[0] === 'errores') html = Vistas.errores(partes[1]);
    else if (partes[0] === 'progreso') html = Vistas.progreso();
    else if (['arquitectura', 'pagos', 'profesor'].indexOf(partes[0]) >= 0) html = Vistas.pagina(partes[0]);
    else html = noEncontrado();

    app.innerHTML = html;
    document.querySelectorAll('.menu a').forEach(function (a) {
      var activo = a.getAttribute('data-seccion') === seccion;
      a.classList.toggle('activo', activo);
      if (activo) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.body.classList.remove('menu-abierto');
    var titulo = app.querySelector('h1');
    document.title = (titulo ? titulo.textContent + ' · ' : '') + 'Funcode Academy';
    window.scrollTo(0, 0);
    if (titulo && document.activeElement !== document.body) titulo.focus({ preventScroll: true });
  }

  /* ---------------------------------------------------------------- eventos (delegación) */

  var temporizadores = {};

  app.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-accion]');
    if (!el) return;
    var accion = el.getAttribute('data-accion');
    if (accion === 'completar') {
      var c = +el.getAttribute('data-clase'), l = el.getAttribute('data-leccion');
      Progreso.marcarLeccion(c, l, !Progreso.leccionCompletada(c, l));
      actualizarBotonCompletar();
    } else if (accion === 'resaltar-lineas') {
      var fig = el.closest('figure.codigo');
      var lineas = FA.rangoLineas(el.getAttribute('data-lineas'));
      var activo = el.classList.contains('activo');
      fig.querySelectorAll('.linea.resaltada').forEach(function (x) { x.classList.remove('resaltada'); });
      fig.querySelectorAll('.ver-lineas.activo').forEach(function (x) { x.classList.remove('activo'); });
      if (!activo) {
        el.classList.add('activo');
        lineas.forEach(function (n) { var x = fig.querySelector('.linea[data-n="' + n + '"]'); if (x) x.classList.add('resaltada'); });
        var primera = fig.querySelector('.linea.resaltada');
        if (primera) primera.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    } else if (accion === 'reiniciar-quiz') {
      var id = el.getAttribute('data-quiz');
      respuestasQuiz[id] = null;
      var form = el.closest('form.quiz');
      var claseAttr = form.getAttribute('data-clase');
      form.outerHTML = quiz(id, preguntasDe(id), claseAttr === '' ? null : +claseAttr);
    } else if (accion === 'exportar') {
      var json = Progreso.exportar();
      // Descarga el archivo (funciona al abrir la plataforma en el equipo)...
      try {
        var blob = new Blob([json], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'funcode-academy-progreso-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      } catch (e) { /* sin descargas: queda el texto para copiar */ }
      // ...y además muestra el texto, por si el navegador o el visor bloquean descargas.
      document.getElementById('zona-export').hidden = false;
      document.getElementById('export-json').value = json;
      mensajeProgreso('Si no se descargó el archivo, copia el texto de abajo y guárdalo como .json.');
    } else if (accion === 'copiar-export') {
      var ta = document.getElementById('export-json');
      var manual = function () { ta.select(); mensajeProgreso('Selecciona el texto y cópialo con Ctrl+C.'); };
      if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(function () { mensajeProgreso('Copiado. Pégalo en un archivo .json y guárdalo.'); }, manual);
      else manual();
    } else if (accion === 'reiniciar') {
      // Confirmación dentro de la página: algunos visores no muestran confirm().
      document.getElementById('confirmar-borrado').hidden = false;
    } else if (accion === 'reiniciar-si') {
      Progreso.reiniciar(); ruta(); mensajeProgreso('Progreso borrado.');
    } else if (accion === 'reiniciar-no') {
      document.getElementById('confirmar-borrado').hidden = true;
    }
  });

  app.addEventListener('change', function (ev) {
    var el = ev.target;
    var accion = el.getAttribute('data-accion');
    if (accion === 'responder') {
      var id = el.getAttribute('data-quiz');
      respuestasQuiz[id] = respuestasQuiz[id] || [];
      respuestasQuiz[id][+el.getAttribute('data-i')] = +el.value;
    } else if (accion === 'check') {
      Progreso.ponerCheck(el.getAttribute('data-clave'), el.checked);
    } else if (accion === 'sesion') {
      Progreso.ponerSesion(el.getAttribute('data-fecha'), el.value);
      ruta();
    } else if (accion === 'importar' && el.files && el.files[0]) {
      var lector = new FileReader();
      lector.onload = function () {
        try { Progreso.importar(lector.result); ruta(); mensajeProgreso('Progreso importado correctamente.'); }
        catch (e) { mensajeProgreso('No se pudo importar: ' + e.message, true); }
      };
      lector.readAsText(el.files[0]);
    }
  });

  app.addEventListener('input', function (ev) {
    var el = ev.target;
    var accion = el.getAttribute('data-accion');
    if (accion === 'texto') {
      var clave = el.getAttribute('data-clave');
      var aviso = el.parentNode.querySelector('.guardado');
      aviso.textContent = 'Guardando…';
      clearTimeout(temporizadores[clave]);
      temporizadores[clave] = setTimeout(function () {
        Progreso.guardarTexto(clave, el.value);
        aviso.textContent = Progreso.esPersistente() ? 'Guardado ✔' : 'Guardado solo mientras la pestaña esté abierta';
      }, 400);
    } else if (accion === 'buscar-glosario') {
      document.getElementById('lista-glosario').innerHTML = itemsGlosario(el.value);
    }
  });

  app.addEventListener('submit', function (ev) {
    var form = ev.target.closest('form.quiz');
    if (!form) return;
    ev.preventDefault();
    corregirQuiz(form);
  });

  function mensajeProgreso(txt, error) {
    var m = document.getElementById('mensaje-progreso');
    if (m) { m.textContent = txt; m.className = error ? 'error' : 'ok'; }
  }

  /* Menú en celular y modo profesor */
  document.getElementById('boton-menu').addEventListener('click', function () {
    var abierto = document.body.classList.toggle('menu-abierto');
    this.setAttribute('aria-expanded', abierto);
  });
  var botonProfesor = document.getElementById('boton-profesor');
  function aplicarModoProfesor() {
    var on = !!Progreso.preferencia('modoProfesor');
    document.body.classList.toggle('modo-profesor', on);
    botonProfesor.setAttribute('aria-pressed', on);
    botonProfesor.textContent = on ? '🎓 Modo profesor: sí' : '🎓 Modo profesor: no';
  }
  botonProfesor.addEventListener('click', function () {
    Progreso.ponerPreferencia('modoProfesor', !Progreso.preferencia('modoProfesor'));
    aplicarModoProfesor();
  });

  aplicarModoProfesor();
  window.addEventListener('hashchange', ruta);
  ruta();
})();
