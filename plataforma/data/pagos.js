/* pagos.js — Tema futuro: pagos digitales. SOLO conceptual. No hay integración real. */
FA.registrarPagina('pagos', {
  titulo: 'Pagos digitales (tema futuro, conceptual)',
  lead: 'Marcos podría querer cobrar con tarjeta, Nequi o Daviplata. **No está confirmado** y **no se implementa en esta fase.** Esta sección explica cómo funciona para poder decidir con criterio.',
  secciones: [
    { titulo: 'Lo primero: qué NO se puede hacer “solo con código”', bloques: [
      { t: 'nota', tipo: 'alerta', titulo: 'Aclaración importante', x: 'No es posible construir una pasarela propia para aceptar tarjetas o billeteras simplemente escribiendo código. Recibir pagos requiere **contratos con entidades autorizadas**, credenciales que ellas entregan, controles de seguridad y cumplir requisitos legales y técnicos.' },
      { t: 'p', x: 'Lo que sí hace la web de un comercio es: crear el **pedido**, enviar a la persona a pagar con un **proveedor autorizado**, y **verificar desde el servidor** la respuesta del proveedor antes de marcar el pedido como pagado.' },
      { t: 'p', x: 'Hoy la web de Marcos **no tiene** pedidos, carrito, precios por servicio ni ningún flujo de pago. Las solicitudes de servicio solo se guardan y se avisan por correo.' }
    ] },
    { titulo: '1. El pedido y sus estados', bloques: [
      { t: 'p', x: 'Un **pedido** es el registro de “qué se compra, cuánto vale y en qué estado está el pago”. Se guarda en la base de datos **antes** de cobrar.' },
      { t: 'tabla', cabecera: ['Estado', 'Significa', 'Quién lo cambia'], filas: [
        ['pendiente', 'Se creó el pedido; aún no hay pago confirmado.', 'El servidor al crear el pedido'],
        ['pagado / aprobado', 'El proveedor confirmó el pago y el servidor lo verificó.', 'Solo el servidor, tras verificar'],
        ['rechazado', 'El proveedor informó que el pago no se aprobó.', 'El servidor, tras verificar'],
        ['expirado', 'Pasó el tiempo límite sin pago.', 'Una tarea programada del servidor'],
        ['reembolsado', 'Se devolvió el dinero.', 'El servidor, con confirmación del proveedor']
      ] },
      { t: 'ejemplo', lang: 'sql', titulo: 'Ejemplo didáctico de tabla de pedidos (no existe en la web de Marcos)', codigo: "CREATE TABLE pedidos (\n  idPedido INT AUTO_INCREMENT PRIMARY KEY,\n  idUser INT NOT NULL,\n  referencia VARCHAR(40) NOT NULL UNIQUE,  -- la que se envía al proveedor\n  total INT NOT NULL,                      -- en pesos, calculado en el servidor\n  moneda CHAR(3) NOT NULL DEFAULT 'COP',\n  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',\n  idTransaccionProveedor VARCHAR(80) NULL, -- lo que devuelve el proveedor\n  creado DATETIME NOT NULL,\n  actualizado DATETIME NULL\n);\n-- Nunca columnas para número de tarjeta, CVV ni contraseñas." }
    ] },
    { titulo: '2. Tres formas de cobrar', bloques: [
      { t: 'tabla', cabecera: ['', 'Pasarela / agregador de pagos', 'API directa de un proveedor', 'Transferencia manual'], filas: [
        ['Qué es', 'Empresa autorizada que procesa tarjetas, PSE, billeteras, etc. por el comercio', 'Integración con un banco o billetera concreta, mediante contrato y su API', 'La persona transfiere (p. ej. a Nequi o una cuenta) y envía el comprobante'],
        ['¿Quién toca los datos de pago?', 'El proveedor (si se usa su página o widget)', 'El proveedor', 'Nadie en la web'],
        ['¿Confirmación automática?', 'Sí, con notificaciones al servidor', 'Sí, si el producto lo ofrece', 'No: alguien revisa el extracto'],
        ['Requisitos típicos', 'Registro del comercio, documentos, cuenta bancaria, contrato, comisiones', 'Acuerdo comercial y técnico con la entidad; a menudo solo para empresas', 'Cuenta a nombre del comercio; proceso de conciliación'],
        ['Riesgo principal', 'Configurar mal la verificación', 'Complejidad y requisitos de la entidad', 'Comprobantes falsos, errores manuales']
      ] },
      { t: 'p', x: '**API** (interfaz de programación): una “puerta” documentada por la que un programa (el servidor de la web) se comunica con otro (el del proveedor).' }
    ] },
    { titulo: '3. Qué debe verificar un comercio en Colombia', bloques: [
      { t: 'nota', tipo: 'hipotesis', titulo: 'Verificar en fuentes oficiales antes de decidir', x: 'Condiciones, costos, productos y requisitos cambian. Esta lista es una guía de preguntas, no una confirmación. Debe consultarse la documentación oficial del proveedor elegido y, para lo legal y tributario, asesoría profesional.' },
      { t: 'lista', items: [
        '**Tarjetas:** normalmente a través de una pasarela. Revisar requisitos de vinculación del comercio (RUT, documentos de la empresa o de la persona, cuenta bancaria), comisiones, plazos de abono, contracargos y responsabilidades de seguridad (norma PCI DSS).',
        '**Nequi y Daviplata:** verificar si ofrecen productos o APIs para comercios, si están disponibles para el tipo de comercio de Marcos (persona natural o empresa), costos, y si la pasarela elegida ya los incluye como medio de pago.',
        '**PSE (débito desde cuenta bancaria):** se ofrece a través de pasarelas; revisar requisitos.',
        '**Facturación y tributos:** obligaciones de facturación electrónica ante la DIAN (consultar con un contador).',
        '**Datos personales:** la Ley 1581 de 2012 regula el tratamiento de datos; la web ya tiene una política de datos que habría que actualizar.',
        '**Consumidor:** en ventas a distancia aplican derechos como el de retracto (Estatuto del Consumidor, Ley 1480 de 2011); revisar con asesoría.',
        '**Ambiente de pruebas (sandbox):** confirmar que el proveedor lo ofrece para probar sin dinero real.'
      ] }
    ] },
    { titulo: '4. Cómo se valida un pago desde el servidor', bloques: [
      { t: 'diagrama', id: 'flujo-pago' },
      { t: 'lista', ordenada: true, items: [
        'El servidor crea el pedido con **total calculado en el servidor** y una **referencia única**.',
        'La persona paga en la página o widget del proveedor.',
        'El proveedor envía una **notificación al servidor** (webhook) con el resultado.',
        'El servidor **verifica la autenticidad** (firma o consulta directa a la API del proveedor con credenciales secretas).',
        'Comprueba que **referencia, monto y moneda** coinciden con el pedido guardado.',
        'Comprueba que el pedido **no se haya procesado antes** (idempotencia).',
        'Solo entonces cambia el estado a “pagado” y registra el id de transacción.'
      ] },
      { t: 'ejemplo', lang: 'php', titulo: 'Ejemplo DIDÁCTICO y genérico (cada proveedor define su propio formato de firma; no usar tal cual)', codigo: "<?php\n// El secreto lo entrega el proveedor y se guarda FUERA del código (variable de entorno).\n$secreto = getenv('PAGOS_SECRETO_FIRMA');\n$cuerpo  = file_get_contents('php://input');           // notificación tal como llegó\n$firmaRecibida  = $_SERVER['HTTP_X_FIRMA'] ?? '';\n$firmaEsperada  = hash_hmac('sha256', $cuerpo, $secreto);\n\nif (!hash_equals($firmaEsperada, $firmaRecibida)) {   // comparación segura\n    http_response_code(400);\n    exit;                                              // no es del proveedor: se ignora\n}\n\n$aviso = json_decode($cuerpo, true);\n$stmt = $conexion->prepare('SELECT total, moneda, estado FROM pedidos WHERE referencia = ?');\n$stmt->bind_param('s', $aviso['referencia']);\n$stmt->execute();\n$pedido = $stmt->get_result()->fetch_assoc();\n\nif (!$pedido || $pedido['estado'] !== 'pendiente') { exit; }           // inexistente o ya procesado\nif ((int)$aviso['monto'] !== (int)$pedido['total'] || $aviso['moneda'] !== $pedido['moneda']) {\n    exit;                                                               // monto alterado\n}\n// Recién aquí: UPDATE pedidos SET estado = 'pagado' ... (con consulta preparada)" }
    ] },
    { titulo: '5. Cómo se evitan pedidos marcados como pagados sin serlo', bloques: [
      { t: 'lista', items: [
        '**Nunca** marcar “pagado” porque la persona volvió a la página de “gracias” o porque lo diga JavaScript del navegador: cualquiera puede escribir esa dirección o modificar el JavaScript.',
        'Calcular precios y totales **en el servidor**, no tomar el valor de un campo del formulario.',
        'Verificar la **firma** o consultar el estado directamente a la API del proveedor.',
        'Comparar **monto, moneda y referencia** con el pedido guardado.',
        'Procesar cada notificación **una sola vez** (idempotencia).',
        'Registrar cada notificación recibida (sin datos sensibles) para poder conciliar.',
        'En transferencias manuales: confirmar en el **extracto de la cuenta**, no en una captura de pantalla.'
      ] }
    ] },
    { titulo: '6. Riesgos de seguridad y cumplimiento', bloques: [
      { t: 'tabla', cabecera: ['Riesgo', 'Cómo se maneja'], filas: [
        ['Guardar datos de tarjetas', '**Nunca** guardar número completo de tarjeta, CVV ni contraseñas. Usar formularios o widgets del proveedor.'],
        ['Credenciales del proveedor expuestas', 'Fuera del código y del navegador; variables de entorno; rotarlas si se filtran. Nunca en JavaScript público.'],
        ['Notificaciones falsas', 'Verificar firma / consultar la API; validar monto y referencia.'],
        ['Conexión insegura', 'HTTPS obligatorio en toda la web.'],
        ['Fraude y contracargos', 'Políticas claras, registro de pedidos, atención de reclamos.'],
        ['Errores de conciliación', 'Comparar periódicamente pedidos pagados con los reportes del proveedor.'],
        ['Base actual insegura', 'Antes de cualquier pago, corregir los riesgos de la auditoría (SQL, control de acceso, credenciales).']
      ] },
      { t: 'nota', tipo: 'seguridad', titulo: 'Condición previa', x: 'Por los hallazgos de la auditoría (consultas sin preparar, páginas de administración abiertas, credenciales en el código), **no sería prudente añadir pagos a la web actual** sin corregir primero esos puntos.' }
    ] },
    { titulo: '7. Qué falta definir antes de proponer una integración', bloques: [
      { t: 'lista', items: [
        '¿Qué se cobraría exactamente (servicios, publicidad, camisas)? ¿Con qué precios?',
        '¿El comercio es persona natural o empresa? ¿Tiene RUT y cuenta bancaria a su nombre?',
        '¿Qué medios de pago necesitan los clientes de verdad?',
        '¿Volumen esperado de pagos y presupuesto para comisiones?',
        '¿Quién atenderá devoluciones, reclamos y conciliación?',
        '¿Quién autoriza y quién mantiene la integración?'
      ] },
      { t: 'p', x: 'Con esas respuestas se comparan proveedores revisando su **documentación oficial**, se prueba en su **ambiente de pruebas** y se planifica una fase separada, con alcance confirmado y autorización del propietario.' }
    ] }
  ],
  evaluacion: [
    { q: 'La persona termina de pagar y el proveedor la devuelve a `gracias.php?pedido=123`. ¿Se puede marcar el pedido como pagado en ese momento?', opciones: ['Sí, si llegó a esa página es porque pagó', 'No: cualquiera puede escribir esa dirección; hay que verificar la notificación o consultar al proveedor desde el servidor', 'Sí, si JavaScript lo confirma'], correcta: 1, retro: 'La página de retorno solo sirve para informar a la persona. El estado lo decide el servidor tras verificar con el proveedor.' },
    { q: '¿Qué datos de pago puede guardar la web en su base de datos?', opciones: ['El número completo de la tarjeta y el CVV para cobros futuros', 'La referencia del pedido, el estado y el id de transacción que entrega el proveedor', 'La contraseña de Nequi del cliente'], correcta: 1, retro: 'Nunca se guardan números completos de tarjeta, CVV ni contraseñas. Solo referencias y estados.' },
    { q: '¿Dónde debe calcularse el total a cobrar?', opciones: ['En el servidor, a partir de los productos y precios guardados', 'En un campo oculto del formulario', 'En JavaScript del navegador'], correcta: 0, retro: 'Lo que viene del navegador se puede alterar. El servidor calcula y compara.' },
    { q: 'En una transferencia manual a Nequi, ¿cómo se confirma el pago?', opciones: ['Con la captura de pantalla que envía el cliente', 'Revisando el movimiento en el extracto o la app de la cuenta del comercio', 'No hace falta confirmarlo'], correcta: 1, retro: 'Las capturas se pueden falsificar; se confirma en la cuenta.' },
    { q: '¿Por qué no conviene añadir pagos a la web actual de inmediato?', opciones: ['Porque PHP no permite pagos', 'Porque hay riesgos de seguridad pendientes (SQL sin preparar, admin sin control de acceso, credenciales en el código) y faltan requisitos y contratos', 'Porque los pagos solo funcionan con JavaScript'], correcta: 1, retro: 'Primero se corrige la base y se definen requisitos; luego una fase separada y autorizada.' }
  ]
});
